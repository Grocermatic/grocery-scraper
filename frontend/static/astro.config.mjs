import { defineConfig } from 'astro/config'
import { readFileSync } from 'fs'
import tailwind from '@astrojs/tailwind'
import AstroPWA from '@vite-pwa/astro'
import sitemap from '@astrojs/sitemap'

const manifestJson = readFileSync('frontend/public/manifest.json').toString()

export default defineConfig({
  srcDir: './',
  outDir: '../dist',
  site: 'https://www.grocermatic.org',
  integrations: [
    tailwind(),
    sitemap(),
    AstroPWA({
      strategies: 'injectManifest',
      srcDir: './plugin',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon-light.svg',
        'spinner.svg',
        'blank.svg',
      ],
      manifest: JSON.parse(manifestJson),
    }),
  ],
})
