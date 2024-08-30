import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import solid from 'vite-plugin-solid'
const twConfig = require('./tailwind.config.cjs')

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(twConfig), autoprefixer()],
    },
  },
  plugins: [
    solid(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      injectRegister: 'script',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon-light.svg',
        'spinner.svg',
        'blank.svg',
      ],
      manifest: {
        name: 'Grocermatic',
        short_name: 'Grocermatic',
        description:
          'Grocermatic is a money-saving app that compares Australian grocery prices. Save time on price comparisons and track spending.',
        lang: 'en',
        categories: ['finance', 'food', 'lifestyle', 'shopping'],
        display: 'standalone',
        orientation: 'portrait',
        display_override: [
          'standalone',
          'minimal-ui',
          'browser',
          'fullscreen',
          'window-controls-overlay',
        ],
        theme_color: '#FFFFFF',
        background_color: '#FFFFFF',
        id: 'www.grocermatic.org',
        start_url: '/',
        scope: '/',
        prefer_related_applications: false,
        launch_handler: {
          client_mode: 'auto',
        },
        handle_links: 'auto',
        shortcuts: [
          {
            name: 'Home',
            url: '/',
            description: 'Home page',
          },
          {
            name: 'Search',
            url: '/search',
            description: 'Search for grocery',
          },
        ],
        icons: [
          {
            src: 'favicon.ico',
            sizes: '32x32',
            type: 'image/ico',
            purpose: 'any',
          },
          {
            src: 'favicon.svg',
            sizes: '32x32',
            type: 'image/svg',
            purpose: 'any',
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'safari-pinned-tab.svg',
            sizes: '16x16',
            type: 'image/svg',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-1.webp',
            sizes: '1442x3202',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Search apples',
          },
        ],
      },
    }),
  ],
})
