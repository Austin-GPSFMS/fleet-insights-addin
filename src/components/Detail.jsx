import { useEffect, useMemo, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import { summarize, scoreSeries, ruleBreakdown, bucketIndex, fmtScore, fmtDistance, scoreUnitLabel } from "../model.js";
import { driverLabel } from "../api.js";
import { BarTrend, HBar, Trend, BandPill } from "./Charts.jsx";

/** Side panel: one vehicle or driver — trend, rule mix, and the underlying events. */
export function Detail({ kind, id, config, periods, data, refData, session, onClose }) {
    const n = periods.length;
    const [periodIdx, setPeriodIdx] = useState(n - 1);
    useEffect(() => { setPeriodIdx(n - 1); }, [id, n]);
    useEffect(() => {
        const onKey = e => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    const series = kind === "vehicle" ? data.byDevice.get(id) : data.byDriver.get(id);
    const subjectName = kind === "vehicle"
        ? ((refData.devicesById.get(id) || {}).name || id)
        : driverLabel(refData.driversById.get(id));
    const sum = useMemo(() => series ? summarize(series, config) : null, [series, config]);
    const rules = useMemo(() => series ? ruleBreakdown(series, config) : [], [series, config]);
    const ruleNames = useMemo(() => new Map(config.rules.map(r => [r.id, r])), [config]);

    const events = useMemo(() => {
        const p = periods[periodIdx];
        if (!p) return [];
        return data.exceptions
            .filter(e => (kind === "vehicle" ? e.device && e.device.id === id : e.driver && e.driver.id === id))
            .filter(e => ruleNames.has(e.rule && e.rule.id))
            .filter(e => { const t = Date.parse(e.activeFrom); return t >= p.start && t <= p.end; })
            .sort((a, b) => Date.parse(b.activeFrom) - Date.parse(a.activeFrom));
    }, [data, kind, id, periods, periodIdx, ruleNames]);

    if (!series || !sum) return null;
    const maxPts = Math.max(0, ...rules.map(r => r.currentPoints));
    const p = periods[periodIdx];
    const periodCounts = series.counts[periodIdx] || {};

    return (
        <div className="fi-drawer-backdrop" onClick={onClose}>
            <aside className="fi-drawer" onClick={e => e.stopPropagation()} role="dialog" aria-label={`${subjectName} detail`}>
                <header className="fi-drawer-head">
                    <div>
                        <div className="fi-muted">{kind === "vehicle" ? "Vehicle" : "Driver"}</div>
                        <h3>{subjectName}</h3>
                    </div>
                    <div className="fi-actions">
                        {kind === "vehicle" && session && (
                            <Button type="secondary" onClick={() => window.open(tripsLink(session, id, p), "_blank")}>Trips in MyGeotab</Button>
                        )}
                        <Button type="tertiary" onClick={onClose} ariaLabel="Close">Close</Button>
                    </div>
                </header>

                <section className="fi-kpis fi-kpis--3">
                    <Mini title="Current score" value={fmtScore(sum.current)} sub={scoreUnitLabel(config)} badge={<BandPill band={sum.band} />} trend={sum.trend} />
                    <Mini title="Events (current)" value={sum.currentEvents.toLocaleString()} sub={`${sum.currentPoints.toLocaleString()} points`} />
                    <Mini title="Distance (current)" value={fmtDistance(sum.currentDistanceKm, config.unit)} sub={`${fmtDistance(sum.totalDistanceKm, config.unit)} over ${n} periods`} />
                </section>

                <section className="fi-card fi-card--flat">
                    <h4>Score by period <span className="fi-muted">— click a bar to list its events</span></h4>
                    <BarTrend values={scoreSeries(series, config)} labels={periods.map(x => x.label)} unitLabel={scoreUnitLabel(config)}
                              height={150} width={760} onSelect={setPeriodIdx} selected={periodIdx} />
                </section>

                <section className="fi-card fi-card--flat">
                    <h4>Rule mix <span className="fi-muted">— current period, weighted points</span></h4>
                    <table className="fi-table fi-table--compact">
                        <tbody>
                            {rules.map(r => (
                                <tr key={r.id}>
                                    <td>{r.name}<span className="fi-muted"> · {r.points} pt</span></td>
                                    <td style={{ width: "40%" }}><HBar value={r.currentPoints} max={maxPts} label={r.currentPoints.toLocaleString()} tone={r.currentPoints > 0 ? "warn" : "neutral"} /></td>
                                    <td className="fi-right">{r.current}<span className="fi-muted"> / {r.previous}</span></td>
                                    <td className="fi-right"><Trend pct={r.trend} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="fi-card fi-card--flat">
                    <h4>Events — {periodIdx === n - 1 ? "current period" : `period starting ${p.label}`} <span className="fi-muted">({events.length})</span></h4>
                    <div className="fi-chips">
                        {Object.entries(periodCounts).map(([rid, c]) => (
                            <span key={rid} className="fi-chip">{(ruleNames.get(rid) || {}).name || rid}: {c}</span>
                        ))}
                    </div>
                    <div className="fi-table-wrap fi-table-wrap--scroll">
                        <table className="fi-table fi-table--compact">
                            <thead><tr><th>When</th><th>Rule</th>{kind === "vehicle" ? <th>Driver</th> : <th>Vehicle</th>}<th className="fi-right">Duration</th><th className="fi-right">Distance</th></tr></thead>
                            <tbody>
                                {events.slice(0, 500).map(e => (
                                    <tr key={e.id || `${e.activeFrom}-${e.rule.id}`}>
                                        <td>{fmtWhen(e.activeFrom)}</td>
                                        <td>{(ruleNames.get(e.rule.id) || {}).name || e.rule.id}</td>
                                        <td>{kind === "vehicle"
                                            ? (e.driver && e.driver.id && refData.driversById.get(e.driver.id) ? driverLabel(refData.driversById.get(e.driver.id)) : <span className="fi-muted">—</span>)
                                            : ((refData.devicesById.get(e.device && e.device.id) || {}).name || "—")}</td>
                                        <td className="fi-right">{fmtDuration(e.duration)}</td>
                                        <td className="fi-right">{e.distance != null ? fmtDistance(Number(e.distance) / 1000, config.unit, true) : "—"}</td>
                                    </tr>
                                ))}
                                {events.length === 0 && <tr><td colSpan={5} className="fi-empty">No tracked events in this period.</td></tr>}
                            </tbody>
                        </table>
                        {events.length > 500 && <p className="fi-muted">Showing the first 500 of {events.length}.</p>}
                    </div>
                </section>
            </aside>
        </div>
    );
}

function Mini({ title, value, sub, badge, trend }) {
    return (
        <div className="fi-kpi fi-kpi--mini">
            <div className="fi-kpi-title">{title}</div>
            <div className="fi-kpi-value">{value}{badge ? <span className="fi-kpi-badge">{badge}</span> : null}</div>
            <div className="fi-kpi-foot"><span className="fi-muted">{sub}</span>{trend !== undefined && <Trend pct={trend} />}</div>
        </div>
    );
}

function fmtWhen(iso) {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: "short", day: "2-digit", hour: "numeric", minute: "2-digit" });
}

/** ExceptionEvent.duration is an ISO-ish "hh:mm:ss(.fff)" or "d.hh:mm:ss" string. */
function fmtDuration(dur) {
    if (!dur) return "—";
    const m = String(dur).match(/^(?:(\d+)\.)?(\d{1,2}):(\d{2}):(\d{2})/);
    if (!m) return String(dur);
    const secs = (Number(m[1] || 0) * 86400) + Number(m[2]) * 3600 + Number(m[3]) * 60 + Number(m[4]);
    if (secs < 60) return `${secs}s`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m ${secs % 60}s`;
    return `${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m`;
}

function tripsLink(session, deviceId, p) {
    const base = `${window.location.origin}/${session.database}/`;
    const start = new Date(p.start).toISOString();
    const end = new Date(p.end).toISOString();
    return `${base}#tripsHistory,dateRange:(endDate:'${end}',startDate:'${start}'),devices:!(${deviceId})`;
}
