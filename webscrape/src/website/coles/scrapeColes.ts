import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoSection } from './getProductInfoSection'

export const scrapeColes = async (cookie?: string) => {
  const report = new ProductInfoReport()

  // Page links with get request health star filters
  const sectionLinks = [
    // meat-seafood
    'https://www.coles.com.au/browse/meat-seafood',
    // fruit-vegetables
    'https://www.coles.com.au/browse/fruit-vegetables',
    // dairy-eggs-fridge
    'https://www.coles.com.au/browse/dairy-eggs-fridge',
    // bakery
    'https://www.coles.com.au/browse/bakery',
    // pantry
    'https://www.coles.com.au/browse/pantry',
    // deli
    'https://www.coles.com.au/browse/deli',
    // drinks
    'https://www.coles.com.au/browse/drinks',
    // frozen
    'https://www.coles.com.au/browse/frozen',
  ]

  for (const sectionLink of sectionLinks) {
    await report.recordProductInfoSection(getProductInfoSection, sectionLink, cookie)
  }
  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
