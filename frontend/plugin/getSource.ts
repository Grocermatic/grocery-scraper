import { CheerioAPI, Element } from 'cheerio'
import { minify } from './minify'

export const getSource = async (
  $: CheerioAPI,
  element: Element,
  bundle: any,
  sourceType: string,
) => {
  let source
  const attributeName = element.attribs.src ? 'src' : 'href'
  const resourcePath = element.attribs[attributeName]
  if (resourcePath?.startsWith('http')) {
    // Load JS from URL.
    source = await (await fetch(resourcePath)).text()
    delete element.attribs[attributeName]
    $(element).text(source)
  } else if (element.attribs.src || element.attribs.href) {
    // Load local JS from bundle.
    const resourcePathWithoutLeadingSlash = element.attribs[attributeName].slice(1)
    const bundleItem = bundle[resourcePathWithoutLeadingSlash]
    delete element.attribs[attributeName]
    source = minify(bundleItem.code, sourceType)
    $(element).text(source)
  } else {
    // Load inline CSS from Html
    source = minify($(element).text(), sourceType)
    $(element).text(source)
  }
  return source
}
