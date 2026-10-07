const CACHE_VERSION = "abidia-v1";
const PRECACHE = ["/", "/icons/icon-192.png", "/icons/icon-512.png", "/images/logos/Abidia logo.png"];

const OFFLINE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Offline — Abidia Engineering</title>
<style>
:root{color-scheme:light}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;
font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:#faf8f6;color:#17171b}
.card{max-width:26rem;text-align:center}
.logo{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:10px;padding:10px 14px;display:inline-block;font-weight:800;letter-spacing:.18em;color:#9b393a}
h1{font-size:1.4rem;margin:22px 0 8px}
p{color:#6b6a72;line-height:1.6;margin:0 0 20px;font-size:.95rem}
a{display:inline-block;background:#9b393a;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600;font-size:.95rem}
</style></head>
<body><div class="card">
<div class="logo">ABIDIA</div>
<h1>You are offline</h1>
<p>Your connection is unavailable, but the Abidia app is still installed. Reconnect to load pages, or call us directly.</p>
<a href="tel:+27834702027">Call 083 470 2027</a>
</div></body></html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await Promise.allSettled(PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" }))));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

const isStaticAsset = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  url.pathname.startsWith("/icons/") ||
  /\.(?:png|jpg|jpeg|webp|svg|woff2?|ico|pdf)$/i.test(url.pathname);

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request, { ignoreSearch: true });
          if (cached) return cached;
          const home = await caches.match("/");
          if (home) return home;
          return new Response(OFFLINE_HTML, {
            status: 2053,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      })()
    );
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh.ok) {
            const cache = await caches.open(CACHE_VERSION);
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })()
    );
  }
});
