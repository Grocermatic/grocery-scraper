import { clientsClaim } from 'workbox-core'
import { PrecacheFallbackPlugin, cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'
import * as navigationPreload from 'workbox-navigation-preload'

precacheAndRoute(self.__WB_MANIFEST)

navigationPreload.enable()
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkOnly({
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
