/**
 * Pure scoring / aggregation model. No DOM, no Geotab API — unit-tested in Node.
 *
 * Score model (transparent on purpose — this is what GoAnalytics hides):
 *   rate(rule)      = events(rule) ÷ distance × 1,000           (events per 1,000 mi or km)
 *   subScore(rule)  = 100 × max(0, 1 − rate ÷ maxRate)           (0–100; maxRate = rate that scores 0)
 *   score           = Σ subScore(rule) × weight(rule) ÷ 100      (weights total 100%)
 * Higher is better; 100 = clean. A subject with less than `minDistance` of exposure in a
 * period is not scored (null) so a 2-mile trip with one event can't become a 0.
 * Bands classify a subject's CURRENT-period score: ≥ low → Low risk, ≥ medium → Medium, else High.
 */

export const ADDIN_ID = "an_qIKWbzyE09jcDpY-MtXw";

export const DEFAULT_CONFIG = Object.freeze({
    version: 2,
    rules: [],                 // [{ id, name, weight (% of 100), maxRate (events per 1,000 exposure units that scores 0) }]
    period: "week",            // "day" | "week" | "month"
    periods: 8,                // number of trailing periods to show
    unit: "miles",             // exposure + display unit: rates are per 1,000 mi or per 1,000 km
    minDistance: 10,           // minimum distance (in `unit`) in a period before a subject is scored
    bands: { low: 90, medium: 75 }, // score ≥ low → Low risk; ≥ medium → Medium; else High
    // Device types that are not driven vehicles — untracked assets (None), battery trackers
    // (GO Anywhere family), third-party and GoDrive-only devices. Editable in Settings.
    excludedDeviceTypes: ["None", "GoAnywhere", "GoAnywhereLite", "Gemini", "CustomDevice", "GoDriveDevice", "OldGeotab"],
    excludedGroups: [],        // group ids whose whole subtree is left out of scoring
    weekStart: 1,              // 0 = Sunday, 1 = Monday — first day of the scoring week
    displayGroupId: null,      // parent group whose children label each driver/vehicle (e.g. "Locations"); null = show all groups
    // Named combinations of groups, e.g. { id, name: "Civil + Fleet", include: [groupIds], exclude: [groupIds] }.
    // A vehicle is in a combined group when it is under any `include` group and under no `exclude` group.
    customGroups: [],
    // Weight profiles per group: [{ id, groupId, rules: [{ id, weight, maxRate }] }]. A vehicle under
    // `groupId` (first match wins) is scored with that profile's weights instead of the default ones.
    profiles: [],
    // Vehicles outside the Report-by group: null = auto (shown as "Unassigned" only when the group
    // covers at least 75% of the fleet), true = always show as Unassigned, false = always leave out.
    includeOutside: null
});

/** Geotab system groups have fixed ids like GroupCompanyId / GroupVehicleId / GroupAssetTypeId. */
export function isSystemGroupId(id) {
    return /^Group[A-Za-z]+Id$/.test(String(id || ""));
}

/**
 * Label a subject by the child of `config.displayGroupId` it falls under (e.g. "Southern California
 * Division" under "Locations"). Subjects outside that family fall back to all their non-system
 * group names. `groupIds` are the subject's own group memberships (device.groups / user.groups).
 */
export function displayGroupLabel(groupIds, config, tree) {
    const ids = (groupIds || []).map(g => (typeof g === "string" ? g : g && g.id)).filter(Boolean);
    const parent = config.displayGroupId;
    if (parent && tree && tree.byId.has(parent)) {
        const hits = [];
        for (const child of tree.childrenOf.get(parent) || []) {
            const sub = tree.descendants(child);
            if (ids.some(id => sub.has(id))) hits.push((tree.byId.get(child) || {}).name || child);
        }
        if (hits.length) return hits.join(", ");
    }
    const names = ids.filter(id => !isSystemGroupId(id)).map(id => (tree && tree.byId.get(id) ? tree.byId.get(id).name : null)).filter(Boolean);
    return [...new Set(names)].join(", ");
}

export function isUntrackedSerial(serial) {
    const sn = String(serial || "").trim();
    return sn === "" || /^0+(-0+)*$/.test(sn);
}

export const DEVICE_TYPE_LABELS = {
    None: "Untracked asset (no device)", GoAnywhere: "GO Anywhere (battery tracker)", GoAnywhereLite: "GO Anywhere Next Gen (battery tracker)",
    Gemini: "GO Anywhere Plus (battery tracker)", CustomDevice: "Custom / third-party device", CustomVehicleDevice: "Custom vehicle device",
    GoDriveDevice: "GoDrive mobile device", OldGeotab: "Legacy GEOTAB unit"
};

