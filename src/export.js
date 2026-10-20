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
    const { rows, config, kind, subjectLabel, groupLabel, secondLabel } = opts;
    const rules = config.rules;
    const sorted = [...rows].sort((a, b) => {
        if (a.current == null && b.current == null) return 0;
        if (a.current == null) return 1;
        if (b.current == null) return -1;
        return a.current - b.current; // worst first
    });
    const extra = [];           // optional identity columns between the subject and the score
    if (groupLabel) extra.push({ label: groupLabel, get: r => r.group || "" });
    if (secondLabel) extra.push({ label: secondLabel, get: r => r.second || "" });
    const header = [subjectLabel, ...extra.map(e => e.label), "Score", "Risk", `Distance (${config.unit === "km" ? "km" : "mi"})`, ...rules.map(r => r.name)];
    const textCols = 1 + extra.length;  // columns that are left-aligned text
    const body = sorted.map(r => {
        const i = opts.periodIdx == null ? r.series.counts.length - 1 : opts.periodIdx;
        const counts = r.series.counts[i] || {};
        return {
            band: r.band,
            cells: [
                r.name,
                ...extra.map(e => e.get(r)),
                r.current == null ? null : Math.round(r.current),
                r.band,
                Math.round(toDisplayDistance(r.currentDistanceKm, config.unit)),
                ...rules.map(rl => counts[rl.id] || 0)
            ]
        };
    });
    return { header, body, rules, kind, textCols };
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

/** Write one scorecard table into a worksheet starting at `startRow` (1-based). Returns next free row. */
function writeTable(ws, table, startRow, heading) {
    let r = startRow;
    const nCols = table.header.length;
    if (heading) {
        ws.mergeCells(r, 1, r, nCols);
        const hc = ws.getCell(r, 1);
        hc.value = heading;
        hc.font = { name: "Roboto", size: 12, bold: true, color: { argb: "FF" + BLUE } };
        r++;
    }
    const headerRow = ws.getRow(r);
    table.header.forEach((h, i) => {
        const c = headerRow.getCell(i + 1);
        c.value = h;
        c.font = { name: "Roboto", bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + NAVY } };
        c.alignment = { vertical: "middle", horizontal: i >= table.textCols ? "center" : "left", wrapText: true };
        c.border = { bottom: { style: "thin", color: { argb: "FF" + BLUE } } };
    });
    headerRow.height = 32;
    const headerRowIdx = r;
    r++;
    table.body.forEach((row, idx) => {
        const xr = ws.getRow(r++);
        row.cells.forEach((v, i) => {
            const c = xr.getCell(i + 1);
            c.value = v == null ? "—" : v;
            c.font = { name: "Roboto", size: 10, color: { argb: "FF" + INK }, bold: i === table.textCols };
            c.alignment = { horizontal: i >= table.textCols ? "center" : "left" };
            const fill = BAND_FILL[row.band];
            if (fill) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + fill } };
            else if (idx % 2 === 1) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + LIGHT } };
            if (i === table.textCols + 2) c.numFmt = "#,##0";
        });
    });
    if (table.body.length === 0) { ws.getCell(r++, 1).value = "No rows."; }
    return { next: r + 1, headerRowIdx, lastRowIdx: r - 1 };
}

function sizeColumns(ws, table) {
    const nCols = table.header.length;
    ws.getColumn(1).width = Math.max(ws.getColumn(1).width || 0, 28);
    for (let i = 2; i <= table.textCols; i++) ws.getColumn(i).width = Math.max(ws.getColumn(i).width || 0, 24);
    ws.getColumn(table.textCols + 1).width = Math.max(ws.getColumn(table.textCols + 1).width || 0, 9);
    ws.getColumn(table.textCols + 2).width = Math.max(ws.getColumn(table.textCols + 2).width || 0, 12);
    ws.getColumn(table.textCols + 3).width = Math.max(ws.getColumn(table.textCols + 3).width || 0, 13);
    for (let i = table.textCols + 4; i <= nCols; i++) ws.getColumn(i).width = Math.max(ws.getColumn(i).width || 0, Math.min(24, Math.max(12, table.header[i - 1].length * 0.9)));
}

