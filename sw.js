/* sw.js — Ujian PWA Service Worker */
const CACHE = 'ujian-v1';

const SHELL = [
  '/',
  '/ujian/',
  '/ujian/index.html',
  '/assets/css/style.css',
  '/assets/js/main2.js',
  'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
];

/* ── Install: cache the shell ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: remove old caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch strategy ──
   - Google Apps Script API  → network only (always fresh)
   - Google Fonts / CDN      → cache first
   - Everything else         → network first, fall back to cache
*/
self.addEventListener('fetch', e => {
  const url = e.request.url;

  /* API calls: never cache */
  if (url.includes('script.google.com')) {
    return; /* let browser handle normally */
  }

  /* Fonts & CDN: cache first */
  if (url.includes('fonts.googleapis.com') ||
      url.includes('fonts.gstatic.com') ||
      url.includes('cdn.jsdelivr.net')) {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
      )
    );
    return;
  }

  /* Everything else: network first */
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
