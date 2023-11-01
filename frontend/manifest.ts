const faviconUrl = 'favicon.ico'
const faviconSvgUrl = 'favicon.svg'
const androidIcon192Url = 'android-chrome-192x192.png'
const androidIcon512Url = 'android-chrome-512x512.png'
const appleTouchIconUrl = 'apple-touch-icon.png'
const safariTabIconUrl = 'safari-pinned-tab.svg'

export const icons = [
  faviconUrl,
  faviconSvgUrl,
  androidIcon192Url,
  androidIcon512Url,
  appleTouchIconUrl,
  safariTabIconUrl,
]

export const manifest = {
  name: 'Grocermatic',
  theme_color: '#FFFFFF',
  background_color: '#ffffff',
  icons: [
    {
      src: faviconUrl,
      sizes: '32x32',
      type: 'image/svg',
    },
    {
      src: faviconSvgUrl,
      sizes: '32x32',
      type: 'image/svg',
      purpose: 'any maskable',
    },
    {
      src: androidIcon192Url,
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: androidIcon512Url,
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: appleTouchIconUrl,
      sizes: '180x180',
      type: 'image/png',
    },
    {
      src: safariTabIconUrl,
      sizes: '16x16',
      type: 'image/svg',
    },
  ],
  display: 'standalone',
}
