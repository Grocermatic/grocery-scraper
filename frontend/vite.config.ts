import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from "vite-plugin-singlefile"
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

let faviconUrl = '/favicon.svg'

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
      injectRegister: 'inline',
      includeAssets: [faviconUrl],
      manifest: {
        name: 'Grocermatic',
        theme_color: '#FFFFFF',
        icons: [
          {
            src: faviconUrl,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: faviconUrl,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
