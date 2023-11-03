import { CheerioAPI, Element } from 'cheerio'
import { minify } from './minify'

export const getSource = async (
  $: CheerioAPI,
  element: Element,
  bundle: any,
  sourceType: string,
) => {
  let source
  if (element.attribs.src || element.attribs.href) {
    // Inline local source from bundle.
    const attributeName = element.attribs.src ? 'src' : 'href'
    const resourcePathWithoutLeadingSlash = element.attribs[attributeName].slice(1)
    const bundleItem = bundle[resourcePathWithoutLeadingSlash]
    delete element.attribs[attributeName]
    source = minify(bundleItem.code, sourceType)
    $(element).text(source)
  } else {
    // Load inline source
    source = minify($(element).text(), sourceType)
    $(element).text(source)
  }
  return source
}
