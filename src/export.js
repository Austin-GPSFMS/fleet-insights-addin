/**
 * Scorecard exports — Excel (ExcelJS, styled like the customer scorecard PDF) and PDF
 * (a print-ready window; the browser's "Save as PDF" produces the file).
 *
 * Rows: one per subject (driver / vehicle / group), worst score first, banded by risk,
 * with one column per tracked rule (event counts), plus score, risk and distance.
 */
import ExcelJS from "exceljs";
import { fmtScore, fmtDistance, toDisplayDistance } from "./model.js";

const NAVY = "25477B", BLUE = "0084C2", INK = "1C2B39", LIGHT = "F4F4F4";
const BAND_FILL = { High: "F4CCCC", Medium: "FCE5CD", Low: null, "Low exposure": "EEEEEE" };

/** Build the flat table shared by both exporters. */
export function buildScorecardTable(opts) {
    const { rows, config, kind, subjectLabel, secondLabel } = opts;
    const rules = config.rules;
    const sorted = [...rows].sort((a, b) => {
        if (a.current == null && b.current == null) return 0;
        if (a.current == null) return 1;
        if (b.current == null) return -1;
        return a.current - b.current; // worst first
    });
    const header = [subjectLabel, secondLabel, "Score", "Risk", `Distance (${config.unit === "km" ? "km" : "mi"})`, ...rules.map(r => r.name)];
    const body = sorted.map(r => {
        const i = opts.periodIdx == null ? r.series.counts.length - 1 : opts.periodIdx;
        const counts = r.series.counts[i] || {};
        return {
            band: r.band,
            cells: [
                r.name,
                r.second || "",
                r.current == null ? null : Math.round(r.current),
                r.band,
                Math.round(toDisplayDistance(r.currentDistanceKm, config.unit)),
                ...rules.map(rl => counts[rl.id] || 0)
            ]
        };
    });
    return { header, body, rules, kind };
}

function titleLines({ database, scopeName, rangeText, config, kind }) {
    return [
        "GPSFMS Safety Scorecard",
        `${database} · ${scopeName} · ${rangeText} · by ${kind} · ${config.period === "week" ? `calendar week starting ${config.weekStart === 0 ? "Sunday" : "Monday"}` : config.period === "month" ? "calendar month" : "calendar day"}`,
        `Scores are out of 100 (higher is better). Low risk ≥ ${config.bands.low}, Medium ≥ ${config.bands.medium}, below that = High risk. ` +
        `Subjects under ${config.minDistance} ${config.unit === "km" ? "km" : "mi"} in the period are not scored.`
    ];
}

/* ------------------------------------ Excel ------------------------------------ */

export async function exportScorecardExcel(opts) {
    const { database, scopeName, rangeText, config } = opts;
    const table = buildScorecardTable(opts);
    const wb = new ExcelJS.Workbook();
    wb.creator = "GPSFMS Fleet Insights";
    const ws = wb.addWorksheet("Scorecard", { views: [{ state: "frozen", ySplit: 4 }], pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 } });

    const lines = titleLines({ ...opts, kind: table.kind });
    const nCols = table.header.length;
    ws.mergeCells(1, 1, 1, nCols); ws.getCell(1, 1).value = lines[0];
    ws.getCell(1, 1).font = { name: "Roboto", size: 16, bold: true, color: { argb: "FF" + NAVY } };
    ws.mergeCells(2, 1, 2, nCols); ws.getCell(2, 1).value = lines[1];
    ws.getCell(2, 1).font = { name: "Roboto", size: 10, color: { argb: "FF" + BLUE } };
    ws.mergeCells(3, 1, 3, nCols); ws.getCell(3, 1).value = lines[2];
    ws.getCell(3, 1).font = { name: "Roboto", size: 9, italic: true, color: { argb: "FF" + INK } };

    const headerRow = ws.getRow(4);
    table.header.forEach((h, i) => {
        const c = headerRow.getCell(i + 1);
        c.value = h;
        c.font = { name: "Roboto", bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + NAVY } };
        c.alignment = { vertical: "middle", horizontal: i >= 2 ? "center" : "left", wrapText: true };
        c.border = { bottom: { style: "thin", color: { argb: "FF" + BLUE } } };
    });
    headerRow.height = 32;

    table.body.forEach((r, idx) => {
        const row = ws.getRow(5 + idx);
        r.cells.forEach((v, i) => {
            const c = row.getCell(i + 1);
            c.value = v == null ? "—" : v;
            c.font = { name: "Roboto", size: 10, color: { argb: "FF" + INK }, bold: i === 2 };
            c.alignment = { horizontal: i >= 2 ? "center" : "left" };
            const fill = BAND_FILL[r.band];
            if (fill) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + fill } };
            else if (idx % 2 === 1) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + LIGHT } };
            if (i === 4) c.numFmt = "#,##0";
        });
    });

    ws.autoFilter = { from: { row: 4, column: 1 }, to: { row: 4 + table.body.length, column: nCols } };
    ws.getColumn(1).width = 28;
    ws.getColumn(2).width = 22;
    ws.getColumn(3).width = 9;
    ws.getColumn(4).width = 12;
    ws.getColumn(5).width = 13;
    for (let i = 6; i <= nCols; i++) ws.getColumn(i).width = Math.min(24, Math.max(12, table.header[i - 1].length * 0.9));

    // Scoring model sheet — the transparency GoAnalytics doesn't offer.
    const ms = wb.addWorksheet("Scoring model");
    ms.addRow(["Rule", "Weight %", `Events ${config.unit === "km" ? "per 1,000 km" : "per 1,000 mi"} that scores 0`]).font = { bold: true, color: { argb: "FFFFFFFF" } };
    ms.getRow(1).eachCell(c => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + NAVY } }; });
    for (const r of config.rules) ms.addRow([r.name, r.weight, r.maxRate]);
    ms.addRow([]);
    ms.addRow(["Formula"]).font = { bold: true, color: { argb: "FF" + BLUE } };
    ms.addRow([`rate(rule) = events ÷ distance × 1,000`]);
    ms.addRow([`subScore(rule) = 100 × max(0, 1 − rate ÷ maxRate)`]);
    ms.addRow([`score = Σ subScore(rule) × weight(rule) ÷ 100`]);
    ms.addRow([`Period: calendar ${config.period}${config.period === "week" ? ` starting ${config.weekStart === 0 ? "Sunday" : "Monday"}` : ""}; bands Low ≥ ${config.bands.low}, Medium ≥ ${config.bands.medium}; minimum exposure ${config.minDistance} ${config.unit}`]);
    ms.getColumn(1).width = 44; ms.getColumn(2).width = 12; ms.getColumn(3).width = 36;

    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    triggerDownload(blob, `${safe(database)}_safety-scorecard_${safe(table.kind)}_${stamp()}.xlsx`);
}