/** Devices that should be scored: not an excluded type and not in an excluded group subtree. */
export function scorableDevices(devices, config, tree) {
    const types = new Set(config.excludedDeviceTypes || []);
    const excludedGroupSet = new Set();
    for (const gid of config.excludedGroups || []) {
        if (tree && tree.byId.has(gid)) for (const x of tree.descendants(gid)) excludedGroupSet.add(x);
        else excludedGroupSet.add(gid);
    }
    return devices.filter(d => {
        // Unknown type (field missing) → keep, unless it is clearly an untracked asset (no serial).
        const type = d.deviceType != null ? String(d.deviceType) : (isUntrackedSerial(d.serialNumber) ? "None" : "Unknown");
        if (types.has(type)) return false;
        if (excludedGroupSet.size && (d.groups || []).some(g => excludedGroupSet.has(g.id))) return false;
        return true;
    });
}

export const PERIOD_DAYS = { day: 1, week: 7, month: 30 };
const KM_PER_MILE = 1.60934;
const DAY_MS = 86400000;

/** Default "events per 1,000 (mi|km) that scores 0" by rule-name keyword. */
export const MAX_RATE_SUGGESTIONS = [
    [/collision|crash|accident|impact/i, 1],
    [/phone|cell|handheld|mobile/i, 5],
    [/drows|fatigue|yawn/i, 5],
    [/distract/i, 8],
    [/smok|vap/i, 10],
    [/lens|obstruct|camera cover|tamper/i, 10],
    [/following|tailgat|headway/i, 15],
    [/seat ?belt/i, 25],
    [/speed/i, 25],
    [/stop sign|rolling stop/i, 20],
    [/lane/i, 30],
    [/harsh brak|hard brak/i, 40],
    [/harsh corner|hard corner/i, 40],
    [/harsh accel|hard accel|aggressive/i, 50]
];
/** Relative weight suggestions (normalized to 100 at suggest time). */
export const WEIGHT_SUGGESTIONS = [
    [/collision|crash|accident|impact/i, 25],
    [/phone|cell|handheld|mobile/i, 10],
    [/drows|fatigue|yawn/i, 8],
    [/distract/i, 8],
    [/seat ?belt/i, 6],
    [/following|tailgat|headway/i, 5],
    [/lens|obstruct|camera cover|tamper/i, 5],
    [/speed/i, 4],
    [/smok|vap/i, 4],
    [/stop sign|rolling stop/i, 4],
    [/harsh brak|hard brak/i, 3],
    [/harsh corner|hard corner/i, 3],
    [/lane/i, 3],
    [/harsh accel|hard accel|aggressive/i, 2]
];

export function suggestMaxRate(name) {
    for (const [re, v] of MAX_RATE_SUGGESTIONS) if (re.test(String(name))) return v;
    return 25;
}
export function suggestRelativeWeight(name) {
    for (const [re, v] of WEIGHT_SUGGESTIONS) if (re.test(String(name))) return v;
    return 2;
}

/** Scale weights so they total exactly 100 (integers; remainder goes to the largest). */
export function normalizeWeights(rules) {
    const total = rules.reduce((a, r) => a + Math.max(0, num(r.weight, 0)), 0);
    if (!rules.length) return rules;
    if (total <= 0) {
        const even = Math.floor(100 / rules.length);
        const out = rules.map(r => ({ ...r, weight: even }));
        out[0].weight += 100 - even * rules.length;
        return out;
    }
    const scaled = rules.map(r => ({ ...r, weight: Math.floor((Math.max(0, num(r.weight, 0)) / total) * 100) }));
    let rem = 100 - scaled.reduce((a, r) => a + r.weight, 0);
    const order = [...scaled.keys()].sort((a, b) => scaled[b].weight - scaled[a].weight);
    for (let i = 0; rem > 0; i = (i + 1) % order.length) { scaled[order[i]].weight += 1; rem--; }
    return scaled;
}

export function weightTotal(rules) {
    return rules.reduce((a, r) => a + num(r.weight, 0), 0);
}