function writeTitle(ws, lines, nCols) {
    ws.mergeCells(1, 1, 1, nCols); ws.getCell(1, 1).value = lines[0];
    ws.getCell(1, 1).font = { name: "Roboto", size: 16, bold: true, color: { argb: "FF" + NAVY } };
    ws.mergeCells(2, 1, 2, nCols); ws.getCell(2, 1).value = lines[1];
    ws.getCell(2, 1).font = { name: "Roboto", size: 10, color: { argb: "FF" + BLUE } };
    ws.mergeCells(3, 1, 3, nCols); ws.getCell(3, 1).value = lines[2];
    ws.getCell(3, 1).font = { name: "Roboto", size: 9, italic: true, color: { argb: "FF" + INK } };
}

const usedSheetNames = new Set();
function sheetName(base) {
    let n = String(base || "Sheet").replace(/[\[\]\*\?\/\\:]/g, " ").trim().slice(0, 28) || "Sheet";
    let candidate = n, i = 2;
    while (usedSheetNames.has(candidate.toLowerCase())) candidate = `${n.slice(0, 25)} (${i++})`;
    usedSheetNames.add(candidate.toLowerCase());
    return candidate;
}

/**
 * opts: the main table (rows/kind/labels) plus optional `sections`:
 *   [{ title, vehicles: {rows, subjectLabel, groupLabel, secondLabel}, drivers: {...} }]
 * Each section becomes its own sheet with the vehicle scorecard followed by the driver scorecard.
 */
export async function exportScorecardExcel(opts) {
    const { database, config, sections = [] } = opts;
    usedSheetNames.clear();
    const table = buildScorecardTable(opts);
    const wb = new ExcelJS.Workbook();
    wb.creator = "GPSFMS Fleet Insights";
    const ws = wb.addWorksheet(sheetName(sections.length ? "Summary" : "Scorecard"), { views: [{ state: "frozen", ySplit: 4 }], pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 } });
    const lines = titleLines({ ...opts, kind: table.kind });
    writeTitle(ws, lines, table.header.length);
    const w = writeTable(ws, table, 4);
    ws.autoFilter = { from: { row: w.headerRowIdx, column: 1 }, to: { row: w.lastRowIdx, column: table.header.length } };
    sizeColumns(ws, table);

    for (const sec of sections) {
        const sws = wb.addWorksheet(sheetName(sec.title), { pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 } });
        const vt = buildScorecardTable({ ...opts, ...sec.vehicles, kind: "vehicles" });
        const dt = buildScorecardTable({ ...opts, ...sec.drivers, kind: "drivers" });
        const nCols = Math.max(vt.header.length, dt.header.length);
        writeTitle(sws, titleLines({ ...opts, scopeName: sec.title, kind: "vehicles & drivers" }), nCols);
        let row = 4;
        const a = writeTable(sws, vt, row, `Vehicles — ${sec.title} (${vt.body.length})`);
        row = a.next;
        writeTable(sws, dt, row, `Drivers — ${sec.title} (${dt.body.length})`);
        sizeColumns(sws, vt); sizeColumns(sws, dt);
    }

    // Scoring model sheet — the transparency GoAnalytics doesn't offer.
    const ms = wb.addWorksheet(sheetName("Scoring model"));
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

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

function tableHtml(table, heading) {
    return `${heading ? `<h2 class="sec">${esc(heading)}</h2>` : ""}
<table><thead><tr>${table.header.map((h, i) => `<th class="${i < table.textCols ? "t" : ""}">${esc(h)}</th>`).join("")}</tr></thead><tbody>
${table.body.map(r => `<tr class="${r.band === "Low exposure" ? "lowexp" : esc(r.band)}">${r.cells.map((v, i) => `<td class="${i < table.textCols ? "t" : ""} ${i === table.textCols ? "score" : ""}">${v == null ? "—" : esc(typeof v === "number" ? v.toLocaleString() : v)}</td>`).join("")}</tr>`).join("\n")}
${table.body.length === 0 ? `<tr><td colspan="${table.header.length}" class="t">No rows.</td></tr>` : ""}
</tbody></table>`;
}

