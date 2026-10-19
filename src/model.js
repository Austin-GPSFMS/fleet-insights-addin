/**
 * Pure scoring / aggregation model. No DOM, no Geotab API — unit-tested in Node.
 *
 * Score model (transparent on purpose — this is what GoAnalytics hides):
 *   score(subject, period) = Σ_rules count(rule) × points(rule)          ("unsafe points")
 *   normalization "per100mi"  → points ÷ miles × 100
 *   normalization "per1000km" → points ÷ km × 1000
 *   normalization "perEngineHour" → points ÷ engine hours   (requires engine-hours input)
 * Lower is better. Bands classify a subject's CURRENT-period score.
 */

export const ADDIN_ID = "an_qIKWbzyE09jcDpY-MtXw";

export const DEFAULT_CONFIG = Object.freeze({
    version: 1,
    rules: [],                 // [{ id, name, points }]
    period: "week",            // "day" | "week" | "month"
    periods: 8,                // number of trailing periods to show
    normalization: "none",     // "none" | "per100mi" | "per1000km" | "perEngineHour"
    unit: "miles",             // display unit for distance
    bands: { low: 10, medium: 30 } // score <= low → Low; <= medium → Medium; else High
});

export const PERIOD_DAYS = { day: 1, week: 7, month: 30 };
const KM_PER_MILE = 1.60934;
const DAY_MS = 86400000;

/** Sensible band thresholds per normalization (per-subject, per-period score). */
export function defaultBands(normalization) {
    switch (normalization) {
        case "per100mi": return { low: 2, medium: 5 };
        case "per1000km": return { low: 12, medium: 30 };
        case "perEngineHour": return { low: 0.5, medium: 1.5 };
        default: return { low: 10, medium: 30 };
    }
}

export function normalizeConfig(raw) {
    const c = { ...DEFAULT_CONFIG, ...(raw || {}) };
    c.rules = Array.isArray(c.rules)
        ? c.rules.filter(r => r && r.id).map(r => ({ id: String(r.id), name: String(r.name || r.id), points: num(r.points, 1) }))
        : [];
    if (!PERIOD_DAYS[c.period]) c.period = "week";
    c.periods = Math.min(Math.max(Math.round(num(c.periods, 8)), 2), 26);
    if (!["none", "per100mi", "per1000km", "perEngineHour"].includes(c.normalization)) c.normalization = "none";
    if (!["miles", "km"].includes(c.unit)) c.unit = "miles";
    const db = defaultBands(c.normalization);
    const rb = (raw && raw.bands) || {};
    c.bands = { low: num(rb.low, db.low), medium: num(rb.medium, db.medium) };
    if (c.bands.medium < c.bands.low) c.bands.medium = c.bands.low;
    return c;
}

function num(v, d) {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
}

/* ------------------------------ periods ------------------------------ */

/** Trailing windows ending at the end of `endDate` (local), oldest first. */
export function buildPeriods(endDate, period, n) {
    const days = PERIOD_DAYS[period] || 7;
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const out = [];
    let cursorEnd = end.getTime();
    for (let i = 0; i < n; i++) {
        const start = new Date(cursorEnd - days * DAY_MS + 1);
        start.setHours(0, 0, 0, 0);
        out.unshift({ start: start.getTime(), end: cursorEnd, label: shortDate(start) });
        cursorEnd = start.getTime() - 1;
    }
    return out;
}

export function shortDate(d) {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
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

export function pointsFor(counts, config) {
    let pts = 0;
    for (const r of config.rules) pts += (counts[r.id] || 0) * r.points;
    return pts;
}

/**
 * @param counts  { ruleId: count }
 * @param distanceKm  km driven in the period
 * @param engineHours engine hours in the period (optional)
 * @returns number|null  null when normalization needs exposure that is 0
 */
export function scoreFor(counts, distanceKm, config, engineHours = 0) {
    const pts = pointsFor(counts, config);
    switch (config.normalization) {
        case "per100mi": return distanceKm > 0 ? (pts / (distanceKm / KM_PER_MILE)) * 100 : (pts > 0 ? null : 0);
        case "per1000km": return distanceKm > 0 ? (pts / distanceKm) * 1000 : (pts > 0 ? null : 0);
        case "perEngineHour": return engineHours > 0 ? pts / engineHours : (pts > 0 ? null : 0);
        default: return pts;
    }
}

export function bandFor(score, config) {
    if (score == null) return "No exposure";
    if (score <= config.bands.low) return "Low";
    if (score <= config.bands.medium) return "Medium";
    return "High";
}

export function trendPct(current, previous) {
    if (current == null || previous == null) return null;
    if (previous === 0) return current === 0 ? 0 : null;
    return ((current - previous) / previous) * 100;
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

/** Row summary for tables: current score, previous, trend, band, totals. */
export function summarize(series, config) {
    const scores = scoreSeries(series, config);
    const n = scores.length;
    const current = scores[n - 1];
    const previous = n > 1 ? scores[n - 2] : null;
    const currentCounts = series.counts[n - 1];
    return {
        scores,
        current,
        previous,
        trend: trendPct(current, previous),
        band: bandFor(current, config),
        currentEvents: Object.values(currentCounts).reduce((a, b) => a + b, 0),
        currentPoints: pointsFor(currentCounts, config),
        currentDistanceKm: series.distanceKm[n - 1],
        totalEvents: series.events,
        totalDistanceKm: series.distanceKm.reduce((a, b) => a + b, 0),
        totalPoints: series.counts.reduce((a, c) => a + pointsFor(c, config), 0)
    };
}

/** Per-rule totals for the current vs previous period across a set of series. */
export function ruleBreakdown(series, config) {
    const n = series.counts.length;
    const cur = series.counts[n - 1] || {};
    const prev = n > 1 ? series.counts[n - 2] || {} : {};
    return config.rules.map(r => {
        const c = cur[r.id] || 0, p = prev[r.id] || 0;
        return {
            id: r.id, name: r.name, points: r.points,
            current: c, previous: p, trend: trendPct(c, p),
            currentPoints: c * r.points,
            perPeriod: series.counts.map(cc => cc[r.id] || 0),
            total: series.counts.reduce((a, cc) => a + (cc[r.id] || 0), 0)
        };
    }).sort((a, b) => b.currentPoints - a.currentPoints || b.current - a.current);
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
export function groupRollup({ nodeId, tree, devices, byDevice, config, nPeriods }) {
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
            series, ...summarize(series, config)
        });
    }
    const direct = devices.filter(d => !assigned.has(d.id) && (d.groups || []).some(g => g.id === nodeId));
    if (direct.length && childIds.length) {
        const series = sumSeries(direct.map(m => byDevice.get(m.id)).filter(Boolean), nPeriods);
        rows.push({ id: `${nodeId}::direct`, name: `${(node && node.name) || "Group"} (direct)`, kind: "direct", vehicles: direct.length, hasChildren: false, series, ...summarize(series, config) });
    }
    return rows.filter(r => r.vehicles > 0);
}

/** Devices in the subtree of nodeId. */
export function devicesUnder(nodeId, tree, devices) {
    if (nodeId === ROOT_GROUP_ID) return devices;
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
    if (Math.abs(v) >= 100) return Math.round(v).toLocaleString();
    return (Math.round(v * 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 1 });
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

export function scoreUnitLabel(config) {
    switch (config.normalization) {
        case "per100mi": return "points / 100 mi";
        case "per1000km": return "points / 1,000 km";
        case "perEngineHour": return "points / engine hr";
        default: return "points";
    }
}