export function normalizeConfig(raw) {
    const c = { ...DEFAULT_CONFIG, ...(raw || {}) };
    c.rules = Array.isArray(c.rules)
        ? c.rules.filter(r => r && r.id).map(r => ({
            id: String(r.id),
            name: String(r.name || r.id),
            // v1 configs carried `points`; carry them over as relative weights.
            weight: num(r.weight, num(r.points, suggestRelativeWeight(r.name))),
            maxRate: Math.max(0.01, num(r.maxRate, suggestMaxRate(r.name)))
        }))
        : [];
    if (c.rules.length && Math.abs(weightTotal(c.rules) - 100) > 0.001) c.rules = normalizeWeights(c.rules);
    if (!PERIOD_DAYS[c.period]) c.period = "week";
    c.periods = Math.min(Math.max(Math.round(num(c.periods, 8)), 2), 26);
    if (!["miles", "km"].includes(c.unit)) c.unit = "miles";
    c.minDistance = Math.max(0, num(c.minDistance, 10));
    const rb = (raw && raw.bands) || {};
    // v1 bands were "lower is better" thresholds (e.g. 10/30); detect and reset to v2 defaults.
    const looksV1 = raw && raw.version !== 2 && num(rb.low, 90) < num(rb.medium, 75);
    c.bands = looksV1 ? { ...DEFAULT_CONFIG.bands } : { low: clamp(num(rb.low, 90), 0, 100), medium: clamp(num(rb.medium, 75), 0, 100) };
    if (c.bands.medium > c.bands.low) c.bands.medium = c.bands.low;
    c.excludedDeviceTypes = Array.isArray(c.excludedDeviceTypes) ? c.excludedDeviceTypes.map(String) : [...DEFAULT_CONFIG.excludedDeviceTypes];
    c.excludedGroups = Array.isArray(c.excludedGroups) ? c.excludedGroups.map(String) : [];
    c.weekStart = Number(c.weekStart) === 0 ? 0 : 1;
    c.displayGroupId = c.displayGroupId ? String(c.displayGroupId) : null;
    c.customGroups = Array.isArray(c.customGroups)
        ? c.customGroups.filter(g => g && String(g.name || "").trim() && Array.isArray(g.include) && g.include.length).map((g, i) => ({
            id: String(g.id || `cg${i + 1}`),
            name: String(g.name).trim(),
            include: [...new Set(g.include.map(String))],
            exclude: [...new Set((Array.isArray(g.exclude) ? g.exclude : []).map(String))]
        }))
        : [];
    c.includeOutside = c.includeOutside === true ? true : c.includeOutside === false ? false : null;
    // Profiles always carry exactly the tracked rules; missing entries inherit the default weight.
    const seenProfileGroups = new Set();
    c.profiles = Array.isArray(c.profiles)
        ? c.profiles.filter(p => p && p.groupId && !seenProfileGroups.has(String(p.groupId)) && seenProfileGroups.add(String(p.groupId))).map((p, i) => {
            const own = new Map((Array.isArray(p.rules) ? p.rules : []).filter(r => r && r.id).map(r => [String(r.id), r]));
            let rules = c.rules.map(r => {
                const o = own.get(r.id) || {};
                return { id: r.id, name: r.name, weight: num(o.weight, r.weight), maxRate: Math.max(0.01, num(o.maxRate, r.maxRate)) };
            });
            if (rules.length && Math.abs(weightTotal(rules) - 100) > 0.001) rules = normalizeWeights(rules);
            return { id: String(p.id || `p${i + 1}`), groupId: String(p.groupId), rules };
        })
        : [];
    c.version = 2;
    delete c.normalization;
    return c;
}

function num(v, d) {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
}
function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

/* ------------------------------ periods ------------------------------ */

/**
 * Calendar-aligned periods, oldest first, ending with the period that contains `endDate`
 * (which is therefore partial — "to date"). Completed periods never move as the days pass:
 *   day   → calendar days
 *   week  → weeks starting on `weekStart` (0 = Sunday, 1 = Monday)
 *   month → calendar months
 * Each period: { start, end, label, partial }. `end` of the current period is the end of today
 * so the fetch window is right; `partial` flags it for the UI.
 */
export function buildPeriods(endDate, period, n, weekStart = 1) {
    const now = new Date(endDate);
    now.setHours(23, 59, 59, 999);
    const out = [];
    let curStart = periodStart(now, period, weekStart);
    let curEnd = now.getTime();
    for (let i = 0; i < n; i++) {
        out.unshift({ start: curStart.getTime(), end: curEnd, label: periodLabelFor(curStart, period), partial: i === 0 });
        curEnd = curStart.getTime() - 1;
        curStart = periodStart(new Date(curEnd), period, weekStart);
    }
    return out;
}

function periodStart(d, period, weekStart) {
    const s = new Date(d);
    s.setHours(0, 0, 0, 0);
    if (period === "week") {
        const diff = (s.getDay() - weekStart + 7) % 7;
        s.setDate(s.getDate() - diff);
    } else if (period === "month") {
        s.setDate(1);
    }
    return s;
}

function periodLabelFor(start, period) {
    if (period === "month") return start.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
    return shortDate(start);
}

