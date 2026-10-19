import { useMemo, useState } from "react";
import { Button } from "@geotab/zenith/dist/button/button";
import { Banner } from "@geotab/zenith/dist/banner/banner";
import { normalizeConfig, defaultBands } from "../model.js";

/** Default point suggestions by rule-name keyword (first match wins). */
const SUGGESTIONS = [
    [/phone|cell|handheld|mobile/i, 10],
    [/distract/i, 8],
    [/seat ?belt/i, 6],
    [/following|tailgat|headway/i, 5],
    [/speed/i, 4],
    [/harsh brak|hard brak/i, 3],
    [/harsh corner|hard corner/i, 3],
    [/harsh accel|hard accel|aggressive/i, 2],
    [/lens|obstruct|camera cover|tamper/i, 5],
    [/smok|vap/i, 4],
    [/drows|fatigue|yawn/i, 8],
    [/collision|crash|accident|impact/i, 25],
    [/stop sign|rolling stop/i, 4],
    [/lane/i, 3]
];

export function Settings({ config, rules, onSave, onCancel, saving, saveInfo }) {
    const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(config)));
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    const selected = useMemo(() => new Map(draft.rules.map(r => [r.id, r])), [draft.rules]);
    const visibleRules = useMemo(() => {
        const q = query.trim().toLowerCase();
        return rules.filter(r => !q || String(r.name).toLowerCase().includes(q));
    }, [rules, query]);

    const toggle = rule => {
        if (selected.has(rule.id)) setDraft({ ...draft, rules: draft.rules.filter(r => r.id !== rule.id) });
        else setDraft({ ...draft, rules: [...draft.rules, { id: rule.id, name: rule.name, points: suggestPoints(rule.name) }] });
    };
    const setPoints = (id, v) => setDraft({ ...draft, rules: draft.rules.map(r => (r.id === id ? { ...r, points: v } : r)) });
    const suggest = () => {
        const picks = rules.filter(r => SUGGESTIONS.some(([re]) => re.test(String(r.name))) && !/ignore|count/i.test(r.id));
        const merged = new Map(draft.rules.map(r => [r.id, r]));
        for (const r of picks) if (!merged.has(r.id)) merged.set(r.id, { id: r.id, name: r.name, points: suggestPoints(r.name) });
        setDraft({ ...draft, rules: [...merged.values()] });
    };

    const save = () => {
        const clean = normalizeConfig(draft);
        if (!clean.rules.length) { setError("Pick at least one rule to track."); return; }
        if (clean.rules.some(r => !(r.points > 0))) { setError("Every tracked rule needs points greater than zero."); return; }
        setError(null);
        onSave(clean);
    };

    const totalPts = draft.rules.reduce((a, r) => a + (Number(r.points) || 0), 0);

    return (
        <div className="fi-settings">
            <header className="fi-card-head">
                <div>
                    <h3>Scoring settings</h3>
                    <p className="fi-muted">Choose the exception rules to track and how many unsafe points each event is worth. Settings are saved to this database (AddInData) so everyone sees the same score.</p>
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
                        <h4>Tracked rules <span className="fi-muted">({draft.rules.length} selected · {totalPts} pts if one of each)</span></h4>
                        <div className="fi-actions">
                            <Button type="tertiary" onClick={suggest}>Suggest safety rules</Button>
                            <Button type="tertiary" onClick={() => setDraft({ ...draft, rules: [] })} disabled={!draft.rules.length}>Clear</Button>
                        </div>
                    </div>
                    {draft.rules.length > 0 && (
                        <table className="fi-table fi-table--compact">
                            <thead><tr><th>Rule</th><th className="fi-right" style={{ width: 120 }}>Points / event</th><th style={{ width: 70 }}></th></tr></thead>
                            <tbody>
                                {draft.rules.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.name}</td>
                                        <td className="fi-right"><input className="fi-input fi-input--num" type="number" min="0" step="0.5" value={r.points} onChange={e => setPoints(r.id, e.target.value)} /></td>
                                        <td className="fi-right"><button className="fi-linkbtn" onClick={() => toggle(r)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="fi-rule-picker">
                        <input className="fi-input" placeholder={`Search ${rules.length} rules…`} value={query} onChange={e => setQuery(e.target.value)} />
                        <ul className="fi-rule-list">
                            {visibleRules.map(r => (
                                <li key={r.id}>
                                    <label>
                                        <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r)} />
                                        <span>{r.name}</span>
                                        {r.baseType && <span className="fi-muted fi-small"> {baseTypeLabel(r.baseType)}</span>}
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
                                <option value="day">Daily</option>
                                <option value="week">Weekly (trailing 7 days)</option>
                                <option value="month">Monthly (trailing 30 days)</option>
                            </select>
                        </label>
                        <label className="fi-field">
                            <span>Periods shown</span>
                            <input className="fi-input fi-input--num" type="number" min="2" max="26" value={draft.periods} onChange={e => setDraft({ ...draft, periods: e.target.value })} />
                        </label>
                        <label className="fi-field">
                            <span>Normalize by</span>
                            <select className="fi-input" value={draft.normalization} onChange={e => {
                                const next = e.target.value;
                                const prevDefaults = defaultBands(draft.normalization);
                                const keepCustom = Number(draft.bands.low) !== prevDefaults.low || Number(draft.bands.medium) !== prevDefaults.medium;
                                setDraft({ ...draft, normalization: next, bands: keepCustom ? draft.bands : defaultBands(next) });
                            }}>
                                <option value="none">Nothing — raw unsafe points</option>
                                <option value="per100mi">Distance — points per 100 miles</option>
                                <option value="per1000km">Distance — points per 1,000 km</option>
                            </select>
                        </label>
                        <label className="fi-field">
                            <span>Distance unit</span>
                            <select className="fi-input" value={draft.unit} onChange={e => setDraft({ ...draft, unit: e.target.value })}>
                                <option value="miles">Miles</option>
                                <option value="km">Kilometres</option>
                            </select>
                        </label>
                        <div className="fi-field">
                            <span>Risk bands (per vehicle / driver / group score)</span>
                            <div className="fi-bands">
                                <label>Low ≤ <input className="fi-input fi-input--num" type="number" min="0" value={draft.bands.low} onChange={e => setDraft({ ...draft, bands: { ...draft.bands, low: e.target.value } })} /></label>
                                <label>Medium ≤ <input className="fi-input fi-input--num" type="number" min="0" value={draft.bands.medium} onChange={e => setDraft({ ...draft, bands: { ...draft.bands, medium: e.target.value } })} /></label>
                                <span className="fi-muted">above Medium = High</span>
                            </div>
                        </div>
                    </div>
                    <div className="fi-formula">
                        <h5>How the score is calculated</h5>
                        <code>score = Σ (events of rule × points of rule){draft.normalization === "per100mi" ? " ÷ miles × 100" : draft.normalization === "per1000km" ? " ÷ km × 1,000" : ""}</code>
                        <p className="fi-muted">Lower is better. Trend compares the current period with the one before it. Distance comes from MyGeotab trips in the same period{draft.normalization === "none" ? " (shown for context only)" : ""}.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export function suggestPoints(name) {
    for (const [re, pts] of SUGGESTIONS) if (re.test(String(name))) return pts;
    return 1;
}

function baseTypeLabel(bt) {
    return bt === "Custom" ? "" : `(${bt})`;
}
