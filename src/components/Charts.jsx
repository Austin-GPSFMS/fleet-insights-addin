/**
 * Small hand-rolled SVG charts. One series per chart, one axis, thin marks,
 * hover tooltips, direct label on the current period only.
 */
import { useState } from "react";
import { fmtScore, fmtPct } from "../model.js";

/** Vertical bars: one value per period. Highlights the last (current) bar. */
export function BarTrend({ values, labels, height = 180, width = 1100, unitLabel = "", onSelect, selected }) {
    const [hover, setHover] = useState(null);
    const n = values.length;
    const w = width, h = height, padL = 40, padR = 8, padT = 20, padB = 26;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    const nums = values.map(v => (v == null ? 0 : v));
    const max = Math.max(1, ...nums);
    const step = plotW / Math.max(n, 1);
    const barW = Math.max(6, Math.min(56, step * 0.5));
    const yFor = v => padT + plotH - (v / max) * plotH;
    const ticks = niceTicks(max, 4);

    return (
        <div className="fi-chart">
            <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label="Score by period">
                {ticks.map(t => (
                    <g key={t}>
                        <line x1={padL} x2={w - padR} y1={yFor(t)} y2={yFor(t)} className="fi-grid" />
                        <text x={padL - 6} y={yFor(t) + 3} className="fi-axis" textAnchor="end">{fmtScore(t)}</text>
                    </g>
                ))}
                <line x1={padL} x2={w - padR} y1={yFor(0)} y2={yFor(0)} className="fi-baseline" />
                {values.map((v, i) => {
                    const x = padL + i * step + (step - barW) / 2;
                    const val = v == null ? 0 : v;
                    const y = yFor(val);
                    const isCur = i === n - 1;
                    const isSel = selected === i;
                    const barH = Math.max(0, yFor(0) - y);
                    return (
                        <g key={i} className="fi-bar-group"
                           onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                           onClick={() => onSelect && onSelect(i)} style={{ cursor: onSelect ? "pointer" : "default" }}>
                            <rect x={padL + i * step} y={padT} width={step} height={plotH} fill="transparent" />
                            {barH > 0 && (
                                <path d={roundedTop(x, y, barW, barH, 4)}
                                      className={`fi-bar ${isCur ? "fi-bar--current" : ""} ${isSel ? "fi-bar--selected" : ""} ${v == null ? "fi-bar--na" : ""}`} />
                            )}
                            {(isCur || hover === i) && (
                                <text x={x + barW / 2} y={Math.min(y - 6, yFor(0) - 6)} className="fi-label" textAnchor="middle">
                                    {v == null ? "n/a" : fmtScore(v)}
                                </text>
                            )}
                            <text x={padL + i * step + step / 2} y={h - 8} className={`fi-axis ${isCur ? "fi-axis--strong" : ""}`} textAnchor="middle">
                                {isCur ? "Current" : labels[i]}
                            </text>
                        </g>
                    );
                })}
            </svg>
            {hover != null && (
                <div className="fi-tip">
                    <strong>{hover === n - 1 ? "Current period" : labels[hover]}</strong>
                    <span>{values[hover] == null ? "No exposure" : `${fmtScore(values[hover])} ${unitLabel}`}</span>
                    {hover > 0 && <span className="fi-tip-sub">vs previous: {fmtPct(pct(values[hover], values[hover - 1]))}</span>}
                </div>
            )}
        </div>
    );
}

function pct(a, b) {
    if (a == null || b == null) return null;
    if (b === 0) return a === 0 ? 0 : null;
    return ((a - b) / b) * 100;
}

function roundedTop(x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h);
    return `M${x},${y + h} V${y + rr} Q${x},${y} ${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h} Z`;
}

function niceTicks(max, count) {
    const raw = max / count;
    const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
    const norm = raw / mag;
    const stepN = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
    const step = stepN * mag;
    const out = [];
    for (let v = 0; v <= max + 1e-9; v += step) out.push(Number(v.toFixed(6)));
    if (out[out.length - 1] < max) out.push(Number((out[out.length - 1] + step).toFixed(6)));
    return out;
}

/** Tiny inline sparkline for table rows. */
export function Sparkline({ values, width = 90, height = 22 }) {
    const nums = values.map(v => (v == null ? 0 : v));
    const max = Math.max(1, ...nums);
    const n = nums.length;
    const stepX = n > 1 ? width / (n - 1) : width;
    const pts = nums.map((v, i) => `${(i * stepX).toFixed(1)},${(height - 2 - (v / max) * (height - 4)).toFixed(1)}`).join(" ");
    return (
        <svg width={width} height={height} className="fi-spark" aria-hidden="true">
            <polyline points={pts} fill="none" className="fi-spark-line" />
            <circle cx={(n - 1) * stepX} cy={height - 2 - (nums[n - 1] / max) * (height - 4)} r="2.5" className="fi-spark-dot" />
        </svg>
    );
}

/** Horizontal magnitude bar for table cells (relative to the column max). */
export function HBar({ value, max, label, tone = "neutral" }) {
    const pctW = max > 0 && value != null ? Math.max(1.5, (value / max) * 100) : 0;
    return (
        <div className="fi-hbar">
            <div className={`fi-hbar-fill fi-hbar--${tone}`} style={{ width: `${pctW}%` }} />
            <span className="fi-hbar-label">{label != null ? label : fmtScore(value)}</span>
        </div>
    );
}

/** Trend indicator: for a "lower is better" score, an increase is bad. */
export function Trend({ pct: v, invert = false }) {
    if (v == null) return <span className="fi-trend fi-trend--flat">—</span>;
    const r = Math.round(v);
    if (r === 0) return <span className="fi-trend fi-trend--flat">0%</span>;
    const up = r > 0;
    const bad = invert ? !up : up;
    return (
        <span className={`fi-trend ${bad ? "fi-trend--bad" : "fi-trend--good"}`} title={bad ? "Worse than previous period" : "Better than previous period"}>
            {up ? "▲" : "▼"} {Math.abs(r)}%
        </span>
    );
}

export function BandPill({ band }) {
    const cls = band === "Low" ? "ok" : band === "Medium" ? "warn" : band === "High" ? "bad" : "na";
    return <span className={`fi-pill fi-pill--${cls}`}>{band}</span>;
}
