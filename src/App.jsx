import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import { Banner } from "@geotab/zenith/dist/banner/banner";
import { Waiting } from "@geotab/zenith/dist/waiting/waiting";
import { EmptyState } from "@geotab/zenith/dist/emptyState/emptyState";
import { buildPeriods, aggregate, buildGroupTree, scorableDevices, ROOT_GROUP_ID, normalizeConfig } from "./model.js";
import { loadReferenceData, loadExceptions, loadTrips, loadConfig, saveConfig, loadHidden, saveHidden, dismissException, friendlyError } from "./api.js";
import { Dashboard, periodLabel } from "./components/Dashboard.jsx";
import { Settings } from "./components/Settings.jsx";

export default function App({ api, groupFilter, focusNonce }) {
    const [session, setSession] = useState(null);
    const [config, setConfig] = useState(null);
    const [configMeta, setConfigMeta] = useState({ recordId: null, source: "default", serverOk: true });
    const [hidden, setHidden] = useState({ recordId: null, ids: [] });
    const [refData, setRefData] = useState(null);
    const [raw, setRaw] = useState(null);          // { exceptions, trips }
    const [view, setView] = useState("dashboard");
    const [nodeId, setNodeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState("");
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveInfo, setSaveInfo] = useState(null);
    const [asOf, setAsOf] = useState(null);
    const [toast, setToast] = useState(null);
    const runId = useRef(0);

    const notify = useCallback((text, tone = "info") => {
        setToast({ text, tone });
        setTimeout(() => setToast(t => (t && t.text === text ? null : t)), 5000);
    }, []);

    const groupKey = JSON.stringify((groupFilter || []).map(g => g.id).sort());

    /* ---- session + config + hidden list ---- */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const sess = await new Promise(res => api.getSession(s => res(s)));
                if (cancelled) return;
                setSession(sess);
                const [cfg, hid] = await Promise.all([loadConfig(api, sess.database), loadHidden(api, sess.database)]);
                if (cancelled) return;
                setConfig(cfg.config);
                setConfigMeta({ recordId: cfg.recordId, source: cfg.source, serverOk: cfg.serverOk });
                setHidden(hid);
                if (!cfg.config.rules.length) setView("settings");
            } catch (e) {
                if (!cancelled) setError(friendlyError(e));
            }
        })();
        return () => { cancelled = true; };
    }, [api]);

    /* ---- reference data (re-read when the group filter changes) ---- */
    useEffect(() => {
        let cancelled = false;
        setRefData(null);
        (async () => {
            try {
                setProgress("Loading vehicles, groups and rules…");
                const ref = await loadReferenceData(api, groupFilter);
                if (cancelled) return;
                const tree = buildGroupTree(ref.groups);
                setRefData({
                    ...ref, tree,
                    devicesById: new Map(ref.devices.map(d => [d.id, d])),
                    driversById: new Map(ref.drivers.map(d => [d.id, d]))
                });
                const single = groupFilter && groupFilter.length === 1 ? groupFilter[0].id : ROOT_GROUP_ID;
                setNodeId(single !== ROOT_GROUP_ID && tree.byId.has(single) ? single : null); // null → Dashboard picks the home node
            } catch (e) {
                if (!cancelled) setError(friendlyError(e));
            } finally {
                if (!cancelled) setProgress("");
            }
        })();
        return () => { cancelled = true; };
    }, [api, groupKey, focusNonce]); // eslint-disable-line react-hooks/exhaustive-deps

    const effConfig = config;

    /* ---- scorable devices (excluded types / groups removed) ---- */
    const scopedRef = useMemo(() => {
        if (!refData || !config) return null;
        const devices = scorableDevices(refData.devices, config, refData.tree);
        return { ...refData, devices, allDevices: refData.devices, devicesById: new Map(devices.map(d => [d.id, d])) };
    }, [refData, config]);

    /* ---- events + trips ---- */
    // Calendar-aligned: completed weeks/months never shift; only the last ("to date") period grows.
    const periods = useMemo(() => effConfig ? buildPeriods(new Date(), effConfig.period, effConfig.periods, effConfig.weekStart) : [], [effConfig]);

    const refresh = useCallback(async () => {
        if (!config || !refData || !config.rules.length || !periods.length) return;
        const myRun = ++runId.current;
        setLoading(true);
        setError(null);
        try {
            const from = periods[0].start, to = periods[periods.length - 1].end;
            const onProgress = (what, done, total) => { if (runId.current === myRun) setProgress(`${what}: ${done}/${total} windows`); };
            const [exceptions, trips] = await Promise.all([
                loadExceptions(api, { ruleIds: config.rules.map(r => r.id), from, to, groupFilter, onProgress }),
                loadTrips(api, { from, to, groupFilter, deviceCount: refData.devices.length, onProgress })
            ]);
            if (runId.current !== myRun) return;
            setRaw({ exceptions, trips });
            setAsOf(new Date());
        } catch (e) {
            if (runId.current === myRun) setError(friendlyError(e));
        } finally {
            if (runId.current === myRun) { setLoading(false); setProgress(""); }
        }
    }, [api, config, refData, periods, groupFilter]);

    const configKey = effConfig ? JSON.stringify([effConfig.rules.map(r => r.id), effConfig.period, effConfig.periods, periods.length ? periods[0].start : 0, periods.length ? periods[periods.length - 1].end : 0]) : "";
    useEffect(() => { refresh(); }, [configKey, refData]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ---- derived: aggregate (cheap; re-runs when weights, hidden list or raw data change) ---- */
    const data = useMemo(() => {
        if (!raw || !scopedRef || !effConfig) return null;
        const hiddenIds = new Set(hidden.ids.map(h => h.id));
        const exceptions = hiddenIds.size ? raw.exceptions.filter(e => !hiddenIds.has(e.id)) : raw.exceptions;
        const deviceIds = new Set(scopedRef.devices.map(d => d.id));
        const agg = aggregate({ periods, config: effConfig, exceptions, trips: raw.trips, deviceIds });
        return { ...agg, exceptions, trips: raw.trips };
    }, [raw, scopedRef, effConfig, periods, hidden]);

    /* ---- dismiss ---- */
    const onDismiss = useCallback(async event => {
        try {
            const r = await dismissException(api, event);
            if (r.mode === "api") {
                setRaw(prev => prev ? { ...prev, exceptions: prev.exceptions.filter(e => e.id !== event.id) } : prev);
                notify("Event dismissed in MyGeotab and removed from the score.");
            } else {
                const next = { ...hidden, ids: [{ id: event.id, at: Date.now() }, ...hidden.ids.filter(h => h.id !== event.id)] };
                const saved = await saveHidden(api, session.database, next.ids, hidden.recordId);
                setHidden({ recordId: saved.recordId, ids: next.ids });
                notify(`${r.reason} Hidden from Fleet Insights scoring only${saved.persisted === "browser" ? " (this browser)" : ""}.`, "warn");
            }
        } catch (e) {
            notify(`Could not dismiss: ${friendlyError(e)}`, "warn");
        }
    }, [api, hidden, session, notify]);

    const onClearHidden = useCallback(async () => {
        const saved = await saveHidden(api, session.database, [], hidden.recordId);
        setHidden({ recordId: saved.recordId, ids: [] });
        notify("All locally hidden events restored.");
    }, [api, session, hidden, notify]);

    /* ---- settings save ---- */
    const onSave = async clean => {
        setSaving(true);
        setSaveInfo(null);
        try {
            const r = await saveConfig(api, session.database, clean, configMeta.recordId);
            setConfig(normalizeConfig(clean));
            setConfigMeta(m => ({ ...m, recordId: r.recordId, source: r.persisted }));
            if (r.persisted === "browser") {
                setSaveInfo({ type: "warning", text: `Saved in this browser only — the database rejected the write (${r.error}). Users need the AddInData clearance for shared settings.` });
            } else {
                setView("dashboard");
            }
        } catch (e) {
            setSaveInfo({ type: "error", text: friendlyError(e) });
        } finally {
            setSaving(false);
        }
    };

    /* ---- render ---- */
    const rangeText = periods.length
        ? `${new Date(periods[0].start).toLocaleDateString()} – ${new Date(periods[periods.length - 1].end).toLocaleDateString()}`
        : "";

    return (
        <div className="fi-root">
            <header className="fi-header">
                <div>
                    <h2 className="fi-title">Fleet Insights <span className="fi-byline">by GPSFMS</span></h2>
                    <div className="fi-sub">
                        {effConfig && <span>{effConfig.periods} × {periodLabel(effConfig)} · {rangeText}</span>}
                        {asOf && <span className="fi-muted"> · updated {asOf.toLocaleTimeString()}</span>}
                        {configMeta.source === "browser" && <span className="fi-muted"> · settings saved in this browser only</span>}
                        {hidden.ids.length > 0 && <span className="fi-muted"> · {hidden.ids.length} event{hidden.ids.length === 1 ? "" : "s"} hidden locally</span>}
                    </div>
                </div>
                <div className="fi-actions">
                    {view === "dashboard" && <Button type="secondary" onClick={refresh} disabled={loading || !config || !config.rules.length}>Refresh</Button>}
                    {view === "dashboard"
                        ? <Button type="primary" onClick={() => { setSaveInfo(null); setView("settings"); }} disabled={!config || !refData}>Settings</Button>
                        : null}
                </div>
            </header>

            {error && <Banner type="error" header="Something went wrong" multiline onClose={() => setError(null)}>{error}</Banner>}
            {!configMeta.serverOk && view === "dashboard" && (
                <Banner type="info">Shared settings could not be read from the database; using {configMeta.source} settings.</Banner>
            )}

            {(!config || !refData) && !error && <Waiting isLoading description={progress || "Loading…"} />}

            {config && refData && view === "settings" && (
                <Settings config={config} rules={refData.rules} devices={refData.devices} groups={refData.groups} tree={refData.tree}
                          onSave={onSave} saving={saving} saveInfo={saveInfo}
                          hiddenCount={hidden.ids.length} onClearHidden={onClearHidden}
                          onCancel={() => { if (config.rules.length) setView("dashboard"); }} />
            )}

            {config && scopedRef && view === "dashboard" && (
                config.rules.length === 0
                    ? <EmptyState description="No rules are being tracked yet. Open Settings to choose the exception rules and their weights." />
                    : loading && !data
                        ? <Waiting isLoading description={progress || "Loading events and trips…"} />
                        : data
                            ? <>
                                {loading && <div className="fi-progress">{progress || "Refreshing…"}</div>}
                                <Dashboard config={effConfig} periods={periods} refData={scopedRef} data={data}
                                           nodeId={nodeId} setNodeId={setNodeId} session={session} onDismiss={onDismiss} notify={notify} />
                              </>
                            : null
            )}

            {toast && <div className={`fi-toast ${toast.tone === "warn" ? "fi-toast--warn" : ""}`} role="status">{toast.text}</div>}
        </div>
    );
}

