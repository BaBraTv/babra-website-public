const CACHE_NAME = "babra-ecosystem-v5";
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
  "/icons/icon.svg",
  "/brand/logo.jpeg",
  "/brand/official-babra-bottle.png",
  "/brand/official-babra-bottle-men.png",
  "/brand/official-babra-bottle-kids.png",
  "/products/pocket-fresh-rose.png",
  "/products/pads.png",
  "/products/soap-2.png"
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
