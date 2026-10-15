// GET /api/client?id=&exp=&token= — serve a client record behind an HMAC magic link.
// No PII stored in data/clients.json (ids + delivery state only). Timing-safe compare.
// NOTE: no server-side rate limit yet — add KV guard before paid-traffic campaigns.
import clients from "../../data/clients.json";

function hexToBytes(h) {
  const b = new Uint8Array(h.length / 2);
  for (let i = 0; i < b.length; i++) b[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return b;
}

export async function onRequest({ request, env }) {
  const u = new URL(request.url);
  const id = (u.searchParams.get("id") || "").slice(0, 64);
  const exp = Number(u.searchParams.get("exp") || 0);
  const token = (u.searchParams.get("token") || "").slice(0, 64);
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id) || !exp || !/^[0-9a-f]{64}$/.test(token)) {
    return Response.json({ error: "bad link" }, { status: 400 });
  }
  if (!env.CLIENT_SECRET || exp * 1000 < Date.now()) {
    return Response.json({ error: "link expired" }, { status: 401 });
  }
  const sig = await crypto.subtle.sign("HMAC", await crypto.subtle.importKey("raw", new TextEncoder().encode(env.CLIENT_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), new TextEncoder().encode(`${id}.${exp}`));
  const want = new Uint8Array(sig);
  const got = hexToBytes(token);
  const ok = want.length === got.length && crypto.subtle.timingSafeEqual(want, got);
  if (!ok) {
    return Response.json({ error: "bad link" }, { status: 401 });
  }
  const rec = (clients.clients || []).find((c) => c.id === id);
  if (!rec) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  return Response.json({ record: rec }, { headers: { "cache-control": "no-store" } });
}
