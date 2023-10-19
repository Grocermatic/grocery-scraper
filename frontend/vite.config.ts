import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

let faviconUrl = '/favicon.svg'

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      includeAssets: [faviconUrl],
      manifest: {
        name: 'Grocermatic',
        theme_color: '#22C55E',
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
