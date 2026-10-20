# Fleet Insights — MyGeotab Add-In (GPSFMS)

GPSFMS's own replacement for the GoAnalytics homepage: pick any set of MyGeotab exception
rules (telematics **and** camera rules — GO Focus / Surfsight events arrive in MyGeotab as
`ExceptionEvent`s), give each a point weight, and see whether the fleet is improving over
time — by group, drilled down to individual vehicles and drivers.

**Client-side only.** Everything runs in the browser under the logged-in user's MyGeotab
session. No proxy, no server, no data leaves Geotab. Settings are stored in the database as
`AddInData` so every user sees the same score definition.

## What it does (v0.4)

- **Score trend** — safety score **out of 100** per **calendar** period (weeks starting Monday or
  Sunday, calendar months, or days), last N periods, higher is better, band lines for Low / Medium
  risk. Completed periods never move as days pass; the last bar is the current period "to date".
  Click any bar (or "Show last full week") to focus every KPI, table and the rule list on that period. Distance-normalized by design: 10
  events over 10,000 mi scores far better than 10 events over 100 mi.
- **KPIs** — scope score + risk band, median vehicle score, events / points, distance, each with
  a vs-previous-period trend.
- **Performance table** — tabs for **Groups / Vehicles / Drivers**, sortable on every column,
  with score bar, trend, events, distance, risk band and an 8-period sparkline. Click a group to
  drill into its children (breadcrumb at the top), click a vehicle or driver for the detail drawer.
