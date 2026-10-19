import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import {
    sumSeries, summarize, scoreSeries, ruleBreakdown, groupRollup, devicesUnder, breadcrumb, median,
    fmtScore, fmtDelta, fmtDistance, fmtRate, rateUnitLabel, scoreUnitLabel, bandFor, currentPeriodLabel, ROOT_GROUP_ID
} from "../model.js";
import { driverLabel } from "../api.js";
import { exportScorecardExcel, exportScorecardPdf } from "../export.js";
import { BarTrend, Sparkline, HBar, Trend, BandPill } from "./Charts.jsx";
import { SortableTable, toCsv, downloadText } from "./Table.jsx";
import { Detail } from "./Detail.jsx";

export function Dashboard({ config, periods, refData, data, nodeId, setNodeId, session, onDismiss, notify }) {
    const [tab, setTab] = useState("groups");
    const [detail, setDetail] = useState(null); // { kind: "vehicle"|"driver", id }
    const n = periods.length;
    // Which period the KPIs / tables / rule list describe. Default: the current (to-date) period;
    // click a bar in the trend to focus a completed one — same gesture as the drawer.
    const [focusIdx, setFocusIdx] = useState(n - 1);
    useEffect(() => { setFocusIdx(n - 1); }, [n, config.period]);
    const isCurrent = focusIdx === n - 1;
    const focus = periods[focusIdx] || periods[n - 1];
    const labels = periods.map(p => p.label);
    const curLabel = currentPeriodLabel(config.period);
    const focusText = isCurrent ? `${curLabel.toLowerCase()} to date` : `${periodLabel(config)} of ${focus.label}`;

    const scopeDevices = useMemo(() => devicesUnder(nodeId, refData.tree, refData.devices), [nodeId, refData]);
    const scopeIds = useMemo(() => new Set(scopeDevices.map(d => d.id)), [scopeDevices]);

    const fleetSeries = useMemo(
        () => sumSeries(scopeDevices.map(d => data.byDevice.get(d.id)).filter(Boolean), n),
        [scopeDevices, data, n]
    );
    const fleet = useMemo(() => summarize(fleetSeries, config, focusIdx), [fleetSeries, config, focusIdx]);
    const rules = useMemo(() => ruleBreakdown(fleetSeries, config, focusIdx), [fleetSeries, config, focusIdx]);

    const groupNameOf = useMemo(() => {
        const m = new Map();
        for (const d of refData.devices) {
            const g = (d.groups || []).map(x => refData.tree.byId.get(x.id)).filter(Boolean).map(x => x.name);
            m.set(d.id, g.join(", "));
        }
        return m;
    }, [refData]);

    const vehicleRows = useMemo(() => scopeDevices.map(d => {
        const s = data.byDevice.get(d.id);
        return { id: d.id, name: d.name || d.serialNumber || d.id, second: groupNameOf.get(d.id) || "", kind: "vehicle", series: s, ...summarize(s, config, focusIdx) };
    }), [scopeDevices, data, config, groupNameOf, focusIdx]);

    const vehicleMedian = useMemo(() => median(vehicleRows.map(r => r.current)), [vehicleRows]);
    const prevVehicleMedian = useMemo(() => median(vehicleRows.map(r => r.previous)), [vehicleRows]);

    const groupRows = useMemo(
        () => groupRollup({ nodeId, tree: refData.tree, devices: scopeDevices, byDevice: data.byDevice, config, nPeriods: n, idx: focusIdx }),
        [nodeId, refData, scopeDevices, data, config, n, focusIdx]
    );

    // Drivers seen on in-scope vehicles; "current vehicle" = device of their most recent trip.
    const driverRows = useMemo(() => {
        const seen = new Set();
        const lastTrip = new Map();
        for (const e of data.exceptions) if (e.driver && scopeIds.has(e.device && e.device.id)) seen.add(e.driver.id);
        for (const t of data.trips) {
            if (!t.driver || !scopeIds.has(t.device && t.device.id)) continue;
            seen.add(t.driver.id);
            const ts = Date.parse(t.start);
            const prev = lastTrip.get(t.driver.id);
            if (!prev || ts > prev.ts) lastTrip.set(t.driver.id, { ts, deviceId: t.device.id });
        }
        const rows = [];
        for (const id of seen) {
            const s = data.byDriver.get(id);
            if (!s) continue;
            const lt = lastTrip.get(id);
            const dev = lt ? refData.devicesById.get(lt.deviceId) : null;
            rows.push({ id, name: driverLabel(refData.driversById.get(id)) || id, second: dev ? dev.name : "", kind: "driver", series: s, ...summarize(s, config, focusIdx) });
        }
        return rows;
    }, [data, scopeIds, refData, config, focusIdx]);

    const crumbs = useMemo(() => breadcrumb(nodeId, refData.tree), [nodeId, refData]);
    const scopeName = crumbs[crumbs.length - 1].name;

    const activeRows = tab === "groups" ? groupRows : tab === "vehicles" ? vehicleRows : driverRows;
    const columns = useMemo(() => [
        { key: "name", label: tab === "groups" ? "Group" : tab === "vehicles" ? "Vehicle" : "Driver", sort: r => r.name, render: r => (
            <span className={r.kind === "group" ? "fi-link" : ""}>{r.name}{r.kind === "group" && r.vehicles != null ? <span className="fi-muted"> · {r.vehicles} veh</span> : null}
                {r.kind === "driver" && r.second ? <span className="fi-muted"> · {r.second}</span> : null}</span>
        ) },
        { key: "current", label: "Score / 100", sort: r => r.current, width: "24%", render: r => (
            <HBar value={r.current} max={100} label={fmtScore(r.current)} tone={toneFor(r.band)} />
        ) },
        { key: "delta", label: "Change", sort: r => r.delta, align: "right", csv: r => fmtDelta(r.delta), render: r => <Trend delta={r.delta} goodWhen="up" /> },
        { key: "currentEvents", label: "Events", sort: r => r.currentEvents, align: "right", render: r => r.currentEvents.toLocaleString() },
        { key: "currentDistanceKm", label: "Distance", sort: r => r.currentDistanceKm, align: "right", csv: r => Math.round(r.currentDistanceKm), render: r => fmtDistance(r.currentDistanceKm, config.unit) },
        { key: "band", label: "Risk", sort: r => ({ High: 0, Medium: 1, Low: 2 }[r.band] ?? 3), render: r => <BandPill band={r.band} /> },
        { key: "spark", label: `Last ${n}`, sort: r => r.current, csv: r => r.scores.map(fmtScore).join(" | "), render: r => <Sparkline values={r.scores.map(v => (v == null ? 0 : v))} /> }
    ], [tab, config.unit, n]);

    const onRow = row => {
        if (row.kind === "group") setNodeId(row.id);
        else if (row.kind === "direct") setTab("vehicles");
        else setDetail({ kind: row.kind, id: row.id });
    };

    const rangeText = `${new Date(focus.start).toLocaleDateString()} – ${new Date(focus.end).toLocaleDateString()}${isCurrent ? ` (${curLabel.toLowerCase()} to date)` : ""}`;
    const exportOpts = () => ({
        rows: activeRows, config, kind: tab, database: session ? session.database : "", periodIdx: focusIdx,
        scopeName, rangeText,
        subjectLabel: tab === "groups" ? "Group" : tab === "vehicles" ? "Vehicle" : "Driver",
        secondLabel: tab === "drivers" ? "Current Vehicle" : tab === "vehicles" ? "Groups" : "Vehicles"
    });
    const doExport = async kind => {
        try {
            if (kind === "excel") await exportScorecardExcel(exportOpts());
            else if (kind === "pdf") exportScorecardPdf(exportOpts());
            else downloadText(`fleet-insights_${tab}_${new Date().toISOString().slice(0, 10)}.csv`,
                toCsv(columns.filter(c => c.key !== "spark").concat([{ key: "spark", label: "Scores (oldest→current)", csv: r => r.scores.map(fmtScore).join(" | ") }]), activeRows));
        } catch (e) {
            notify && notify(e.message || String(e), "warn");
        }
    };

    const maxImpact = Math.max(0, ...rules.map(r => r.impact));

    return (
        <div className="fi-dash">
            <section className="fi-kpis">
                <Kpi title={`${scopeName} score — ${focusText}`} value={fmtScore(fleet.current)} sub={`${scoreUnitLabel()} · vs the ${periodLabel(config)} before`}
                     trend={<Trend delta={fleet.delta} goodWhen="up" />} badge={<BandPill band={bandFor(fleet.current, config)} />} />
                <Kpi title="Median vehicle score" value={fmtScore(vehicleMedian)} sub={`${vehicleRows.filter(r => r.current != null).length.toLocaleString()} of ${vehicleRows.length.toLocaleString()} vehicles scored`}
                     trend={<Trend delta={vehicleMedian != null && prevVehicleMedian != null ? vehicleMedian - prevVehicleMedian : null} goodWhen="up" />} />
                <Kpi title={`Events — ${focusText}`} value={fleet.currentEvents.toLocaleString()} sub={`${fmtRate(fleet.currentEvents / Math.max(1e-9, exposure(fleet.currentDistanceKm, config)) * 1000)} ${rateUnitLabel(config)}`}
                     trend={<Trend pct={pct(fleet.currentEvents, Object.values(fleetSeries.counts[focusIdx - 1] || {}).reduce((a, b) => a + b, 0))} goodWhen="down" />} />
                <Kpi title={`Distance — ${focusText}`} value={fmtDistance(fleet.currentDistanceKm, config.unit)} sub={`scoring period: ${periodLabel(config)}`}
                     trend={<Trend pct={pct(fleet.currentDistanceKm, fleetSeries.distanceKm[focusIdx - 1])} goodWhen="up" />} />
            </section>

            <section className="fi-card">
                <header className="fi-card-head">
                    <div>
                        <h3>Score trend</h3>
                        <p className="fi-muted">Safety score out of 100 per {periodLabel(config)}, last {n} periods ({config.period === "week" ? `weeks start ${config.weekStart === 0 ? "Sunday" : "Monday"}` : config.period === "month" ? "calendar months" : "calendar days"}). The last bar is {curLabel.toLowerCase()} so far; completed periods don't change. Click a bar to focus the figures below on that period.</p>
                    </div>
                    <div className="fi-actions">
                        {isCurrent
                            ? (n > 1 && <Button type="tertiary" onClick={() => setFocusIdx(n - 2)}>Show last full {periodLabel(config)}</Button>)
                            : <Button type="tertiary" onClick={() => setFocusIdx(n - 1)}>Back to {curLabel.toLowerCase()} (to date)</Button>}
                    </div>
                </header>
                <BarTrend values={scoreSeries(fleetSeries, config)} labels={labels} unitLabel="/ 100" height={200} max={100} bands={config.bands} colorByBand currentLabel={`${curLabel} (to date)`}
                          onSelect={setFocusIdx} selected={focusIdx} />
            </section>

            <div className="fi-grid-2">
                <section className="fi-card">
                    <header className="fi-card-head">
                        <div>
                            <h3>Performance <span className="fi-muted fi-h3sub">— {focusText}</span></h3>
                            <nav className="fi-crumbs" aria-label="Group path">
                                {crumbs.map((c, i) => (
                                    <span key={c.id}>
                                        {i > 0 && <span className="fi-crumb-sep">/</span>}
                                        {i < crumbs.length - 1
                                            ? <button className="fi-crumb" onClick={() => setNodeId(c.id)}>{c.name}</button>
                                            : <span className="fi-crumb fi-crumb--current">{c.name}</span>}
                                    </span>
                                ))}
                                {nodeId !== ROOT_GROUP_ID && <button className="fi-crumb fi-crumb--reset" onClick={() => setNodeId(ROOT_GROUP_ID)}>Reset</button>}
                            </nav>
                        </div>
                        <div className="fi-actions">
                            <div className="fi-tabs" role="tablist">
                                {[["groups", `Groups (${groupRows.length})`], ["vehicles", `Vehicles (${vehicleRows.length})`], ["drivers", `Drivers (${driverRows.length})`]].map(([k, l]) => (
                                    <button key={k} role="tab" aria-selected={tab === k} className={`fi-tab ${tab === k ? "fi-tab--on" : ""}`} onClick={() => setTab(k)}>{l}</button>
                                ))}
                            </div>
                            <ExportMenu onPick={doExport} />
                        </div>
                    </header>
                    <div className="fi-perf">
                        <SortableTable columns={columns} rows={activeRows} defaultSort="current" defaultDir="asc" onRowClick={onRow}
                                       emptyText={tab === "groups" ? "No child groups here — switch to Vehicles." : "Nothing in scope for this period."} />
                    </div>
                </section>

                <section className="fi-card">
                    <header className="fi-card-head">
                        <div>
                            <h3>Event performance <span className="fi-muted fi-h3sub">— {focusText}</span></h3>
                            <p className="fi-muted">Bar = score points lost to this rule; counts vs the {periodLabel(config)} before.</p>
                        </div>
                    </header>
                    <table className="fi-table fi-table--compact">
                        <thead><tr><th>Rule</th><th style={{ width: "36%" }}>Score impact</th><th className="fi-right">Events</th><th className="fi-right">Rate</th><th className="fi-right">Trend</th></tr></thead>
                        <tbody>
                            {rules.map(r => (
                                <tr key={r.id}>
                                    <td>{r.name}<span className="fi-muted"> · {r.weight}%</span></td>
                                    <td><HBar value={r.impact} max={maxImpact} label={r.impact < 0.05 ? "0" : `−${fmtDelta(r.impact).replace("+", "")}`} tone={ruleTone(r.impact, maxImpact)} /></td>
                                    <td className="fi-right">{r.current.toLocaleString()}<span className="fi-muted"> / {r.previous.toLocaleString()}</span></td>
                                    <td className="fi-right" title={rateUnitLabel(config)}>{fmtRate(r.rate)}</td>
                                    <td className="fi-right"><Trend pct={r.trend} goodWhen="down" /></td>
                                </tr>
                            ))}
                            {rules.length === 0 && <tr><td colSpan={5} className="fi-empty">No rules tracked yet — open Settings.</td></tr>}
                        </tbody>
                    </table>
                </section>
            </div>

            {detail && (
                <Detail kind={detail.kind} id={detail.id} config={config} periods={periods} data={data} refData={refData} initialPeriodIdx={focusIdx}
                        session={session} onClose={() => setDetail(null)} onDismiss={onDismiss} />
            )}
        </div>
    );
}

