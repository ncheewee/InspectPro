// InspectPro Service Worker — v1
// Minimal SW for PWA installability (no offline caching needed;
// app requires live API on Render + Supabase).

const CACHE_NAME = 'inspectpro-shell-v1';

self.addEventListener('install', event => {
  // Activate immediately without waiting for old SW to be released
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim all clients so the SW is active straight away
  event.waitUntil(clients.claim());
});

// Passthrough fetch — no caching strategy.
// Chrome requires a fetch listener for the beforeinstallprompt to fire.
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
