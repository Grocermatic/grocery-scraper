import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheOnly, StaleWhileRevalidate } from 'workbox-strategies'

const config = {
  maxAgeSeconds: 60 * 60 * 24,
}

console.info('Clean outdated caches')
cleanupOutdatedCaches()

console.info('Precache manifest')
precacheAndRoute(self.__WB_MANIFEST)

console.info('Prefer latest cache for assets')
registerRoute(
  /\.(?:css|js|html|json|br)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [{ maxAgeSeconds: config.maxAgeSeconds }],
  }),
)

console.info('Cache images for offline use')
registerRoute(/\.(?:png|ico|gif|jpg|jpeg|svg|webp)$/, new CacheOnly({ cacheName: 'images' }))

self.skipWaiting()
clientsClaim()
