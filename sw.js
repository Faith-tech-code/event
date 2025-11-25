const CACHE_NAME = 'event-manager-v3';
const urlsToCache = [
    '/',
    'index.html',
    'register.html',
    'dashboard.html',
    'tickets.html',
    'scan.html',
    'checked-in.html',
    'styles.css',
    'app.js',
    'manifest.json',
    'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
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