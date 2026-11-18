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

// "Report by" lives on the dashboard: the suggestion button picks Locations and saves it.
await page.waitForSelector(".fi-reportby");
const hint = await page.$eval(".fi-reportby", e => e.textContent);
log("report-by:", hint.trim().slice(0, 60));
await page.click(".fi-linkbtn--blue");
await page.waitForSelector(".fi-crumb--current:has-text('Locations')");
await page.waitForSelector(".fi-toast:has-text('Reporting by Locations')");
const homeRows = await page.$$eval(".fi-perf tbody tr td:first-child", tds => tds.map(t => t.textContent));
log("home rows:", homeRows.join(" | "));
if (!homeRows.some(r => /Southern California Division/.test(r)) || !homeRows.some(r => /^Unassigned vehicles/.test(r))) throw new Error("home node should list Locations divisions + Unassigned vehicles");
const crumb = await page.$eval(".fi-crumbs", e => e.textContent);
if (!/Locations/.test(crumb)) throw new Error("breadcrumb should end at Locations");
await page.click(".fi-perf tbody tr:has-text('Unassigned vehicles')");
await page.waitForSelector(".fi-chip--filter");
const unassignedCount = await page.$$eval(".fi-perf tbody tr", r => r.length);
log("unassigned vehicles listed:", unassignedCount);
if (unassignedCount !== 15) throw new Error("expected 15 unassigned vehicles (a quarter of 60)");
await page.click(".fi-chip--filter .fi-linkbtn");
// Clicking a division (leaf group) jumps straight to its vehicles; the row's "drivers" link goes to drivers.
await page.click(".fi-tab:has-text('Groups')");
await page.click(".fi-perf tbody tr:has-text('Oregon division')");
await page.waitForSelector(".fi-crumb--current:has-text('Oregon')");
const landedTab = await page.$eval(".fi-tab--on", e => e.textContent);
log("after clicking Oregon division:", landedTab);
if (!/Vehicles \(15\)/.test(landedTab)) throw new Error("leaf group click should land on its 15 vehicles");
await page.selectOption(".fi-locpick", "__all");
await page.click(".fi-tab:has-text('Groups')");
await page.click(".fi-perf tbody tr:has-text('Oregon division') .fi-minibtn:has-text('Drivers')");
await page.waitForSelector(".fi-crumb--current:has-text('Oregon')");
const landedTab2 = await page.$eval(".fi-tab--on", e => e.textContent);
log("after 'drivers' link:", landedTab2);
if (!/Drivers/.test(landedTab2)) throw new Error("drivers link should land on the Drivers tab");
await page.selectOption(".fi-locpick", "__all");
await page.click(".fi-tab:has-text('Groups')");

// Location picker: choose Southern California → scope follows, drivers are the division's members (+ unaffiliated drivers of its trucks)
await page.selectOption(".fi-locpick", "gLocSoCal");
await page.waitForSelector(".fi-crumb--current:has-text('Southern California')");
await page.click(".fi-tab:has-text('Drivers')");
const socalDrivers = await page.$$eval(".fi-perf tbody tr", r => r.map(x => x.children[1].textContent));
log("SoCal drivers:", socalDrivers.length, "| groups:", [...new Set(socalDrivers)].join(" / "));
if (socalDrivers.length === 0 || socalDrivers.length >= 25) throw new Error("location picker should narrow the driver list");
if (socalDrivers.some(g => /Northern California|Oregon/.test(g))) throw new Error("drivers who belong to another location must not appear under SoCal");
await page.selectOption(".fi-locpick", "__all");
await page.waitForSelector(".fi-crumb--current:has-text('Locations')");
await page.click(".fi-tab:has-text('Groups')");

// Excluded device types: 60 GO9 trucks only — no battery trackers / untracked assets, no "Battery Trackers" group.
const vehTab = await page.$eval(".fi-tab:has-text('Vehicles')", e => e.textContent);
log("vehicles tab:", vehTab);
if (!/\(60\)/.test(vehTab)) throw new Error("battery trackers / untracked assets should be excluded from scoring");
const groupNames = await page.$$eval(".fi-perf tbody tr td:first-child", tds => tds.map(t => t.textContent));
if (groupNames.some(g => /Battery/.test(g))) throw new Error("Battery Trackers group should not appear");

