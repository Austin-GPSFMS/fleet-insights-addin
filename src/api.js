/**
 * MyGeotab API access — everything runs under the logged-in user's session, in
 * the browser. No server. Group scope is enforced by MyGeotab itself.
 */
import { ADDIN_ID, DEFAULT_CONFIG, normalizeConfig } from "./model.js";

const RESULTS_LIMIT = 50000;
const DAY_MS = 86400000;
const BATCH = 8;

export function call(api, method, params) {
    return new Promise((resolve, reject) => {
        try {
            api.call(method, params, resolve, err => reject(toError(err)));
        } catch (e) { reject(toError(e)); }
    });
}

export function multiCall(api, calls) {
    if (!calls.length) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        try {
            api.multiCall(calls, resolve, err => reject(toError(err)));
        } catch (e) { reject(toError(e)); }
    });
}

function toError(err) {
    if (err instanceof Error) return err;
    if (typeof err === "string") return new Error(err);
    const msg = (err && (err.message || (err.error && err.error.message))) || "Unknown MyGeotab API error";
    const e = new Error(msg);
    e.raw = err;
    return e;
}

export function friendlyError(e) {
    const m = (e && e.message) || String(e);
    if (/propertySelector/i.test(m)) return "This MyGeotab version rejected a field filter; retrying without it.";
    if (/InvalidUserException|session/i.test(m)) return "Your MyGeotab session has expired. Refresh the page and sign in again.";
    if (/not allowed|permission|clearance|access/i.test(m)) return "Your security clearance does not allow this request. " + m;
    return m;
}

/** Try with a propertySelector; on rejection retry the same call without it. */
async function getWithSelector(api, typeName, search, fields, extra = {}) {
    const base = { typeName, search, resultsLimit: RESULTS_LIMIT, ...extra };
    try {
        return await call(api, "Get", { ...base, propertySelector: { fields, isIncluded: true } });
    } catch (e) {
        if (/propertySelector|property/i.test(e.message)) return call(api, "Get", base);
        throw e;
    }
}

/* ------------------------------ reference data ------------------------------ */

export async function loadReferenceData(api, groupFilter) {
    const groups = groupFilter && groupFilter.length ? groupFilter.map(g => ({ id: g.id })) : undefined;
    const now = new Date().toISOString();
    const [devices, allGroups, rules, drivers] = await Promise.all([
        getWithSelector(api, "Device", { fromDate: now, ...(groups ? { groups } : {}) },
            ["id", "name", "groups", "serialNumber", "licensePlate", "vehicleIdentificationNumber", "deviceType"]),
        getWithSelector(api, "Group", {}, ["id", "name", "children", "color"]),
        getWithSelector(api, "Rule", {}, ["id", "name", "baseType", "comment"]),
        getWithSelector(api, "User", { isDriver: true }, ["id", "name", "firstName", "lastName", "groups"]).catch(() => [])
    ]);
    return {
        devices: devices.filter(d => d && d.id),
        groups: allGroups,
        rules: rules.filter(r => r && r.id && !/^Rule(Ignore|Count)/.test(r.id)).sort((a, b) => String(a.name).localeCompare(String(b.name))),
        drivers
    };
}

export function driverLabel(d) {
    if (!d) return "Unknown driver";
    const full = [d.firstName, d.lastName].filter(Boolean).join(" ").trim();
    return full || d.name || d.id;
}

/* ------------------------------ chunked fetch ------------------------------ */

/**
 * Fetch records over [from, to] in windows. Any window that hits the results
 * cap is split in half and refetched, so nothing is silently truncated.
 * `makeParams(fromIso, toIso)` returns the Get params for one window.
 */
async function fetchWindows(api, from, to, initialWindowMs, makeParams, onProgress) {
    const windows = [];
    for (let s = from; s <= to; s += initialWindowMs) windows.push([s, Math.min(s + initialWindowMs - 1, to)]);
    const out = [];
    let done = 0;
    const pending = windows.slice();
    const total = () => done + pending.length;
    while (pending.length) {
        const batch = pending.splice(0, BATCH);
        const results = await multiCall(api, batch.map(([s, e]) => ["Get", makeParams(new Date(s).toISOString(), new Date(e).toISOString())]));
        results.forEach((rows, i) => {
            const [s, e] = batch[i];
            if (rows.length >= RESULTS_LIMIT && e - s > DAY_MS / 4) {
                const mid = Math.floor((s + e) / 2);
                pending.push([s, mid], [mid + 1, e]);
            } else {
                for (const r of rows) out.push(r);
            }
        });
        done += batch.length;
        if (onProgress) onProgress(done, total());
    }
    return out;
}

