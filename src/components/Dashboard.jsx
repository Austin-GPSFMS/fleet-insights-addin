import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import {
    sumSeries, summarize, scoreSeries, ruleBreakdown, groupRollup, median,
    resolveScope, inScope, devicesInScope, shouldIncludeOutside, focusLabel, lastBarLabel, CUSTOM_PREFIX, profilesAt, DEFAULT_PROFILE,
    fmtScore, fmtDelta, fmtDistance, fmtRate, rateUnitLabel, scoreUnitLabel, bandFor, displayGroupLabel, ROOT_GROUP_ID
} from "../model.js";
import { driverLabel } from "../api.js";
import { exportScorecardExcel, exportScorecardPdf } from "../export.js";
import { BarTrend, Sparkline, HBar, Trend, BandPill } from "./Charts.jsx";
import { SortableTable, toCsv, downloadText } from "./Table.jsx";
import { Detail } from "./Detail.jsx";

export function Dashboard({ config, periods, refData, data, nodeId: nodeIdProp, setNodeId, session, onDismiss, notify, onSetDisplayGroup,
                            range, onSetRange, onOpenSettings, onSetIncludeOutside, tab, setTab }) {
    const [unassignedOnly, setUnassignedOnly] = useState(false);
    const tree = refData.tree;
    // Home node: the display group (e.g. "Locations") when one is configured, else the company root.
    const homeId = config.displayGroupId && tree.byId.has(config.displayGroupId) ? config.displayGroupId : ROOT_GROUP_ID;
    const homeScope = useMemo(() => resolveScope(homeId, tree, config, homeId), [homeId, tree, config]);
    // Vehicles outside the Report-by group. They are only reported (as "Unassigned") when the group
    // is meant to cover the whole fleet — otherwise picking one division would drag everyone else in.
    const outsideCount = useMemo(() => (homeScope.wholeFleet ? 0 : refData.devices.length - devicesInScope(homeScope, refData.devices).length), [homeScope, refData]);
    const includeOutside = shouldIncludeOutside(config, outsideCount, refData.devices.length);
    const scope = useMemo(() => {
        const sc = resolveScope(nodeIdProp || homeId, tree, config, homeId);
        return sc.id === homeId && includeOutside ? { ...sc, wholeFleet: true } : sc;
    }, [nodeIdProp, homeId, tree, config, includeOutside]);
    const nodeId = scope.id;
    const customGroups = config.customGroups || [];
    useEffect(() => { setUnassignedOnly(false); }, [nodeId]);
    const pickTab = k => { setTab(k); setUnassignedOnly(false); };
    const [detail, setDetail] = useState(null); // { kind: "vehicle"|"driver", id }
    const n = periods.length;
    // Which period the KPIs / tables / rule list describe. Default: the current (to-date) period;
    // click a bar in the trend to focus a completed one — same gesture as the drawer.
    const [focusIdx, setFocusIdx] = useState(n - 1);
    const rangeMode = !!range;
    useEffect(() => { setFocusIdx(n - 1); }, [n, config.period, range && range.from, range && range.to]); // eslint-disable-line react-hooks/exhaustive-deps
    const isCurrent = focusIdx === n - 1;
    const focus = periods[focusIdx] || periods[n - 1];
    const labels = periods.map(p => p.label);
    const lastLabel = lastBarLabel(periods, config);
    const focusText = focusLabel(periods, focusIdx, config);
    const prevText = rangeMode ? (focus.days === 1 ? "the day before" : `the previous ${focus.days} days`) : `the ${periodLabel(config)} before`;

    const scopeDevices = useMemo(() => devicesInScope(scope, refData.devices), [scope, refData]);
    const scopeIds = useMemo(() => new Set(scopeDevices.map(d => d.id)), [scopeDevices]);

    const fleetSeries = useMemo(
        () => sumSeries(scopeDevices.map(d => data.byDevice.get(d.id)).filter(Boolean), n),
        [scopeDevices, data, n]
    );
    const fleet = useMemo(() => summarize(fleetSeries, config, focusIdx), [fleetSeries, config, focusIdx]);
    const rules = useMemo(() => ruleBreakdown(fleetSeries, config, focusIdx), [fleetSeries, config, focusIdx]);

    const groupNameOf = useMemo(() => {
        const m = new Map();
        for (const d of refData.devices) m.set(d.id, displayGroupLabel(d.groups, config, refData.tree));
        return m;
    }, [refData, config]);

    const realGroupRows = useMemo(
        () => groupRollup({ nodeId, tree, devices: scopeDevices, byDevice: data.byDevice, config, nPeriods: n, idx: focusIdx, childIds: scope.childIds }),
        [nodeId, tree, scopeDevices, data, config, n, focusIdx, scope]
    );
    // Combined groups (Settings → Combined groups) are listed beside the real ones at the home level.
    const customRows = useMemo(() => (nodeId !== homeId ? [] : customGroups.map(cg => {
        const sc = resolveScope(CUSTOM_PREFIX + cg.id, tree, config, homeId);
        const devs = devicesInScope(sc, refData.devices);
        const series = sumSeries(devs.map(d => data.byDevice.get(d.id)).filter(Boolean), n);
        return { id: sc.id, name: cg.name, kind: "custom", vehicles: devs.length, hasChildren: sc.childIds.length > 1, series, ...summarize(series, config, focusIdx) };
    })), [nodeId, homeId, customGroups, tree, config, refData, data, n, focusIdx]);
    const groupRows = useMemo(() => [...realGroupRows, ...customRows], [realGroupRows, customRows]);

    const unassignedIds = useMemo(() => {
        const row = groupRows.find(r => r.kind === "unassigned");
        return row ? new Set(row.deviceIds) : new Set();
    }, [groupRows]);
    const buildVehicleRows = useCallback(devs => devs.map(d => {
        const s = data.byDevice.get(d.id);
        return { id: d.id, name: d.name || d.serialNumber || d.id, group: groupNameOf.get(d.id) || "", second: "", kind: "vehicle", series: s, ...summarize(s, config, focusIdx) };
    }), [data, config, groupNameOf, focusIdx]);
    const vehicleRows = useMemo(() => buildVehicleRows(unassignedOnly ? scopeDevices.filter(d => unassignedIds.has(d.id)) : scopeDevices),
        [buildVehicleRows, scopeDevices, unassignedOnly, unassignedIds]);

    const vehicleMedian = useMemo(() => median(vehicleRows.map(r => r.current)), [vehicleRows]);
    const prevVehicleMedian = useMemo(() => median(vehicleRows.map(r => r.previous)), [vehicleRows]);


    // Drivers seen on in-scope vehicles; "current vehicle" = device of their most recent trip.
    // Location family: the display group's subtree. A driver who is a member of a location
    // (User.groups) belongs to that location regardless of which truck they drove; a driver with
    // no location membership follows the vehicles they drove in the period.
    const family = useMemo(() => (homeId !== ROOT_GROUP_ID ? refData.tree.descendants(homeId) : null), [homeId, refData]);
    const wholeFleetScope = scope.wholeFleet;
    /**
     * Drivers for a scope. `ids` = device ids in scope, `sc` = the scope (null for the unassigned
     * bucket). Members of a location belong to that location whatever truck they drove;
     * drivers with no location membership follow the vehicles they drove.
     */
    const buildDriverRows = useCallback((ids, sc, isWholeFleet) => {
        const seen = new Set();
        const lastTrip = new Map();
        const driverInFamily = user => !!(family && user && (user.groups || []).some(g => family.has(g.id)));
        const driverInNode = user => !!(user && sc && inScope(user.groups, sc));
        for (const t of data.trips) {
            if (!t.driver) continue;
            if (!isWholeFleet && !ids.has(t.device && t.device.id)) continue;
            const ts = Date.parse(t.start);
            const prev = lastTrip.get(t.driver.id);
            if (!prev || ts > prev.ts) lastTrip.set(t.driver.id, { ts, deviceId: t.device && t.device.id });
        }
        const drove = new Set();
        for (const e of data.exceptions) if (e.driver && ids.has(e.device && e.device.id)) drove.add(e.driver.id);
        for (const t of data.trips) if (t.driver && ids.has(t.device && t.device.id)) drove.add(t.driver.id);
        for (const id of data.byDriver.keys()) {
            const user = refData.driversById.get(id);
            if (isWholeFleet) { if (drove.has(id) || driverInFamily(user)) seen.add(id); continue; }
            if (driverInFamily(user)) { if (driverInNode(user)) seen.add(id); }
            else if (drove.has(id)) seen.add(id);
        }
        const rows = [];
        for (const id of seen) {
            const s = data.byDriver.get(id);
            if (!s) continue;
            const lt = lastTrip.get(id);
            const dev = lt ? refData.devicesById.get(lt.deviceId) : null;
            const user = refData.driversById.get(id);
            let group = "";
            if (driverInFamily(user)) group = displayGroupLabel(user.groups, config, refData.tree);
            else if (dev) group = groupNameOf.get(dev.id) || "";
            if (!group && user) group = displayGroupLabel(user.groups, config, refData.tree);
            rows.push({ id, name: driverLabel(user) || id, group, second: dev ? dev.name : "", kind: "driver", series: s, ...summarize(s, config, focusIdx) });
        }
        return rows;
    }, [data, refData, config, focusIdx, groupNameOf, family]);
    const driverRows = useMemo(() => buildDriverRows(scopeIds, scope, wholeFleetScope), [buildDriverRows, scopeIds, scope, wholeFleetScope]);

    const crumbs = scope.crumbs;
    const homeName = homeScope.name;
    const homeChildren = homeScope.childIds;
    // Vehicles at the home level that sit under none of its sub-groups (the "Unassigned" bucket).
    const homeUnassigned = useMemo(() => {
        const sc = includeOutside ? { ...homeScope, wholeFleet: true } : homeScope;
        const sets = homeChildren.map(c => tree.descendants(c));
        return devicesInScope(sc, refData.devices).filter(d => !sets.some(set => (d.groups || []).some(g => set.has(g.id)))).length;
    }, [homeScope, homeChildren, includeOutside, tree, refData]);
    // Parent groups a report can be anchored on (have children, not system groups).
    const parentGroups = useMemo(() => refData.groups
        .filter(g => g.id !== ROOT_GROUP_ID && (g.children || []).length > 0 && !/^Group[A-Za-z]+Id$/.test(g.id))
        .map(g => ({ id: g.id, name: g.name }))
        .sort((a, b) => a.name.localeCompare(b.name)), [refData]);
    const suggestedParent = useMemo(() => parentGroups.find(g => /location|division|region|branch|district|site|yard/i.test(g.name)) || null, [parentGroups]);
    const scopeName = scope.name;

    const activeRows = tab === "groups" ? groupRows : tab === "vehicles" ? vehicleRows : driverRows;
    const columns = useMemo(() => [
        { key: "name", label: tab === "groups" ? "Group" : tab === "vehicles" ? "Vehicle" : "Driver", sort: r => r.name, render: r => (
            <span className={r.kind === "group" || r.kind === "unassigned" || r.kind === "custom" ? "fi-link" : ""}>{r.name}{(r.kind === "group" || r.kind === "unassigned" || r.kind === "custom") && r.vehicles != null ? <span className="fi-muted"> · {r.vehicles} veh</span> : null}
                {r.kind === "custom" ? <span className="fi-tag">combined</span> : null}
                {r.kind === "driver" && r.second ? <span className="fi-muted"> · {r.second}</span> : null}</span>
        ) },
        ...(tab === "groups" ? [{ key: "open", label: "Open", sort: r => r.vehicles, render: r => (
            <span className="fi-rowlinks" onClick={e => e.stopPropagation()}>
                {(r.kind === "group" || r.kind === "custom") && r.hasChildren && <button className="fi-minibtn" onClick={() => drillTo(r, "groups")}>Sub-groups</button>}
                {(r.kind === "group" || r.kind === "custom") && <button className="fi-minibtn" onClick={() => drillTo(r, "vehicles")}>Vehicles</button>}
                {(r.kind === "group" || r.kind === "custom") && <button className="fi-minibtn" onClick={() => drillTo(r, "drivers")}>Drivers</button>}
                {r.kind === "unassigned" && <button className="fi-minibtn" onClick={() => { setTab("vehicles"); setUnassignedOnly(true); }}>Vehicles</button>}
            </span>
        ) }] : []),
        ...(tab !== "groups" ? [{ key: "group", label: "Group", sort: r => r.group || "", render: r => r.group || <span className="fi-muted">—</span> }] : []),
        { key: "current", label: "Score / 100", sort: r => r.current, width: "24%", render: r => (
            <HBar value={r.current} max={100} label={fmtScore(r.current)} tone={toneFor(r.band)} />
        ) },
        { key: "delta", label: "Change", sort: r => r.delta, align: "right", csv: r => fmtDelta(r.delta), render: r => <Trend delta={r.delta} goodWhen="up" /> },
        { key: "currentEvents", label: "Events", sort: r => r.currentEvents, align: "right", render: r => r.currentEvents.toLocaleString() },
        { key: "currentDistanceKm", label: "Distance", sort: r => r.currentDistanceKm, align: "right", csv: r => Math.round(r.currentDistanceKm), render: r => fmtDistance(r.currentDistanceKm, config.unit) },
        { key: "band", label: "Risk", sort: r => ({ High: 0, Medium: 1, Low: 2 }[r.band] ?? 3), render: r => <BandPill band={r.band} /> },
        ...(rangeMode ? [] : [{ key: "spark", label: `Last ${n}`, sort: r => r.current, csv: r => r.scores.map(fmtScore).join(" | "), render: r => <Sparkline values={r.scores.map(v => (v == null ? 0 : v))} /> }])
    ], [tab, config.unit, n, rangeMode]);

    // Clicking a group drills into it. A group with sub-groups stays on the Groups tab (compare
    // its children); a leaf group (a division) jumps straight to its individual scores — the
    // Vehicles or Drivers tab, whichever was used last.
    const [lastIndividualTab, setLastIndividualTab] = useState("vehicles");
    useEffect(() => { if (tab === "vehicles" || tab === "drivers") setLastIndividualTab(tab); }, [tab]);
    const drillTo = (row, targetTab) => {
        setNodeId(row.id);
        if (targetTab) setTab(targetTab);
        else if (!row.hasChildren) setTab(lastIndividualTab);
    };
    const onRow = row => {
        if (row.kind === "group" || row.kind === "custom") drillTo(row);
        else if (row.kind === "unassigned") { setTab("vehicles"); setUnassignedOnly(true); }
        else setDetail({ kind: row.kind, id: row.id });
    };

    const rangeText = `${new Date(focus.start).toLocaleDateString()} – ${new Date(focus.end).toLocaleDateString()}${focus.partial ? ` (${focusText})` : ""}`;
    // When exporting the group comparison, add one sheet / page per group with its vehicles and drivers.
    const exportSections = () => {
        if (tab !== "groups") return [];
        return groupRows.map(g => {
            const sc = g.kind === "unassigned" ? null : resolveScope(g.id, tree, config, homeId);
            const devs = g.kind === "unassigned"
                ? scopeDevices.filter(d => unassignedIds.has(d.id))
                : devicesInScope(sc, g.kind === "custom" ? refData.devices : scopeDevices);
            const ids = new Set(devs.map(d => d.id));
            return {
                title: g.name,
                vehicles: { rows: buildVehicleRows(devs), subjectLabel: "Vehicle", groupLabel: "Group", secondLabel: null },
                drivers: { rows: buildDriverRows(ids, sc, false), subjectLabel: "Driver", groupLabel: "Group", secondLabel: "Current Vehicle" }
            };
        });
    };
    const exportOpts = () => ({
        rows: activeRows, config, kind: tab, database: session ? session.database : "", periodIdx: focusIdx, sections: exportSections(),
        profileNames: Object.fromEntries((config.profiles || []).map(p => [p.id, (tree.byId.get(p.groupId) || {}).name || p.groupId])),
        scopeName, rangeText,
        subjectLabel: tab === "groups" ? "Group" : tab === "vehicles" ? "Vehicle" : "Driver",
        groupLabel: tab === "groups" ? null : "Group",
        secondLabel: tab === "drivers" ? "Current Vehicle" : null
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
    // Which weight profiles are in play for what is on screen (only relevant when divisions have their own weights).
    const weightsNote = useMemo(() => {
        if (!(config.profiles || []).length) return null;
        const keys = profilesAt(fleetSeries, focusIdx);
        if (!keys.length) return null;
        const names = keys.map(k => (k === DEFAULT_PROFILE ? "default" : ((tree.byId.get((config.profiles.find(p => p.id === k) || {}).groupId) || {}).name || k)));
        return names.length === 1 ? `Weights: ${names[0]}` : `Weights: mixed — ${names.join(", ")} (averaged by miles; ~ marks blended weights)`;
    }, [config, fleetSeries, focusIdx, tree]);

    return (
        <div className="fi-dash">
            <section className="fi-kpis">
                <Kpi title={`${scopeName} score — ${focusText}`} value={fmtScore(fleet.current)} sub={`${scoreUnitLabel()} · vs ${prevText}`}
                     trend={<Trend delta={fleet.delta} goodWhen="up" />} badge={<BandPill band={bandFor(fleet.current, config)} />} />
                <Kpi title="Median vehicle score" value={fmtScore(vehicleMedian)} sub={`${vehicleRows.filter(r => r.current != null).length.toLocaleString()} of ${vehicleRows.length.toLocaleString()} vehicles scored`}
                     trend={<Trend delta={vehicleMedian != null && prevVehicleMedian != null ? vehicleMedian - prevVehicleMedian : null} goodWhen="up" />} />
                <Kpi title={`Events — ${focusText}`} value={fleet.currentEvents.toLocaleString()} sub={`${fmtRate(fleet.currentEvents / Math.max(1e-9, exposure(fleet.currentDistanceKm, config)) * 1000)} ${rateUnitLabel(config)}`}
                     trend={<Trend pct={pct(fleet.currentEvents, Object.values(fleetSeries.counts[focusIdx - 1] || {}).reduce((a, b) => a + b, 0))} goodWhen="down" />} />
                <Kpi title={`Distance — ${focusText}`} value={fmtDistance(fleet.currentDistanceKm, config.unit)} sub={rangeMode ? `${focus.days} day${focus.days === 1 ? "" : "s"}` : `scoring period: ${periodLabel(config)}`}
                     trend={<Trend pct={pct(fleet.currentDistanceKm, fleetSeries.distanceKm[focusIdx - 1])} goodWhen="up" />} />
            </section>

            <section className="fi-card">
                <header className="fi-card-head">
                    <div>
                        <h3>Score trend</h3>
                        {rangeMode
                            ? <p className="fi-muted">Custom date range: <strong>{periods[n - 1].label}</strong>{n > 1 ? <> compared with the {periods[0].days} days before it ({periods[0].label})</> : " (too long to compare with the period before)"}. Everything below — scores, tables and exports — is for this range.</p>
                            : <p className="fi-muted">Safety score out of 100 per {periodLabel(config)}, last {n} periods ({config.period === "week" ? `weeks start ${config.weekStart === 0 ? "Sunday" : "Monday"}` : config.period === "month" ? "calendar months" : "calendar days"}). The last bar is {lastLabel.replace(" (to date)", "").toLowerCase()} so far; completed periods don't change. Click a bar to focus the figures below on that period.</p>}
                    </div>
                    <div className="fi-actions">
                        {!rangeMode && (isCurrent
                            ? (n > 1 && <Button type="tertiary" onClick={() => setFocusIdx(n - 2)}>Show last full {periodLabel(config)}</Button>)
                            : <Button type="tertiary" onClick={() => setFocusIdx(n - 1)}>Back to {lastLabel.toLowerCase()}</Button>)}
                        {rangeMode && <Button type="tertiary" onClick={() => onSetRange(null)}>Back to {periodLabel(config)}ly trend</Button>}
                        <RangePicker range={range} onApply={onSetRange} notify={notify} />
                    </div>
                </header>
                <BarTrend values={scoreSeries(fleetSeries, config)} labels={labels} unitLabel="/ 100" height={200} max={100} bands={config.bands} colorByBand currentLabel={lastLabel}
                          onSelect={setFocusIdx} selected={focusIdx} />
            </section>

            <div className="fi-grid-2">
                <section className="fi-card">
                    <header className="fi-card-head">
                        <div>
                            <h3>Performance <span className="fi-muted fi-h3sub">— {focusText}</span></h3>
                            <div className="fi-reportby">
                                <span className="fi-muted">Report by</span>
                                <select className="fi-input fi-input--inline" value={homeId === ROOT_GROUP_ID ? "" : homeId} onChange={e => onSetDisplayGroup && onSetDisplayGroup(e.target.value || null)} aria-label="Report by parent group">
                                    <option value="">All groups (company tree)</option>
                                    {parentGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                </select>
                                {homeId === ROOT_GROUP_ID && suggestedParent && (
                                    <button className="fi-linkbtn fi-linkbtn--blue" onClick={() => onSetDisplayGroup && onSetDisplayGroup(suggestedParent.id)}>Use “{suggestedParent.name}”</button>
                                )}
                            </div>
                            <nav className="fi-crumbs" aria-label="Group path">
                                {crumbs.map((c, i) => (
                                    <span key={c.id}>
                                        {i > 0 && <span className="fi-crumb-sep">/</span>}
                                        {i < crumbs.length - 1
                                            ? <button className="fi-crumb" onClick={() => setNodeId(c.id)}>{c.name}</button>
                                            : <span className="fi-crumb fi-crumb--current">{c.name}</span>}
                                    </span>
                                ))}
                                {nodeId !== homeId && <button className="fi-crumb fi-crumb--reset" onClick={() => setNodeId(homeId)}>Reset</button>}
                                {unassignedOnly && <span className="fi-chip fi-chip--filter">Unassigned vehicles only <button className="fi-linkbtn" onClick={() => setUnassignedOnly(false)}>×</button></span>}
                            </nav>
                        </div>
                        <div className="fi-actions">
                            {(homeId !== ROOT_GROUP_ID || customGroups.length > 0) && (
                                <select className="fi-input fi-input--inline fi-locpick" aria-label="Location"
                                        value={unassignedOnly ? "__unassigned" : nodeId === homeId ? "__all" : (homeChildren.includes(nodeId) || scope.custom) ? nodeId : "__other"}
                                        onChange={e => {
                                            const v = e.target.value;
                                            if (v === "__all") { setUnassignedOnly(false); setNodeId(homeId); }
                                            else if (v === "__unassigned") { setNodeId(homeId); setTab(tab === "groups" ? "vehicles" : tab); setTimeout(() => setUnassignedOnly(true), 0); }
                                            else if (v === "__new") { onOpenSettings && onOpenSettings("custom"); }
                                            else if (v !== "__other") { setUnassignedOnly(false); setNodeId(v); if (v.startsWith(CUSTOM_PREFIX) && tab === "groups" && resolveScope(v, tree, config, homeId).childIds.length < 2) setTab(lastIndividualTab); }
                                        }}>
                                    <option value="__all">All {homeName}</option>
                                    {homeId !== ROOT_GROUP_ID && homeChildren.map(cid => (
                                        <option key={cid} value={cid}>{(tree.byId.get(cid) || {}).name || cid}</option>
                                    ))}
                                    {homeId !== ROOT_GROUP_ID && homeUnassigned > 0 && <option value="__unassigned">Unassigned vehicles</option>}
                                    {nodeId !== homeId && !homeChildren.includes(nodeId) && !scope.custom && <option value="__other">{scope.name}</option>}
                                    <optgroup label="Combined groups">
                                        {customGroups.map(cg => <option key={cg.id} value={CUSTOM_PREFIX + cg.id}>{cg.name}</option>)}
                                        <option value="__new">+ New combined group…</option>
                                    </optgroup>
                                </select>
                            )}
                            <div className="fi-tabs" role="tablist">
                                {[["groups", `Groups (${groupRows.length})`], ["vehicles", `Vehicles (${vehicleRows.length})`], ["drivers", `Drivers (${driverRows.length})`]].map(([k, l]) => (
                                    <button key={k} role="tab" aria-selected={tab === k} className={`fi-tab ${tab === k ? "fi-tab--on" : ""}`} onClick={() => pickTab(k)}>{l}</button>
                                ))}
                            </div>
                            <ExportMenu onPick={doExport} />
                        </div>
                    </header>
                    <div className="fi-perf">
                        <SortableTable columns={columns} rows={activeRows} defaultSort="current" defaultDir="asc" onRowClick={onRow}
                                       emptyText={tab === "groups" ? `${scopeName} has no sub-groups — use the Vehicles or Drivers tab for its individual scores.` : "Nothing in scope for this period."} />
                    </div>
                    {homeId !== ROOT_GROUP_ID && nodeId === homeId && outsideCount > 0 && (
                        <p className="fi-outside">
                            {includeOutside
                                ? <>Includes {outsideCount.toLocaleString()} vehicle{outsideCount === 1 ? "" : "s"} that are not in {homeName}, shown as “Unassigned vehicles”. <button className="fi-linkbtn fi-linkbtn--blue" onClick={() => onSetIncludeOutside && onSetIncludeOutside(false)}>Leave them out</button></>
                                : <>{outsideCount.toLocaleString()} vehicle{outsideCount === 1 ? "" : "s"} outside {homeName} are not included in this report. <button className="fi-linkbtn fi-linkbtn--blue" onClick={() => onSetIncludeOutside && onSetIncludeOutside(true)}>Include them as “Unassigned”</button></>}
                        </p>
                    )}
                </section>

                <section className="fi-card">
                    <header className="fi-card-head">
                        <div>
                            <h3>Event performance <span className="fi-muted fi-h3sub">— {focusText}</span></h3>
                            <p className="fi-muted">Bar = score points lost to this rule; counts vs {prevText}.{weightsNote ? <> <span className="fi-weightsnote">{weightsNote}</span></> : null}</p>
                        </div>
                    </header>
                    <table className="fi-table fi-table--compact">
                        <thead><tr><th>Rule</th><th style={{ width: "36%" }}>Score impact</th><th className="fi-right">Events</th><th className="fi-right">Rate</th><th className="fi-right">Trend</th></tr></thead>
                        <tbody>
                            {rules.map(r => (
                                <tr key={r.id}>
                                    <td>{r.name}<span className="fi-muted"> · {r.mixed ? "~" : ""}{r.weight}%</span></td>
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

const MAX_RANGE_DAYS = 92;
function ymd(d) {
    const pad = v => String(v).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function addDays(d, k) { const x = new Date(d); x.setDate(x.getDate() + k); return x; }

/** Date-range selector. Nothing is fetched until a preset is chosen or Apply is pressed. */
function RangePicker({ range, onApply, notify }) {
    const today = new Date();
    const [from, setFrom] = useState(range ? range.from : ymd(addDays(today, -6)));
    const [to, setTo] = useState(range ? range.to : ymd(today));
    useEffect(() => { if (range) { setFrom(range.from); setTo(range.to); } }, [range]);
    const apply = (f, t) => {
        const a = new Date(`${f}T00:00:00`), b = new Date(`${t}T00:00:00`);
        if (!f || !t || Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) { notify && notify("Pick both a start and an end date.", "warn"); return; }
        if (a > b) { notify && notify("The start date is after the end date.", "warn"); return; }
        if (b > today) { notify && notify("The end date can't be in the future.", "warn"); return; }
        const days = Math.round((b - a) / 86400000) + 1;
        if (days > MAX_RANGE_DAYS) { notify && notify(`Ranges are limited to ${MAX_RANGE_DAYS} days — pick a shorter range.`, "warn"); return; }
        onApply({ from: f, to: t });
    };
    const preset = key => {
        let a, b = today;
        if (key === "7") a = addDays(today, -6);
        else if (key === "14") a = addDays(today, -13);
        else if (key === "30") a = addDays(today, -29);
        else if (key === "month") a = new Date(today.getFullYear(), today.getMonth(), 1);
        else if (key === "lastmonth") { a = new Date(today.getFullYear(), today.getMonth() - 1, 1); b = new Date(today.getFullYear(), today.getMonth(), 0); }
        else return;
        setFrom(ymd(a)); setTo(ymd(b));
        apply(ymd(a), ymd(b));
    };
    return (
        <div className={`fi-range ${range ? "fi-range--on" : ""}`}>
            <span className="fi-muted">Date range</span>
            <select className="fi-input fi-input--inline" value="" onChange={e => preset(e.target.value)} aria-label="Quick date range">
                <option value="">Quick pick…</option>
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
                <option value="month">This month</option>
                <option value="lastmonth">Last month</option>
            </select>
            <input className="fi-input fi-input--inline" type="date" value={from} max={ymd(today)} onChange={e => setFrom(e.target.value)} aria-label="From date" />
            <span className="fi-muted">to</span>
            <input className="fi-input fi-input--inline" type="date" value={to} max={ymd(today)} onChange={e => setTo(e.target.value)} aria-label="To date" />
            <Button type="secondary" onClick={() => apply(from, to)}>Apply</Button>
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