// Calendar-aligned periods: the current bar is labelled "to date" and there is no date selector.
const curLabel = await page.$eval(".fi-dash .fi-axis--strong", e => e.textContent);
log("current bar label:", curLabel);
if (!/This week \(to date\)/.test(curLabel)) throw new Error("current period should be labelled 'This week (to date)'");
if (await page.$(".fi-periodbar")) throw new Error("date selector should be gone");

// Focus the last full week (Monday-morning "to date" data is thin). Go up to Company → worst group first → Private Assets.
await page.click("button:has-text('Show last full week')");
await page.waitForSelector(".fi-h3sub:has-text('week of')");
log("focused:", await page.$eval(".fi-h3sub", e => e.textContent));
await page.click(".fi-crumbs button:has-text('Company')");
await page.waitForSelector(".fi-perf tbody tr:has-text('Private Assets')");
const firstGroup = await page.$eval(".fi-perf tbody tr td", td => td.textContent);
log("worst group:", firstGroup);
if (!/Private Assets/.test(firstGroup)) throw new Error("expected Private Assets to rank worst");

// 3) Drill into North Division.
await page.click(".fi-perf tbody tr:has-text('North Division')");
await page.waitForSelector(".fi-crumb--current:has-text('North Division')");
const kids = await page.$$eval(".fi-perf tbody tr", r => r.map(x => x.querySelector("td").textContent));
log("north children:", kids.join(" ; "));
if (!kids.some(k => /Yard/.test(k)) || !kids.some(k => /Crews/.test(k))) throw new Error("drill-down children missing");

// 4) Vehicles tab: Group column shows the Locations sub-group (or other groups as fallback) → open worst vehicle → dismiss.
await page.click(".fi-tab:has-text('Vehicles')");
const groupCells = await page.$$eval(".fi-perf tbody tr td:nth-child(2)", tds => tds.map(t => t.textContent));
log("vehicle group labels:", [...new Set(groupCells)].join(" | "));
if (!groupCells.some(g => /division/i.test(g))) throw new Error("Group column should show Locations sub-groups");
if (groupCells.some(g => /division/i.test(g) && /,/.test(g))) throw new Error("a vehicle with a location should show only its division");
if (!groupCells.some(g => /North - (Yard|Crews)$/.test(g))) throw new Error("vehicles without a location should fall back to their other groups");
if (groupCells.some(g => /Vehicle$/.test(g) && !/division/i.test(g))) throw new Error("system group 'Vehicle' should never be shown");
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
await page.waitForSelector(".fi-drawer .fi-kpi-title:has-text('to date')");
await page.keyboard.press("Escape");
await page.waitForSelector(".fi-drawer", { state: "detached" });

// 5) Drivers tab (root scope) + exports: Excel download, PDF popup, CSV download.
await page.click(".fi-crumb--reset");
await page.waitForSelector(".fi-crumb--current:has-text('Locations')");
// Group export: Summary + one sheet per location (vehicles then drivers) + Scoring model
await page.click(".fi-tab:has-text('Groups')");
await page.click("text=Export ▾");
const [gx] = await Promise.all([page.waitForEvent("download"), page.click("text=Excel scorecard")]);
const gxPath = join(here, "shots", "groups-" + gx.suggestedFilename());
await gx.saveAs(gxPath);
log("group excel:", gx.suggestedFilename());
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
const pdfHeader = await popup.$$eval("thead th", th => th.map(t => t.textContent));
const pdfColor = await popup.evaluate(() => getComputedStyle(document.querySelector("tr.High td, tr.Medium td") || document.body).printColorAdjust || getComputedStyle(document.body).webkitPrintColorAdjust);
log("pdf header:", pdfHeader.slice(0, 4).join(" | "), "| print-color-adjust:", pdfColor);
if (pdfHeader[1] !== "Group" || pdfHeader[2] !== "Current Vehicle") throw new Error("PDF should carry Group and Current Vehicle columns for drivers");
if (pdfColor !== "exact") throw new Error("print view must force background colours");
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

