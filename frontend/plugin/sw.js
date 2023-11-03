import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheOnly, StaleWhileRevalidate } from 'workbox-strategies'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  /\.(?:css|js|html)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [{ maxAgeSeconds: 60 * 60 }],
  }),
)

registerRoute(
  /\.(?:json)$/,
  new StaleWhileRevalidate({
    cacheName: 'product',
    plugins: [{ maxAgeSeconds: 60 * 60 * 12 }],
  }),
)

registerRoute(/\.(?:png|ico|gif|jpg|jpeg|svg|webp)$/, new CacheOnly({ cacheName: 'images' }))

self.skipWaiting()
clientsClaim()

console.info('Executed service worker')
