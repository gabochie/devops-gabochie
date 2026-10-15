// Read-only offline shell. NEVER cache /api/*, /data/*.json is stale-OK, money pages don't exist here.
const SW_VERSION = "v1";
const CACHE = "devops-" + SW_VERSION;
const ALLOW = ["/", "/offline.html", "/app/", "/styles.css", "/app/app.css", "/favicon.svg", "/icons/icon-192.png", "/icons/icon-512.png"];
const DENY = ["/api/", "/admin/"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ALLOW)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== self.location.origin) return;
  if (DENY.some((d) => (u.pathname + u.search).includes(d))) return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request).then((res) => {
        if (res.ok && (u.pathname === "/" || u.pathname === "/app/" || u.pathname.endsWith(".css") || u.pathname.endsWith(".js"))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => hit || caches.match("/offline.html"));
      return hit || net;
    })
  );
});
