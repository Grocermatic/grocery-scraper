import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { viteCSP } from './plugin/viteCSP'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { icons, manifest } from './plugin/manifest'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  plugins: [
    solid(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: './plugin',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: icons,
      manifest: manifest,
    }),
    viteCSP({
      otherCsp: {
        'default-src': [`'none'`],
        'connect-src': [
          'product.grocermatic.org',
          'cloudflareinsights.com/cdn-cgi/rum',
          'www.google-analytics.com/g/collect',
          'pagead2.googlesyndication.com',
        ],
        'font-src': ['fonts.gstatic.com'],
        'frame-src': ['googleads.g.doubleclick.net', 'www.google.com', 'tpc.googlesyndication.com'],
        'manifest-src': [`'self'`],
        'worker-src': [`'strict-dynamic'`],
        'img-src': [`'self'`, 'data:', 'https:'],
      },
      scriptSrc: [
        `'sha256-l0IHPvf8eV52c9mPJymShDKYQmoP/YyzUHeE31FDYIs='`, // Manifest hash
        'static.cloudflareinsights.com',
        'www.googletagmanager.com/gtag/js',
        'pagead2.googlesyndication.com',
        'partner.googleadservices.com',
        'tpc.googlesyndication.com',
      ],
      styleSrc: ['fonts.googleapis.com', 'about:'],
    }),
  ],
})
