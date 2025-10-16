const CACHE_NAME = 'passing-fire-v1';
const urlsToCache = [
    './',
    './index.html',
    './images/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Caching failed:', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request);
            })
            .catch((error) => {
                console.error('Fetch failed:', error);
            })
    );
});