export function shortDate(d) {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

/**
 * Periods for an explicit date range (local days, inclusive): the selected range and, when
 * `withPrevious`, the equal-length range right before it (for the Change column).
 * Each period is flagged `custom` so labels read as dates rather than "week of".
 */
export function buildRangePeriods(from, to, withPrevious = true) {
    const start = new Date(from); start.setHours(0, 0, 0, 0);
    const end = new Date(to); end.setHours(23, 59, 59, 999);
    if (!(start.getTime() <= end.getTime())) return [];
    const days = Math.round((end.getTime() + 1 - start.getTime()) / DAY_MS);
    const label = (a, b) => (sameDay(a, b) ? fullDate(a) : `${fullDate(a)} – ${fullDate(b)}`);
    const sel = { start: start.getTime(), end: end.getTime(), label: label(start, end), partial: false, custom: true, days };
    if (!withPrevious) return [sel];
    const pEnd = new Date(start.getTime() - 1);
    const pStart = new Date(start); pStart.setDate(pStart.getDate() - days); pStart.setHours(0, 0, 0, 0);
    return [{ start: pStart.getTime(), end: pEnd.getTime(), label: label(pStart, pEnd), partial: false, custom: true, days }, sel];
}
function sameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function fullDate(d) {
    const opts = { month: "short", day: "numeric" };
    if (d.getFullYear() !== new Date().getFullYear()) opts.year = "numeric";
    return d.toLocaleDateString(undefined, opts);
}

/** Text for "which period am I looking at": "this week to date", "week of Oct 12", or a date range. */
export function focusLabel(periods, idx, config) {
    const p = periods[idx];
    if (!p) return "";
    if (p.custom) return p.label;
    if (idx === periods.length - 1 && p.partial) return `${currentPeriodLabel(config.period).toLowerCase()} to date`;
    return `${config.period === "day" ? "day" : config.period === "month" ? "month" : "week"} of ${p.label}`;
}
/** Axis label for the last bar. */
export function lastBarLabel(periods, config) {
    const p = periods[periods.length - 1];
    return p && p.custom ? p.label : `${currentPeriodLabel(config.period)} (to date)`;
}

/** "This week (to date)" style label for the partial current period. */
export function currentPeriodLabel(period) {
    return period === "day" ? "Today" : period === "month" ? "This month" : "This week";
}

/** Binary search: index of the period containing t, or -1. */
export function bucketIndex(periods, t) {
    let lo = 0, hi = periods.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const p = periods[mid];
        if (t < p.start) hi = mid - 1;
        else if (t > p.end) lo = mid + 1;
        else return mid;
    }
    return -1;
}

/* ------------------------------ weight profiles ------------------------------ */

export const DEFAULT_PROFILE = "default";

const profileCfgCache = new WeakMap();
/** The config to score with for a profile key (same settings, that profile's rule weights). */
export function configForProfile(config, key) {
    if (!key || key === DEFAULT_PROFILE || !(config.profiles || []).length) return config;
    let m = profileCfgCache.get(config);
    if (!m) { m = new Map(); profileCfgCache.set(config, m); }
    if (!m.has(key)) {
        const p = config.profiles.find(x => x.id === key);
        m.set(key, p ? { ...config, rules: p.rules, profiles: [] } : config);
    }
    return m.get(key);
}

/** Which profile a vehicle is scored with: the first profile whose group contains it. */
export function profileKeyFor(groupRefs, config, tree) {
    for (const p of config.profiles || []) {
        const sub = tree && tree.byId.has(p.groupId) ? tree.descendants(p.groupId) : new Set([p.groupId]);
        if ((groupRefs || []).some(g => sub.has(typeof g === "string" ? g : g && g.id))) return p.id;
    }
    return DEFAULT_PROFILE;
}

/** Parts of a series (per weight profile) that have distance in period i: [{ key, counts, km }]. */
function partsAt(series, i) {
    const out = [];
    for (const [key, part] of Object.entries(series.parts || {})) {
        const km = part.distanceKm[i] || 0;
        if (km > 0) out.push({ key, counts: part.counts[i] || {}, km });
    }
    return out;
}

/* ------------------------------ scoring ------------------------------ */

/** Exposure in the configured unit (miles or km) from km. */
export function exposureOf(distanceKm, config) {
    return config.unit === "km" ? distanceKm : distanceKm / KM_PER_MILE;
}

/** Events per 1,000 exposure units. */
export function rateFor(count, distanceKm, config) {
    const exp = exposureOf(distanceKm, config);
    return exp > 0 ? (count / exp) * 1000 : null;
}

/** 0–100 sub-score for one rule. */
export function subScoreFor(count, distanceKm, rule, config) {
    const rate = rateFor(count, distanceKm, config);
    if (rate == null) return null;
    return Math.max(0, 100 * (1 - rate / rule.maxRate));
}

/**
 * @param counts  { ruleId: count }
 * @param distanceKm  km driven in the period
 * @returns number|null  null when exposure is below config.minDistance
 */
export function scoreFor(counts, distanceKm, config) {
    if (!config.rules.length) return null;
    if (exposureOf(distanceKm, config) < Math.max(config.minDistance, 1e-9)) return null;
    return weightedScore(counts, distanceKm, config);
}

