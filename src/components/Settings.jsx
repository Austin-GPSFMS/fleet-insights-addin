import { useMemo, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import { Banner } from "@geotab/zenith/dist/banner/banner";
import { normalizeConfig, normalizeWeights, weightTotal, suggestMaxRate, suggestRelativeWeight, WEIGHT_SUGGESTIONS, DEVICE_TYPE_LABELS, ROOT_GROUP_ID, isUntrackedSerial } from "../model.js";

export function Settings({ config, rules, devices = [], groups = [], tree, onSave, onCancel, saving, saveInfo, hiddenCount = 0, onClearHidden }) {
    const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(config)));
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [groupQuery, setGroupQuery] = useState("");

    // Device types present in this database, with counts, so the exclusion list is concrete.
    const typeCounts = useMemo(() => {
        const m = new Map();
        for (const d of devices) { const t = typeOf(d); m.set(t, (m.get(t) || 0) + 1); }
        for (const t of draft.excludedDeviceTypes || []) if (!m.has(t)) m.set(t, 0);
        return [...m.entries()].sort((a, b) => b[1] - a[1]);
    }, [devices, draft.excludedDeviceTypes]);
    const excludedTypes = useMemo(() => new Set(draft.excludedDeviceTypes || []), [draft.excludedDeviceTypes]);
    const toggleType = t => setDraft({ ...draft, excludedDeviceTypes: excludedTypes.has(t) ? (draft.excludedDeviceTypes || []).filter(x => x !== t) : [...(draft.excludedDeviceTypes || []), t] });

    const excludedGroups = useMemo(() => new Set(draft.excludedGroups || []), [draft.excludedGroups]);
    const groupRows = useMemo(() => {
        const q = groupQuery.trim().toLowerCase();
        const counts = new Map();
        for (const d of devices) for (const g of d.groups || []) counts.set(g.id, (counts.get(g.id) || 0) + 1);
        return groups
            .filter(g => g.id !== ROOT_GROUP_ID && (!q || String(g.name).toLowerCase().includes(q)))
            .map(g => ({ id: g.id, name: g.name, direct: counts.get(g.id) || 0, path: tree ? pathOf(g.id, tree) : g.name }))
            .sort((a, b) => a.path.localeCompare(b.path));
    }, [groups, devices, groupQuery, tree]);
    const parentGroups = useMemo(() => groups
        .filter(g => g.id !== ROOT_GROUP_ID && (g.children || []).length > 0 && !/^Group[A-Za-z]+Id$/.test(g.id))
        .map(g => ({ id: g.id, name: g.name, path: tree ? pathOf(g.id, tree) : g.name }))
        .sort((a, b) => a.path.localeCompare(b.path)), [groups, tree]);
    const toggleGroup = id => setDraft({ ...draft, excludedGroups: excludedGroups.has(id) ? (draft.excludedGroups || []).filter(x => x !== id) : [...(draft.excludedGroups || []), id] });
    const scorableCount = useMemo(() => devices.filter(d => !excludedTypes.has(typeOf(d)) && !(d.groups || []).some(g => excludedGroups.has(g.id) || (tree && [...excludedGroups].some(x => tree.descendants(x).has(g.id))))).length, [devices, excludedTypes, excludedGroups, tree]);

    const selected = useMemo(() => new Map(draft.rules.map(r => [r.id, r])), [draft.rules]);
    const visibleRules = useMemo(() => {
        const q = query.trim().toLowerCase();
        return rules.filter(r => !q || String(r.name).toLowerCase().includes(q));
    }, [rules, query]);
    const total = weightTotal(draft.rules.map(r => ({ weight: Number(r.weight) || 0 })));
    const totalOk = Math.abs(total - 100) < 0.01;
    const unitShort = draft.unit === "km" ? "km" : "mi";

    const toggle = rule => {
        if (selected.has(rule.id)) setDraft({ ...draft, rules: draft.rules.filter(r => r.id !== rule.id) });
        else setDraft({ ...draft, rules: [...draft.rules, { id: rule.id, name: rule.name, weight: suggestRelativeWeight(rule.name), maxRate: suggestMaxRate(rule.name) }] });
    };
    const patchRule = (id, patch) => setDraft({ ...draft, rules: draft.rules.map(r => (r.id === id ? { ...r, ...patch } : r)) });
    const rebalance = () => setDraft({ ...draft, rules: normalizeWeights(draft.rules.map(r => ({ ...r, weight: Number(r.weight) || 0 }))) });
    const suggest = () => {
        const picks = rules.filter(r => WEIGHT_SUGGESTIONS.some(([re]) => re.test(String(r.name))) && !/ignore|count/i.test(r.id));
        const merged = new Map(draft.rules.map(r => [r.id, r]));
        for (const r of picks) if (!merged.has(r.id)) merged.set(r.id, { id: r.id, name: r.name, weight: suggestRelativeWeight(r.name), maxRate: suggestMaxRate(r.name) });
        setDraft({ ...draft, rules: normalizeWeights([...merged.values()].map(r => ({ ...r, weight: Number(r.weight) || 0 }))) });
    };

    const save = () => {
        if (!draft.rules.length) { setError("Pick at least one rule to track."); return; }
        if (!totalOk) { setError(`Weights must total 100% (currently ${Math.round(total * 10) / 10}%). Use "Rebalance to 100%" or adjust them.`); return; }
        if (draft.rules.some(r => !(Number(r.maxRate) > 0))) { setError("Every rule needs a 'zero-score rate' greater than zero."); return; }
        setError(null);
        onSave(normalizeConfig({ ...draft, version: 2 }));
    };

    return (
        <div className="fi-settings">
            <header className="fi-card-head">
                <div>
                    <h3>Scoring settings</h3>
                    <p className="fi-muted">Choose the exception rules that make up the score and how much each one counts. Weights must total 100%. Saved to this database so everyone sees the same score.</p>
                </div>
                <div className="fi-actions">
                    <Button type="tertiary" onClick={onCancel} disabled={saving}>Cancel</Button>
                    <Button type="primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save settings"}</Button>
                </div>
            </header>

            {error && <Banner type="error" onClose={() => setError(null)}>{error}</Banner>}
            {saveInfo && <Banner type={saveInfo.type || "info"}>{saveInfo.text}</Banner>}

            <div className="fi-grid-2 fi-grid-2--settings">
                <section className="fi-card fi-card--flat">
                    <div className="fi-card-head fi-card-head--tight">
                        <h4>Tracked rules <span className={`fi-total ${totalOk ? "fi-total--ok" : "fi-total--bad"}`}>{Math.round(total * 10) / 10}% of 100%</span></h4>
                        <div className="fi-actions">
                            <Button type="tertiary" onClick={suggest}>Suggest safety rules</Button>
                            <Button type="tertiary" onClick={rebalance} disabled={!draft.rules.length}>Rebalance to 100%</Button>
                            <Button type="tertiary" onClick={() => setShowAdvanced(v => !v)}>{showAdvanced ? "Hide" : "Show"} sensitivity</Button>
                        </div>
                    </div>
                    {draft.rules.length > 0 && (
                        <table className="fi-table fi-table--compact">
                            <thead>
                                <tr>
                                    <th>Rule</th>
                                    <th className="fi-right" style={{ width: 110 }}>Weight %</th>
                                    {showAdvanced && <th className="fi-right" style={{ width: 170 }} title="Events per 1,000 of exposure at which this rule's sub-score reaches 0">Zero at (events / 1,000 {unitShort})</th>}
                                    <th style={{ width: 70 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {draft.rules.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.name}</td>
                                        <td className="fi-right"><input className="fi-input fi-input--num" type="number" min="0" max="100" step="1" value={r.weight} onChange={e => patchRule(r.id, { weight: e.target.value })} /></td>
                                        {showAdvanced && <td className="fi-right"><input className="fi-input fi-input--num" type="number" min="0.1" step="1" value={r.maxRate} onChange={e => patchRule(r.id, { maxRate: e.target.value })} /></td>}
                                        <td className="fi-right"><button className="fi-linkbtn" onClick={() => toggle(r)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {showAdvanced && (
                        <p className="fi-muted fi-small">Sensitivity: a rule scores 100 at zero events and falls to 0 when its rate reaches the "zero at" value. Example — phone use at 5 / 1,000 mi: one phone event in 500 mi (2 / 1,000) scores 60; one in 5,000 mi (0.2 / 1,000) scores 96.</p>
                    )}
                    <div className="fi-rule-picker">
                        <input className="fi-input" placeholder={`Search ${rules.length} rules…`} value={query} onChange={e => setQuery(e.target.value)} />
                        <ul className="fi-rule-list">
                            {visibleRules.map(r => (
                                <li key={r.id}>
                                    <label>
                                        <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r)} />
                                        <span>{r.name}</span>
                                        {r.baseType && r.baseType !== "Custom" && <span className="fi-muted fi-small"> ({r.baseType})</span>}
                                    </label>
                                </li>
                            ))}
                            {visibleRules.length === 0 && <li className="fi-muted">No rules match.</li>}
                        </ul>
                    </div>
                </section>

                <section className="fi-card fi-card--flat">
                    <h4>Scoring</h4>
                    <div className="fi-form">
                        <label className="fi-field">
                            <span>Period</span>
                            <select className="fi-input" value={draft.period} onChange={e => setDraft({ ...draft, period: e.target.value })}>
                                <option value="day">Daily (calendar days)</option>
                                <option value="week">Weekly (calendar weeks)</option>
                                <option value="month">Monthly (calendar months)</option>
                            </select>
                        </label>
                        {draft.period === "week" && (
                            <label className="fi-field">
                                <span>Week starts on</span>
                                <select className="fi-input" value={String(draft.weekStart ?? 1)} onChange={e => setDraft({ ...draft, weekStart: Number(e.target.value) })}>
                                    <option value="1">Monday</option>
                                    <option value="0">Sunday</option>
                                </select>
                            </label>
                        )}
                        <label className="fi-field">
                            <span>Periods shown</span>
                            <input className="fi-input fi-input--num" type="number" min="2" max="26" value={draft.periods} onChange={e => setDraft({ ...draft, periods: e.target.value })} />
                        </label>
                        <label className="fi-field">
                            <span>Exposure unit (rates are per 1,000)</span>
                            <select className="fi-input" value={draft.unit} onChange={e => setDraft({ ...draft, unit: e.target.value })}>
                                <option value="miles">Miles</option>
                                <option value="km">Kilometres</option>
                            </select>
                        </label>
                        <label className="fi-field">
                            <span>Minimum distance to be scored ({unitShort} per period)</span>
                            <input className="fi-input fi-input--num" type="number" min="0" step="1" value={draft.minDistance} onChange={e => setDraft({ ...draft, minDistance: e.target.value })} />
                        </label>
                        <div className="fi-field">
                            <span>Risk bands (score out of 100, higher is better)</span>
                            <div className="fi-bands">
                                <label>Low risk ≥ <input className="fi-input fi-input--num" type="number" min="0" max="100" value={draft.bands.low} onChange={e => setDraft({ ...draft, bands: { ...draft.bands, low: e.target.value } })} /></label>
                                <label>Medium ≥ <input className="fi-input fi-input--num" type="number" min="0" max="100" value={draft.bands.medium} onChange={e => setDraft({ ...draft, bands: { ...draft.bands, medium: e.target.value } })} /></label>
                                <span className="fi-muted">below Medium = High risk</span>
                            </div>
                        </div>
                    </div>
                    <div className="fi-formula">
                        <h5>How the score is calculated</h5>
                        <code>rate = events ÷ distance × 1,000</code>
                        <code>rule score = 100 × max(0, 1 − rate ÷ zero-at)</code>
                        <code>score = Σ rule score × weight ÷ 100</code>
                        <p className="fi-muted">Higher is better; 100 means no tracked events. Distance comes from MyGeotab trips in the same period, so 10 events over 10,000 {unitShort} scores far better than 10 events over 100 {unitShort}. Periods are calendar-aligned, so a completed week's score never changes; the current period is shown "to date" and its score is a rate, so it is comparable to full periods. Change compares a period with the one before it.</p>
                    </div>
                    <div className="fi-formula">
                        <h5>Assets to score <span className="fi-muted">— {scorableCount.toLocaleString()} of {devices.length.toLocaleString()} devices</span></h5>
                        <p className="fi-muted fi-small">Untick a device type to leave it out of every score and table (untracked assets and battery trackers are out by default).</p>
                        <ul className="fi-types">
                            {typeCounts.map(([t, c]) => (
                                <li key={t}>
                                    <label>
                                        <input type="checkbox" checked={!excludedTypes.has(t)} onChange={() => toggleType(t)} />
                                        <span>{DEVICE_TYPE_LABELS[t] || t}<span className="fi-muted"> · {c}</span></span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <label className="fi-field" style={{ marginTop: 10 }}>
                            <span>Group shown next to each driver / vehicle</span>
                            <select className="fi-input" value={draft.displayGroupId || ""} onChange={e => setDraft({ ...draft, displayGroupId: e.target.value || null })}>
                                <option value="">All of the asset's groups</option>
                                {parentGroups.map(g => <option key={g.id} value={g.id}>{g.path} → its sub-groups</option>)}
                            </select>
                        </label>
                        <p className="fi-muted fi-small">Pick a parent such as "Locations" and each row shows which of its sub-groups the driver or vehicle belongs to (e.g. "Southern California Division"); anyone outside that family shows their other groups instead.</p>
                        <p className="fi-muted fi-small" style={{ marginTop: 10 }}>Exclude whole groups (and their sub-groups) — e.g. a yard, spares, or a trailer pool:</p>
                        <input className="fi-input" placeholder={`Search ${groups.length} groups…`} value={groupQuery} onChange={e => setGroupQuery(e.target.value)} />
                        <ul className="fi-group-list">
                            {groupRows.slice(0, 200).map(g => (
                                <li key={g.id}>
                                    <label>
                                        <input type="checkbox" checked={excludedGroups.has(g.id)} onChange={() => toggleGroup(g.id)} />
                                        <span>{g.path}<span className="fi-muted"> · {g.direct} direct</span></span>
                                    </label>
                                </li>
                            ))}
                            {groupRows.length === 0 && <li className="fi-muted">No groups match.</li>}
                        </ul>
                        {excludedGroups.size > 0 && <p className="fi-small">Excluded: {[...excludedGroups].map(id => (groups.find(g => g.id === id) || {}).name || id).join(", ")}</p>}
                    </div>
                    {hiddenCount > 0 && (
                        <div className="fi-formula">
                            <h5>Locally hidden events</h5>
                            <p className="fi-muted">{hiddenCount} event{hiddenCount === 1 ? "" : "s"} hidden from scoring in this add-in only (the server did not accept a dismiss).</p>
                            <Button type="tertiary" onClick={onClearHidden}>Un-hide all</Button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function pathOf(id, tree) {
    const parts = [];
    let cur = id;
    while (cur && cur !== ROOT_GROUP_ID) {
        const g = tree.byId.get(cur);
        parts.unshift(g ? g.name : cur);
        cur = tree.parentOf.get(cur);
    }
    return parts.join(" / ");
}

function typeOf(d) {
    return d.deviceType != null ? String(d.deviceType) : (isUntrackedSerial(d.serialNumber) ? "None" : "Unknown");
}
