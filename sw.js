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
    // Use a "Stale-While-Revalidate" strategy
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response from cache, but also fetch a new version from the network.
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                    return networkResponse;
                });

                // Return the cached response immediately if available, otherwise wait for the network
                if (response) {
                    return response;
                }
                return fetchPromise;
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