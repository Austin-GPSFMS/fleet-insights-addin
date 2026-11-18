import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import { Banner } from "@geotab/zenith/dist/banner/banner";
import { normalizeConfig, normalizeWeights, weightTotal, suggestMaxRate, suggestRelativeWeight, WEIGHT_SUGGESTIONS, DEVICE_TYPE_LABELS, ROOT_GROUP_ID, isUntrackedSerial, resolveScope, devicesInScope, CUSTOM_PREFIX } from "../model.js";

export function Settings({ config, rules, devices = [], groups = [], tree, onSave, onCancel, saving, saveInfo, hiddenCount = 0, onClearHidden, focusSection }) {
    const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(config)));
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [groupQuery, setGroupQuery] = useState("");

    /* ---- combined groups editor ---- */
    const emptyCg = { id: null, name: "", include: [], exclude: [] };
    const [cg, setCg] = useState(emptyCg);
    const [cgQuery, setCgQuery] = useState("");
    const cgRef = useRef(null);
    useEffect(() => {
        if (focusSection === "custom" && cgRef.current && cgRef.current.scrollIntoView) cgRef.current.scrollIntoView({ block: "start" });
    }, [focusSection]);
    const nameOf = id => (groups.find(g => g.id === id) || {}).name || id;
    const cgCount = g => {
        if (!tree || !g.include.length) return 0;
        const sc = resolveScope(CUSTOM_PREFIX + "x", tree, { customGroups: [{ id: "x", name: "x", include: g.include, exclude: g.exclude }] }, ROOT_GROUP_ID);
        return devicesInScope(sc, devices).length;
    };
    const cgToggle = (field, id) => {
        const other = field === "include" ? "exclude" : "include";
        const has = cg[field].includes(id);
        setCg({ ...cg, [field]: has ? cg[field].filter(x => x !== id) : [...cg[field], id], [other]: cg[other].filter(x => x !== id) });
    };
    const cgValid = cg.name.trim() && cg.include.length > 0;
    /** Returns the customGroups list with the editor's content applied (or unchanged when the editor is empty/invalid). */
    const withCgCommitted = list => {
        if (!cgValid) return list;
        const entry = { id: cg.id || `cg${Date.now().toString(36)}`, name: cg.name.trim(), include: cg.include, exclude: cg.exclude };
        return cg.id ? list.map(x => (x.id === cg.id ? entry : x)) : [...list, entry];
    };
    const cgCommit = () => {
        if (!cgValid) { setError("A combined group needs a name and at least one included group."); return; }
        setError(null);
        setDraft({ ...draft, customGroups: withCgCommitted(draft.customGroups || []) });
        setCg(emptyCg); setCgQuery("");
    };
    const cgRows = useMemo(() => {
        const q = cgQuery.trim().toLowerCase();
        return groups
            .filter(g => g.id !== ROOT_GROUP_ID && !/^Group[A-Za-z]+Id$/.test(g.id))
            .map(g => ({ id: g.id, path: tree ? pathOf(g.id, tree) : g.name }))
            .filter(g => !q || g.path.toLowerCase().includes(q) || cg.include.includes(g.id) || cg.exclude.includes(g.id))
            .sort((a, b) => a.path.localeCompare(b.path));
    }, [groups, tree, cgQuery, cg.include, cg.exclude]);

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

    /* ---- weight profiles: the default weights, or a group's own ---- */
    const [profileSel, setProfileSel] = useState("");
    const profiles = draft.profiles || [];
    const activeProfile = profiles.find(p => p.id === profileSel) || null;
    // A profile always lists the tracked rules; anything it hasn't set inherits the default.
    const rulesOf = prof => draft.rules.map(r => {
        const o = (prof.rules || []).find(x => x.id === r.id) || {};
        return { ...r, weight: o.weight != null ? o.weight : r.weight, maxRate: o.maxRate != null ? o.maxRate : r.maxRate };
    });
    const editRules = activeProfile ? rulesOf(activeProfile) : draft.rules;
    const setProfileRules = (id, list) => setDraft({ ...draft, profiles: profiles.map(p => (p.id === id ? { ...p, rules: list.map(r => ({ id: r.id, weight: r.weight, maxRate: r.maxRate })) } : p)) });
    const profileCandidates = useMemo(() => {
        const taken = new Set(profiles.map(p => p.groupId));
        const kids = new Set(draft.displayGroupId && tree ? (tree.childrenOf.get(draft.displayGroupId) || []) : []);
        return groups
            .filter(g => g.id !== ROOT_GROUP_ID && !/^Group[A-Za-z]+Id$/.test(g.id) && !taken.has(g.id))
            .map(g => ({ id: g.id, path: tree ? pathOf(g.id, tree) : g.name, first: kids.has(g.id) }))
            .sort((a, b) => (a.first === b.first ? a.path.localeCompare(b.path) : a.first ? -1 : 1));
    }, [groups, tree, profiles, draft.displayGroupId]);
    const addProfile = groupId => {
        if (!groupId) return;
        const id = `p${Date.now().toString(36)}`;
        setDraft({ ...draft, profiles: [...profiles, { id, groupId, rules: draft.rules.map(r => ({ id: r.id, weight: r.weight, maxRate: r.maxRate })) }] });
        setProfileSel(id);
    };
    const removeProfile = id => { setDraft({ ...draft, profiles: profiles.filter(p => p.id !== id) }); setProfileSel(""); };

    const selected = useMemo(() => new Map(draft.rules.map(r => [r.id, r])), [draft.rules]);
    const visibleRules = useMemo(() => {
        const q = query.trim().toLowerCase();
        return rules.filter(r => !q || String(r.name).toLowerCase().includes(q));
    }, [rules, query]);
    const total = weightTotal(editRules.map(r => ({ weight: Number(r.weight) || 0 })));
    const totalOk = Math.abs(total - 100) < 0.01;
    const unitShort = draft.unit === "km" ? "km" : "mi";

    const toggle = rule => {
        if (selected.has(rule.id)) setDraft({ ...draft, rules: draft.rules.filter(r => r.id !== rule.id) });
        else setDraft({ ...draft, rules: [...draft.rules, { id: rule.id, name: rule.name, weight: suggestRelativeWeight(rule.name), maxRate: suggestMaxRate(rule.name) }] });
    };
    const patchRule = (id, patch) => {
        if (activeProfile) setProfileRules(activeProfile.id, editRules.map(r => (r.id === id ? { ...r, ...patch } : r)));
        else setDraft({ ...draft, rules: draft.rules.map(r => (r.id === id ? { ...r, ...patch } : r)) });
    };
    const rebalance = () => {
        const list = normalizeWeights(editRules.map(r => ({ ...r, weight: Number(r.weight) || 0 })));
        if (activeProfile) setProfileRules(activeProfile.id, list);
        else setDraft({ ...draft, rules: list });
    };
    const suggest = () => {
        const picks = rules.filter(r => WEIGHT_SUGGESTIONS.some(([re]) => re.test(String(r.name))) && !/ignore|count/i.test(r.id));
        const merged = new Map(draft.rules.map(r => [r.id, r]));
        for (const r of picks) if (!merged.has(r.id)) merged.set(r.id, { id: r.id, name: r.name, weight: suggestRelativeWeight(r.name), maxRate: suggestMaxRate(r.name) });
        setDraft({ ...draft, rules: normalizeWeights([...merged.values()].map(r => ({ ...r, weight: Number(r.weight) || 0 }))) });
    };

    const save = () => {
        if (!draft.rules.length) { setError("Pick at least one rule to track."); return; }
        const defTotal = weightTotal(draft.rules.map(r => ({ weight: Number(r.weight) || 0 })));
        if (Math.abs(defTotal - 100) >= 0.01) { setProfileSel(""); setError(`The default weights must total 100% (currently ${Math.round(defTotal * 10) / 10}%). Use "Rebalance to 100%" or adjust them.`); return; }
        if (draft.rules.some(r => !(Number(r.maxRate) > 0))) { setError("Every rule needs a 'zero-score rate' greater than zero."); return; }
        for (const prof of profiles) {
            const list = rulesOf(prof);
            const t = weightTotal(list.map(r => ({ weight: Number(r.weight) || 0 })));
            if (Math.abs(t - 100) >= 0.01) { setProfileSel(prof.id); setError(`The weights for ${nameOf(prof.groupId)} total ${Math.round(t * 10) / 10}% — they must total 100%. Adjust them or use "Rebalance to 100%".`); return; }
            if (list.some(r => !(Number(r.maxRate) > 0))) { setProfileSel(prof.id); setError(`Every rule in the weights for ${nameOf(prof.groupId)} needs a 'zero-score rate' greater than zero.`); return; }
        }
        setError(null);
        onSave(normalizeConfig({ ...draft, customGroups: withCgCommitted(draft.customGroups || []), version: 2 }));
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
                            {!activeProfile && <Button type="tertiary" onClick={suggest}>Suggest safety rules</Button>}
                            <Button type="tertiary" onClick={rebalance} disabled={!draft.rules.length}>Rebalance to 100%</Button>
                            <Button type="tertiary" onClick={() => setShowAdvanced(v => !v)}>{showAdvanced ? "Hide" : "Show"} sensitivity</Button>
                        </div>
                    </div>
                    {draft.rules.length > 0 && (
                        <div className="fi-profilebar">
                            <span className="fi-muted">Weights for</span>
                            <select className="fi-input fi-input--inline" value={profileSel} onChange={e => setProfileSel(e.target.value)} aria-label="Weights for">
                                <option value="">All vehicles (default)</option>
                                {profiles.map(p => <option key={p.id} value={p.id}>{nameOf(p.groupId)}</option>)}
                            </select>
                            <select className="fi-input fi-input--inline" value="" onChange={e => addProfile(e.target.value)} aria-label="Add weights for a group">
                                <option value="">+ Different weights for a group…</option>
                                {profileCandidates.slice(0, 400).map(g => <option key={g.id} value={g.id}>{g.path}</option>)}
                            </select>
                            {activeProfile && <button className="fi-linkbtn" onClick={() => removeProfile(activeProfile.id)}>Remove these weights</button>}
                        </div>
                    )}
                    {activeProfile && (
                        <p className="fi-muted fi-small fi-profilehint">Vehicles in <strong>{nameOf(activeProfile.groupId)}</strong> (and its sub-groups) are scored with these weights instead of the default — for example a lower weight or a more forgiving “zero at” for harsh braking. The list of tracked rules is shared: add or remove rules under “All vehicles (default)”.</p>
                    )}
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
                                {editRules.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.name}</td>
                                        <td className="fi-right"><input className="fi-input fi-input--num" type="number" min="0" max="100" step="1" value={r.weight} onChange={e => patchRule(r.id, { weight: e.target.value })} /></td>
                                        {showAdvanced && <td className="fi-right"><input className="fi-input fi-input--num" type="number" min="0.1" step="1" value={r.maxRate} onChange={e => patchRule(r.id, { maxRate: e.target.value })} /></td>}
                                        <td className="fi-right">{!activeProfile && <button className="fi-linkbtn" onClick={() => toggle(r)}>Remove</button>}</td>
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
                        <label className="fi-field" style={{ marginTop: 10 }}>
                            <span>Vehicles outside that group</span>
                            <select className="fi-input" value={draft.includeOutside === true ? "yes" : draft.includeOutside === false ? "no" : "auto"}
                                    onChange={e => setDraft({ ...draft, includeOutside: e.target.value === "yes" ? true : e.target.value === "no" ? false : null })}>
                                <option value="auto">Automatic — show as “Unassigned” only if the group covers most of the fleet</option>
                                <option value="yes">Always include, as “Unassigned vehicles”</option>
                                <option value="no">Always leave out</option>
                            </select>
                        </label>
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

            <section className="fi-card fi-card--flat fi-cg" ref={cgRef}>
                <h4>Combined groups <span className="fi-muted">— report several groups as one, or one group minus another</span></h4>
                <p className="fi-muted fi-small">Example: “Civil + Fleet” = include ILB Civil Underground and ILB Fleet; or include Southern California Division and exclude ILB Electric. A vehicle or driver counts when it is in any included group and in none of the excluded ones. Combined groups appear in the location picker, in the Groups table and in exports.</p>
                {(draft.customGroups || []).length > 0 && (
                    <table className="fi-table fi-table--compact fi-cg-list">
                        <thead><tr><th>Name</th><th>Includes</th><th>Excludes</th><th className="fi-right">Vehicles</th><th style={{ width: 120 }}></th></tr></thead>
                        <tbody>
                            {(draft.customGroups || []).map(g => (
                                <tr key={g.id}>
                                    <td>{g.name}</td>
                                    <td>{g.include.map(nameOf).join(", ")}</td>
                                    <td>{g.exclude.length ? g.exclude.map(nameOf).join(", ") : <span className="fi-muted">—</span>}</td>
                                    <td className="fi-right">{cgCount(g).toLocaleString()}</td>
                                    <td className="fi-right">
                                        <button className="fi-linkbtn fi-linkbtn--blue" onClick={() => { setCg({ id: g.id, name: g.name, include: [...g.include], exclude: [...g.exclude] }); setCgQuery(""); }}>Edit</button>{" "}
                                        <button className="fi-linkbtn" onClick={() => { setDraft({ ...draft, customGroups: draft.customGroups.filter(x => x.id !== g.id) }); if (cg.id === g.id) setCg(emptyCg); }}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="fi-cg-editor">
                    <div className="fi-cg-head">
                        <input className="fi-input fi-cg-name" placeholder="Name, e.g. Civil + Fleet" value={cg.name} onChange={e => setCg({ ...cg, name: e.target.value })} aria-label="Combined group name" />
                        <input className="fi-input" placeholder={`Search ${groups.length} groups…`} value={cgQuery} onChange={e => setCgQuery(e.target.value)} aria-label="Search groups" />
                        <span className="fi-muted fi-small">{cg.include.length ? `${cgCount(cg).toLocaleString()} vehicles` : "tick the groups to include"}</span>
                        <Button type="secondary" onClick={cgCommit} disabled={!cgValid}>{cg.id ? "Update combined group" : "Add combined group"}</Button>
                        {(cg.id || cg.name || cg.include.length > 0) && <Button type="tertiary" onClick={() => { setCg(emptyCg); setCgQuery(""); }}>Clear</Button>}
                    </div>
                    <div className="fi-cg-pick">
                        <table className="fi-table fi-table--compact">
                            <thead><tr><th>Group</th><th style={{ width: 80, textAlign: "center" }}>Include</th><th style={{ width: 80, textAlign: "center" }}>Exclude</th></tr></thead>
                            <tbody>
                                {cgRows.slice(0, 300).map(g => (
                                    <tr key={g.id} className={cg.include.includes(g.id) ? "fi-cg-row--in" : cg.exclude.includes(g.id) ? "fi-cg-row--out" : ""}>
                                        <td>{g.path}</td>
                                        <td style={{ textAlign: "center" }}><input type="checkbox" aria-label={`Include ${g.path}`} checked={cg.include.includes(g.id)} onChange={() => cgToggle("include", g.id)} /></td>
                                        <td style={{ textAlign: "center" }}><input type="checkbox" aria-label={`Exclude ${g.path}`} checked={cg.exclude.includes(g.id)} onChange={() => cgToggle("exclude", g.id)} /></td>
                                    </tr>
                                ))}
                                {cgRows.length === 0 && <tr><td colSpan={3} className="fi-empty">No groups match.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
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
