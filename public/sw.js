const CACHE_NAME = "council-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon.svg",
];

// Установка — кэшируем статику
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Активация — удаляем старые кэши
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Перехват запросов — network-first для страниц и API
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Для статики — cache-first
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request);
      })
    );
    return;
  }

  // Для страниц и API — network-first
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
