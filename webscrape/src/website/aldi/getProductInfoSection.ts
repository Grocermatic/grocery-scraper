import { scrapeStatic } from "../../request/scrapeStatic"
import { ProductInfoReport } from "../ProductInfoReport"
import { getProductInfoPage } from "./getProductInfoPage"



export const getProductInfoSection = async (url: string, cookie?: string) => {
  const report = new ProductInfoReport()

  const html = await scrapeStatic(url)
  report.recordProductInfoSection(getProductInfoPage, html)
  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
