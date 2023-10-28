import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const faviconUrl = '/favicon.svg'
const appleTouchIconUrl = '/apple-touch-icon.png'
const androidIconUrl = '/android-icon.png'
const safariPinnedTabUrl = '/safari-pinned-tab.svg'

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
      includeAssets: [faviconUrl, appleTouchIconUrl, androidIconUrl, safariPinnedTabUrl],
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
            src: appleTouchIconUrl,
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: androidIconUrl,
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: safariPinnedTabUrl,
            sizes: '16x16',
            type: 'image/png',
          },
        ],
        display: 'standalone',
      },
    }),
  ],
})
