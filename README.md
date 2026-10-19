# Fleet Insights — MyGeotab Add-In (GPSFMS)

GPSFMS's own replacement for the GoAnalytics homepage: pick any set of MyGeotab exception
rules (telematics **and** camera rules — GO Focus / Surfsight events arrive in MyGeotab as
`ExceptionEvent`s), give each a point weight, and see whether the fleet is improving over
time — by group, drilled down to individual vehicles and drivers.

**Client-side only.** Everything runs in the browser under the logged-in user's MyGeotab
session. No proxy, no server, no data leaves Geotab. Settings are stored in the database as
`AddInData` so every user sees the same score definition.

## What it does (v0.1)

- **Score trend** — weighted unsafe points per period (trailing 7 / 30 / 1-day windows), last
  N periods, lower is better. Optionally normalized per 100 mi or per 1,000 km using trip distance.
- **KPIs** — scope score + risk band, median vehicle score, events / points, distance, each with
  a vs-previous-period trend.
- **Performance table** — tabs for **Groups / Vehicles / Drivers**, sortable on every column,
  with score bar, trend, events, distance, risk band and an 8-period sparkline. Click a group to
  drill into its children (breadcrumb at the top), click a vehicle or driver for the detail drawer.
- **Detail drawer** — per-subject score by period (click a bar to list that period's events),
  rule mix, and the underlying exception events; "Trips in MyGeotab" deep link for vehicles.
- **Event performance** — every tracked rule with weighted points, event count vs previous
  period, and trend.
- **Settings** — rule picker with search and "Suggest safety rules" (seatbelt, distraction,
  phone, following distance, speeding, harsh events, lens obstruction…), points per rule, period
  length and count, normalization, distance unit, risk-band thresholds. The formula is shown in
  plain text on the settings page.
- **Export CSV** of whatever table is on screen.
- Honours the MyGeotab **group filter** in the top bar.

## Score model (transparent on purpose)

```
score(subject, period) = Σ over tracked rules ( events × points )
per100mi  → ÷ miles driven in the period × 100
per1000km → ÷ km driven in the period × 1,000
trend     = (current − previous) ÷ previous
```

Risk bands apply to the per-subject (vehicle / driver / group) current-period score:
`≤ low` → Low, `≤ medium` → Medium, else High. Defaults change with the normalization
(raw points 10/30, per 100 mi 2/5, per 1,000 km 12/30) and are editable.

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

## Verified (mock harness, 60 vehicles / 10 weeks / 10 rules, ~24k events, ~24k trips)

Settings opens on first run → suggestions pick the 8 safety rules → save persists to AddInData
→ dashboard renders, worst group ranks first → drill into a division shows its child groups →
vehicle drawer lists events and switches period on bar click → drivers tab + CSV export →
reload reads the saved config → zero console errors. Screenshots in `tests/shots/` after a run.

## Not yet (next steps, in rough priority)

- Per-engine-hour normalization for off-road / landfill equipment (model already supports it;
  needs `StatusData` engine-hours fetch).
- Exception review / dismiss + rule-noise analysis (which rules over-fire on which asset types).
- Coaching cases in AddInData with manager-engagement stats.
- Camera clip links via camera-services `GET /Media/Exception/{exceptionId}` (needs a CORS
  check from an injected add-in).
- Scheduled branded PDF/Excel delivery (Python job) for managers who never log in.
- Native Excel export (ExcelJS) instead of CSV.
