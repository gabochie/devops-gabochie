// POST /api/deposit {clientId, token, exp, invoiceRef} — ExpressPay Submit → checkout URL.
// Server-side only: EXPRESSPAY_MERCHANT_ID/SECRET never leave the edge. order-id = our tx_ref.
// Sandbox first (EXPRESSPAY_ENV=sandbox); MoMo pending is resolved by Query, never trusted from callbacks.
// NOTE: verify endpoint + post-url handler arrive with the first real invoice (same file pattern as payments-ghana.md).
const SUBMIT = {
  sandbox: "https://sandbox.expresspaygh.com/api/submit.php",
  production: "https://expresspaygh.com/api/submit.php",
};
const CHECKOUT = {
  sandbox: "https://sandbox.expresspaygh.com/api/checkout.php",
  production: "https://expresspaygh.com/api/checkout.php",
};

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
  if (!/^[A-Za-z0-9_-]{1,32}$/.test(invoiceRef)) {
    return Response.json({ error: "bad invoice" }, { status: 400 });
  }
  const { EXPRESSPAY_MERCHANT_ID, EXPRESSPAY_SECRET, EXPRESSPAY_ENV } = env;
  if (!EXPRESSPAY_MERCHANT_ID || !EXPRESSPAY_SECRET) {
    return Response.json({ error: "payments not configured" }, { status: 503 });
  }
  const mode = EXPRESSPAY_ENV === "production" ? "production" : "sandbox";
  const orderId = `gbd-${Date.now().toString(36)}-${invoiceRef}`.slice(0, 64);
  const form = new URLSearchParams({
    "merchant-id": EXPRESSPAY_MERCHANT_ID,
    "api-key": EXPRESSPAY_SECRET,
    "order-id": orderId,
    "redirect-url": `https://devops.gabochie.com/app/c/?paid=${encodeURIComponent(orderId)}`,
    "post-url": "https://devops.gabochie.com/api/deposit/post",
  });
  // Amount + currency are set per invoice server-side in the follow-up (first real invoice);
  // this slice proves auth + contract. Never accept amounts from the browser.
  const r = await fetch(SUBMIT[mode], {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const text = await r.text();
  let token = "";
  try {
    const data = JSON.parse(text);
    token = data.token || data.checkout_token || "";
  } catch {
    const m = text.match(/token=([A-Za-z0-9._-]+)/);
    if (m) token = m[1];
  }
  if (!r.ok || !token) {
    return Response.json({ error: "submit failed" }, { status: 502 });
  }
  return Response.json({ checkoutUrl: `${CHECKOUT[mode]}?token=${encodeURIComponent(token)}`, orderId });
}
