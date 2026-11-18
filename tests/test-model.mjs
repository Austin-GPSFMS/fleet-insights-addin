import assert from "node:assert/strict";
import {
    profileKeyFor, configForProfile, scoreAt, profilesAt,
    resolveScope, inScope, devicesInScope, shouldIncludeOutside, buildRangePeriods, focusLabel, lastBarLabel,
    displayGroupLabel, isSystemGroupId,
    buildPeriods, bucketIndex, normalizeConfig, normalizeWeights, scoreFor, subScoreFor, rateFor, bandFor, trendPct, median,
    aggregate, sumSeries, summarize, ruleBreakdown, buildGroupTree, groupRollup, devicesUnder, breadcrumb, scorableDevices
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

test("periods are calendar-aligned, contiguous, oldest first; only the last is partial", () => {
    // Mon 2026-10-19 12:00 — weeks starting Monday
    const end = new Date(2026, 9, 19, 12, 0, 0);
    const p = buildPeriods(end, "week", 4, 1);
    assert.equal(p.length, 4);
    for (let i = 1; i < p.length; i++) assert.equal(p[i].start, p[i - 1].end + 1);
    assert.deepEqual(p.map(x => x.partial), [false, false, false, true]);
    // current week starts Mon Oct 19 00:00 and ends at the end of "today"
    assert.equal(new Date(p[3].start).getDate(), 19);
    assert.equal(new Date(p[3].start).getDay(), 1);
    assert.equal(new Date(p[3].end).getDate(), 19);
    // previous full weeks: Oct 12–18, Oct 5–11, Sep 28–Oct 4
    assert.equal(new Date(p[2].start).getDate(), 12);
    assert.equal(new Date(p[2].end).getDate(), 18);
    assert.equal(new Date(p[0].start).getMonth(), 8);
    assert.equal(new Date(p[0].start).getDate(), 28);
    // Sunday-start weeks: current week starts Sun Oct 18
    const ps = buildPeriods(end, "week", 2, 0);
    assert.equal(new Date(ps[1].start).getDate(), 18);
    assert.equal(new Date(ps[1].start).getDay(), 0);
    // Stability: the same completed week has identical bounds whether viewed Monday or Thursday
    const thu = buildPeriods(new Date(2026, 9, 22, 9, 0, 0), "week", 4, 1);
    assert.equal(thu[2].start, p[2].start);
    assert.equal(thu[2].end, p[2].end);
    assert.equal(thu[3].start, p[3].start); // same current week, just longer
    assert.ok(thu[3].end > p[3].end);
    // Months: Oct (to date), Sep, Aug
    const pm = buildPeriods(end, "month", 3, 1);
    assert.deepEqual(pm.map(x => new Date(x.start).getMonth()), [7, 8, 9]);
    assert.equal(new Date(pm[1].end).getDate(), 30);
    // Days
    const pd = buildPeriods(end, "day", 3, 1);
    assert.deepEqual(pd.map(x => new Date(x.start).getDate()), [17, 18, 19]);
    assert.equal(bucketIndex(p, new Date(2026, 9, 15).getTime()), 2);
    assert.equal(bucketIndex(p, new Date(2026, 8, 20).getTime()), -1);
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

const periods = buildPeriods(new Date(2026, 9, 15), "week", 4, 1);
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
    assert.deepEqual(rows.map(r => r.name), ["North", "South", "Unassigned vehicles"]);
    assert.deepEqual(rows[2].deviceIds, ["d4"]);
    assert.ok(Math.abs(rows[0].current - 86.4) < 1e-9);
    assert.equal(rows[0].vehicles, 1);
    assert.equal(rows[0].hasChildren, true);
    // South: 1 seatbelt in 500 mi = 2/1000 → 92×.4 + 60 = 96.8
    assert.ok(Math.abs(rows[1].current - 96.8) < 1e-9);
    assert.equal(devicesUnder("gA", tree, devices).length, 1);
    assert.deepEqual(breadcrumb("gA1", tree).map(b => b.name), ["Company", "North", "North-Yard"]);
});

test("summarize / ruleBreakdown at an earlier period index", () => {
    const d1 = byDevice.get("d1");
    const s2 = summarize(d1, config, 2);        // period 2: 1 seatbelt in 100 mi → 84
    assert.ok(Math.abs(s2.current - 84) < 1e-9);
    assert.equal(s2.currentEvents, 1);
    const br2 = ruleBreakdown(d1, config, 2);
    assert.equal(br2.find(r => r.id === "r1").current, 1);
    assert.equal(br2.find(r => r.id === "r2").current, 0);
    const br3 = ruleBreakdown(d1, config, 3);
    assert.equal(br3.find(r => r.id === "r2").current, 1);
    assert.equal(br3.find(r => r.id === "r1").previous, 1);
});

test("scorableDevices drops excluded device types and group subtrees", () => {
    const groups = [
        { id: "GroupCompanyId", name: "Company", children: [{ id: "gA" }, { id: "gBat" }] },
        { id: "gA", name: "North", children: [{ id: "gA1" }] },
        { id: "gA1", name: "North-Yard", children: [] },
        { id: "gBat", name: "Battery Trackers", children: [] }
    ];
    const tree = buildGroupTree(groups);
    const devs = [
        { id: "v1", deviceType: "GO9", groups: [{ id: "gA1" }] },
        { id: "v2", deviceType: "GO9B", groups: [{ id: "gA" }] },
        { id: "t1", deviceType: "GoAnywhere", groups: [{ id: "gBat" }] },
        { id: "u1", deviceType: "None", groups: [{ id: "gA" }] },
        { id: "u2", serialNumber: "", groups: [{ id: "gA" }] },          // missing type, no serial → untracked
        { id: "v3", serialNumber: "G9ABC123", groups: [{ id: "gA" }] }     // missing type, real serial → kept
    ];
    const def = normalizeConfig({ version: 2 });
    assert.deepEqual(scorableDevices(devs, def, tree).map(d => d.id), ["v1", "v2", "v3"]);
    const exclNorthYard = normalizeConfig({ version: 2, excludedDeviceTypes: [], excludedGroups: ["gA1"] });
    assert.deepEqual(scorableDevices(devs, exclNorthYard, tree).map(d => d.id), ["v2", "t1", "u1", "u2", "v3"]);
    const exclNorth = normalizeConfig({ version: 2, excludedGroups: ["gA"] });
    assert.deepEqual(scorableDevices(devs, exclNorth, tree).map(d => d.id), []);
});

test("displayGroupLabel: sub-group of the display parent, else other non-system groups", () => {
    const groups = [
        { id: "GroupCompanyId", name: "Company", children: [{ id: "gLoc" }, { id: "gOps" }] },
        { id: "gLoc", name: "Locations", children: [{ id: "gSoCal" }, { id: "gNorCal" }] },
        { id: "gSoCal", name: "Southern California Division", children: [{ id: "gSoCalYard" }] },
        { id: "gSoCalYard", name: "SoCal Yard", children: [] },
        { id: "gNorCal", name: "Northern California division", children: [] },
        { id: "gOps", name: "Operations", children: [] },
        { id: "GroupVehicleId", name: "Vehicle", children: [] }
    ];
    const tree = buildGroupTree(groups);
    const cfg = normalizeConfig({ version: 2, displayGroupId: "gLoc" });
    assert.equal(displayGroupLabel([{ id: "gSoCalYard" }, { id: "GroupVehicleId" }], cfg, tree), "Southern California Division");
    assert.equal(displayGroupLabel([{ id: "gOps" }, { id: "GroupVehicleId" }], cfg, tree), "Operations"); // no location → other groups
    assert.equal(displayGroupLabel([{ id: "GroupVehicleId" }], cfg, tree), "");
    const none = normalizeConfig({ version: 2 });
    assert.equal(displayGroupLabel([{ id: "gSoCalYard" }, { id: "gOps" }], none, tree), "SoCal Yard, Operations");
    assert.ok(isSystemGroupId("GroupVehicleId") && isSystemGroupId("GroupCompanyId") && !isSystemGroupId("b2A3"));
});

test("display group as the home node: children + unassigned vehicles across the whole fleet", () => {
    const groups = [
        { id: "GroupCompanyId", name: "Company", children: [{ id: "gLoc" }, { id: "gOps" }] },
        { id: "gLoc", name: "Locations", children: [{ id: "gSoCal" }, { id: "gNorCal" }] },
        { id: "gSoCal", name: "Southern California Division", children: [] },
        { id: "gNorCal", name: "Northern California division", children: [] },
        { id: "gOps", name: "Operations", children: [] }
    ];
    const tree = buildGroupTree(groups);
    const devices = [
        { id: "d1", groups: [{ id: "gSoCal" }, { id: "gOps" }] },
        { id: "d2", groups: [{ id: "gNorCal" }] },
        { id: "d4", groups: [{ id: "gOps" }] } // no location
    ];
    const scope = devicesUnder("gLoc", tree, devices, ["GroupCompanyId", "gLoc"]);
    assert.equal(scope.length, 3); // whole fleet, not just Locations members
    const rows = groupRollup({ nodeId: "gLoc", tree, devices: scope, byDevice, config, nPeriods: periods.length });
    assert.deepEqual(rows.map(r => [r.name, r.vehicles]), [["Southern California Division", 1], ["Northern California division", 1], ["Unassigned vehicles", 1]]);
    assert.deepEqual(rows[2].deviceIds, ["d4"]);
});

test("scopes: a sub-group as the report anchor only contains its own vehicles; combined groups include/exclude", () => {
    const groups = [
        { id: "GroupCompanyId", name: "Company", children: [{ id: "gLoc" }] },
        { id: "gLoc", name: "Locations", children: [{ id: "gSoCal" }, { id: "gNorCal" }] },
        { id: "gSoCal", name: "Southern California Division", children: [{ id: "gCivil" }, { id: "gElectric" }, { id: "gFleet" }] },
        { id: "gCivil", name: "ILB Civil Underground", children: [] },
        { id: "gElectric", name: "ILB Electric", children: [] },
        { id: "gFleet", name: "ILB Fleet", children: [] },
        { id: "gNorCal", name: "Northern California division", children: [] }
    ];
    const tree = buildGroupTree(groups);
    const devs = [
        { id: "c1", groups: [{ id: "gCivil" }] },
        { id: "e1", groups: [{ id: "gElectric" }] },
        { id: "f1", groups: [{ id: "gFleet" }] },
        { id: "ce", groups: [{ id: "gCivil" }, { id: "gElectric" }] },   // in both → excluded when Electric is excluded
        { id: "s0", groups: [{ id: "gSoCal" }] },                         // directly in the division
        { id: "n1", groups: [{ id: "gNorCal" }] },
        { id: "x1", groups: [{ id: "GroupCompanyId" }] }
    ];
    const cfg = normalizeConfig({ version: 2, displayGroupId: "gSoCal", customGroups: [
        { id: "a", name: "Civil + Fleet", include: ["gCivil", "gFleet"] },
        { id: "b", name: "SoCal without Electric", include: ["gSoCal"], exclude: ["gElectric"] },
        { id: "bad", name: "", include: ["gCivil"] }, { id: "empty", name: "Nothing", include: [] }
    ] });
    assert.deepEqual(cfg.customGroups.map(g => g.id), ["a", "b"]);

    // the bug: SoCal as the anchor must not pull in NorCal / company vehicles
    const home = resolveScope("gSoCal", tree, cfg, "gSoCal");
    assert.deepEqual(devicesInScope(home, devs).map(d => d.id), ["c1", "e1", "f1", "ce", "s0"]);
    assert.equal(home.wholeFleet, false);
    assert.equal(resolveScope("GroupCompanyId", tree, cfg, "gSoCal").wholeFleet, true);

    const a = resolveScope("custom:a", tree, cfg, "gSoCal");
    assert.deepEqual(devicesInScope(a, devs).map(d => d.id), ["c1", "f1", "ce"]);
    assert.deepEqual(a.childIds, ["gCivil", "gFleet"]);
    assert.deepEqual(a.crumbs.map(c => c.name), ["Company", "Locations", "Southern California Division", "Civil + Fleet"]);

    const b = resolveScope("custom:b", tree, cfg, "gSoCal");
    assert.deepEqual(devicesInScope(b, devs).map(d => d.id), ["c1", "f1", "s0"]);     // e1 and ce dropped
    assert.deepEqual(b.childIds, ["gCivil", "gFleet"]);                                // children of SoCal minus Electric
    assert.equal(inScope([{ id: "gFleet" }], b), true);
    assert.equal(inScope([{ id: "gFleet" }, { id: "gElectric" }], b), false);

    // unknown / deleted combined group falls back to the home scope
    assert.equal(resolveScope("custom:gone", tree, cfg, "gSoCal").id, "gSoCal");

    // outside rule: auto = only when the anchor covers ≥ 75% of the fleet
    assert.equal(shouldIncludeOutside(cfg, 60, 909), true);     // Locations at ILB
    assert.equal(shouldIncludeOutside(cfg, 580, 909), false);   // one division
    assert.equal(shouldIncludeOutside(cfg, 0, 909), false);
    assert.equal(shouldIncludeOutside({ includeOutside: true }, 580, 909), true);
    assert.equal(shouldIncludeOutside({ includeOutside: false }, 60, 909), false);
});

test("date-range periods: selected range plus the equal-length range before it", () => {
    const p = buildRangePeriods(new Date(2026, 9, 1), new Date(2026, 9, 31), true);
    assert.equal(p.length, 2);
    assert.equal(p[1].days, 31);
    assert.equal(new Date(p[1].start).getDate(), 1);
    assert.equal(new Date(p[1].end).getDate(), 31);
    assert.equal(p[0].end, p[1].start - 1);
    assert.equal(new Date(p[0].start).getMonth(), 7);   // Aug 31
    assert.equal(new Date(p[0].start).getDate(), 31);
    assert.ok(p.every(x => x.custom && !x.partial));
    assert.equal(bucketIndex(p, new Date(2026, 9, 15).getTime()), 1);
    assert.equal(bucketIndex(p, new Date(2026, 8, 15).getTime()), 0);
    assert.equal(buildRangePeriods(new Date(2026, 9, 1), new Date(2026, 9, 31), false).length, 1);
    assert.equal(buildRangePeriods(new Date(2026, 9, 5), new Date(2026, 9, 1)).length, 0);
    const cfgW = normalizeConfig({ version: 2 });
    assert.equal(focusLabel(p, 1, cfgW), p[1].label);
    assert.equal(lastBarLabel(p, cfgW), p[1].label);
    const wk = buildPeriods(new Date(2026, 9, 19, 12), "week", 3, 1);
    assert.equal(focusLabel(wk, 2, cfgW), "this week to date");
    assert.match(focusLabel(wk, 1, cfgW), /^week of /);
    assert.equal(lastBarLabel(wk, cfgW), "This week (to date)");
});

test("weight profiles: a division scores with its own weights; mixed totals are distance-weighted", () => {
    const groups = [
        { id: "GroupCompanyId", name: "Company", children: [{ id: "gLoc" }] },
        { id: "gLoc", name: "Locations", children: [{ id: "gNor" }, { id: "gSo" }] },
        { id: "gNor", name: "Northern California division", children: [{ id: "gNorYard" }] },
        { id: "gNorYard", name: "NorCal Yard", children: [] },
        { id: "gSo", name: "Southern California Division", children: [] }
    ];
    const tree = buildGroupTree(groups);
    const base = { version: 2, period: "week", periods: 2, unit: "miles", minDistance: 10, rules: [
        { id: "brake", name: "Harsh Braking", weight: 50, maxRate: 40 },
        { id: "phone", name: "Cell phone use", weight: 50, maxRate: 5 }
    ] };
    // North: harsh braking matters much less (mountain roads) and is more forgiving
    const cfg = normalizeConfig({ ...base, profiles: [
        { id: "north", groupId: "gNor", rules: [{ id: "brake", weight: 10, maxRate: 80 }, { id: "phone", weight: 90 }] },
        { id: "dup", groupId: "gNor", rules: [] },          // duplicate group → dropped
        { id: "bad", rules: [] }                             // no group → dropped
    ] });
    assert.deepEqual(cfg.profiles.map(p => p.id), ["north"]);
    assert.deepEqual(cfg.profiles[0].rules.map(r => [r.id, r.weight, r.maxRate]), [["brake", 10, 80], ["phone", 90, 5]]);   // phone inherits maxRate 5
    // a profile that doesn't total 100 is normalized; a rule missing from it inherits the default
    const fix = normalizeConfig({ ...base, profiles: [{ id: "x", groupId: "gSo", rules: [{ id: "brake", weight: 30 }] }] });
    assert.equal(fix.profiles[0].rules.reduce((a, r) => a + r.weight, 0), 100);

    assert.equal(profileKeyFor([{ id: "gNorYard" }], cfg, tree), "north");     // sub-group of the profile's group
    assert.equal(profileKeyFor([{ id: "gSo" }], cfg, tree), "default");
    assert.equal(configForProfile(cfg, "default"), cfg);
    assert.equal(configForProfile(cfg, "north").rules[0].weight, 10);

    const P = buildPeriods(new Date(2026, 9, 15), "week", 2, 1);
    const at = new Date(P[1].start + 3600000).toISOString();
    const profileOf = new Map([["n1", "north"], ["s1", "default"]]);
    // identical driving: 20 harsh brakes over 1,000 mi (rate 20/1,000)
    const exceptions = [];
    for (const dev of ["n1", "s1"]) for (let k = 0; k < 20; k++) exceptions.push({ activeFrom: at, device: { id: dev }, driver: { id: "u-" + dev }, rule: { id: "brake" } });
    const trips = [
        { start: at, device: { id: "n1" }, driver: { id: "u-n1" }, distance: mi(1000) },
        { start: at, device: { id: "s1" }, driver: { id: "u-s1" }, distance: mi(1000) }
    ];
    const agg = aggregate({ periods: P, config: cfg, exceptions, trips, deviceIds: new Set(["n1", "s1"]), profileOf });
    const north = scoreAt(agg.byDevice.get("n1"), 1, cfg);   // brake sub = 100×(1−20/80)=75 → 75×.10 + 100×.90 = 97.5
    const south = scoreAt(agg.byDevice.get("s1"), 1, cfg);   // brake sub = 100×(1−20/40)=50 → 50×.50 + 100×.50 = 75
    assert.ok(Math.abs(north - 97.5) < 1e-9, "north " + north);
    assert.ok(Math.abs(south - 75) < 1e-9, "south " + south);
    assert.ok(Math.abs(scoreAt(agg.byDriver.get("u-n1"), 1, cfg) - 97.5) < 1e-9);   // drivers follow the truck's profile
    // total of both = distance-weighted average of the parts
    const both = sumSeries([agg.byDevice.get("n1"), agg.byDevice.get("s1")], 2);
    assert.ok(Math.abs(scoreAt(both, 1, cfg) - (97.5 + 75) / 2) < 1e-9);
    assert.deepEqual(profilesAt(both, 1).sort(), ["default", "north"]);
    // impacts still add up to 100 − score, and the mixed weight is the distance-weighted average
    const br = ruleBreakdown(both, cfg, 1);
    assert.ok(Math.abs(br.reduce((a, r) => a + r.impact, 0) - (100 - 86.25)) < 1e-9);
    assert.equal(br.find(r => r.id === "brake").weight, 30);
    assert.equal(br.find(r => r.id === "brake").mixed, true);
    const brN = ruleBreakdown(agg.byDevice.get("n1"), cfg, 1);
    assert.equal(brN.find(r => r.id === "brake").weight, 10);
    assert.equal(brN.find(r => r.id === "brake").maxRate, 80);
    assert.equal(brN.find(r => r.id === "brake").mixed, false);
    // no profiles configured → identical to the plain score
    const plain = normalizeConfig(base);
    const agg2 = aggregate({ periods: P, config: plain, exceptions, trips, deviceIds: new Set(["n1", "s1"]) });
    assert.equal(scoreAt(agg2.byDevice.get("n1"), 1, plain), scoreFor({ brake: 20 }, mi(1000), plain));
});

console.log(`\n${passed} tests passed`);
