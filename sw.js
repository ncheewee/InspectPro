// InspectPro Service Worker — v2
// Minimal SW for PWA installability (no offline caching needed;
// app requires live API on Render + Supabase).

const CACHE_NAME = 'inspectpro-shell-v2';

self.addEventListener('install', event => {
  // Activate immediately without waiting for old SW to be released
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim all clients, then notify them a new SW has taken over
  event.waitUntil(
    clients.claim().then(() =>
      clients.matchAll({ type: 'window' }).then(all =>
        all.forEach(c => c.postMessage({ type: 'SW_ACTIVATED' }))
      )
    )
  );
});

// Passthrough fetch — no caching strategy.
// Chrome requires a fetch listener for the beforeinstallprompt to fire.
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
