import Analytics from 'analytics'
// @ts-ignore
import googleAnalytics from '@analytics/google-analytics'
// @ts-ignore
import { onIdle, onWakeUp } from '@analytics/activity-utils'
// @ts-ignore
import onRouteChange from '@analytics/router-utils'

export const analytics = Analytics({
  app: 'Grocermatic',
  debug: true,
  plugins: [
    googleAnalytics({
      measurementIds: ['G-B48K950YYN'],
    }),
  ],
})

// Session tracking
addEventListener("load", () => analytics.track('open session'))
addEventListener('beforeunload', () => analytics.track('close session'))

// URI tracking
analytics.page()
onRouteChange(() => analytics.page())

// Activity tracking
const oneMinute = 60e3
const opts = {
  timeout: oneMinute,
}
onIdle((activeTime: number) => analytics.track('idle', { 'active time (s)': activeTime }), opts)
onWakeUp(() => analytics.track('active'), opts)

// Page show tracking
addEventListener("pagehide", () => analytics.track('pagehide'))
addEventListener("pageshow", () => analytics.track('pageshow'))

// Mouse tracking
for (const eventName of ['click', 'dblclick']) {
  addEventListener(eventName, (e: any) => {
    const pageDimensions = document.body.getBoundingClientRect()
    analytics.track(eventName, {
      'client x': e.x,
      'client y': e.y,
      'page x': e.pageX,
      'page y': e.pageY,
      height: pageDimensions.height,
      width: pageDimensions.width,
    })
  })
}

// Clipboard tracking
for (const eventName of ['copy', 'cut', 'paste']) {
  addEventListener(eventName, (e: any) =>
    analytics.track(eventName, {
      text: e.clipboardData?.getData('text'),
    }),
  )
}

// Connectivity tracking
addEventListener('offline', () => analytics.track('offline'))
addEventListener('online', () => analytics.track('online'))