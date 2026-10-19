const CACHE = "gabo-v3";
const CORE = [
  "/",
  "/styles.css",
  "/site.js",
  "/theme.js",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/offline.html",
];
const ALLOW = new Set([
  "/",
  "/index.html",
  "/scan/",
  "/scan/index.html",
  "/checklist/",
  "/checklist/index.html",
  "/insights/",
  "/insights/index.html",
  "/legal/privacy.html",
  "/legal/terms.html",
]);

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

function isGet(req) {
  return req.method === "GET";
}
function isNavig(req) {
  return req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
}
function shouldCacheAsset(url) {
  const p = url.pathname;
  if (p.startsWith("/api/")) return false;
  if (p.startsWith("/app/")) return false;
  if (p.startsWith("/os/")) return false;
  if (p.startsWith("/unlock/")) return false;
  if (p.startsWith("/admin/")) return false;
  return true;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (!isGet(req)) return;

  if (isNavig(req)) {
    e.respondWith(
      fetch(req).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  if (!shouldCacheAsset(url)) return;
  if (ALLOW.has(url.pathname) || ALLOW.has(url.pathname + "index.html")) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((m) => m || fetch(req).then((res) => {
      if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
      return res;
    }).catch(() => m))
  );
});

self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});
