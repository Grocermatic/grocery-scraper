import { scrapeStatic } from "../../request/scrapeStatic"
import { ProductInfoReport } from "../ProductInfoReport"
import { aldiPageProducts } from "./getProductInfoPage"



export const scrapeAldi = async (cookie?: string) => {
  const report = new ProductInfoReport()

  const productLinks = [
    'https://www.aldi.com.au/en/groceries/super-savers/',
    'https://www.aldi.com.au/en/groceries/seasonal-range/',
    'https://www.aldi.com.au/en/groceries/price-reductions/',
    'https://www.aldi.com.au/en/groceries/freezer/',
    'https://www.aldi.com.au/en/groceries/pantry/olive-oil/',
    'https://www.aldi.com.au/en/groceries/fresh-produce/dairy-eggs/'
  ]

  for (const url of productLinks) {
    const html = await scrapeStatic(url, cookie)
    report.recordProductInfoSection(aldiPageProducts, html, cookie)
  }
  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
