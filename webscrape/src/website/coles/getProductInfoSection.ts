import * as Cheerio from "cheerio"
import { scrapeStatic } from "../../request/scrapeStatic"
import { ProductInfoReport } from "../ProductInfoReport"
import { getProductInfoPage } from "./getProductInfoPage"



export const getProductInfoSection = async (url: string, cookie?: string) => {
  const report = new ProductInfoReport()

  for (let pageNumber = 1; ; pageNumber++) {
    const html = await scrapeStatic(url + `?sortBy=unitPriceAscending&page=${pageNumber}`)
    const $ = Cheerio.load(html)
    const sectionElement = $('section.coles-targeting-ProductTileProductTileWrapper')
    if (sectionElement.length == 0) { break }

    const jsonData = $('#__NEXT_DATA__').text()
    report.recordProductInfoPage(getProductInfoPage, jsonData)
  }
  return report
}
