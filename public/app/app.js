// Admin console: generated JSON first, live GitHub API second. No deps, inline SVG charts.
const $ = (id) => document.getElementById(id);

function bars(rows) {
  // rows: [[label, value, max]]
  const W = 640, H = rows.length * 30 + 10, max = Math.max(1, ...rows.map((r) => r[2]));
  let y = 10, s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  for (const [label, value, m] of rows) {
    const w = Math.round(((m / max) * 380));
    s += `<text x="10" y="${y + 13}" class="lbl">${label}</text>`;
    s += `<rect x="220" y="${y}" width="${w}" height="16" rx="4" fill="#C9A84C"/>`;
    s += `<text x="${230 + w}" y="${y + 13}">${value}</text>`;
    y += 30;
  }
  return s + "</svg>";
}

async function getJSON(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(url);
  return r.json();
}

async function main() {
  try {
    const health = await getJSON("/api/health").catch(() => null);
    $("health").textContent = health && health.ok ? "health: ok" : "health: stale (static)";
  } catch { $("health").textContent = "health: stale (static)"; }

  let roadmap, repos;
  try {
    [roadmap, repos] = await Promise.all([getJSON("/data/roadmap.json"), getJSON("/data/repos.json")]);
  } catch {
    $("roadmap-meta").textContent = "— run node scripts/collect.mjs to generate data";
    return;
  }
  $("gen").textContent = `generated ${roadmap.generated}`;
  $("roadmap-meta").textContent = `${roadmap.done}/${roadmap.total} tasks · ${roadmap.pct}%`;
  $("roadmap-bar").style.width = `${roadmap.pct}%`;
  $("rungs").innerHTML = roadmap.rungs.map((r) =>
    `<div class="card"><h3>${r.phase} — ${r.done}/${r.total}</h3><p class="mut">${r.title}</p><div class="bar"><i style="width:${r.pct}%"></i></div></div>`
  ).join("");

  const stacks = {};
  for (const r of repos.repos) stacks[r.stack] = (stacks[r.stack] || 0) + 1;
  $("stack-chart").innerHTML = bars(Object.entries(stacks).map(([k, v]) => [k, v, v]));

  const tb = $("repos");
  tb.innerHTML = repos.repos.map((r, i) =>
    `<tr><td>${r.name}</td><td>${r.stack}</td><td>${r.commits}</td>` +
    `<td><span class="pill ${r.branches > 3 ? "open" : "done"}">${r.branches}</span> <span data-live="${i}">·</span></td>` +
    `<td>${r.ci ? "yes" : "—"}</td><td>${r.pushed}</td></tr>`
  ).join("");

  $("refresh").addEventListener("click", async () => {
    $("live-meta").textContent = "refreshing…";
    let n = 0;
    for (let i = 0; i < repos.repos.length; i++) {
      try {
        const b = await getJSON(`/api/github?path=repos/gabochie/${repos.repos[i].name}/branches`);
        document.querySelector(`[data-live="${i}"]`).textContent = `/ ${b.length} live`;
        n++;
      } catch { document.querySelector(`[data-live="${i}"]`).textContent = "/ n/a"; }
    }
    $("live-meta").textContent = `${n}/${repos.repos.length} refreshed ${new Date().toISOString().slice(11, 19)}Z`;
  });
}
main();
