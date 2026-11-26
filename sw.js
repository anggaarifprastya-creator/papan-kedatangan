/* Papan Kedatangan Surabaya Raya - Service Worker pendamping */
/* Versi: 26 November 2026. Upload file ini berdampingan dengan file HTML di GitHub Pages. */
/* Jika file ini tidak ada, HTML tetap jalan karena register() di HTML gagal diam-diam. */
var CACHE = 'sby-papan-2026-11-26-v1';
var PRECACHE = ['./', './manifest.json'];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(PRECACHE); }).catch(function() {}));
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.map(function(k) { if (k !== CACHE) return caches.delete(k); }));
  }).catch(function() {}));
});
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE).then(function(c) { c.put(e.request, copy); }).catch(function() {});
      return res;
    }).catch(function() {
      return caches.match(e.request).then(function(hit) {
        if (hit) return hit;
        if (e.request.mode === 'navigate') return caches.match('./');
        return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      });
    })
  );
});