/* ---- 7) Scope: a sub-group as the Report-by anchor only reports its own vehicles ---- */
const reportBy = ".fi-reportby select";
await page.selectOption(reportBy, "gNorth");
await page.waitForSelector(".fi-crumb--current:has-text('North Division')");
const northVeh = await page.$eval(".fi-tab:has-text('Vehicles')", e => e.textContent);
const outsideNote = await page.$eval(".fi-outside", e => e.textContent);
log("report by North Division:", northVeh, "|", outsideNote.slice(0, 70));
if (!/Vehicles \(24\)/.test(northVeh)) throw new Error("North Division as the anchor must only contain its 24 vehicles");
if (!/36 vehicles outside North Division are not included/.test(outsideNote)) throw new Error("outside note missing");
await page.click(".fi-tab:has-text('Drivers')");
const northDriverVehicles = await page.$$eval(".fi-perf tbody tr td:first-child", tds => tds.map(t => t.textContent));
if (northDriverVehicles.length === 0 || northDriverVehicles.length >= 25) throw new Error("drivers should be limited to those who drove North Division vehicles");
await page.click(".fi-tab:has-text('Groups')");
await page.click(".fi-outside button");                               // include them as Unassigned
await page.waitForSelector(".fi-perf tbody tr:has-text('Unassigned vehicles')");
if (!/Vehicles \(60\)/.test(await page.$eval(".fi-tab:has-text('Vehicles')", e => e.textContent))) throw new Error("include-outside should bring the fleet back");
await page.click(".fi-outside button");                               // leave them out again
await page.waitForFunction(() => /Vehicles \(24\)/.test(document.querySelector(".fi-tabs").textContent));
await page.selectOption(reportBy, "gLoc");
await page.waitForSelector(".fi-crumb--current:has-text('Locations')");
if (!/Vehicles \(60\)/.test(await page.$eval(".fi-tab:has-text('Vehicles')", e => e.textContent))) throw new Error("Locations covers 75% of the fleet → the rest stay as Unassigned");

/* ---- 8) Combined groups: create from the picker, see it as a row, open it ---- */
await page.selectOption(".fi-locpick", "__new");
await page.waitForSelector(".fi-cg-editor");
await page.fill(".fi-cg-name", "SoCal + Oregon");
await page.check("input[aria-label='Include Locations / Southern California Division']");
await page.check("input[aria-label='Include Locations / Oregon division']");
const cgLive = await page.$eval(".fi-cg-head .fi-small", e => e.textContent);
if (!/^30 vehicles/.test(cgLive)) throw new Error("live vehicle count for the combined group should be 30, got " + cgLive);
await page.click("button:has-text('Add combined group')");
// second one: a parent minus one of its children; left un-added on purpose → Save settings must still keep it
await page.fill(".fi-cg-name", "Locations w/o NorCal");
await page.check("input[aria-label='Include Locations']");
await page.check("input[aria-label='Exclude Locations / Northern California division']");
await page.click("button:has-text(\"Save settings\")");
await page.waitForSelector(".fi-dash", { timeout: 60000 });
await page.waitForSelector(".fi-perf tbody tr:has-text('SoCal + Oregon')");
const cgRowsText = await page.$$eval(".fi-perf tbody tr:has(.fi-tag)", r => r.map(x => x.querySelector("td").textContent));
log("combined rows:", cgRowsText.join(" | "));
if (cgRowsText.length !== 2 || !cgRowsText.every(t => /30 veh/.test(t))) throw new Error("expected two combined groups with 30 vehicles each");
const cgValue = await page.$$eval(".fi-locpick optgroup option", o => o.map(x => [x.value, x.textContent]));
const socalOregon = cgValue.find(([, t]) => t === "SoCal + Oregon")[0];
await page.selectOption(".fi-locpick", socalOregon);
await page.waitForSelector(".fi-crumb--current:has-text('SoCal + Oregon')");
const cgChildren = await page.$$eval(".fi-perf tbody tr td:first-child", tds => tds.map(t => t.textContent));
log("inside combined group:", cgChildren.join(" | "));
if (cgChildren.length !== 2 || !cgChildren.some(t => /Oregon/.test(t)) || !cgChildren.some(t => /Southern California/.test(t))) throw new Error("combined group should compare its two members");
await page.click(".fi-tab:has-text('Vehicles')");
const cgVeh = await page.$$eval(".fi-perf tbody tr td:nth-child(2)", tds => [...new Set(tds.map(t => t.textContent))]);
if (cgVeh.some(g => /Northern California/.test(g))) throw new Error("NorCal vehicles must not appear in SoCal + Oregon");
if (!/Vehicles \(30\)/.test(await page.$eval(".fi-tab--on", e => e.textContent))) throw new Error("combined group should hold 30 vehicles");

