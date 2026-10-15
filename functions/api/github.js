// GitHub API proxy (names + counts only — never secrets).
// Token lives server-side (Pages secret GITHUB_TOKEN). Path allowlist enforced.
const ALLOW = [
  /^repos\/gabochie\/[A-Za-z0-9_.-]+$/,
  /^repos\/gabochie\/[A-Za-z0-9_.-]+\/branches$/,
];

export async function onRequest({ request, env }) {
  const p = new URL(request.url).searchParams.get("path") || "";
  if (!ALLOW.some((r) => r.test(p))) {
    return Response.json({ error: "not allowed" }, { status: 403 });
  }
  if (!env.GITHUB_TOKEN) {
    return Response.json({ error: "no token configured" }, { status: 503 });
  }
  const r = await fetch(`https://api.github.com/${p}?per_page=100`, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "User-Agent": "devops-gabochie",
      Accept: "application/vnd.github+json",
    },
  });
  const body = await r.text();
  return new Response(body, {
    status: r.status,
    headers: { "content-type": "application/json", "cache-control": "public, max-age=120" },
  });
}
