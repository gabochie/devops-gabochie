// collect.mjs — repo + roadmap scanner → public/data/*.json (read-only, node only).
// Usage: node scripts/collect.mjs [--hub <dir>] [--roadmap <file>]
//   hub defaults to C:\Users\user\Documents\GitHub ; roadmap defaults to data/roadmap.md
// Never prints secret values. Best-effort per repo: failures are recorded, not fatal.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const args = Object.fromEntries(
  process.argv.slice(2).flatMap((a, i, arr) => {
    if (!a.startsWith("--")) return [];
    const next = arr[i + 1];
    return [[a.slice(2), next && !next.startsWith("--") ? next : "1"]];
  })
);
const HUB = path.resolve(args.hub || "C:\\Users\\user\\Documents\\GitHub");
const ROADMAP = path.resolve(args.roadmap || path.join(ROOT, "data", "roadmap.md"));

function sh(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch {
    return null;
  }
}

// --- roadmap checkboxes grouped by "## Phase" headings ---
function parseRoadmap() {
  const rungs = [];
  let cur = null;
  try {
    for (const line of fs.readFileSync(ROADMAP, "utf8").split(/\r?\n/)) {
      const h = line.match(/^##\s+(Phase\s+\d+[^(\n]*)/);
      if (h) { cur = { phase: h[1].trim(), title: "", done: 0, total: 0 }; rungs.push(cur); continue; }
      const t = line.match(/^-\s+\[( |x)\]\s+\*\*(.+?)\*\*/);
      if (t && cur) { cur.total++; if (t[1] === "x") cur.done++; if (!cur.title) cur.title = t[2]; }
    }
  } catch { /* roadmap missing → empty */ }
  for (const r of rungs) r.pct = r.total ? Math.round((r.done / r.total) * 100) : 0;
  const done = rungs.reduce((a, r) => a + r.done, 0);
  const total = rungs.reduce((a, r) => a + r.total, 0);
  return { rungs, done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// --- repo fleet scan ---
function detect(dir) {
  const ex = (p) => fs.existsSync(path.join(dir, p));
  const pkgHas = (dep) => {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
      return dep in { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    } catch { return false; }
  };
  if ((ex("wrangler.json") || ex("wrangler.toml")) && ex("functions")) return "cloudflare-edge";
  if (ex("wp-config.php") || ex("wp-content")) return "wordpress";
  if (ex("composer.json") || ex("artisan")) return "php-laravel";
  if (ex("requirements.txt") || ex("pyproject.toml") || ex("manage.py")) return "python";
  if (ex("package.json")) return pkgHas("next") ? "nextjs" : "node-api";
  try {
    if (fs.readdirSync(dir, { withFileTypes: true }).some((e) => e.isFile() && /\.html?$/i.test(e.name))) return "static";
  } catch { /* ignore */ }
  return "other";
}

function scanHub() {
  const repos = [];
  let entries = [];
  try { entries = fs.readdirSync(HUB, { withFileTypes: true }).filter((e) => e.isDirectory()); } catch { return repos; }
  for (const e of entries) {
    const dir = path.join(HUB, e.name);
    const isGit = fs.existsSync(path.join(dir, ".git"));
    const commits = isGit ? sh("git rev-list --count HEAD", dir) : null;
    const branches = isGit ? sh("git branch -a --format=%(refname:short)", dir) : null;
    repos.push({
      name: e.name,
      stack: detect(dir),
      commits: commits === null ? null : Number(commits),
      branches: branches === null ? null : branches.split("\n").filter(Boolean).length,
      ci: fs.existsSync(path.join(dir, ".github", "workflows")),
      pushed: isGit ? sh("git log -1 --format=%cs", dir) : null,
    });
  }
  return repos.sort((a, b) => (b.commits || 0) - (a.commits || 0));
}

const generated = new Date().toISOString();
const roadmap = parseRoadmap();
const repos = scanHub().filter((r) => r.stack !== "other" || r.commits !== null);
const out = (f, obj) => fs.writeFileSync(path.join(ROOT, "public", "data", f), JSON.stringify(obj, null, 2) + "\n");
out("roadmap.json", { generated, ...roadmap });
out("repos.json", { generated, count: repos.length, repos });
out("summary.json", { generated, roadmap: { done: roadmap.done, total: roadmap.total, pct: roadmap.pct }, repos: { count: repos.length } });
console.log(`roadmap ${roadmap.done}/${roadmap.total} (${roadmap.pct}%) · repos ${repos.length} · generated ${generated}`);
