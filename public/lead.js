// Lead quiz: 3 steps → POST /api/lead. No deps. Honeypot + consent enforced client-side AND server-side.
(function () {
  const STACKS = ["Next.js", "Node API", "Python", "PHP / Laravel", "WordPress", "Cloudflare edge", "Static site", "Other"];
  const PAINS = ["Checkout / payments", "Auth / access control", "Deploy / downtime", "Messy / slow codebase"];
  const state = { stack: "", pain: "" };
  const $ = (id) => document.getElementById(id);
  if (!$("quiz")) return;

  function opts(el, items, key) {
    el.innerHTML = "";
    items.forEach((label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn ghost";
      b.textContent = label;
      b.addEventListener("click", () => {
        state[key] = label;
        show(key === "stack" ? 2 : 3);
      });
      el.appendChild(b);
    });
  }
  function show(n) {
    document.querySelectorAll(".qstep").forEach((s) => { s.hidden = s.dataset.step !== String(n); });
  }
  opts($("stack-opts"), STACKS, "stack");
  opts($("pain-opts"), PAINS, "pain");

  $("lead-back").addEventListener("click", () => show(2));
  $("lead-submit").addEventListener("click", async () => {
    const msg = $("lead-msg");
    const email = $("lead-email").value.trim();
    const url = $("lead-url").value.trim();
    if (!state.stack || !state.pain) { msg.textContent = "Pick your stack and biggest fear first."; show(1); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = "That email doesn't look right."; return; }
    if (!$("lead-consent").checked) { msg.textContent = "Please tick consent so I may email you back."; return; }
    msg.textContent = "Sending…";
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stack: state.stack, pain: state.pain, url, email, consent: true, website: $("lead-website").value }),
      });
      if (r.ok) {
        $("quiz").querySelectorAll(".qstep").forEach((s) => { s.hidden = true; });
        $("quiz-done").hidden = false;
      } else {
        const d = await r.json().catch(() => ({}));
        msg.textContent = d.error === "email not configured"
          ? "Thanks — capture is almost live. Email devops@gabochie.com directly for now."
          : (d.error || "Couldn't send. Email devops@gabochie.com directly.");
      }
    } catch {
      msg.textContent = "Network hiccup. Email devops@gabochie.com directly.";
    }
  });
})();
