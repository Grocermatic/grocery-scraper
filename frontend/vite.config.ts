import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const faviconUrl = '/favicon.ico'
const androidIcon192Url = '/android-chrome-192x192.png'
const androidIcon512Url = '/android-chrome-512x512.png'
const appleTouchIconUrl = '/apple-touch-icon.png'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  plugins: [
    solid(),
    viteSingleFile({ useRecommendedBuildConfig: false }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: './',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: [
        faviconUrl,
        androidIcon192Url,
        androidIcon512Url,
        appleTouchIconUrl,
        safariPinnedTabUrl,
      ],
      manifest: {
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
          }
        ],
        display: 'standalone',
      },
    }),
  ],
})
