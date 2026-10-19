// POST /api/lead — quiz lead capture (Brevo contact + owner notify + lead confirm).
// Validation-first: email/stack/pain allowlists, length caps, consent required, honeypot.
// NOTE: no server-side rate limit yet (no KV/D1 on this project) — add KV per-IP guard
// or Turnstile before any paid-traffic campaign. Secrets: BREVO_API_KEY via Pages secret.
const STACKS = new Set(["Next.js", "Node API", "Python", "PHP / Laravel", "WordPress", "Cloudflare edge", "Supabase", "Neon Postgres", "Static site", "Other"]);
const PAINS = new Set(["Checkout / payments", "Auth / access control", "Deploy / downtime", "Messy / slow codebase"]);
const OWNER = "devops@gabochie.com";
const SENDER = { name: "Gabochie DevOps", email: "devops@gabochie.com" }; // must be a verified Brevo sender

const clean = (v, n) => String(v || "").slice(0, n).trim();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function brevo(env, payload) {
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": env.BREVO_API_KEY },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error("brevo-" + r.status);
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return Response.json({ error: "method not allowed" }, { status: 405 });
  }
  let b;
  try {
    b = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  // Honeypot: bots fill it — pretend success, process nothing.
  if (clean(b.website, 200)) {
    return Response.json({ ok: true });
  }
  const email = clean(b.email, 254);
  const stack = clean(b.stack, 40);
  const pain = clean(b.pain, 40);
  const url = clean(b.url, 200);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ error: "bad email" }, { status: 400 });
  if (!STACKS.has(stack)) return Response.json({ error: "bad stack" }, { status: 400 });
  if (!PAINS.has(pain)) return Response.json({ error: "bad pain" }, { status: 400 });
  if (b.consent !== true) return Response.json({ error: "consent required" }, { status: 400 });
  if (url && !/^https?:\/\/\S{4,}$/.test(url)) return Response.json({ error: "bad url" }, { status: 400 });
  if (!env.BREVO_API_KEY) {
    return Response.json({ error: "email not configured" }, { status: 503 });
  }
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": env.BREVO_API_KEY },
      body: JSON.stringify({
        email, updateEnabled: true,
        attributes: { STACK: stack, PAIN: pain, SITE_URL: url, SOURCE: "devops-quiz" },
      }),
    });
    await brevo(env, {
      sender: SENDER,
      to: [{ email: OWNER }],
      subject: `New readiness lead: ${stack} / ${pain}`,
      htmlContent: `<p>Stack: ${esc(stack)}<br>Pain: ${esc(pain)}<br>Site: ${esc(url || "—")}<br>Email: ${esc(email)}</p>`,
    });
    await brevo(env, {
      sender: SENDER,
      to: [{ email }],
      subject: "Your preliminary readiness read is coming",
      htmlContent: `<p>Thanks — I got your ${esc(stack)} assessment request (${esc(pain)}). Your preliminary read arrives within 2 business days. Reply directly to this email with anything I should look at first.</p><p>— Gabochie DevOps</p>`,
    });
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: "send failed" }, { status: 502 });
  }
}
