import { createHash } from 'crypto'
import * as cheerio from 'cheerio'
import { PluginOption } from 'vite'
import { minify } from 'html-minifier'

export const viteSri = () => {
  return {
    name: 'sri',
    enforce: 'post',
    apply: 'build',

    async transformIndexHtml(html: string, context: any) {
      const bundle = context.bundle

      const calculateIntegrityHashes = async (element: cheerio.Element) => {
        let source
        let attributeName = element.attribs.src ? 'src' : 'href'
        const resourcePath = element.attribs[attributeName]
        if (resourcePath?.startsWith('http')) {
          // Load remote source from URL.
          source = await (await fetch(resourcePath)).text()
        } else if (element.attribs.src || element.attribs.href) {
          // Load local source from bundle.
          const resourcePathWithoutLeadingSlash = element.attribs[attributeName].slice(1)
          const bundleItem = bundle[resourcePathWithoutLeadingSlash]
          source = bundleItem.code || bundleItem.source
        } else {
          source = $(element).text()
        }
        element.attribs.integrity = `sha512-${createHash('sha512')
          .update(source)
          .digest()
          .toString('base64')}`
      }

      html = minify(html, {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
      })
      const $ = cheerio.load(html)
      $.prototype.asyncForEach = async function (callback: any) {
        for (let index = 0; index < this.length; index++) {
          await callback(this[index], index, this)
        }
      }

      // Implement SRI for scripts and stylesheets.
      const scripts = $('script') as any
      const stylesheets = $('style') as any

      await scripts.asyncForEach(calculateIntegrityHashes)
      await stylesheets.asyncForEach(calculateIntegrityHashes)

      return $.html()
    },
  } as PluginOption
}
