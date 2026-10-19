import assert from "node:assert/strict";
import {
    buildPeriods, bucketIndex, normalizeConfig, normalizeWeights, scoreFor, subScoreFor, rateFor, bandFor, trendPct, median,
    aggregate, sumSeries, summarize, ruleBreakdown, buildGroupTree, groupRollup, devicesUnder, breadcrumb
} from "../src/model.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("ok -", name); }

const KM_PER_MILE = 1.60934;
const mi = m => m * KM_PER_MILE;

const config = normalizeConfig({
    version: 2,
    rules: [
        { id: "r1", name: "Seatbelt", weight: 40, maxRate: 25 },   // 25 events / 1,000 mi → 0
        { id: "r2", name: "Cell phone use", weight: 60, maxRate: 5 } // 5 events / 1,000 mi → 0
    ],
    period: "week", periods: 4, unit: "miles", minDistance: 10, bands: { low: 90, medium: 75 }
});

test("periods are contiguous, oldest first, last ends today", () => {
    const end = new Date(2026, 9, 15, 12, 0, 0);
    const p = buildPeriods(end, "week", 4);
    assert.equal(p.length, 4);
    for (let i = 1; i < p.length; i++) assert.equal(p[i].start, p[i - 1].end + 1);
    assert.equal(new Date(p[3].end).getDate(), 15);
    assert.equal(new Date(p[3].start).getDate(), 9);
    assert.equal(bucketIndex(p, new Date(2026, 9, 10).getTime()), 3);
    assert.equal(bucketIndex(p, new Date(2026, 8, 20).getTime()), 0);
    assert.equal(bucketIndex(p, new Date(2026, 7, 1).getTime()), -1);
});

test("config: weights normalize to 100, v1 points/bands migrate, clamps", () => {
    const c = normalizeConfig({ rules: [{ id: 1, points: 3 }, { id: 2, points: 1 }], period: "bogus", periods: 100, bands: { low: 10, medium: 30 } });
    assert.deepEqual(c.rules.map(r => r.weight), [75, 25]);
    assert.equal(c.rules[0].maxRate, 25); // default when name is unknown
    assert.equal(c.period, "week");
    assert.equal(c.periods, 26);
    assert.deepEqual(c.bands, { low: 90, medium: 75 }); // v1 lower-is-better bands reset
    assert.equal(c.version, 2);
    const nw = normalizeWeights([{ weight: 1 }, { weight: 1 }, { weight: 1 }]);
    assert.equal(nw.reduce((a, r) => a + r.weight, 0), 100);
    assert.deepEqual(normalizeWeights([{ weight: 0 }, { weight: 0 }]).map(r => r.weight), [50, 50]);
    const named = normalizeConfig({ version: 2, rules: [{ id: "a", name: "Cell phone use" }, { id: "b", name: "Harsh Braking" }] });
    assert.equal(named.rules[0].maxRate, 5);
    assert.equal(named.rules[1].maxRate, 40);
    assert.ok(named.rules[0].weight > named.rules[1].weight);
});

test("score: distance matters — 10 events over 100 mi vs 10,000 mi", () => {
    // 10 seatbelt events in 100 mi = 100 / 1,000 mi → far past maxRate 25 → sub 0
    assert.equal(subScoreFor(10, mi(100), config.rules[0], config), 0);
    // 10 seatbelt events in 10,000 mi = 1 / 1,000 mi → 100 × (1 − 1/25) = 96
    assert.ok(Math.abs(subScoreFor(10, mi(10000), config.rules[0], config) - 96) < 1e-9);
    assert.ok(Math.abs(rateFor(10, mi(10000), config) - 1) < 1e-9);
    // total: seatbelt sub 96 × .4 + phone (0 events → 100) × .6 = 98.4
    assert.ok(Math.abs(scoreFor({ r1: 10 }, mi(10000), config) - 98.4) < 1e-9);
    assert.equal(scoreFor({ r1: 10 }, mi(100), config), 60); // 0×.4 + 100×.6
    // one phone event in 500 mi = 2 / 1,000 → sub 60 → 36 + 40 = 76
    assert.ok(Math.abs(scoreFor({ r2: 1 }, mi(500), config) - 76) < 1e-9);
    // below minDistance → not scored
    assert.equal(scoreFor({ r2: 1 }, mi(2), config), null);
    assert.equal(scoreFor({}, mi(2), config), null);
    assert.equal(scoreFor({}, mi(50), config), 100);
    assert.equal(bandFor(95, config), "Low");
    assert.equal(bandFor(80, config), "Medium");
    assert.equal(bandFor(60, config), "High");
    assert.equal(bandFor(null, config), "Low exposure");
});

test("trend and median", () => {
    assert.equal(trendPct(110, 100), 10);
    assert.equal(trendPct(0, 0), 0);
    assert.equal(trendPct(5, 0), null);
    assert.equal(median([3, 1, 2]), 2);
    assert.equal(median([4, 1, 2, 3]), 2.5);
    assert.equal(median([]), null);
});

