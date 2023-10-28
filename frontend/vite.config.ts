import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const faviconUrl = '/favicon.svg'
const mobileFaviconUrl = '/mobile-favicon.svg'

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
      includeAssets: [faviconUrl, mobileFaviconUrl],
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
            src: mobileFaviconUrl,
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: mobileFaviconUrl,
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
        display: 'standalone',
      },
    }),
  ],
})