/* ------------------------------ exceptions ------------------------------ */

export async function loadExceptions(api, { ruleIds, from, to, groupFilter, onProgress }) {
    if (!ruleIds.length) return [];
    const groups = groupFilter && groupFilter.length ? groupFilter.map(g => ({ id: g.id })) : undefined;
    const fields = ["id", "activeFrom", "activeTo", "device", "driver", "rule", "distance", "duration"];
    const spanMs = to - from;
    const out = [];
    let i = 0;
    for (const ruleId of ruleIds) {
        let useSelector = true, useGroups = !!groups;
        const make = (f, t) => {
            const search = { ruleSearch: { id: ruleId }, fromDate: f, toDate: t };
            if (useGroups) search.deviceSearch = { groups };
            const p = { typeName: "ExceptionEvent", search, resultsLimit: RESULTS_LIMIT };
            if (useSelector) p.propertySelector = { fields, isIncluded: true };
            return p;
        };
        const attempt = () => fetchWindows(api, from, to, spanMs, make, (d, t) => onProgress && onProgress(`Events ${i + 1}/${ruleIds.length}`, d, t));
        let rows;
        try { rows = await attempt(); }
        catch (e) {
            if (/propertySelector|property/i.test(e.message) && useSelector) { useSelector = false; rows = await attempt(); }
            else if (/deviceSearch|groups/i.test(e.message) && useGroups) { useGroups = false; rows = await attempt(); }
            else throw e;
        }
        for (const r of rows) out.push(r);
        i++;
    }
    return out;
}

/* ------------------------------ trips ------------------------------ */

export async function loadTrips(api, { from, to, groupFilter, deviceCount, onProgress }) {
    const groups = groupFilter && groupFilter.length ? groupFilter.map(g => ({ id: g.id })) : undefined;
    const fields = ["id", "start", "stop", "distance", "device", "driver"];
    // ~8 trips / vehicle / day; size windows so a window stays well under the cap.
    const perDay = Math.max(1, (deviceCount || 50) * 8);
    const windowDays = Math.max(1, Math.min(31, Math.floor((RESULTS_LIMIT * 0.6) / perDay)));
    let useSelector = true, useGroups = !!groups;
    const make = (f, t) => {
        const search = { fromDate: f, toDate: t };
        if (useGroups) search.deviceSearch = { groups };
        const p = { typeName: "Trip", search, resultsLimit: RESULTS_LIMIT };
        if (useSelector) p.propertySelector = { fields, isIncluded: true };
        return p;
    };
    const attempt = () => fetchWindows(api, from, to, windowDays * DAY_MS, make, (d, t) => onProgress && onProgress("Trips", d, t));
    try { return await attempt(); }
    catch (e) {
        if (/propertySelector|property/i.test(e.message) && useSelector) { useSelector = false; return attempt(); }
        if (/deviceSearch|groups/i.test(e.message) && useGroups) { useGroups = false; return attempt(); }
        throw e;
    }
}

/* ------------------------------ config persistence ------------------------------ */

const LS_KEY = "gpsfms.fleetInsights.config";

export async function loadConfig(api, database) {
    let fromServer = null, recordId = null, serverOk = true;
    try {
        const recs = await call(api, "Get", { typeName: "AddInData", search: { addInId: ADDIN_ID } });
        const rec = (recs || []).map(r => ({ ...r, details: parseDetails(r.details) })).find(r => r.details && r.details.type === "config");
        if (rec) { fromServer = rec.details.config; recordId = rec.id; }
    } catch (e) {
        serverOk = false;
    }
    let fromLocal = null;
    try { fromLocal = JSON.parse(localStorage.getItem(`${LS_KEY}.${database}`) || "null"); } catch (e) { /* ignore */ }
    const config = normalizeConfig(fromServer || fromLocal || DEFAULT_CONFIG);
    return { config, recordId, serverOk, source: fromServer ? "database" : fromLocal ? "browser" : "default" };
}

export async function saveConfig(api, database, config, recordId) {
    const clean = normalizeConfig(config);
    try { localStorage.setItem(`${LS_KEY}.${database}`, JSON.stringify(clean)); } catch (e) { /* ignore */ }
    const details = { type: "config", config: clean, savedAt: new Date().toISOString() };
    try {
        if (recordId) {
            await call(api, "Set", { typeName: "AddInData", entity: { id: recordId, addInId: ADDIN_ID, details } });
            return { recordId, persisted: "database" };
        }
        const id = await call(api, "Add", { typeName: "AddInData", entity: { addInId: ADDIN_ID, details, groups: [{ id: "GroupCompanyId" }] } });
        return { recordId: id, persisted: "database" };
    } catch (e) {
        return { recordId, persisted: "browser", error: friendlyError(e) };
    }
}

