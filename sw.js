// Service Worker untuk PWA Kereta SBY - v9
const CACHE = 'kereta-sby-v9';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

// Strategi: Cache-first untuk file lokal, Network-first untuk data jadwal (biar jadwal tetap fresh)
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Jangan cache request ke API eksternal / jadwal live - langsung ke network
  if (url.origin !== location.origin) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => {
      // Untuk HTML, utamakan network biar update terbaru, fallback ke cache kalau offline
      if (e.request.mode === 'navigate' || e.request.destination === 'document') {
        return fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        }).catch(() => cached || caches.match('./index.html'));
      }
      return cached || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      });
    })
  );
});
