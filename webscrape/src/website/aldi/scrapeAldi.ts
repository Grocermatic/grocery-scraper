import { ProductInfoReport } from "../ProductInfoReport"
import { getProductInfoSection } from "./getProductInfoSection"



export const scrapeAldi = async (cookie?: string) => {
  const report = new ProductInfoReport()

  const productLinks = [
    'https://www.aldi.com.au/en/groceries/super-savers',
    'https://www.aldi.com.au/en/groceries/limited-time-only',
    'https://www.aldi.com.au/en/groceries/seasonal-range',
    'https://www.aldi.com.au/en/groceries/freezer',
    'https://www.aldi.com.au/en/groceries/pantry/olive-oil',
    'https://www.aldi.com.au/en/groceries/fresh-produce/dairy-eggs'
  ]

  const promiseArray = productLinks.map(url => {
    return report.recordProductInfoSection(getProductInfoSection, url, cookie)
  })
  await Promise.all(promiseArray)
  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
