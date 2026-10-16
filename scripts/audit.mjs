// Gate 3: nightly agentic audit — read-only except data/audit-log.jsonl + data/metrics.json
// Run: node scripts/audit.mjs [--write]   (default dry: prints, writes nothing)
// CI runs with --write weekly + on dispatch. No deploys, no pushes, no secrets needed.
import { execSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data");
const WRITE = process.argv.includes("--write");

const LIVES = [
  "https://buildcostgh.com",
  "https://www.sporafind.com",
  "https://studio.gabochie.com",
  "https://ghbc.gabochie.com",
  "https://devops.gabochie.com",
  "https://mywa.gabochie.com",
];
const PLACEHOLDERS = ["REPLACE_WITH", "placeholder-replace-with-actual-id", "FLWPUBK_TEST_REPLACE_WITH"];

const sh = (cmd) => {
  try { return execSync(cmd, { cwd: ROOT, encoding: "utf8", timeout: 30000 }); }
  catch { return ""; }
};

async function live(url) {
  const t = Date.now();
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    return { url, ok: r.ok, status: r.status, ms: Date.now() - t };
  } catch (e) { return { url, ok: false, status: 0, ms: Date.now() - t, err: String(e).slice(0, 120) }; }
}

const results = [];
for (const u of LIVES) results.push(await live(u));
const livePct = Math.round((results.filter((r) => r.ok).length / results.length) * 100);

// placeholders inside THIS repo only (tracked files)
const tracked = sh("git ls-files").split("\n").filter(Boolean);
let placeholders = [];
for (const f of tracked) {
  if (!/wrangler|env\.example|\.md$|\.m?js$|index\.html$/.test(f)) continue;
  let body = "";
  try { body = readFileSync(join(ROOT, f), "utf8"); } catch { continue; }
  for (const p of PLACEHOLDERS) if (body.includes(p)) placeholders.push(`${f}:${p}`);
}
// .env must never be tracked
const envTracked = tracked.filter((f) => /(^|\/)\.env$/.test(f));
const guardPass = envTracked.length === 0;

const entry = {
  ts: new Date().toISOString(),
  mode: WRITE ? "scheduled" : "dry",
  live_pct: livePct,
  live: results.map((r) => ({ url: r.url, ok: r.ok, status: r.status, ms: r.ms })),
  placeholders,
  guard_pass: guardPass,
  env_tracked: envTracked,
};

console.log(JSON.stringify(entry, null, 2));

if (WRITE) {
  if (!existsSync(DATA)) mkdirSync(DATA, { recursive: true });
  appendFileSync(join(DATA, "audit-log.jsonl"), JSON.stringify(entry) + "\n");
  writeFileSync(
    join(DATA, "metrics.json"),
    JSON.stringify({ updated: entry.ts, live_pct: livePct, placeholders: placeholders.length, guard_pass: guardPass, lives: entry.live }, null, 2) + "\n"
  );
  console.log("wrote data/audit-log.jsonl + data/metrics.json");
} else {
  console.log("(dry run — nothing written; pass --write to append audit log)");
}