export function exportScorecardPdf(opts) {
    const { config, sections = [] } = opts;
    const table = buildScorecardTable(opts);
    const lines = titleLines({ ...opts, kind: table.kind });
    const sectionHtml = sections.map(sec => {
        const vt = buildScorecardTable({ ...opts, ...sec.vehicles, kind: "vehicles" });
        const dt = buildScorecardTable({ ...opts, ...sec.drivers, kind: "drivers" });
        return `<div class="section"><h1 class="loc">${esc(sec.title)}</h1>${tableHtml(vt, `Vehicles (${vt.body.length})`)}${tableHtml(dt, `Drivers (${dt.body.length})`)}</div>`;
    }).join("\n");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(lines[0])}</title>
<style>
  @page { size: landscape; margin: 12mm; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
  body { font-family: Roboto, "Segoe UI", Arial, sans-serif; color: #${INK}; margin: 0; }
  .bar { background: #${NAVY}; color: #fff; padding: 10px 14px; display: flex; justify-content: space-between; align-items: baseline; }
  .bar h1 { margin: 0; font-size: 18px; font-weight: 700; }
  .bar .brand { font-size: 12px; opacity: .9; }
  .sub { color: #${BLUE}; font-size: 11px; margin: 8px 14px 2px; }
  .note { color: #${INK}; font-size: 9.5px; margin: 0 14px 8px; font-style: italic; }
  table { border-collapse: collapse; width: 100%; font-size: 10px; margin-bottom: 10px; }
  th { background: #${NAVY}; color: #fff; text-align: center; padding: 6px 4px; font-weight: 600; font-size: 9px; }
  th.t, td.t { text-align: left; white-space: nowrap; }
  td { padding: 4px 5px; text-align: center; border-bottom: 1px solid #e3e7ee; }
  td.score { font-weight: 700; }
  tr.High td { background: #f4cccc; } tr.Medium td { background: #fce5cd; } tr.lowexp td { background: #eeeeee; color: #667; }
  tr:nth-child(even):not(.High):not(.Medium):not(.lowexp) td { background: #${LIGHT}; }
  thead { display: table-header-group; } tr { page-break-inside: avoid; }
  .legend { margin: 10px 14px; font-size: 9.5px; display: flex; gap: 16px; align-items: center; }
  .sw { display: inline-block; width: 12px; height: 12px; vertical-align: middle; margin-right: 4px; border: 1px solid #ccc; }
  .model { margin: 10px 14px; font-size: 9.5px; color: #${INK}; }
  .model b { color: #${BLUE}; }
  .section { page-break-before: always; padding-top: 6px; }
  h1.loc { font-size: 15px; color: #${NAVY}; margin: 6px 0 4px; border-bottom: 2px solid #${BLUE}; padding-bottom: 4px; }
  h2.sec { font-size: 11.5px; color: #${BLUE}; margin: 8px 0 4px; font-weight: 600; }
  @media print { .noprint { display: none; } }
</style></head><body>
<div class="bar"><h1>${esc(lines[0])}</h1><span class="brand">GPS Fleet Management Solutions · Fleet Insights</span></div>
<div class="sub">${esc(lines[1])}</div>
<div class="note">${esc(lines[2])} <span class="noprint">If the rows print without colour, turn on "Background graphics" in the print dialog's More settings.</span></div>
${tableHtml(table)}
<div class="legend"><span><i class="sw" style="background:#f4cccc"></i>High risk (&lt; ${config.bands.medium})</span><span><i class="sw" style="background:#fce5cd"></i>Medium (${config.bands.medium}–${config.bands.low - 1})</span><span><i class="sw" style="background:#fff"></i>Low (≥ ${config.bands.low})</span><span><i class="sw" style="background:#eee"></i>Not scored (low exposure)</span></div>
<div class="model"><b>Scoring model:</b> ${config.rules.map(r => `${esc(r.name)} ${r.weight}% (0 at ${r.maxRate}/1,000 ${config.unit === "km" ? "km" : "mi"})`).join(" · ")}. score = Σ 100 × max(0, 1 − rate ÷ maxRate) × weight.</div>
${sectionHtml}
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
