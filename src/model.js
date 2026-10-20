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
    displayGroupId: null       // parent group whose children label each driver/vehicle (e.g. "Locations"); null = show all groups
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

function emptySeries(nPeriods) {
    return {
        counts: Array.from({ length: nPeriods }, () => ({})),
        distanceKm: new Array(nPeriods).fill(0),
        engineHours: new Array(nPeriods).fill(0),
        events: 0
    };
}

function addCount(series, idx, ruleId) {
    series.counts[idx][ruleId] = (series.counts[idx][ruleId] || 0) + 1;
    series.events++;
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
 */
export function aggregate({ periods, config, exceptions, trips, deviceIds, engineHours = [] }) {
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
        addCount(get(byDevice, devId), idx, ruleId);
        const drvId = e.driver && e.driver.id;
        if (drvId && drvId !== "UnknownDriverId" && drvId !== "NoDriverId") addCount(get(byDriver, drvId), idx, ruleId);
    }

    for (const t of trips) {
        const devId = t.device && t.device.id;
        if (!devId || (deviceIds && !deviceIds.has(devId))) continue;
        const idx = bucketIndex(periods, toMs(t.start));
        if (idx < 0) continue;
        const km = Number(t.distance) || 0;
        get(byDevice, devId).distanceKm[idx] += km;
        const drvId = t.driver && t.driver.id;
        if (drvId && drvId !== "UnknownDriverId" && drvId !== "NoDriverId") get(byDriver, drvId).distanceKm[idx] += km;
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
        out.events += s.events;
    }
    return out;
}

/** Per-period scores for a series. */
export function scoreSeries(series, config) {
    return series.counts.map((counts, i) => scoreFor(counts, series.distanceKm[i], config, series.engineHours[i]));
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
    return config.rules.map(r => {
        const c = cur[r.id] || 0, p = prev[r.id] || 0;
        const sub = subScoreFor(c, curKm, r, config);
        return {
            id: r.id, name: r.name, weight: r.weight, maxRate: r.maxRate,
            current: c, previous: p, trend: trendPct(c, p),
            rate: rateFor(c, curKm, config), previousRate: rateFor(p, prevKm, config),
            subScore: sub,
            // points lost from the 100 ceiling because of this rule (what the bar shows)
            impact: sub == null ? 0 : (100 - sub) * (r.weight / 100),
            currentPoints: c * r.weight,
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
export function groupRollup({ nodeId, tree, devices, byDevice, config, nPeriods, idx }) {
    const node = tree.byId.get(nodeId);
    const childIds = tree.childrenOf.get(nodeId) || [];
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
