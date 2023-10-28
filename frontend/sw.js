import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheOnly, StaleWhileRevalidate } from 'workbox-strategies'

const config = {
  maxAgeSeconds: 60 * 60 * 24,
}

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  /\.(?:css|js|html|json|br)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [{ maxAgeSeconds: config.maxAgeSeconds }],
  }),
)

registerRoute(/\.(?:png|ico|gif|jpg|jpeg|svg|webp)$/, new CacheOnly({ cacheName: 'images' }))

self.skipWaiting()
clientsClaim()

console.info('Executed service worker')