/* ---- 9) Date range: applied on demand, keeps the tab, compares with the range before, and going back is instant ---- */
const d = k => { const x = new Date(); x.setDate(x.getDate() + k); const p = v => String(v).padStart(2, "0"); return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`; };
const tripCalls = () => page.evaluate(() => window.__mock.calls.filter(c => c.typeName === "Trip").length);
const before9 = await tripCalls();
await page.fill(".fi-range input[aria-label='From date']", d(-14));
await page.fill(".fi-range input[aria-label='To date']", d(-1));
if (await tripCalls() !== before9) throw new Error("typing dates must not fetch anything");
await page.click(".fi-range button:has-text('Apply')");
await page.waitForFunction(() => document.querySelectorAll(".fi-dash .fi-bar-group").length === 2, null, { timeout: 60000 });
const sub9 = await page.$eval(".fi-sub", e => e.textContent);
const kpi9 = await page.$eval(".fi-kpi-title", e => e.textContent);
const tab9 = await page.$eval(".fi-tab--on", e => e.textContent);
log("date range:", sub9.split("·").slice(0, 2).join("·").trim(), "| kpi:", kpi9, "| tab:", tab9);
if (!/Custom date range/.test(sub9)) throw new Error("header should say custom date range");
if (!/SoCal \+ Oregon score — /.test(kpi9) || /week/.test(kpi9)) throw new Error("KPI should be titled with the date range");
if (!/Vehicles \(30\)/.test(tab9)) throw new Error("tab and scope should survive applying a date range");
const fetched9 = await tripCalls();
if (!(fetched9 > before9)) throw new Error("applying a range should fetch that window");
// drawer labels use the dates, not "this week"
await page.click(".fi-perf tbody tr >> nth=0");
await page.waitForSelector(".fi-drawer");
const drawerTitle = await page.$eval(".fi-drawer .fi-kpi-title", e => e.textContent);
if (/week|period starting/.test(drawerTitle)) throw new Error("drawer should label the custom range by its dates: " + drawerTitle);
await page.keyboard.press("Escape");
await page.waitForSelector(".fi-drawer", { state: "detached" });
// range export carries the dates
await page.click("text=Export ▾");
const [popup9] = await Promise.all([page.waitForEvent("popup"), page.click("text=PDF scorecard")]);
await popup9.waitForLoadState("domcontentloaded");
const sub9pdf = await popup9.$eval(".sub", e => e.textContent);
await popup9.close();
if (!/SoCal \+ Oregon/.test(sub9pdf) || /to date/.test(sub9pdf)) throw new Error("PDF subtitle should carry the group and the plain date range: " + sub9pdf);
// too-long range is refused without fetching
await page.fill(".fi-range input[aria-label='From date']", d(-200));
await page.click(".fi-range button:has-text('Apply')");
await page.waitForSelector(".fi-toast--warn:has-text('limited to 92 days')");
// back to the weekly trend: served from cache, no new calls
await page.click("button:has-text('Back to weekly trend')");
await page.waitForFunction(() => document.querySelectorAll(".fi-dash .fi-bar-group").length === 8, null, { timeout: 60000 });
if (await tripCalls() !== fetched9) throw new Error("returning to the weekly trend should come from cache");
log("back to weekly trend from cache; trip calls unchanged at", fetched9);
// quick pick applies immediately
await page.selectOption(".fi-range select", "7");
await page.waitForFunction(() => document.querySelectorAll(".fi-dash .fi-bar-group").length === 2, null, { timeout: 60000 });
await page.screenshot({ path: join(here, "shots/06-date-range.png"), fullPage: false });
await page.click("button:has-text('Back to weekly trend')");
await page.waitForFunction(() => document.querySelectorAll(".fi-dash .fi-bar-group").length === 8, null, { timeout: 60000 });
await page.selectOption(".fi-locpick", "__all");
await page.click(".fi-tab:has-text('Groups')");

/* ---- 10) Division weights: NorCal gets its own weights; only NorCal's score moves ---- */
await page.click("button:has-text('Show last full week')");
await page.waitForSelector(".fi-h3sub:has-text('week of')");
const rowScore = async name => parseInt(await page.$eval(`.fi-perf tbody tr:has-text('${name}') .fi-hbar-label`, e => e.textContent), 10);
const norBefore = await rowScore("Northern California division"), soBefore = await rowScore("Southern California Division");
await page.click("button:has-text('Settings')");
await page.waitForSelector(".fi-profilebar");
const candidates = await page.$$eval(".fi-profilebar select[aria-label='Add weights for a group'] option", o => o.map(x => x.textContent));
if (!/Northern California|Oregon|Southern California/.test(candidates[1])) throw new Error("the Report-by group's divisions should be offered first: " + candidates[1]);
await page.selectOption(".fi-profilebar select[aria-label='Add weights for a group']", "gLocNorCal");
await page.waitForSelector(".fi-profilehint:has-text('Northern California division')");
// take seat belt (the most frequent event in the mock) down to 0 without rebalancing → save must refuse and name the division
const sbRow = ".fi-settings .fi-table tbody tr:has-text('Driver Seat Belt')";
await page.fill(`${sbRow} input[type=number]`, "0");
await page.click("button:has-text(\"Save settings\")");
await page.waitForSelector("text=The weights for Northern California division total");
await page.click("button:has-text(\"Rebalance to 100%\")");
if (!/^100% of 100%/.test(await page.$eval(".fi-total", e => e.textContent))) throw new Error("rebalance should bring the division weights to 100%");
// default weights are untouched
await page.selectOption(".fi-profilebar select[aria-label='Weights for']", "");
const defSb = await page.$eval(`${sbRow} input[type=number]`, e => e.value);
if (defSb === "0") throw new Error("editing a division's weights must not change the default weights");
await page.click("button:has-text(\"Save settings\")");
await page.waitForSelector(".fi-dash", { timeout: 60000 });
await page.click("button:has-text('Show last full week')");
await page.waitForSelector(".fi-h3sub:has-text('week of')");
const norAfter = await rowScore("Northern California division"), soAfter = await rowScore("Southern California Division");
const note10 = await page.$eval(".fi-weightsnote", e => e.textContent);
log("division weights → NorCal", norBefore, "→", norAfter, "| SoCal", soBefore, "→", soAfter, "|", note10.slice(0, 60));
if (!(norAfter > norBefore)) throw new Error("NorCal's score should rise once seat belt carries no weight there");
if (soAfter !== soBefore) throw new Error("SoCal's score must not change");
if (!/mixed/.test(note10)) throw new Error("the all-locations view should say the weights are mixed");
await page.click(".fi-perf tbody tr:has-text('Northern California division') .fi-minibtn:has-text('Vehicles')");
await page.waitForSelector(".fi-weightsnote:has-text('Weights: Northern California division')");
const sbWeight = await page.$eval(".fi-dash .fi-grid-2 > section:nth-child(2) tr:has-text('Driver Seat Belt') td", e => e.textContent);
if (!/· 0%/.test(sbWeight)) throw new Error("NorCal's rule list should show its own weight: " + sbWeight);
await page.selectOption(".fi-locpick", "__all");
await page.click(".fi-tab:has-text('Groups')");
await page.screenshot({ path: join(here, "shots/02-dashboard.png"), fullPage: false });
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
