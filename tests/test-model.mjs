import assert from "node:assert/strict";
import {
    buildPeriods, bucketIndex, normalizeConfig, scoreFor, bandFor, trendPct, median,
    aggregate, sumSeries, summarize, ruleBreakdown, buildGroupTree, groupRollup, devicesUnder, breadcrumb
} from "../src/model.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("ok -", name); }

const config = normalizeConfig({
    rules: [{ id: "r1", name: "Seatbelt", points: 2 }, { id: "r2", name: "Speeding", points: 5 }],
    period: "week", periods: 4, normalization: "none", bands: { low: 5, medium: 20 }
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

test("config normalization clamps and defaults", () => {
    const c = normalizeConfig({ rules: [{ id: 1, points: "3" }], period: "bogus", periods: 100, bands: { low: 50, medium: 10 } });
    assert.deepEqual(normalizeConfig({ normalization: "per100mi" }).bands, { low: 2, medium: 5 });
    assert.equal(c.rules[0].id, "1");
    assert.equal(c.rules[0].points, 3);
    assert.equal(c.period, "week");
    assert.equal(c.periods, 26);
    assert.equal(c.bands.medium, 50);
});

test("score: points and normalizations", () => {
    const counts = { r1: 3, r2: 1 }; // 6 + 5 = 11 points
    assert.equal(scoreFor(counts, 100, config), 11);
    const per100 = { ...config, normalization: "per100mi" };
    // 160.934 km = 100 mi → 11 points per 100 mi
    assert.ok(Math.abs(scoreFor(counts, 160.934, per100) - 11) < 1e-6);
    assert.equal(scoreFor(counts, 0, per100), null);
    assert.equal(scoreFor({}, 0, per100), 0);
    const perKm = { ...config, normalization: "per1000km" };
    assert.equal(scoreFor(counts, 500, perKm), 22);
    assert.equal(bandFor(4, config), "Low");
    assert.equal(bandFor(20, config), "Medium");
    assert.equal(bandFor(21, config), "High");
    assert.equal(bandFor(null, config), "No exposure");
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
    { start: t(3), device: { id: "d1" }, driver: { id: "u1" }, distance: 160.934 },
    { start: t(3), device: { id: "d2" }, distance: 80.467 },
    { start: t(2), device: { id: "d1" }, distance: 10 },
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
    assert.ok(Math.abs(d1.distanceKm[3] - 160.934) < 1e-9);
    assert.ok(!byDevice.has("d3"));
    assert.ok(byDevice.has("d4")); // zero-event subject still present
    assert.equal(byDriver.get("u1").events, 2);
    assert.ok(!byDriver.has("UnknownDriverId"));
});

test("summarize computes current/previous/trend/band", () => {
    const s = summarize(byDevice.get("d1"), config);
    assert.equal(s.current, 7);     // 2 + 5
    assert.equal(s.previous, 2);
    assert.equal(s.trend, 250);
    assert.equal(s.band, "Medium");
    assert.equal(s.currentEvents, 2);
    assert.equal(s.totalEvents, 3);
    const per100 = summarize(byDevice.get("d1"), { ...config, normalization: "per100mi" });
    assert.ok(Math.abs(per100.current - 7) < 1e-6);
});

test("sumSeries + ruleBreakdown", () => {
    const fleet = sumSeries([...byDevice.values()], periods.length);
    assert.deepEqual(fleet.counts[3], { r1: 2, r2: 1 });
    const br = ruleBreakdown(fleet, config);
    assert.equal(br[0].id, "r2"); // 5 points beats 4
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
    const names = rows.map(r => r.name);
    assert.deepEqual(names, ["North", "South", "Company (direct)"]);
    assert.equal(rows[0].current, 7);
    assert.equal(rows[0].vehicles, 1);
    assert.equal(rows[0].hasChildren, true);
    assert.equal(rows[1].current, 2);
    assert.equal(devicesUnder("gA", tree, devices).length, 1);
    assert.deepEqual(breadcrumb("gA1", tree).map(b => b.name), ["Company", "North", "North-Yard"]);
});

console.log(`\n${passed} tests passed`);
