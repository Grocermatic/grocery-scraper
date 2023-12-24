import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { viteCSP } from '../plugin/viteCSP'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
const tailwindConfig = require('../tailwind.config.cjs')

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: '../dist/app',
  },
  css: {
    postcss: {
      plugins: [tailwindcss(tailwindConfig), autoprefixer()],
    },
  },
  plugins: [
    solid(),
    viteCSP({
      otherCsp: {
        'default-src': [`'none'`],
        'connect-src': [
          'data:',
          'product.grocermatic.org',
          'cloudflareinsights.com/cdn-cgi/rum',
          'www.google-analytics.com/g/collect',
          'pagead2.googlesyndication.com',
        ],
        'font-src': ['fonts.gstatic.com'],
        'frame-src': ['googleads.g.doubleclick.net', 'www.google.com', 'tpc.googlesyndication.com'],
        'manifest-src': [`'self'`],
        'worker-src': [`'self'`, 'blob:'],
        'img-src': [`'self'`, 'blob:', 'data:', 'https:'],
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
