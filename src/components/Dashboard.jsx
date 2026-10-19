import { useMemo, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import {
    sumSeries, summarize, scoreSeries, ruleBreakdown, groupRollup, devicesUnder, breadcrumb, median,
    fmtScore, fmtPct, fmtDistance, scoreUnitLabel, bandFor, ROOT_GROUP_ID
} from "../model.js";
import { driverLabel } from "../api.js";
import { BarTrend, Sparkline, HBar, Trend, BandPill } from "./Charts.jsx";
import { SortableTable, toCsv, downloadText } from "./Table.jsx";
import { Detail } from "./Detail.jsx";

export function Dashboard({ config, periods, refData, data, nodeId, setNodeId, session }) {
    const [tab, setTab] = useState("groups");
    const [detail, setDetail] = useState(null); // { kind: "vehicle"|"driver", id }
    const n = periods.length;
    const unitLabel = scoreUnitLabel(config);
    const labels = periods.map(p => p.label);

    const scopeDevices = useMemo(() => devicesUnder(nodeId, refData.tree, refData.devices), [nodeId, refData]);
    const scopeIds = useMemo(() => new Set(scopeDevices.map(d => d.id)), [scopeDevices]);

    const fleetSeries = useMemo(
        () => sumSeries(scopeDevices.map(d => data.byDevice.get(d.id)).filter(Boolean), n),
        [scopeDevices, data, n]
    );
    const fleet = useMemo(() => summarize(fleetSeries, config), [fleetSeries, config]);
    const rules = useMemo(() => ruleBreakdown(fleetSeries, config), [fleetSeries, config]);

    const vehicleRows = useMemo(() => scopeDevices.map(d => {
        const s = data.byDevice.get(d.id);
        return { id: d.id, name: d.name || d.serialNumber || d.id, kind: "vehicle", series: s, ...summarize(s, config) };
    }), [scopeDevices, data, config]);

    const vehicleMedian = useMemo(() => median(vehicleRows.map(r => r.current)), [vehicleRows]);
    const prevVehicleMedian = useMemo(() => median(vehicleRows.map(r => r.previous)), [vehicleRows]);

    const groupRows = useMemo(
        () => groupRollup({ nodeId, tree: refData.tree, devices: scopeDevices, byDevice: data.byDevice, config, nPeriods: n }),
        [nodeId, refData, scopeDevices, data, config, n]
    );

    const driverRows = useMemo(() => {
        // Drivers who had events or trips on in-scope vehicles. The aggregate is fleet-wide per
        // driver; we approximate scope by keeping drivers that appear on in-scope exceptions/trips.
        const seen = new Set();
        for (const e of data.exceptions) if (e.driver && scopeIds.has(e.device && e.device.id)) seen.add(e.driver.id);
        for (const t of data.trips) if (t.driver && scopeIds.has(t.device && t.device.id)) seen.add(t.driver.id);
        const rows = [];
        for (const id of seen) {
            const s = data.byDriver.get(id);
            if (!s) continue;
            rows.push({ id, name: driverLabel(refData.driversById.get(id)) || id, kind: "driver", series: s, ...summarize(s, config) });
        }
        return rows;
    }, [data, scopeIds, refData, config]);

    const crumbs = useMemo(() => breadcrumb(nodeId, refData.tree), [nodeId, refData]);

    const activeRows = tab === "groups" ? groupRows : tab === "vehicles" ? vehicleRows : driverRows;
    const maxScore = Math.max(0, ...activeRows.map(r => r.current || 0));
    const columns = useMemo(() => [
        { key: "name", label: tab === "groups" ? "Group" : tab === "vehicles" ? "Vehicle" : "Driver", sort: r => r.name, render: r => (
            <span className={r.kind === "group" ? "fi-link" : ""}>{r.name}{r.kind === "group" && r.vehicles != null ? <span className="fi-muted"> · {r.vehicles} veh</span> : null}</span>
        ) },
        { key: "current", label: `Score (${unitLabel})`, sort: r => r.current, width: "26%", render: r => (
            <HBar value={r.current} max={maxScore} label={fmtScore(r.current)} tone={toneFor(r.band)} />
        ) },
        { key: "trend", label: "Trend", sort: r => r.trend, align: "right", render: r => <Trend pct={r.trend} /> },
        { key: "currentEvents", label: "Events", sort: r => r.currentEvents, align: "right", render: r => r.currentEvents.toLocaleString() },
        { key: "currentDistanceKm", label: "Distance", sort: r => r.currentDistanceKm, align: "right", csv: r => Math.round(r.currentDistanceKm), render: r => fmtDistance(r.currentDistanceKm, config.unit) },
        { key: "band", label: "Risk", sort: r => ({ Low: 0, Medium: 1, High: 2 }[r.band] ?? 3), render: r => <BandPill band={r.band} /> },
        { key: "spark", label: `Last ${n}`, sort: r => r.totalPoints, csv: r => r.scores.map(fmtScore).join(" | "), render: r => <Sparkline values={r.scores} /> }
    ], [tab, unitLabel, maxScore, config.unit, n]);

    const onRow = row => {
        if (row.kind === "group") setNodeId(row.id);
        else if (row.kind === "direct") setTab("vehicles");
        else setDetail({ kind: row.kind, id: row.id });
    };

    const exportCsv = () => {
        const name = `fleet-insights_${tab}_${new Date().toISOString().slice(0, 10)}.csv`;
        downloadText(name, toCsv(columns.filter(c => c.key !== "spark").concat([{ key: "spark", label: "Scores (oldest→current)", csv: r => r.scores.map(fmtScore).join(" | ") }]), activeRows));
    };

    const maxRulePts = Math.max(0, ...rules.map(r => r.currentPoints));

    return (
        <div className="fi-dash">
            <section className="fi-kpis">
                <Kpi title={`${crumbs[crumbs.length - 1].name} score`} value={fmtScore(fleet.current)} sub={unitLabel}
                     trend={fleet.trend} badge={<BandPill band={bandFor(fleet.current, config)} />} />
                <Kpi title="Median vehicle score" value={fmtScore(vehicleMedian)} sub={`${vehicleRows.length.toLocaleString()} vehicles`}
                     trend={pct(vehicleMedian, prevVehicleMedian)} />
                <Kpi title="Events this period" value={fleet.currentEvents.toLocaleString()} sub={`${fleet.currentPoints.toLocaleString()} points`}
                     trend={pct(fleet.currentEvents, Object.values(fleetSeries.counts[n - 2] || {}).reduce((a, b) => a + b, 0))} />
                <Kpi title="Distance this period" value={fmtDistance(fleet.currentDistanceKm, config.unit)} sub={`period: ${periodLabel(config)}`}
                     trend={pct(fleet.currentDistanceKm, fleetSeries.distanceKm[n - 2])} invert />
            </section>

            <section className="fi-card">
                <header className="fi-card-head">
                    <div>
                        <h3>Score trend</h3>
                        <p className="fi-muted">Weighted unsafe points per {periodLabel(config)}, last {n} periods. Lower is better.</p>
                    </div>
                </header>
                <BarTrend values={scoreSeries(fleetSeries, config)} labels={labels} unitLabel={unitLabel} height={200} />
            </section>

            <div className="fi-grid-2">
                <section className="fi-card">
                    <header className="fi-card-head">
                        <div>
                            <h3>Performance</h3>
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
                            <Button type="tertiary" onClick={exportCsv}>Export CSV</Button>
                        </div>
                    </header>
                    <div className="fi-perf">
                        <SortableTable columns={columns} rows={activeRows} defaultSort="current" onRowClick={onRow}
                                       emptyText={tab === "groups" ? "No child groups here — switch to Vehicles." : "Nothing in scope for this period."} />
                    </div>
                </section>

                <section className="fi-card">
                    <header className="fi-card-head">
                        <div>
                            <h3>Event performance</h3>
                            <p className="fi-muted">Tracked rules, current period vs previous. Bar = weighted points.</p>
                        </div>
                    </header>
                    <table className="fi-table fi-table--compact">
                        <thead><tr><th>Rule</th><th style={{ width: "40%" }}>Points</th><th className="fi-right">Events</th><th className="fi-right">Trend</th></tr></thead>
                        <tbody>
                            {rules.map(r => (
                                <tr key={r.id}>
                                    <td>{r.name}<span className="fi-muted"> · {r.points} pt</span></td>
                                    <td><HBar value={r.currentPoints} max={maxRulePts} label={r.currentPoints.toLocaleString()} tone={ruleTone(r.currentPoints, maxRulePts)} /></td>
                                    <td className="fi-right">{r.current.toLocaleString()}<span className="fi-muted"> / {r.previous.toLocaleString()}</span></td>
                                    <td className="fi-right"><Trend pct={r.trend} /></td>
                                </tr>
                            ))}
                            {rules.length === 0 && <tr><td colSpan={4} className="fi-empty">No rules tracked yet — open Settings.</td></tr>}
                        </tbody>
                    </table>
                </section>
            </div>

            {detail && (
                <Detail kind={detail.kind} id={detail.id} config={config} periods={periods} data={data} refData={refData}
                        session={session} onClose={() => setDetail(null)} />
            )}
        </div>
    );
}

function Kpi({ title, value, sub, trend, invert = false, badge }) {
    return (
        <div className="fi-kpi">
            <div className="fi-kpi-title">{title}</div>
            <div className="fi-kpi-value">{value}{badge ? <span className="fi-kpi-badge">{badge}</span> : null}</div>
            <div className="fi-kpi-foot"><span className="fi-muted">{sub}</span><Trend pct={trend} invert={invert} /></div>
        </div>
    );
}

function pct(a, b) {
    if (a == null || b == null) return null;
    if (b === 0) return a === 0 ? 0 : null;
    return ((a - b) / b) * 100;
}

export function periodLabel(config) {
    return config.period === "day" ? "day" : config.period === "month" ? "30 days" : "week";
}

function toneFor(band) {
    return band === "Low" ? "ok" : band === "Medium" ? "warn" : band === "High" ? "bad" : "neutral";
}

function ruleTone(v, max) {
    if (!max || v <= 0) return "neutral";
    const r = v / max;
    return r >= 0.66 ? "bad" : r >= 0.33 ? "warn" : "ok";
}

export { fmtPct };
