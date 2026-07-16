const CACHE_NAME = "babra-ecosystem-v6";
const OFFLINE_URL = "/offline";
const PRECACHE = [
  "/",
  "/cosmetics",
  "/store",
  "/products",
  "/lost-and-found",
  "/rwanda-mobile-hub",
  "/lifetalk-tv",
  "/farm",
  "/schools",
  "/schools/masterplan",
  "/investor-sponsor-access",
  "/foundation",
  "/account",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/media/logos/babra-logo.jpeg",
  "/media/products/babra-lotion-women-500ml.png",
  "/media/products/babra-lotion-men-500ml.png",
  "/media/products/babra-lotion-babies-500ml.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(OFFLINE_URL)))
  );
});
