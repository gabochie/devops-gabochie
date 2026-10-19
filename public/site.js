// Public site behaviour. External file so the strict CSP (script-src 'self')
// needs no 'unsafe-inline'. No framework, no dependencies.
(function () {
  "use strict";

  var root = document.documentElement;
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  // --- Theme toggle ---
  function paintToggle() {
    var light = root.getAttribute("data-theme") === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", light ? "true" : "false");
      b.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      b.textContent = light ? "\u263E" : "\u2600";
    });
    if (metaTheme) metaTheme.setAttribute("content", light ? "#F6F7F9" : "#0B1220");
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      root.style.colorScheme = next;
      try { localStorage.setItem("gabo_theme", next); } catch (e) {}
      paintToggle();
    });
  });
  paintToggle();

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector("header.top");
  if (toggle && header) {
    var setOpen = function (open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("nav-open"));
    });
    header.querySelectorAll("nav.main a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // --- Print / retry buttons ---
  document.querySelectorAll("[data-print]").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
  document.querySelectorAll("[data-retry]").forEach(function (b) {
    b.addEventListener("click", function () { window.location.reload(); });
  });

  // --- Toast (update / install hints) ---
  function toast(message, actionLabel, action) {
    var old = document.getElementById("gabo-toast");
    if (old) old.remove();
    var el = document.createElement("div");
    el.id = "gabo-toast";
    el.setAttribute("role", "status");
    el.style.cssText =
      "position:fixed;left:50%;bottom:1.1rem;transform:translateX(-50%);z-index:80;" +
      "max-width:min(92vw,26rem);padding:.7rem .9rem;border-radius:.7rem;" +
      "background:#121C2E;color:#E7ECF4;border:1px solid #33465F;" +
      "font:500 .9rem/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.35);display:flex;gap:.7rem;align-items:center";
    var span = document.createElement("span");
    span.textContent = message;
    span.style.flex = "1";
    el.appendChild(span);
    if (actionLabel && action) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = actionLabel;
      btn.style.cssText =
        "background:#C9A84C;color:#0B1220;border:0;border-radius:.45rem;" +
        "padding:.4rem .7rem;font-weight:800;cursor:pointer";
      btn.addEventListener("click", function () { action(); el.remove(); });
      el.appendChild(btn);
    }
    document.body.appendChild(el);
    setTimeout(function () { if (el.isConnected) el.remove(); }, 12000);
  }

  // --- Install prompt ---
  var deferredPrompt = null;
  var installButtons = document.querySelectorAll("[data-install]");
  function showInstall(show) {
    installButtons.forEach(function (b) { b.hidden = !show; });
  }
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstall(true);
  });
  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    showInstall(false);
    toast("Installed — open Gabochie DevOps from your home screen.");
  });
  var ua = navigator.userAgent || "";
  var isIOS = /iphone|ipad|ipod/i.test(ua);
  var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/CriOS\//.test(ua) && !/FxiOS\//.test(ua) && !/EdgiOS\//.test(ua);
  var standalone = window.matchMedia("(display-mode: standalone)").matches ||
    (navigator.standalone === true);
  if (isIOS && !standalone) showInstall(true);
  if (!isIOS && !standalone) showInstall(false);
  installButtons.forEach(function (b) {
    b.addEventListener("click", async function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (e) {}
        deferredPrompt = null;
        showInstall(false);
        return;
      }
      if (isIOS) {
        toast("To install: tap Share \u2192 Add to Home Screen");
        return;
      }
      toast("Your browser can't trigger install here. Open in Safari/Chrome and try again.");
    });
  });

  // --- Live proof strip (same-origin JSON) ---
  var strip = document.getElementById("proof-strip");
  if (strip) {
    fetch("/data/summary.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        var updated = String(d.generated || "").slice(0, 10);
        var repos = d.repos && typeof d.repos.count === "number" ? d.repos.count : null;
        var cards = [
          ["Repos in my fleet", repos === null ? "\u2014" : String(repos) + " tracked"],
          ["Data refreshed", updated || "\u2014"],
          ["Method", "Audit \u2192 approve \u2192 verify, every time"],
        ];
        strip.innerHTML = cards.map(function (c) {
          return '<div class="card"><h3>' + c[0] + '</h3><p class="mut">' + c[1] + "</p></div>";
        }).join("");
      })
      .catch(function () { /* keep static fallback */ });
  }

  // --- Service worker: offline shell + update prompt ---
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function (reg) {
      function offerUpdate(worker) {
        toast("A new version is ready.", "Reload", function () {
          worker.postMessage({ type: "SKIP_WAITING" });
        });
      }
      if (reg.waiting) offerUpdate(reg.waiting);
      reg.addEventListener("updatefound", function () {
        var worker = reg.installing;
        if (!worker) return;
        worker.addEventListener("statechange", function () {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            offerUpdate(worker);
          }
        });
      });
    }).catch(function () {});
    var reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  }
})();
