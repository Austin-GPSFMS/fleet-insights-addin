/**
 * Headless end-to-end run against tests/harness.html (mocked MyGeotab API).
 * Run: node tests/e2e.mjs   (needs playwright + chromium; screenshots land in tests/shots/)
 */
import { createRequire } from "module";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import http from "http";
import { readFile } from "fs/promises";

const req = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = req("playwright")); }
catch { ({ chromium } = createRequire(process.env.PW_ROOT || "/opt/npm-tools/node_modules/")("playwright")); }

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
mkdirSync(join(here, "shots"), { recursive: true });

const server = http.createServer(async (rq, res) => {
    try {
        const p = join(root, decodeURIComponent(rq.url.split("?")[0]));
        const body = await readFile(p);
        res.setHeader("content-type", p.endsWith(".js") ? "text/javascript" : "text/html");
        res.end(body);
    } catch (e) { res.statusCode = 404; res.end("nope"); }
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;
const log = (...a) => console.log("•", ...a);
const browser = await chromium.launch();
const errors = [];

async function newPage(query = "") {
    const page = await browser.newPage({ viewport: { width: 1500, height: 1000 }, acceptDownloads: true });
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/tests/harness.html${query}`);
    await page.waitForFunction(() => window.__initialized);
    return page;
}

/* ===================== run 1: full flow, server supports dismiss ===================== */
let page = await newPage();

// 1) First run: no config -> Settings view opens; suggestions must total 100%.
await page.waitForSelector(".fi-settings", { timeout: 15000 });
log("settings opened on first run");
await page.click("button:has-text(\"Suggest safety rules\")");
const tracked = await page.$$eval(".fi-settings tbody tr", r => r.length);
const totalText = await page.$eval(".fi-total", e => e.textContent);
log("suggested rules:", tracked, "| weights:", totalText);
if (tracked < 6) throw new Error("expected suggestions to pick the safety rules");
if (!/^100% of 100%/.test(totalText)) throw new Error("weights should total 100 after suggest");
// break the total, make sure save refuses, then rebalance
await page.fill(".fi-settings tbody tr >> nth=0 >> input[type=number]", "50");
await page.click("button:has-text(\"Save settings\")");
await page.waitForSelector("text=Weights must total 100%");
log("save refused when weights ≠ 100");
await page.click("button:has-text(\"Rebalance to 100%\")");
await page.click("button:has-text(\"Show sensitivity\")");
await page.screenshot({ path: join(here, "shots/01-settings.png"), fullPage: true });
await page.click("button:has-text(\"Save settings\")");

// 2) Dashboard renders with 0–100 scores.
await page.waitForSelector(".fi-dash", { timeout: 60000 });
await page.waitForSelector(".fi-bar--current", { timeout: 60000 });
const kpis = await page.$$eval(".fi-kpi-value", els => els.map(e => e.textContent.trim()));
log("kpis:", kpis.join(" | "));
const fleetScore = parseInt(kpis[0], 10);
if (!(fleetScore >= 0 && fleetScore <= 100)) throw new Error("fleet score not on 0–100 scale");
await page.screenshot({ path: join(here, "shots/02-dashboard.png"), fullPage: true });

// Excluded device types: 60 GO9 trucks only — no battery trackers / untracked assets, no "Battery Trackers" group.
const vehTab = await page.$eval(".fi-tab:has-text('Vehicles')", e => e.textContent);
log("vehicles tab:", vehTab);
if (!/\(60\)/.test(vehTab)) throw new Error("battery trackers / untracked assets should be excluded from scoring");
const groupNames = await page.$$eval(".fi-perf tbody tr td:first-child", tds => tds.map(t => t.textContent));
if (groupNames.some(g => /Battery/.test(g))) throw new Error("Battery Trackers group should not appear");

// Period selector: switch to monthly × 3 ending Sep 30 → chart has 3 bars and the range text changes.
await page.selectOption(".fi-periodbar select", "month");
await page.fill(".fi-periodbar input[type=number]", "3");
await page.fill(".fi-periodbar input[type=date]", "2026-09-30");
await page.waitForFunction(() => document.querySelectorAll(".fi-dash .fi-bar-group").length === 3, null, { timeout: 60000 });
const subText = await page.$eval(".fi-sub", e => e.textContent);
log("period selector:", subText.slice(0, 60));
if (!/3 × 30 days/.test(subText) || !/9\/30\/2026/.test(subText)) throw new Error("period selector did not apply");
await page.click("button:has-text('Today')");
await page.selectOption(".fi-periodbar select", "week");
await page.fill(".fi-periodbar input[type=number]", "8");
await page.waitForFunction(() => document.querySelectorAll(".fi-dash .fi-bar-group").length === 8, null, { timeout: 60000 });

// Worst group first (default sort ascending by score) → Private Assets.
const firstGroup = await page.$eval(".fi-perf tbody tr td", td => td.textContent);
log("worst group:", firstGroup);
if (!/Private Assets/.test(firstGroup)) throw new Error("expected Private Assets to rank worst");

// 3) Drill into North Division.
await page.click(".fi-perf tbody tr:has-text('North Division')");
await page.waitForSelector(".fi-crumb--current:has-text('North Division')");
const kids = await page.$$eval(".fi-perf tbody tr", r => r.map(x => x.querySelector("td").textContent));
log("north children:", kids.join(" ; "));
if (!kids.some(k => /Yard/.test(k)) || !kids.some(k => /Crews/.test(k))) throw new Error("drill-down children missing");

// 4) Vehicles tab → open worst vehicle → dismiss one event via the API path.
await page.click(".fi-tab:has-text('Vehicles')");
await page.click(".fi-perf tbody tr >> nth=0");
await page.waitForSelector(".fi-drawer");
const before = await page.$$eval(".fi-drawer .fi-table-wrap--scroll tbody tr", r => r.length);
const scoreBefore = await page.$eval(".fi-drawer .fi-kpi-value", e => parseInt(e.textContent, 10));
log("drawer events before:", before, "score:", scoreBefore);
if (before < 1) throw new Error("expected at least one event to dismiss");
await page.click(".fi-drawer .fi-dismiss >> nth=0");
await page.click(".fi-drawer .fi-confirm--yes");
await page.waitForSelector(".fi-toast:has-text('dismissed in MyGeotab')");
await page.waitForFunction(n => document.querySelectorAll(".fi-drawer .fi-table-wrap--scroll tbody tr").length < n || document.querySelector(".fi-drawer .fi-empty"), before);
const after = await page.$$eval(".fi-drawer .fi-table-wrap--scroll tbody tr:not(:has(.fi-empty))", r => r.length);
const scoreAfter = await page.$eval(".fi-drawer .fi-kpi-value", e => parseInt(e.textContent, 10));
const sets = await page.evaluate(() => window.__mock.sets.map(s => ({ type: s.typeName, state: s.entity.state && s.entity.state.id })));
log("drawer events after:", after, "score:", scoreAfter, "| Set calls:", JSON.stringify(sets));
if (!sets.length || sets[0].state !== "ExceptionEventStateDismissedId") throw new Error("dismiss did not call Set ExceptionEvent with the Dismissed state");
if (!(after < before)) throw new Error("dismissed event still listed");
if (scoreAfter < scoreBefore) throw new Error("score should not drop after dismissing an event");
await page.screenshot({ path: join(here, "shots/03-vehicle-drawer.png"), fullPage: true });
const ruleMixBefore = await page.$eval(".fi-drawer .fi-card--flat:nth-of-type(3) tbody", e => e.textContent);
await page.click(".fi-drawer .fi-bar-group >> nth=0");
await page.waitForSelector(".fi-drawer h4:has-text('period starting')");
const kpiTitle = await page.$eval(".fi-drawer .fi-kpi-title", e => e.textContent);
const ruleMixAfter = await page.$eval(".fi-drawer .fi-card--flat:nth-of-type(3) tbody", e => e.textContent);
log("drawer period switch → kpi:", kpiTitle, "| rule mix changed:", ruleMixBefore !== ruleMixAfter);
if (!/period starting/.test(kpiTitle) || ruleMixBefore === ruleMixAfter) throw new Error("drawer KPIs / rule mix did not follow the selected period");
await page.click("button:has-text('Back to current')");
await page.waitForSelector(".fi-drawer .fi-kpi-title:has-text('Current score')");
await page.keyboard.press("Escape");
await page.waitForSelector(".fi-drawer", { state: "detached" });

// 5) Drivers tab (root scope) + exports: Excel download, PDF popup, CSV download.
await page.click(".fi-crumb--reset");
await page.waitForSelector(".fi-crumb--current:has-text('Company')");
await page.click(".fi-tab:has-text('Drivers')");
const drvRows = await page.$$eval(".fi-perf tbody tr", r => r.length);
log("driver rows:", drvRows);
if (drvRows < 20) throw new Error("expected ~25 drivers");
const drvSecond = await page.$eval(".fi-perf tbody tr td", td => td.textContent);
if (!/Truck/.test(drvSecond)) throw new Error("driver row should show current vehicle");
await page.click("text=Export ▾");
const [xlsx] = await Promise.all([page.waitForEvent("download"), page.click("text=Excel scorecard")]);
log("excel download:", xlsx.suggestedFilename());
const xlsxPath = join(here, "shots", xlsx.suggestedFilename());
await xlsx.saveAs(xlsxPath);
await page.click("text=Export ▾");
const [popup] = await Promise.all([page.waitForEvent("popup"), page.click("text=PDF scorecard")]);
await popup.waitForLoadState("domcontentloaded");
const pdfTitle = await popup.title();
const pdfRows = await popup.$$eval("tbody tr", r => r.length);
log("pdf print view:", pdfTitle, "| rows:", pdfRows);
if (!/Scorecard/.test(pdfTitle) || pdfRows < 20) throw new Error("print view missing rows");
await popup.emulateMedia({ media: "print" });
await popup.pdf({ path: join(here, "shots/04-scorecard-print.pdf"), landscape: true, printBackground: true });
await popup.close();
await page.click("text=Export ▾");
const [csv] = await Promise.all([page.waitForEvent("download"), page.click("text=CSV (this table)")]);
log("csv download:", csv.suggestedFilename());

// 6) Settings persisted & reloaded; v2 config survives.
await page.reload();
await page.waitForFunction(() => window.__initialized);
await page.waitForSelector(".fi-dash", { timeout: 60000 });
log("config reloaded from database on refresh");
await page.close();

/* ===================== run 2: server without a Dismissed state → local hide ===================== */
page = await newPage("?nodismiss=1");
await page.waitForSelector(".fi-settings", { timeout: 15000 });
await page.click("button:has-text(\"Suggest safety rules\")");
await page.click("button:has-text(\"Save settings\")");
await page.waitForSelector(".fi-bar--current", { timeout: 60000 });
await page.click(".fi-tab:has-text('Vehicles')");
await page.click(".fi-perf tbody tr >> nth=0");
await page.waitForSelector(".fi-drawer .fi-dismiss");
const b2 = await page.$$eval(".fi-drawer .fi-table-wrap--scroll tbody tr", r => r.length);
await page.click(".fi-drawer .fi-dismiss >> nth=0");
await page.click(".fi-drawer .fi-confirm--yes");
await page.waitForSelector(".fi-toast--warn");
const toast = await page.$eval(".fi-toast--warn", e => e.textContent);
log("fallback toast:", toast.slice(0, 90) + "…");
await page.waitForFunction(n => document.querySelectorAll(".fi-drawer .fi-table-wrap--scroll tbody tr").length < n || document.querySelector(".fi-drawer .fi-empty"), b2);
await page.keyboard.press("Escape");
await page.waitForSelector(".fi-sub:has-text('hidden locally')");
log("hidden-locally indicator shown");
await page.reload();
await page.waitForFunction(() => window.__initialized);
await page.waitForSelector(".fi-sub:has-text('hidden locally')", { timeout: 60000 });
log("hidden list persisted via AddInData across reload");
await page.close();

await browser.close();
server.close();
if (errors.length) { console.error("CONSOLE ERRORS:\n" + errors.join("\n")); process.exit(1); }
console.log("\nE2E OK");