- **Detail drawer** — per-subject score by period (click a bar to list that period's events),
  rule mix, and the underlying exception events; "Trips in MyGeotab" deep link for vehicles.
- **Event performance** — every tracked rule with weighted points, event count vs previous
  period, and trend.
- **Dismiss** — every event in the drawer has a Dismiss button (inline confirm, no browser
  dialogs). It discovers the server's dismissed `ExceptionEventState` at runtime and calls
  `Set ExceptionEvent {id, state}`; MyGeotab then excludes the event from every report that
  doesn't opt into "Include dismissed events", and it drops out of the score. If the server has
  no dismissed state or the user lacks the clearance, the event is hidden from Fleet Insights only
  (list kept in AddInData, "Un-hide all" in Settings) and the toast says so.
- **Settings** — rule picker with search and "Suggest safety rules", **weight % per rule (must
  total 100%)** with "Rebalance to 100%", optional per-rule sensitivity ("zero at N events per
  1,000 mi/km"), period length and count, exposure unit, minimum distance to be scored, risk-band
  thresholds. The formula is shown in plain text on the settings page.
- **Export** — **Excel scorecard** (styled like the customer's GEOTAB-SCORECARD sheet: title,
  worst-first rows banded red/orange by risk, one column per rule, frozen header, autofilter,
  plus a "Scoring model" sheet), **PDF scorecard** (branded landscape print view → Save as PDF),
  and CSV of the on-screen table.
- **Group label / home view** — Settings → "Group shown next to each driver / vehicle": pick a parent
  group such as *Locations*. The Groups tab then opens on that group — one row per sub-group
  (Idaho division, Southern California Division, …) plus an **Unassigned vehicles** row for the
  rest of the fleet (click it to list them) — and every driver and vehicle row (on screen and in the
  Excel/PDF exports) shows which sub-group they belong to. Drivers use
  their own user group membership first, then their current vehicle's groups. Anyone outside that
  family shows their other (non-system) groups instead.
- **Assets to score** (Settings) — device types present in the database with counts; untracked
  assets (`None`), GO Anywhere battery trackers (`GoAnywhere`, `GoAnywhereLite`, `Gemini`),
  third-party and GoDrive-only devices are excluded by default. Whole groups (with sub-groups) can be
  excluded too — e.g. a "Battery Trackers" or spares group.
- In the detail drawer, clicking an earlier period switches the KPIs, the rule mix **and** the
  event list to that period ("Back to current" returns).
- Honours the MyGeotab **group filter** in the top bar.

## Score model (transparent on purpose)

```
rate(rule)     = events(rule) ÷ distance × 1,000          events per 1,000 mi (or km)
subScore(rule) = 100 × max(0, 1 − rate ÷ zeroAt(rule))    0–100; zeroAt = rate that scores 0
score          = Σ subScore(rule) × weight(rule) ÷ 100     weights total 100%
change         = current − previous (score points)
```

Worked example with phone use at 41% weight, zero-at 5 / 1,000 mi: one phone event in 500 mi
(2 / 1,000) gives a phone sub-score of 60 and costs 16.4 score points; the same event in 5,000 mi
(0.2 / 1,000) costs 1.6. A subject under `minDistance` (default 10 mi) in a period is not scored.
Risk bands apply to the current-period score: `≥ 90` Low, `≥ 75` Medium, else High (editable).
Default weights and zero-at values are suggested from the rule name (phone/collision/drowsy
heaviest, harsh acceleration lightest) and are all editable. v1 configs (points) migrate
automatically — points become relative weights normalized to 100.

## Data access

| Need | Call | Notes |
|---|---|---|
| Vehicles in scope | `Get Device` `{fromDate: now, groups}` | active devices only; `propertySelector` trims fields |
| Group tree | `Get Group` | client-side hierarchy, drill-down, "(direct)" row for devices on the node itself |
| Rules | `Get Rule` | all rules offered in the picker |
| Drivers | `Get User {isDriver:true}` | names only |
| Events | `Get ExceptionEvent` per tracked rule, `{ruleSearch, fromDate, toDate, deviceSearch:{groups}}` | windows that hit the 50,000 cap are split in half automatically |
| Exposure | `Get Trip` `{fromDate, toDate, deviceSearch:{groups}}` | window size adapts to fleet size; same auto-split |
| Settings | `Get/Add/Set AddInData` with `addInId an_qIKWbzyE09jcDpY-MtXw` | falls back to `localStorage` if the user lacks the clearance |
| Dismiss | `Get ExceptionEventState` (find "Dismissed") → `Set ExceptionEvent {id, state}` | falls back to a local hide list (AddInData `type: "hidden"`) |

All Gets use `propertySelector`; if the server rejects it (older MyGeotab) the call is retried
without. Same for `deviceSearch.groups`.

## Build

```bash
npm install --legacy-peer-deps
npm test          # model unit tests (node)
npm run build     # -> dist/addin.js + dist/index.html
node tests/e2e.mjs   # headless Playwright run against tests/harness.html (mocked MyGeotab)
```

`build.mjs` writes `dist/index.html` pointing at `ADDIN_BASE_URL` (default
`https://austin-gpsfms.github.io/fleet-insights-addin/dist`). For local dev:
`ADDIN_BASE_URL=http://localhost:8080/dist node build.mjs && npm run serve`, then install
`config.dev.json`.

## Deploy (GitHub Pages, same as the other GPSFMS add-ins)

1. Create repo `Austin-GPSFMS/fleet-insights-addin`, push this folder (`dist/` is committed on purpose).
2. Settings → Pages → deploy from `main` / root. Confirm
   `https://austin-gpsfms.github.io/fleet-insights-addin/dist/addin.js` loads.
3. MyGeotab → Administration → System… → System Settings → Add-Ins → New Add-In → paste
   `config.json` → Save → allow unverified add-ins if prompted → refresh. **Activity → Fleet Insights**.
   (For a top-level menu entry like GoAnalytics use `"path": "/"`.)
4. First open lands on Settings: click **Suggest safety rules**, adjust points, Save.

Updating = push to `main`; users hard-refresh (Ctrl+F5).

## Verified (mock harness, 60 vehicles / 10 weeks / 10 rules, ~70k events, ~24k trips)

Run 1: settings opens on first run → suggestions pick 8 rules totalling 100% → save refused at
125% → Rebalance → save → dashboard on the 0–100 scale, worst group first → drill-down → vehicle
drawer → Dismiss calls `Set ExceptionEvent` with the Dismissed state, the event leaves the list and
the score does not drop → drivers tab shows current vehicle → Excel, PDF print view and CSV exports
→ reload reads the saved config. Run 2 (server without a Dismissed state): dismiss falls back to a
local hide, the header shows "hidden locally", and the hide list survives a reload via AddInData.
Zero console errors. Screenshots, the .xlsx and the printed PDF land in `tests/shots/` after a run.

## Not yet (next steps, in rough priority)

- Per-engine-hour normalization for off-road / landfill equipment (model already supports it;
  needs `StatusData` engine-hours fetch).
- **Verify the dismiss API on a real server**: in the MyGeotab API Runner run
  `api.call("Get", {typeName: "ExceptionEventState"})` and confirm a Dismissed state exists and
  that `Set ExceptionEvent {id, state}` is accepted for a normal supervisor clearance.
- Rule-noise analysis (which rules over-fire on which asset types) — the "fix the rule" view.
- Coaching log (warnings, training completed) per driver in AddInData, shown on the driver's
  trend chart; manager-engagement stats.
- Camera clip links via camera-services `GET /Media/Exception/{exceptionId}` (needs a CORS
  check from an injected add-in).
- Scheduled branded PDF/Excel delivery (Python job) for managers who never log in.
