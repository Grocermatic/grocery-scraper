import type { PluginOption } from 'vite'
import { load } from 'cheerio'
import { sha512 } from './hash'
import { getSource } from './getSource'
import { generateHeadersFile } from './generateHeadersFile'
import { keys } from '../app/logic/keys'

// CSP doc: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources
type OtherCsp = {
  // Fetch directives
  'default-src'?: string[]
  'child-src'?: string[]
  'connect-src'?: string[]
  'font-src'?: string[]
  'frame-src'?: string[]
  'img-src'?: string[]
  'manifest-src'?: string[]
  'media-src'?: string[]
  'object-src'?: string[]
  'prefetch-src'?: string[]
  'worker-src'?: string[]
  // Document directives
  'base-uri'?: string[]
  // Navigation directives
  'navigate-to'?: string[]
  'form-action'?: string[]
}

type ConfigCsp = {
  otherCsp?: OtherCsp
  scriptSrc?: string[]
  styleSrc?: string[]
}

export const viteCSP = (configCsp: ConfigCsp = {}) => {
  return {
    name: 'sri',
    enforce: 'post',
    apply: 'build',

    async transformIndexHtml(html: string, context: any) {
      const joinMainSrc = (cspList: string[] | undefined) => {
        if (!cspList) return ''
        return cspList.join(' ')
      }

      const joinCsp = (cspLabel: keyof OtherCsp) => {
        const otherCsp = configCsp.otherCsp
        if (!otherCsp) return ''
        const cspList = otherCsp[cspLabel]
        if (!cspList || cspList.length == 0) return ''
        return `${cspLabel} ${cspList.join(' ')};`
      }

      let cspLine = 'upgrade-insecure-requests;'
      if (configCsp.otherCsp) {
        for (const cspLabel of keys(configCsp.otherCsp)) cspLine += joinCsp(cspLabel)
      }

      const bundle = context.bundle
      let $ = load(html) as any
      $.prototype.asyncForEach = async function (cspType: string) {
        let cspLine = cspType
        for (let index = 0; index < this.length; index++) {
          const element = this[index]
          const sourceType = cspType.split('-')[0]
          const source = await getSource($, element, bundle, sourceType)
          const hash = `sha512-${sha512(source)}`
          cspLine += ` '${hash}'`
        }
        return cspLine + ';'
      }

      // Implement SRI for scripts and stylesheets.
      cspLine += await $('script').asyncForEach(`script-src ${joinMainSrc(configCsp.scriptSrc)}`)
      await $('style').asyncForEach(`style-src ${joinMainSrc(configCsp.styleSrc)}`)
      cspLine += `style-src 'unsafe-inline' ${joinMainSrc(configCsp.styleSrc)};`

      // Generate _headers file
      generateHeadersFile(cspLine)

      // Add CSP meta header to HTML
      const cspElement = $('meta').filter('[http-equiv=Content-Security-Policy]')[0]
      cspElement.attribs['content'] = cspLine
      return $.html()
    },
  } as PluginOption
}