/** Σ subScore × weight for one set of weights — no minimum-distance check. */
function weightedScore(counts, distanceKm, config) {
    let total = 0;
    for (const r of config.rules) {
        const sub = subScoreFor(counts[r.id] || 0, distanceKm, r, config);
        total += (sub == null ? 0 : sub) * (r.weight / 100);
    }
    return Math.min(100, Math.max(0, total));
}

/** Weighted "unsafe points" — Σ events × weight; context only (rank-free magnitude). */
export function pointsFor(counts, config) {
    let pts = 0;
    for (const r of config.rules) pts += (counts[r.id] || 0) * r.weight;
    return pts;
}

export function bandFor(score, config) {
    if (score == null) return "Low exposure";
    if (score >= config.bands.low) return "Low";
    if (score >= config.bands.medium) return "Medium";
    return "High";
}

export function trendPct(current, previous) {
    if (current == null || previous == null) return null;
    if (previous === 0) return current === 0 ? 0 : null;
    return ((current - previous) / previous) * 100;
}

/** Absolute change in score points (0–100 scale) — more readable than % for scores. */
export function deltaPts(current, previous) {
    if (current == null || previous == null) return null;
    return current - previous;
}

export function median(values) {
    const v = values.filter(x => x != null && Number.isFinite(x)).sort((a, b) => a - b);
    if (!v.length) return null;
    const m = v.length >> 1;
    return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

export function toDisplayDistance(km, unit) {
    return unit === "km" ? km : km / KM_PER_MILE;
}

/* ------------------------------ aggregation ------------------------------ */

function emptyPart(nPeriods) {
    return { counts: Array.from({ length: nPeriods }, () => ({})), distanceKm: new Array(nPeriods).fill(0) };
}
function emptySeries(nPeriods) {
    return {
        counts: Array.from({ length: nPeriods }, () => ({})),
        distanceKm: new Array(nPeriods).fill(0),
        engineHours: new Array(nPeriods).fill(0),
        events: 0,
        parts: {}     // per weight profile: { [profileKey]: { counts[], distanceKm[] } }
    };
}
function partOf(series, key) {
    return series.parts[key] || (series.parts[key] = emptyPart(series.counts.length));
}

function addCount(series, idx, ruleId, key = DEFAULT_PROFILE) {
    series.counts[idx][ruleId] = (series.counts[idx][ruleId] || 0) + 1;
    const part = partOf(series, key);
    part.counts[idx][ruleId] = (part.counts[idx][ruleId] || 0) + 1;
    series.events++;
}
function addDistance(series, idx, km, key = DEFAULT_PROFILE) {
    series.distanceKm[idx] += km;
    partOf(series, key).distanceKm[idx] += km;
}

/**
 * Aggregate raw records into per-device / per-driver series.
 *
 * @param periods     from buildPeriods
 * @param config      normalized config
 * @param exceptions  [{ activeFrom: ISO|ms, device: {id}, driver?: {id}, rule: {id} }]
 * @param trips       [{ start: ISO|ms, device: {id}, driver?: {id}, distance: km }]
 * @param deviceIds   Set of device ids in scope (others are ignored)
 * @param engineHours optional [{ device:{id}, periodIndex, hours }]
 * @param profileOf   optional Map deviceId → weight-profile key (events and miles are filed under
 *                    the profile of the vehicle they happened on, for vehicles and drivers alike)
 */
export function aggregate({ periods, config, exceptions, trips, deviceIds, engineHours = [], profileOf }) {
    const keyOf = devId => (profileOf && profileOf.get(devId)) || DEFAULT_PROFILE;
    const n = periods.length;
    const ruleIds = new Set(config.rules.map(r => r.id));
    const byDevice = new Map();
    const byDriver = new Map();
    const get = (map, id) => {
        let s = map.get(id);
        if (!s) { s = emptySeries(n); map.set(id, s); }
        return s;
    };

    for (const e of exceptions) {
        const devId = e.device && e.device.id;
        const ruleId = e.rule && e.rule.id;
        if (!devId || !ruleId || !ruleIds.has(ruleId)) continue;
        if (deviceIds && !deviceIds.has(devId)) continue;
        const idx = bucketIndex(periods, toMs(e.activeFrom));
        if (idx < 0) continue;
        addCount(get(byDevice, devId), idx, ruleId, keyOf(devId));
        const drvId = e.driver && e.driver.id;
        if (drvId && drvId !== "UnknownDriverId" && drvId !== "NoDriverId") addCount(get(byDriver, drvId), idx, ruleId, keyOf(devId));
    }

    for (const t of trips) {
        const devId = t.device && t.device.id;
        if (!devId || (deviceIds && !deviceIds.has(devId))) continue;
        const idx = bucketIndex(periods, toMs(t.start));
        if (idx < 0) continue;
        const km = Number(t.distance) || 0;
        addDistance(get(byDevice, devId), idx, km, keyOf(devId));
        const drvId = t.driver && t.driver.id;
        if (drvId && drvId !== "UnknownDriverId" && drvId !== "NoDriverId") addDistance(get(byDriver, drvId), idx, km, keyOf(devId));
    }

    for (const eh of engineHours) {
        const devId = eh.device && eh.device.id;
        if (!devId || (deviceIds && !deviceIds.has(devId))) continue;
        if (eh.periodIndex >= 0 && eh.periodIndex < n) get(byDevice, devId).engineHours[eh.periodIndex] += Number(eh.hours) || 0;
    }

    // Ensure every in-scope device has a series (zero events still counts as a subject).
    if (deviceIds) for (const id of deviceIds) get(byDevice, id);

    return { byDevice, byDriver };
}

function toMs(v) {
    return typeof v === "number" ? v : Date.parse(v);
}

/** Sum several series into one (used for groups and the fleet total). */
export function sumSeries(seriesList, nPeriods) {
    const out = emptySeries(nPeriods);
    for (const s of seriesList) {
        for (let i = 0; i < nPeriods; i++) {
            out.distanceKm[i] += s.distanceKm[i];
            out.engineHours[i] += s.engineHours[i];
            for (const [ruleId, c] of Object.entries(s.counts[i])) out.counts[i][ruleId] = (out.counts[i][ruleId] || 0) + c;
        }
        for (const [key, part] of Object.entries(s.parts || {})) {
            const op = partOf(out, key);
            for (let i = 0; i < nPeriods; i++) {
                op.distanceKm[i] += part.distanceKm[i];
                for (const [ruleId, c] of Object.entries(part.counts[i])) op.counts[i][ruleId] = (op.counts[i][ruleId] || 0) + c;
            }
        }
        out.events += s.events;
    }
    return out;
}

/**
 * Score of a series in period i. With weight profiles, each profile's share of the series is
 * scored with its own weights and the results are averaged by distance driven — so a division
 * row uses that division's weights and a mixed total stays consistent with its parts.
 */
export function scoreAt(series, i, config) {
    const counts = series.counts[i] || {}, km = series.distanceKm[i] || 0;
    if (!(config.profiles || []).length || !series.parts) return scoreFor(counts, km, config);
    if (!config.rules.length) return null;
    if (exposureOf(km, config) < Math.max(config.minDistance, 1e-9)) return null;
    const parts = partsAt(series, i);
    if (!parts.length) return scoreFor(counts, km, config);
    let acc = 0, dist = 0;
    for (const p of parts) { acc += p.km * weightedScore(p.counts, p.km, configForProfile(config, p.key)); dist += p.km; }
    return Math.min(100, Math.max(0, acc / dist));
}

/** Per-period scores for a series. */
export function scoreSeries(series, config) {
    return series.counts.map((_, i) => scoreAt(series, i, config));
}

/** Profile keys that contribute distance to a series in period i (for "which weights apply" labels). */
export function profilesAt(series, i) {
    return partsAt(series, i).map(p => p.key);
}

/** Row summary for tables: score at period `idx` (default: latest), previous, trend, band, totals. */
export function summarize(series, config, idx) {
    const scores = scoreSeries(series, config);
    const n = scores.length;
    const i = idx == null ? n - 1 : Math.min(Math.max(idx, 0), n - 1);
    const current = scores[i];
    const previous = i > 0 ? scores[i - 1] : null;
    const currentCounts = series.counts[i] || {};
    return {
        scores,
        current,
        previous,
        trend: trendPct(current, previous),
        delta: deltaPts(current, previous),
        band: bandFor(current, config),
        currentEvents: Object.values(currentCounts).reduce((a, b) => a + b, 0),
        currentPoints: pointsFor(currentCounts, config),
        currentDistanceKm: series.distanceKm[i] || 0,
        totalEvents: series.events,
        totalDistanceKm: series.distanceKm.reduce((a, b) => a + b, 0),
        totalPoints: series.counts.reduce((a, c) => a + pointsFor(c, config), 0)
    };
}

/** Per-rule totals for the current vs previous period across a set of series. */
export function ruleBreakdown(series, config, idx) {
    const n = series.counts.length;
    const i = idx == null ? n - 1 : Math.min(Math.max(idx, 0), n - 1);
    const cur = series.counts[i] || {};
    const prev = i > 0 ? series.counts[i - 1] || {} : {};
    const curKm = series.distanceKm[i] || 0;
    const prevKm = i > 0 ? series.distanceKm[i - 1] || 0 : 0;
    // With weight profiles, each profile's share contributes its own weight and sub-score,
    // averaged by distance — so the impacts still add up to (100 − score).
    const parts = (config.profiles || []).length && series.parts ? partsAt(series, i) : [];
    const partKm = parts.reduce((a, p) => a + p.km, 0);
    const mixed = new Set(parts.map(p => p.key)).size > 1;
    return config.rules.map(r => {
        const c = cur[r.id] || 0, p = prev[r.id] || 0;
        let weight = r.weight, maxRate = r.maxRate, sub = subScoreFor(c, curKm, r, config), impact = sub == null ? 0 : (100 - sub) * (r.weight / 100);
        if (parts.length) {
            let w = 0, imp = 0;
            for (const part of parts) {
                const pr = configForProfile(config, part.key).rules.find(x => x.id === r.id) || r;
                const ps = subScoreFor(part.counts[r.id] || 0, part.km, pr, config);
                w += (part.km / partKm) * pr.weight;
                imp += (part.km / partKm) * (ps == null ? 0 : (100 - ps) * (pr.weight / 100));
                if (!mixed) maxRate = pr.maxRate;
            }
            weight = Math.round(w * 10) / 10;
            impact = imp;
            sub = w > 0 ? Math.max(0, 100 - (imp * 100) / w) : sub;
        }
        return {
            id: r.id, name: r.name, weight, maxRate, mixed,
            current: c, previous: p, trend: trendPct(c, p),
            rate: rateFor(c, curKm, config), previousRate: rateFor(p, prevKm, config),
            subScore: sub,
            // points lost from the 100 ceiling because of this rule (what the bar shows)
            impact,
            currentPoints: c * weight,
            perPeriod: series.counts.map(cc => cc[r.id] || 0),
            total: series.counts.reduce((a, cc) => a + (cc[r.id] || 0), 0)
        };
    }).sort((a, b) => b.impact - a.impact || b.current - a.current);
}

/* ------------------------------ groups ------------------------------ */

/**
 * Build hierarchy helpers from Geotab Group records ({id, name, children:[{id}], parent?}).
 * Returns { byId, parentOf, childrenOf, descendants(id) -> Set }.
 */
export function buildGroupTree(groups) {
    const byId = new Map();
    const parentOf = new Map();
    const childrenOf = new Map();
    for (const g of groups) {
        byId.set(g.id, g);
        const kids = (g.children || []).map(c => c.id);
        childrenOf.set(g.id, kids);
        for (const k of kids) parentOf.set(k, g.id);
    }
    const cache = new Map();
    function descendants(id) {
        if (cache.has(id)) return cache.get(id);
        const set = new Set([id]);
        const stack = [...(childrenOf.get(id) || [])];
        while (stack.length) {
            const x = stack.pop();
            if (set.has(x)) continue;
            set.add(x);
            for (const k of childrenOf.get(x) || []) stack.push(k);
        }
        cache.set(id, set);
        return set;
    }
    const roots = groups.filter(g => !parentOf.has(g.id)).map(g => g.id);
    return { byId, parentOf, childrenOf, descendants, roots };
}

export const ROOT_GROUP_ID = "GroupCompanyId";

/**
 * Roll device series up to the children of `nodeId`. Devices that belong to the
 * node directly (not via any child subtree) appear under a synthetic "Direct" row.
 */
export function groupRollup({ nodeId, tree, devices, byDevice, config, nPeriods, idx, childIds: childIdsIn }) {
    const node = tree.byId.get(nodeId);
    const childIds = childIdsIn || tree.childrenOf.get(nodeId) || [];
    const rows = [];
    const assigned = new Set();
    for (const cid of childIds) {
        const subtree = tree.descendants(cid);
        const members = devices.filter(d => (d.groups || []).some(g => subtree.has(g.id)));
        for (const m of members) assigned.add(m.id);
        const series = sumSeries(members.map(m => byDevice.get(m.id)).filter(Boolean), nPeriods);
        rows.push({
            id: cid, name: (tree.byId.get(cid) || {}).name || cid, kind: "group",
            vehicles: members.length, hasChildren: (tree.childrenOf.get(cid) || []).length > 0,
            series, ...summarize(series, config, idx)
        });
    }
    // Everything in scope that is not under any child: for the company root these are devices
    // directly in the company group; for a display group such as "Locations" they are the
    // vehicles not assigned to any location.
    const unassigned = devices.filter(d => !assigned.has(d.id));
    if (unassigned.length && childIds.length) {
        const series = sumSeries(unassigned.map(m => byDevice.get(m.id)).filter(Boolean), nPeriods);
        rows.push({
            id: `${nodeId}::unassigned`, name: "Unassigned vehicles", kind: "unassigned", vehicles: unassigned.length, hasChildren: false,
            deviceIds: unassigned.map(d => d.id), series, ...summarize(series, config, idx)
        });
    }
    void node;
    return rows.filter(r => r.vehicles > 0);
}

/** Devices in the subtree of nodeId. `wholeFleetIds` are nodes that scope to every device (root, display group). */
export function devicesUnder(nodeId, tree, devices, wholeFleetIds = []) {
    if (nodeId === ROOT_GROUP_ID || wholeFleetIds.includes(nodeId)) return devices;
    const subtree = tree.descendants(nodeId);
    return devices.filter(d => (d.groups || []).some(g => subtree.has(g.id)));
}

/* ------------------------------ scopes ------------------------------ */

export const CUSTOM_PREFIX = "custom:";

function unionDescendants(ids, tree) {
    const out = new Set();
    for (const id of ids || []) {
        if (tree.byId.has(id)) for (const x of tree.descendants(id)) out.add(x);
        else out.add(id);
    }
    return out;
}

/**
 * Turn a node id — a real group id or "custom:<id>" for a combined group — into a scope:
 *   { id, name, custom, wholeFleet, include:Set, exclude:Set, childIds:[], crumbs:[{id,name}] }
 * A vehicle/driver is in scope when one of its groups is in `include` and none is in `exclude`
 * (`wholeFleet` scopes match everything). Unknown ids fall back to `homeId`.
 */
export function resolveScope(nodeId, tree, config, homeId = ROOT_GROUP_ID) {
    const id = String(nodeId || homeId);
    if (id.startsWith(CUSTOM_PREFIX)) {
        const cg = (config.customGroups || []).find(g => CUSTOM_PREFIX + g.id === id);
        if (cg) {
            const inc = cg.include.filter(g => tree.byId.has(g));
            const exclude = unionDescendants(cg.exclude, tree);
            // One included parent → compare its children (minus excluded ones); several → compare them.
            const childIds = (inc.length === 1 ? (tree.childrenOf.get(inc[0]) || []) : inc).filter(c => !exclude.has(c));
            return {
                id, name: cg.name, custom: true, wholeFleet: false,
                include: unionDescendants(inc, tree), exclude, childIds,
                crumbs: [...breadcrumb(homeId, tree), { id, name: cg.name }]
            };
        }
        return resolveScope(homeId, tree, config, homeId);
    }
    if (!tree.byId.has(id)) return id === homeId ? resolveScope(ROOT_GROUP_ID, tree, config, ROOT_GROUP_ID) : resolveScope(homeId, tree, config, homeId);
    return {
        id, name: tree.byId.get(id).name, custom: false, wholeFleet: id === ROOT_GROUP_ID,
        include: tree.descendants(id), exclude: new Set(), childIds: tree.childrenOf.get(id) || [],
        crumbs: breadcrumb(id, tree)
    };
}

/** Does a subject with these group memberships fall in the scope? */
export function inScope(groupRefs, scope) {
    if (scope.wholeFleet) return true;
    let hit = false;
    for (const g of groupRefs || []) {
        const id = typeof g === "string" ? g : g && g.id;
        if (scope.exclude.has(id)) return false;
        if (scope.include.has(id)) hit = true;
    }
    return hit;
}

export function devicesInScope(scope, devices) {
    return scope.wholeFleet ? devices : devices.filter(d => inScope(d.groups, scope));
}

/**
 * Should vehicles outside the Report-by group be reported (as "Unassigned") at the home node?
 * Explicit setting wins; otherwise only when the group covers at least 75% of the fleet — i.e. it
 * is meant to hold everyone (Locations) rather than being one slice (a single division).
 */
export function shouldIncludeOutside(config, outsideCount, totalCount) {
    if (!outsideCount) return false;
    if (config.includeOutside === true) return true;
    if (config.includeOutside === false) return false;
    return totalCount > 0 && outsideCount <= totalCount * 0.25;
}

export function breadcrumb(nodeId, tree) {
    const out = [];
    let cur = nodeId;
    while (cur) {
        const g = tree.byId.get(cur);
        out.unshift({ id: cur, name: g ? g.name : cur });
        cur = tree.parentOf.get(cur);
    }
    return out;
}

/* ------------------------------ formatting ------------------------------ */

export function fmtScore(v) {
    if (v == null) return "—";
    return Math.round(v).toLocaleString();
}

export function fmtPct(v) {
    if (v == null) return "—";
    const r = Math.round(v);
    return `${r > 0 ? "+" : ""}${r}%`;
}

export function fmtDistance(km, unit, precise = false) {
    const d = toDisplayDistance(km, unit);
    const u = unit === "km" ? "km" : "mi";
    if (precise || d < 10) return `${d.toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: d < 10 ? 1 : 0 })} ${u}`;
    return `${Math.round(d).toLocaleString()} ${u}`;
}

export function scoreUnitLabel() {
    return "out of 100";
}

export function rateUnitLabel(config) {
    return config.unit === "km" ? "per 1,000 km" : "per 1,000 mi";
}

export function fmtRate(v) {
    if (v == null) return "—";
    return v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString();
}

export function fmtDelta(v) {
    if (v == null) return "—";
    const r = Math.round(v * 10) / 10;
    return `${r > 0 ? "+" : ""}${r.toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
}
