/**
 * Small hand-rolled SVG charts. One series per chart, one axis, thin marks,
 * hover tooltips, direct label on the current period only.
 */
import { useState } from "react";
import { fmtScore, fmtPct, fmtDelta } from "../model.js";

/** Vertical bars: one value per period. Highlights the last (current) bar. */
export function BarTrend({ values, labels, height = 180, width = 1100, unitLabel = "", onSelect, selected, max: fixedMax, bands, colorByBand }) {
    const [hover, setHover] = useState(null);
    const n = values.length;
    const w = width, h = height, padL = 40, padR = 8, padT = 20, padB = 26;
    const plotW = w - padL - padR, plotH = h - padT - padB;
    const nums = values.map(v => (v == null ? 0 : v));
    const max = fixedMax || Math.max(1, ...nums);
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
                                      className={`fi-bar ${isCur ? "fi-bar--current" : ""} ${isSel ? "fi-bar--selected" : ""} ${v == null ? "fi-bar--na" : ""} ${colorByBand && bands && v != null ? `fi-bar--${v >= bands.low ? "ok" : v >= bands.medium ? "warn" : "bad"}` : ""}`} />
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
                {bands && bands.low <= max && (
                    <g>
                        <line x1={padL} x2={w - padR} y1={yFor(bands.low)} y2={yFor(bands.low)} className="fi-band-line fi-band-line--low" />
                        <text x={padL + 4} y={yFor(bands.low) - 3} className="fi-band-text" textAnchor="start">Low risk ≥ {bands.low}</text>
                    </g>
                )}
                {bands && bands.medium < bands.low && (
                    <g>
                        <line x1={padL} x2={w - padR} y1={yFor(bands.medium)} y2={yFor(bands.medium)} className="fi-band-line fi-band-line--med" />
                        <text x={padL + 4} y={yFor(bands.medium) - 3} className="fi-band-text" textAnchor="start">Medium ≥ {bands.medium}</text>
                    </g>
                )}
            </svg>
            {hover != null && (
                <div className="fi-tip">
                    <strong>{hover === n - 1 ? "Current period" : labels[hover]}</strong>
                    <span>{values[hover] == null ? "Not scored (low exposure)" : `${fmtScore(values[hover])} ${unitLabel}`}</span>
                    {hover > 0 && values[hover] != null && values[hover - 1] != null && (
                        <span className="fi-tip-sub">vs previous: {fmtDelta(values[hover] - values[hover - 1])} pts</span>
                    )}
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
    const n = nums.length;
    const lo = Math.min(...nums), hi = Math.max(...nums);
    const span = hi - lo || 1;
    const stepX = n > 1 ? width / (n - 1) : width;
    const y = v => height - 3 - ((v - lo) / span) * (height - 6);
    const pts = nums.map((v, i) => `${(i * stepX).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    return (
        <svg width={width} height={height} className="fi-spark" aria-hidden="true">
            <polyline points={pts} fill="none" className="fi-spark-line" />
            <circle cx={(n - 1) * stepX} cy={y(nums[n - 1])} r="2.5" className="fi-spark-dot" />
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

/**
 * Trend indicator. `goodWhen` says which direction is good: "up" for scores (higher is better),
 * "down" for event counts. Pass `delta` (absolute points) instead of `pct` for 0–100 scores.
 */
export function Trend({ pct: v, delta, goodWhen = "down" }) {
    const useDelta = delta !== undefined;
    const val = useDelta ? delta : v;
    if (val == null) return <span className="fi-trend fi-trend--flat">—</span>;
    const r = useDelta ? Math.round(val * 10) / 10 : Math.round(val);
    if (r === 0) return <span className="fi-trend fi-trend--flat">{useDelta ? "±0" : "0%"}</span>;
    const up = r > 0;
    const good = goodWhen === "up" ? up : !up;
    const text = useDelta ? `${Math.abs(r).toLocaleString(undefined, { maximumFractionDigits: 1 })} pts` : `${Math.abs(r)}%`;
    return (
        <span className={`fi-trend ${good ? "fi-trend--good" : "fi-trend--bad"}`} title={good ? "Better than previous period" : "Worse than previous period"}>
            {up ? "▲" : "▼"} {text}
        </span>
    );
}

export function BandPill({ band }) {
    const cls = band === "Low" ? "ok" : band === "Medium" ? "warn" : band === "High" ? "bad" : "na";
    const label = band === "Low" ? "Low risk" : band === "Medium" ? "Medium risk" : band === "High" ? "High risk" : band;
    return <span className={`fi-pill fi-pill--${cls}`}>{label}</span>;
}
