/**
 * Build: bundles src/main.jsx -> dist/addin.js (single IIFE file) and writes
 * dist/index.html (the page add-in host). Run: node build.mjs
 *
 * Same pattern as report-recipients-addin: Zenith CSS is inlined as text (with
 * @font-face stripped — MyGeotab already serves Roboto) and every React import
 * is aliased to the one top-level copy so Zenith can't drag in a second React.
 */
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const PUBLIC_BASE = process.env.ADDIN_BASE_URL || "https://austin-gpsfms.github.io/fleet-insights-addin/dist";

const REACT_ALIASES = {
    "react/jsx-runtime": require.resolve("react/jsx-runtime"),
    "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
    "react-dom/client": require.resolve("react-dom/client"),
    "react-dom": require.resolve("react-dom"),
    "react": require.resolve("react")
};

// 1) Zenith CSS with fonts stripped.
const zenithCssPath = join(here, "node_modules/@geotab/zenith/dist/index.css");
const raw = readFileSync(zenithCssPath, "utf8");
const stripped = raw.replace(/@font-face\s*\{[^}]*\}/g, "");
mkdirSync(join(here, "src/generated"), { recursive: true });
writeFileSync(join(here, "src/generated/zenith.css"), stripped);

// 2) Bundle.
mkdirSync(join(here, "dist"), { recursive: true });
await build({
    entryPoints: [join(here, "src/main.jsx")],
    bundle: true,
    minify: true,
    format: "iife",
    target: ["es2019"],
    outfile: join(here, "dist/addin.js"),
    jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
    loader: { ".css": "text" },
    alias: REACT_ALIASES,
    logLevel: "info"
});

const bundled = readFileSync(join(here, "dist/addin.js"), "utf8");
if (bundled.includes("__SECRET_INTERNALS_DO_NOT_USE") && bundled.includes("__CLIENT_INTERNALS_DO_NOT_USE")) {
    throw new Error("BUILD ABORTED: two React copies in dist/addin.js. Delete node_modules and reinstall pinned versions.");
}

// 3) Page host. MyGeotab inlines this document, so the script URL must be absolute.
writeFileSync(join(here, "dist/index.html"), `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Fleet Insights</title>
</head>
<body>
    <div id="fleetInsights-root"></div>
    <script src="${PUBLIC_BASE}/addin.js"></script>
</body>
</html>
`);
console.log(`dist/index.html -> ${PUBLIC_BASE}/addin.js`);
