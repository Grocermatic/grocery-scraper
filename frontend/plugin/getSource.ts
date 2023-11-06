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
    return source
  } else if (element.attribs.src || element.attribs.href) {
    // Inline local source from bundle.
    const resourcePathWithoutLeadingSlash = element.attribs[attributeName].slice(1)
    source = bundle[resourcePathWithoutLeadingSlash].code
  } else {
    // Load inline source
    source = $(element).text()
  }
  delete element.attribs.src
  delete element.attribs.href
  delete element.attribs.crossorigin
  source = minify(source, sourceType)
  $(element).text(source)
  return source
}
