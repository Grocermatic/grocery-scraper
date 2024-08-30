import type { CheerioAPI, Element } from 'cheerio'
import { minify } from './minify'

export const getSource = async (
  $: CheerioAPI,
  element: Element,
  bundle: any,
  sourceType: string,
) => {
  let source: string
  const attributeName = element.attribs.src ? 'src' : 'href'
  const resourcePath = element.attribs[attributeName]

  // Load JS from URL.
  if (resourcePath?.startsWith('http'))
    return await (await fetch(resourcePath)).text()

  if (element.attribs.src || element.attribs.href) {
    // Inline local source from bundle.
    const resourcePathWithoutLeadingSlash =
      element.attribs[attributeName]!.slice(1)
    source = bundle[resourcePathWithoutLeadingSlash].code
    delete bundle[resourcePathWithoutLeadingSlash]
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
