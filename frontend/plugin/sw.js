import { clientsClaim } from 'workbox-core'
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

const currentRevision = `${Date.now()}`
const cacheUntilUpdate = (url) => {
  precacheAndRoute([{ url: url, revision: currentRevision }])
  registerRoute(new NavigationRoute(createHandlerBoundToURL(url)))
}
cacheUntilUpdate('app/index.html')

self.addEventListener('install', () => {
  console.info('Install service worker')
  cleanupOutdatedCaches()
  self.skipWaiting()
  clientsClaim()
})