function parseDetails(d) {
    if (d == null) return null;
    if (typeof d === "string") { try { return JSON.parse(d); } catch (e) { return null; } }
    return d;
}

/* ------------------------------ dismissing exception events ------------------------------ */

let dismissStateProbe = null; // Promise<{id,name}|null>

/**
 * MyGeotab exposes `ExceptionEventState` as an entity type (Get/Set are rate-limited on it in
 * the API reference) and the Exceptions page's "Include dismissed events" option proves a
 * dismissed state exists server-side. We discover it at runtime instead of hard-coding an id:
 * Get ExceptionEventState → pick the one whose id/name says "dismiss". If this server has no
 * such state (older version) the caller falls back to a local hide list.
 */
export function findDismissState(api) {
    if (!dismissStateProbe) {
        dismissStateProbe = call(api, "Get", { typeName: "ExceptionEventState" })
            .then(states => (Array.isArray(states) ? states : []).find(s => /dismiss/i.test(String(s.id || "")) || /dismiss/i.test(String(s.name || ""))) || null)
            .catch(() => null);
    }
    return dismissStateProbe;
}

/**
 * Dismiss one exception event in MyGeotab. Resolves { mode: "api" } when the server accepted
 * the state change, or { mode: "local", reason } when the API path isn't available so the
 * caller should hide it locally instead. Throws only on an unexpected server error.
 */
export async function dismissException(api, event) {
    const state = await findDismissState(api);
    if (!state) return { mode: "local", reason: "This MyGeotab server does not expose a dismissed exception state." };
    const attempts = [
        { ...event, state: { id: state.id } },                 // full entity as we have it
        { id: event.id, state: { id: state.id } }              // minimal patch
    ];
    let lastErr = null;
    for (const entity of attempts) {
        try {
            await call(api, "Set", { typeName: "ExceptionEvent", entity });
            return { mode: "api", stateId: state.id };
        } catch (e) {
            lastErr = e;
            if (/not allowed|permission|clearance|security/i.test(e.message)) break; // no point retrying a 403-style refusal
        }
    }
    if (lastErr && /not allowed|permission|clearance|security/i.test(lastErr.message)) {
        return { mode: "local", reason: "Your security clearance does not allow dismissing exceptions in MyGeotab." };
    }
    throw lastErr || new Error("Dismiss failed");
}

/* ------------------------------ local hide list (fallback) ------------------------------ */

const HIDE_KEY = "gpsfms.fleetInsights.hidden";
const HIDE_CAP = 400;

export async function loadHidden(api, database) {
    let recordId = null, ids = [];
    try {
        const recs = await call(api, "Get", { typeName: "AddInData", search: { addInId: ADDIN_ID } });
        const rec = (recs || []).map(r => ({ ...r, details: parseDetails(r.details) })).find(r => r.details && r.details.type === "hidden");
        if (rec) { recordId = rec.id; ids = Array.isArray(rec.details.ids) ? rec.details.ids : []; }
    } catch (e) { /* fall through to local */ }
    if (!ids.length) {
        try { ids = JSON.parse(localStorage.getItem(`${HIDE_KEY}.${database}`) || "[]"); } catch (e) { ids = []; }
    }
    return { recordId, ids: ids.map(x => (typeof x === "string" ? { id: x, at: 0 } : x)) };
}

export async function saveHidden(api, database, entries, recordId) {
    const trimmed = [...entries].sort((a, b) => (b.at || 0) - (a.at || 0)).slice(0, HIDE_CAP);
    try { localStorage.setItem(`${HIDE_KEY}.${database}`, JSON.stringify(trimmed)); } catch (e) { /* ignore */ }
    const details = { type: "hidden", ids: trimmed, savedAt: new Date().toISOString() };
    try {
        if (recordId) {
            await call(api, "Set", { typeName: "AddInData", entity: { id: recordId, addInId: ADDIN_ID, details } });
            return { recordId, persisted: "database" };
        }
        const id = await call(api, "Add", { typeName: "AddInData", entity: { addInId: ADDIN_ID, details, groups: [{ id: "GroupCompanyId" }] } });
        return { recordId: id, persisted: "database" };
    } catch (e) {
        return { recordId, persisted: "browser", error: friendlyError(e) };
    }
}
