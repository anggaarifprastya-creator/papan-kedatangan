/* SBY PWA Service Worker — app shell saja. Data jadwal TIDAK di-cache, selalu network. */
var CACHE = 'sby-papan-v1';
var SHELL = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);
  /* Lintas origin (API jadwal dll) = network saja, jangan di-cache. */
  if(url.origin !== self.location.origin) return;
  /* Navigasi: network dulu, kalau offline pakai index.html dari cache. */
  if(req.mode === 'navigate'){
    e.respondWith(fetch(req).catch(function(){ return caches.match('./index.html'); }));
    return;
  }
  /* File shell: stale-while-revalidate. Selain itu: network saja. */
  var isShell = SHELL.some(function(p){ return url.pathname.endsWith(p.replace('./','')); }) || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  if(isShell){
    e.respondWith(caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){ if(res && res.ok){ var copy=res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); } return res; }).catch(function(){ return hit; });
      return hit || net;
    }));
  }
});