function ExportMenu({ onPick }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (!open) return;
        const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);
    return (
        <div className="fi-menu" ref={ref}>
            <Button type="secondary" onClick={() => setOpen(v => !v)}>Export ▾</Button>
            {open && (
                <div className="fi-menu-list" role="menu">
                    <button className="fi-menu-item" role="menuitem" onClick={() => { setOpen(false); onPick("excel"); }}>Excel scorecard (.xlsx)</button>
                    <button className="fi-menu-item" role="menuitem" onClick={() => { setOpen(false); onPick("pdf"); }}>PDF scorecard (print)</button>
                    <button className="fi-menu-item" role="menuitem" onClick={() => { setOpen(false); onPick("csv"); }}>CSV (this table)</button>
                </div>
            )}
        </div>
    );
}

function Kpi({ title, value, sub, trend, badge }) {
    return (
        <div className="fi-kpi">
            <div className="fi-kpi-title">{title}</div>
            <div className="fi-kpi-value">{value}{badge ? <span className="fi-kpi-badge">{badge}</span> : null}</div>
            <div className="fi-kpi-foot"><span className="fi-muted">{sub}</span>{trend}</div>
        </div>
    );
}

function pct(a, b) {
    if (a == null || b == null) return null;
    if (b === 0) return a === 0 ? 0 : null;
    return ((a - b) / b) * 100;
}
function exposure(km, config) { return config.unit === "km" ? km : km / 1.60934; }

export function periodLabel(config) {
    return config.period === "day" ? "day" : config.period === "month" ? "month" : "week";
}

function toneFor(band) {
    return band === "Low" ? "ok" : band === "Medium" ? "warn" : band === "High" ? "bad" : "neutral";
}

function ruleTone(v, max) {
    if (!max || v <= 0) return "neutral";
    const r = v / max;
    return r >= 0.66 ? "bad" : r >= 0.33 ? "warn" : "ok";
}