/* ------------------------------------- PDF ------------------------------------- */

export function exportScorecardPdf(opts) {
    const { config } = opts;
    const table = buildScorecardTable(opts);
    const lines = titleLines({ ...opts, kind: table.kind });
    const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(lines[0])}</title>
<style>
  @page { size: landscape; margin: 12mm; }
  body { font-family: Roboto, "Segoe UI", Arial, sans-serif; color: #${INK}; margin: 0; }
  .bar { background: #${NAVY}; color: #fff; padding: 10px 14px; display: flex; justify-content: space-between; align-items: baseline; }
  .bar h1 { margin: 0; font-size: 18px; font-weight: 700; }
  .bar .brand { font-size: 12px; opacity: .9; }
  .sub { color: #${BLUE}; font-size: 11px; margin: 8px 14px 2px; }
  .note { color: #${INK}; font-size: 9.5px; margin: 0 14px 8px; font-style: italic; }
  table { border-collapse: collapse; width: 100%; font-size: 10px; }
  th { background: #${NAVY}; color: #fff; text-align: center; padding: 6px 4px; font-weight: 600; font-size: 9px; }
  th:first-child, th:nth-child(2), td:first-child, td:nth-child(2) { text-align: left; white-space: nowrap; }
  td { padding: 4px 5px; text-align: center; border-bottom: 1px solid #e3e7ee; }
  td.score { font-weight: 700; }
  tr.High td { background: #f4cccc; } tr.Medium td { background: #fce5cd; } tr.lowexp td { background: #eeeeee; color: #667; }
  tr:nth-child(even):not(.High):not(.Medium):not(.lowexp) td { background: #${LIGHT}; }
  thead { display: table-header-group; } tr { page-break-inside: avoid; }
  .legend { margin: 10px 14px; font-size: 9.5px; display: flex; gap: 16px; align-items: center; }
  .sw { display: inline-block; width: 12px; height: 12px; vertical-align: middle; margin-right: 4px; border: 1px solid #ccc; }
  .model { margin: 10px 14px; font-size: 9.5px; color: #${INK}; }
  .model b { color: #${BLUE}; }
</style></head><body>
<div class="bar"><h1>${esc(lines[0])}</h1><span class="brand">GPS Fleet Management Solutions · Fleet Insights</span></div>
<div class="sub">${esc(lines[1])}</div>
<div class="note">${esc(lines[2])}</div>
<table><thead><tr>${table.header.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>
${table.body.map(r => `<tr class="${r.band === "Low exposure" ? "lowexp" : esc(r.band)}">${r.cells.map((v, i) => `<td class="${i === 2 ? "score" : ""}">${v == null ? "—" : esc(typeof v === "number" ? v.toLocaleString() : v)}</td>`).join("")}</tr>`).join("\n")}
</tbody></table>
<div class="legend"><span><i class="sw" style="background:#f4cccc"></i>High risk (&lt; ${config.bands.medium})</span><span><i class="sw" style="background:#fce5cd"></i>Medium (${config.bands.medium}–${config.bands.low - 1})</span><span><i class="sw" style="background:#fff"></i>Low (≥ ${config.bands.low})</span><span><i class="sw" style="background:#eee"></i>Not scored (low exposure)</span></div>
<div class="model"><b>Scoring model:</b> ${config.rules.map(r => `${esc(r.name)} ${r.weight}% (0 at ${r.maxRate}/1,000 ${config.unit === "km" ? "km" : "mi"})`).join(" · ")}. score = Σ 100 × max(0, 1 − rate ÷ maxRate) × weight.</div>
<script>window.addEventListener("load", function () { setTimeout(function () { window.print(); }, 150); });</script>
</body></html>`;
    const w = window.open("", "_blank");
    if (!w) throw new Error("The browser blocked the print window. Allow pop-ups for MyGeotab and try again.");
    w.document.open(); w.document.write(html); w.document.close();
}

/* ----------------------------------- helpers ----------------------------------- */

function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function safe(s) { return String(s || "").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "export"; }
function stamp() { return new Date().toISOString().slice(0, 10); }

export { fmtScore, fmtDistance };
