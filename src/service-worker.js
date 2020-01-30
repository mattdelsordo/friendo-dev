/**
 * This is the service worker!
 * Caches game resources so that it can be available offline/installable.
 */

// We need access to self to set up the service worker
/* eslint-disable no-restricted-globals, comma-dangle, function-paren-newline */

const CACHE_NAME = 'friendo-cache'

self.addEventListener('install', (event) => {
  // open cache, cache files, verify cached assets
  event.waitUntil(
    // URLS_TO_CACHE is injected in by webpack
    /* eslint-disable-next-line no-undef */
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE)),
  )
})

/**
 * We want users to be able to get updates as soon as they are available,
 * so the service worker tries to fetch first and uses the cache as a backup.
 * Pros: users get the newest data on first load, still works offline.
 * Cons: no benefit to load speed when on the network, every response is cached.
 * Resources are downloaded once at initial page load so it's not that big a deal IMO.
 */
self.addEventListener('fetch', event => event.respondWith(
  // fetch isn't supported in Opera/IE, well neither are service workers
  /* eslint-disable-next-line compat/compat */
  fetch(event.request)
    .then((res) => {
      // cache all successful requests
      // check if response was valid
      if (!res || res.status !== 200 || res.type !== 'basic') {
        return res
      }

      // clone response stream so that both browser and cache can consume it
      const responseToCache = res.clone()
      // open the cache and cache the response
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, responseToCache)
      })

      return res
    })
    // if the request can't be satisfied look it up in the cache
    .catch(() => caches.match(event.request))
))
