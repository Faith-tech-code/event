const CACHE_NAME = 'event-manager-v3';
// Only cache the core app shell. Other assets will be cached on demand by the fetch handler.
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'app.js',
    'events-data.js',
    'manifest.json'
];

// Install a service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Stale-While-Revalidate strategy
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // Clone the response to put it in the cache.
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                // Return the original network response to the browser.
                return networkResponse;
            });

            // Return the cached response immediately if it exists,
            // otherwise, wait for the network response.
            return cachedResponse || fetchPromise;
        })
    );
});

// Delete old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});