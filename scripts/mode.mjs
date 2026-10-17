// Gate 2: Demo -> Dry -> Live mode contract.
// demo (default): read-only outside this repo's data/. dry: diffs/plans only. live: writes allowed.
// Usage:  node scripts/mode.mjs            -> print current mode
//         node scripts/mode.mjs live       -> switch mode (human act; commit after)
//         import { getMode, assertLive }   -> guard in any mutating script
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILE = join(ROOT, "data", "mode.json");
const MODES = ["demo", "dry", "live"];

export function getMode() {
  try {
    const m = JSON.parse(readFileSync(FILE, "utf8")).mode;
    return MODES.includes(m) ? m : "demo";
  } catch {
    return "demo";
  }
}

export function assertLive(action) {
  const m = getMode();
  if (m !== "live") {
    throw new Error(
      `[gate2] refused "${action}": mode=${m}. External writes require mode=live (node scripts/mode.mjs live). Nothing changed.`
    );
  }
}

function setMode(next) {
  if (!MODES.includes(next)) {
    console.error(`[gate2] unknown mode "${next}" — use one of: ${MODES.join(", ")}`);
    process.exit(1);
  }
  const prev = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : {};
  const body = {
    mode: next,
    changed: new Date().toISOString().slice(0, 10),
    meaning: prev.meaning,
    rule: prev.rule,
  };
  writeFileSync(FILE, JSON.stringify(body, null, 2) + "\n");
  console.log(`[gate2] mode ${getModeSafe(prev)} -> ${next}. Commit data/mode.json to make it effective.`);
  if (next === "live") console.log("[gate2] WARNING: live allows external writes. Approve each action; never batch.");
}

const getModeSafe = (o) => (MODES.includes(o && o.mode) ? o.mode : "demo");
const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedDirectly) {
  const arg = process.argv[2];
  if (arg === undefined) console.log(`[gate2] current mode: ${getMode()}`);
  else if (arg === "--help" || arg === "-h") console.log("node scripts/mode.mjs [demo|dry|live]");
  else setMode(arg);
}
