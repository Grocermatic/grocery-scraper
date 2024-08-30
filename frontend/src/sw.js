import { clientsClaim } from 'workbox-core'
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

const revision = `${Date.now()}`
const cacheUrlUntilUpdate = ['app/index.html']
cacheUrlUntilUpdate.map((url) => {
  precacheAndRoute([{ url, revision }])
  registerRoute(new NavigationRoute(createHandlerBoundToURL(url)))
})

self.addEventListener('install', () => {
  console.info('Install service worker')
  cleanupOutdatedCaches()
  self.skipWaiting()
  clientsClaim()
})
