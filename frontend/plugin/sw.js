import { clientsClaim } from 'workbox-core'
import { PrecacheFallbackPlugin, cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

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

this.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_UPDATED') {
    const { updatedURL } = event.data.payload
    console.log(`A newer version of ${updatedURL} is available!`)
  }
})

self.addEventListener('install', (e) => {
  console.info('Install service worker')
  cleanupOutdatedCaches()
  self.skipWaiting()
  clientsClaim()
})