const periods = buildPeriods(new Date(2026, 9, 15), "week", 4);
const t = (periodIdx, dayOffset = 1) => new Date(periods[periodIdx].start + dayOffset * 3600000).toISOString();
const exceptions = [
    { activeFrom: t(3), device: { id: "d1" }, driver: { id: "u1" }, rule: { id: "r1" } },
    { activeFrom: t(3), device: { id: "d1" }, driver: { id: "u1" }, rule: { id: "r2" } },
    { activeFrom: t(2), device: { id: "d1" }, driver: { id: "UnknownDriverId" }, rule: { id: "r1" } },
    { activeFrom: t(3), device: { id: "d2" }, rule: { id: "r1" } },
    { activeFrom: t(3), device: { id: "d3" }, rule: { id: "r1" } },          // out of scope
    { activeFrom: t(3), device: { id: "d1" }, rule: { id: "rX" } },          // untracked rule
    { activeFrom: "2020-01-01T00:00:00Z", device: { id: "d1" }, rule: { id: "r1" } } // out of range
];
const trips = [
    { start: t(3), device: { id: "d1" }, driver: { id: "u1" }, distance: mi(1000) },
    { start: t(3), device: { id: "d2" }, distance: mi(500) },
    { start: t(2), device: { id: "d1" }, distance: mi(100) },
    { start: t(3), device: { id: "d3" }, distance: 999 }
];
const scope = new Set(["d1", "d2", "d4"]);
const { byDevice, byDriver } = aggregate({ periods, config, exceptions, trips, deviceIds: scope });

test("aggregate buckets by device and driver, respects scope and rule set", () => {
    assert.equal(byDevice.size, 3);
    const d1 = byDevice.get("d1");
    assert.deepEqual(d1.counts[3], { r1: 1, r2: 1 });
    assert.deepEqual(d1.counts[2], { r1: 1 });
    assert.equal(d1.events, 3);
    assert.ok(Math.abs(d1.distanceKm[3] - mi(1000)) < 1e-9);
    assert.ok(!byDevice.has("d3"));
    assert.ok(byDevice.has("d4"));
    assert.equal(byDriver.get("u1").events, 2);
    assert.ok(!byDriver.has("UnknownDriverId"));
});

test("summarize computes current/previous/trend/band on the 0–100 scale", () => {
    const s = summarize(byDevice.get("d1"), config);
    // current: seatbelt 1/1000mi → 96×.4 = 38.4 ; phone 1/1000mi → 80×.6 = 48 → 86.4
    assert.ok(Math.abs(s.current - 86.4) < 1e-9);
    // previous: seatbelt 1 in 100 mi = 10/1000 → 60×.4 = 24 ; phone 0 → 60 → 84
    assert.ok(Math.abs(s.previous - 84) < 1e-9);
    assert.ok(s.delta > 0);
    assert.equal(s.band, "Medium");
    assert.equal(s.currentEvents, 2);
    assert.equal(s.totalEvents, 3);
    assert.equal(summarize(byDevice.get("d4"), config).current, null); // no trips → low exposure
});

test("sumSeries + ruleBreakdown (impact-sorted)", () => {
    const fleet = sumSeries([...byDevice.values()], periods.length);
    assert.deepEqual(fleet.counts[3], { r1: 2, r2: 1 });
    const br = ruleBreakdown(fleet, config);
    assert.equal(br[0].id, "r2"); // phone costs more score than seatbelt
    assert.ok(br[0].impact > br[1].impact);
    assert.equal(br[1].current, 2);
    assert.equal(br[1].previous, 1);
    assert.equal(br[1].trend, 100);
});

test("group tree rollup and drill", () => {
    const groups = [
        { id: "GroupCompanyId", name: "Company", children: [{ id: "gA" }, { id: "gB" }] },
        { id: "gA", name: "North", children: [{ id: "gA1" }] },
        { id: "gA1", name: "North-Yard", children: [] },
        { id: "gB", name: "South", children: [] }
    ];
    const devices = [
        { id: "d1", name: "T1", groups: [{ id: "gA1" }] },
        { id: "d2", name: "T2", groups: [{ id: "gB" }] },
        { id: "d4", name: "T4", groups: [{ id: "GroupCompanyId" }] }
    ];
    const tree = buildGroupTree(groups);
    const rows = groupRollup({ nodeId: "GroupCompanyId", tree, devices, byDevice, config, nPeriods: periods.length });
    assert.deepEqual(rows.map(r => r.name), ["North", "South", "Company (direct)"]);
    assert.ok(Math.abs(rows[0].current - 86.4) < 1e-9);
    assert.equal(rows[0].vehicles, 1);
    assert.equal(rows[0].hasChildren, true);
    // South: 1 seatbelt in 500 mi = 2/1000 → 92×.4 + 60 = 96.8
    assert.ok(Math.abs(rows[1].current - 96.8) < 1e-9);
    assert.equal(devicesUnder("gA", tree, devices).length, 1);
    assert.deepEqual(breadcrumb("gA1", tree).map(b => b.name), ["Company", "North", "North-Yard"]);
});

console.log(`\n${passed} tests passed`);
