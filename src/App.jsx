import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import { Banner } from "@geotab/zenith/dist/banner/banner";
import { Waiting } from "@geotab/zenith/dist/waiting/waiting";
import { EmptyState } from "@geotab/zenith/dist/emptyState/emptyState";
import { buildPeriods, aggregate, buildGroupTree, ROOT_GROUP_ID, normalizeConfig } from "./model.js";
import { loadReferenceData, loadExceptions, loadTrips, loadConfig, saveConfig, friendlyError } from "./api.js";
import { Dashboard, periodLabel } from "./components/Dashboard.jsx";
import { Settings } from "./components/Settings.jsx";

export default function App({ api, groupFilter, focusNonce }) {
    const [session, setSession] = useState(null);
    const [config, setConfig] = useState(null);
    const [configMeta, setConfigMeta] = useState({ recordId: null, source: "default", serverOk: true });
    const [refData, setRefData] = useState(null);
    const [data, setData] = useState(null);
    const [view, setView] = useState("dashboard");
    const [nodeId, setNodeId] = useState(ROOT_GROUP_ID);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState("");
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveInfo, setSaveInfo] = useState(null);
    const [asOf, setAsOf] = useState(null);
    const runId = useRef(0);

    const groupKey = JSON.stringify((groupFilter || []).map(g => g.id).sort());

    /* ---- session + config + reference data ---- */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const sess = await new Promise(res => api.getSession(s => res(s)));
                if (cancelled) return;
                setSession(sess);
                const cfg = await loadConfig(api, sess.database);
                if (cancelled) return;
                setConfig(cfg.config);
                setConfigMeta({ recordId: cfg.recordId, source: cfg.source, serverOk: cfg.serverOk });
                if (!cfg.config.rules.length) setView("settings");
            } catch (e) {
                if (!cancelled) setError(friendlyError(e));
            }
        })();
        return () => { cancelled = true; };
    }, [api]);

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
                setNodeId(tree.byId.has(single) ? single : ROOT_GROUP_ID);
            } catch (e) {
                if (!cancelled) setError(friendlyError(e));
            } finally {
                if (!cancelled) setProgress("");
            }
        })();
        return () => { cancelled = true; };
    }, [api, groupKey, focusNonce]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ---- events + trips ---- */
    const periods = useMemo(() => config ? buildPeriods(new Date(), config.period, config.periods) : [], [config]);

    const refresh = useCallback(async () => {
        if (!config || !refData || !config.rules.length) return;
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
            const deviceIds = new Set(refData.devices.map(d => d.id));
            const agg = aggregate({ periods, config, exceptions, trips, deviceIds });
            setData({ ...agg, exceptions, trips });
            setAsOf(new Date());
        } catch (e) {
            if (runId.current === myRun) setError(friendlyError(e));
        } finally {
            if (runId.current === myRun) { setLoading(false); setProgress(""); }
        }
    }, [api, config, refData, periods, groupFilter]);

    const configKey = config ? JSON.stringify([config.rules.map(r => r.id), config.period, config.periods]) : "";
    useEffect(() => { refresh(); }, [configKey, refData]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        {config && <span>{config.periods} × {periodLabel(config)} · {rangeText}</span>}
                        {asOf && <span className="fi-muted"> · updated {asOf.toLocaleTimeString()}</span>}
                        {configMeta.source === "browser" && <span className="fi-muted"> · settings saved in this browser only</span>}
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
                <Settings config={config} rules={refData.rules} onSave={onSave} saving={saving} saveInfo={saveInfo}
                          onCancel={() => { if (config.rules.length) setView("dashboard"); }} />
            )}

            {config && refData && view === "dashboard" && (
                config.rules.length === 0
                    ? <EmptyState description="No rules are being tracked yet. Open Settings to choose the exception rules and their point values." />
                    : loading && !data
                        ? <Waiting isLoading description={progress || "Loading events and trips…"} />
                        : data
                            ? <>
                                {loading && <div className="fi-progress">{progress || "Refreshing…"}</div>}
                                <Dashboard config={config} periods={periods} refData={refData} data={data}
                                           nodeId={nodeId} setNodeId={setNodeId} session={session} />
                              </>
                            : null
            )}
        </div>
    );
}
