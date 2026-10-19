// POST /api/deposit {clientId, token, exp, invoiceRef} — HMAC-verified checkout for one invoice.
// Providers (server-side only; secrets never reach the browser):
//   GHS → Paystack (if PAYSTACK_SECRET_KEY set) else ExpressPay Submit.
//   non-GHS → never charged directly; returns the invoice's payUrl or a "manual" hint
//             (Wise / Payoneer settle by invoice). Amounts come from data/clients.json, never the browser.
import clients from "../../data/clients.json";

const SUBMIT = {
  sandbox: "https://sandbox.expresspaygh.com/api/submit.php",
  production: "https://expresspaygh.com/api/submit.php",
};
const CHECKOUT = {
  sandbox: "https://sandbox.expresspaygh.com/api/checkout.php",
  production: "https://expresspaygh.com/api/checkout.php",
};
const PAYSTACK = "https://api.paystack.co/transaction/initialize";

function hexToBytes(h) {
  const b = new Uint8Array(h.length / 2);
  for (let i = 0; i < b.length; i++) b[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return b;
}

async function verifyLink(env, clientId, exp, token) {
  if (!env.CLIENT_SECRET || exp * 1000 < Date.now()) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.CLIENT_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${clientId}.${exp}`)));
  const got = hexToBytes(token);
  return sig.length === got.length && crypto.subtle.timingSafeEqual(sig, got);
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
  const invoiceRef = String(b.invoiceRef || "").slice(0, 32);
  const clientId = String(b.clientId || "").slice(0, 64);
  const token = String(b.token || "").slice(0, 64);
  const exp = Number(b.exp || 0);
  if (!/^[A-Za-z0-9_-]{1,32}$/.test(invoiceRef) || !/^[A-Za-z0-9_-]{1,64}$/.test(clientId) || !exp || !/^[0-9a-f]{64}$/.test(token)) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }
  if (!(await verifyLink(env, clientId, exp, token))) {
    return Response.json({ error: "bad link" }, { status: 401 });
  }
  const rec = (clients.clients || []).find((c) => c.id === clientId);
  const inv = rec && (rec.invoices || []).find((v) => v.ref === invoiceRef);
  if (!inv) return Response.json({ error: "invoice not found" }, { status: 404 });
  if (inv.status === "paid") return Response.json({ paid: true, message: "This invoice is already settled." });

  const currency = inv.currency || "GHS";
  const amount = Number(inv.amount != null ? inv.amount : inv.amountGHS);
  if (!Number.isFinite(amount) || amount <= 0) return Response.json({ error: "bad amount" }, { status: 409 });

  if (currency !== "GHS") {
    if (inv.payUrl) return Response.json({ payUrl: inv.payUrl });
    return Response.json({
      error: "manual",
      message: "International invoices settle by Wise or Payoneer. I'll email the details with a receipt on completion.",
    }, { status: 409 });
  }

  if (env.PAYSTACK_SECRET_KEY) {
    const orderId = `gbd-${Date.now().toString(36)}-${invoiceRef}`.slice(0, 100);
    const r = await fetch(PAYSTACK, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` },
      body: JSON.stringify({
        email: env.PAYSTACK_EMAIL || "devops@gabochie.com",
        amount: Math.round(amount * 100),
        currency: "GHS",
        reference: orderId,
        callback_url: `https://devops.gabochie.com/app/c/?paid=${encodeURIComponent(orderId)}`,
        metadata: { client: clientId, invoice: invoiceRef },
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data || !data.data || !data.data.authorization_url) {
      return Response.json({ error: "submit failed" }, { status: 502 });
    }
    return Response.json({ checkoutUrl: data.data.authorization_url, orderId });
  }

  const { EXPRESSPAY_MERCHANT_ID, EXPRESSPAY_SECRET, EXPRESSPAY_ENV } = env;
  if (!EXPRESSPAY_MERCHANT_ID || !EXPRESSPAY_SECRET) {
    return Response.json({ error: "manual", message: "Payments aren't wired yet — I'll email payment details." }, { status: 503 });
  }
  const mode = EXPRESSPAY_ENV === "production" ? "production" : "sandbox";
  const orderId = `gbd-${Date.now().toString(36)}-${invoiceRef}`.slice(0, 64);
  const form = new URLSearchParams({
    "merchant-id": EXPRESSPAY_MERCHANT_ID,
    "api-key": EXPRESSPAY_SECRET,
    "order-id": orderId,
    "amount": amount.toFixed(2),
    "currency": currency,
    "redirect-url": `https://devops.gabochie.com/app/c/?paid=${encodeURIComponent(orderId)}`,
    "post-url": "https://devops.gabochie.com/api/deposit/post",
  });
  const r = await fetch(SUBMIT[mode], {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const text = await r.text();
  let epToken = "";
  try {
    const data = JSON.parse(text);
    epToken = data.token || data.checkout_token || "";
  } catch {
    const m = text.match(/token=([A-Za-z0-9._-]+)/);
    if (m) epToken = m[1];
  }
  if (!r.ok || !epToken) {
    return Response.json({ error: "submit failed" }, { status: 502 });
  }
  return Response.json({ checkoutUrl: `${CHECKOUT[mode]}?token=${encodeURIComponent(epToken)}`, orderId });
}
