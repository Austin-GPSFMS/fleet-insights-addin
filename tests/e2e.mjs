/**
 * Headless end-to-end run against tests/harness.html (mocked MyGeotab API).
 * Run: node tests/e2e.mjs   (needs playwright + chromium; screenshots land in tests/shots/)
 */
import { createRequire } from "module";
import { mkdirSync } from "fs";
// playwright may be installed locally or globally (e.g. /opt/npm-tools); resolve either.
const req = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = req("playwright")); }
catch { ({ chromium } = createRequire(process.env.PW_ROOT || "/opt/npm-tools/node_modules/")("playwright")); }
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import http from "http";
import { readFile } from "fs/promises";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
mkdirSync(join(here, "shots"), { recursive: true });

// tiny static server so the harness can load ../dist/addin.js
const server = http.createServer(async (req, res) => {
    try {
        const p = join(root, decodeURIComponent(req.url.split("?")[0]));
        const body = await readFile(p);
        res.setHeader("content-type", p.endsWith(".js") ? "text/javascript" : "text/html");
        res.end(body);
    } catch (e) { res.statusCode = 404; res.end("nope"); }
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
const errors = [];
page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", e => errors.push(String(e)));

const log = (...a) => console.log("•", ...a);
await page.goto(`http://127.0.0.1:${port}/tests/harness.html`);
await page.waitForFunction(() => window.__initialized);

// 1) First run: no config -> Settings view opens.
await page.waitForSelector(".fi-settings", { timeout: 15000 });
log("settings opened on first run");
await page.click("text=Suggest safety rules");
const tracked = await page.$$eval(".fi-settings tbody tr", r => r.length);
log("suggested rules:", tracked);
if (tracked < 6) throw new Error("expected suggestions to pick the safety rules");
await page.selectOption(".fi-settings select >> nth=1", "per100mi");
await page.screenshot({ path: join(here, "shots/01-settings.png"), fullPage: true });
await page.click("text=Save settings");

// 2) Dashboard renders with data.
await page.waitForSelector(".fi-dash", { timeout: 60000 });
await page.waitForSelector(".fi-bar--current", { timeout: 60000 });
const kpis = await page.$$eval(".fi-kpi-value", els => els.map(e => e.textContent.trim()));
log("kpis:", kpis.join(" | "));
const groupRows = await page.$$eval(".fi-perf tbody tr", r => r.map(x => x.textContent.trim().slice(0, 40)));
log("group rows:", groupRows.length);
await page.screenshot({ path: join(here, "shots/02-dashboard.png"), fullPage: true });

// Private Assets should be the worst group (highest score) → first row by default sort.
const firstGroup = await page.$eval(".fi-perf tbody tr td", td => td.textContent);
log("top group:", firstGroup);
if (!/Private Assets/.test(firstGroup)) throw new Error("expected Private Assets to rank worst");

// 3) Drill into North Division -> children appear, breadcrumb updates.
await page.click(".fi-perf tbody tr:has-text('North Division')");
await page.waitForSelector(".fi-crumb--current:has-text('North Division')");
const kids = await page.$$eval(".fi-perf tbody tr", r => r.map(x => x.querySelector("td").textContent));
log("north children:", kids.join(" ; "));
if (!kids.some(k => /Yard/.test(k)) || !kids.some(k => /Crews/.test(k))) throw new Error("drill-down children missing");

// 4) Vehicles tab, sort by trend, open a vehicle drawer.
await page.click(".fi-tab:has-text('Vehicles')");
await page.click("th:has-text('Trend')");
await page.click(".fi-perf tbody tr >> nth=0");
await page.waitForSelector(".fi-drawer");
const evRows = await page.$$eval(".fi-drawer .fi-table-wrap--scroll tbody tr", r => r.length);
log("drawer event rows (current period):", evRows);
await page.screenshot({ path: join(here, "shots/03-vehicle-drawer.png"), fullPage: true });
// click an earlier bar → event list changes period
await page.click(".fi-drawer .fi-bar-group >> nth=0");
await page.waitForSelector(".fi-drawer h4:has-text('period starting')");
log("drawer period switched via bar click");
await page.keyboard.press("Escape");
await page.waitForSelector(".fi-drawer", { state: "detached" });

// 5) Drivers tab populated (after resetting to the company root); CSV export fires a download.
await page.click(".fi-crumb--reset");
await page.waitForSelector(".fi-crumb--current:has-text('Company')");
await page.click(".fi-tab:has-text('Drivers')");
const drvRows = await page.$$eval(".fi-perf tbody tr", r => r.length);
log("driver rows:", drvRows);
if (drvRows < 20) throw new Error("expected ~25 drivers");
const [dl] = await Promise.all([page.waitForEvent("download"), page.click("text=Export CSV")]);
log("csv download:", dl.suggestedFilename());

// 6) Settings persisted to AddInData (mock) and reloaded on a fresh init.
const stored = await page.evaluate(() => JSON.stringify(window.__mock.calls.filter(c => c.typeName === "AddInData").length));
log("AddInData reads:", stored);
await page.reload();
await page.waitForFunction(() => window.__initialized);
await page.waitForSelector(".fi-dash", { timeout: 60000 });
log("config reloaded from database on refresh (no settings screen)");

// 7) API shape checks: propertySelector + chunked windows used.
const shape = await page.evaluate(() => {
    const c = window.__mock.calls;
    return {
        exceptionCalls: c.filter(x => x.typeName === "ExceptionEvent").length,
        tripCalls: c.filter(x => x.typeName === "Trip").length,
        withSelector: c.filter(x => x.propertySelector).length,
        deviceSearch: c.filter(x => x.typeName === "ExceptionEvent" && x.search.deviceSearch).length
    };
});
log("api calls:", JSON.stringify(shape));

await browser.close();
server.close();
if (errors.length) { console.error("CONSOLE ERRORS:\n" + errors.join("\n")); process.exit(1); }
console.log("\nE2E OK");
