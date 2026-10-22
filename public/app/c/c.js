(async () => {
  const q = new URLSearchParams(location.search);
  const err = (m, recovery) => {
    document.getElementById("c-title").textContent = "Link invalid";
    document.getElementById("c-err").innerHTML = m + (recovery
      ? `<br><br><a class="btn" href="mailto:admin@gabochie.com?subject=${encodeURIComponent("Fresh client link request")}">Request a fresh link</a><br>
         <span class="mut">Links expire after 30 days and work on one project only.</span><br>
         <span class="mut">Need help? Email <b>admin@gabochie.com</b>, call <b>+233 24 326 2019</b>, or WhatsApp <b>+233 26 824 8970</b>.</span>`
      : "");
  };
  const money = (v) => {
    const currency = v.currency || "GHS";
    const amount = Number(v.amount != null ? v.amount : v.amountGHS);
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount); }
    catch { return amount.toFixed(2) + " " + currency; }
  };
  const payCell = (v, id, token, exp) => {
    if (v.status !== "pending") return "";
    if (v.payUrl) return `<a class="btn ghost" href="${v.payUrl}" target="_blank" rel="noopener noreferrer">Pay</a>`;
    if ((v.currency || "GHS") === "GHS") return `<button data-pay="${v.ref}">Pay</button>`;
    return `<a class="btn ghost" href="mailto:admin@gabochie.com?subject=${encodeURIComponent("Payment for " + v.ref)}">Pay by Wise / Payoneer</a>`;
  };
  try {
    const r = await fetch(`/api/client?id=${encodeURIComponent(q.get("id") || "")}&exp=${encodeURIComponent(q.get("exp") || "")}&token=${encodeURIComponent(q.get("token") || "")}`, { cache: "no-store" });
    if (!r.ok) return err(r.status === 401 ? "This link expired or was made for a different project." : "Couldn't load your page right now.", true);
    const { record } = await r.json();
    document.getElementById("c-title").textContent = record.label;
    document.getElementById("c-meta").textContent = `${record.stack} Â· ${record.stage}`;
    const paidRef = q.get("paid") || "";
    if (paidRef) {
      const hit = record.invoices.find((v) => paidRef.indexOf(v.ref) !== -1);
      document.getElementById("c-note").textContent = hit
        ? `Payment reference received for ${hit.ref}. I confirm settlement on my side and mark it paid within a few hours â€” nothing more for you to do.`
        : "Payment reference received. I'll confirm and update your invoice shortly.";
    }
    const pct = Math.round((record.gate.done / record.gate.total) * 100);
    document.getElementById("c-gate").style.width = pct + "%";
    document.getElementById("c-gate").parentElement.title = `${record.gate.done}/${record.gate.total}`;
    document.getElementById("c-findings").innerHTML = record.findings.map((f) =>
      `<tr><td>${f.id}</td><td>${f.title}</td><td>${f.severity}</td><td><span class="pill ${f.status === "fixed" ? "done" : "open"}">${f.status}</span></td></tr>`).join("");
    document.getElementById("c-invoices").innerHTML = record.invoices.map((v) =>
      `<tr><td>${v.ref}</td><td>${v.item}</td><td>${money(v)}</td>` +
      `<td><span class="pill ${v.status === "paid" ? "done" : "open"}">${v.status}</span></td>` +
      `<td>${payCell(v, record.id, q.get("token"), q.get("exp"))}</td></tr>`).join("");
    document.querySelectorAll("[data-pay]").forEach((btn) => btn.addEventListener("click", async () => {
      btn.disabled = true;
      try {
        const pr = await fetch("/api/deposit", { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId: record.id, token: q.get("token"), exp: q.get("exp"), invoiceRef: btn.dataset.pay }) });
        const d = await pr.json();
        if (pr.ok && d.checkoutUrl) location.href = d.checkoutUrl;
        else document.getElementById("c-err").textContent = d.message || "Payments aren't live yet â€” you'll be notified.";
      } catch { document.getElementById("c-err").textContent = "Network hiccup â€” try again."; }
      btn.disabled = false;
    }));
  } catch { err("Network hiccup â€” check your connection and reload.", false); }
})();
