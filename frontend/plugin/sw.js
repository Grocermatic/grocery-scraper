import { clientsClaim } from 'workbox-core'
import { PrecacheFallbackPlugin, cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import * as navigationPreload from 'workbox-navigation-preload'

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    plugins: [
      new PrecacheFallbackPlugin({
        fallbackURL: '/index.html',
      }),
    ],
  }),
)

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()

console.info('Executed service worker')
