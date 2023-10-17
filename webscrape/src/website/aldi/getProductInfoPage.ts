import * as Cheerio from "cheerio"
import { getProductInfo } from "./getProductInfo"
import { ProductInfoReport } from "../ProductInfoReport"



export const getProductInfoPage = (html: string) => {
  const report = new ProductInfoReport()

  const $ = Cheerio.load(html)
  $('.box--wrapper').each((_id, element: Cheerio.Element) => {
    const $ = Cheerio.load(element)
    const unit = $('.box--amount').text().slice(-2).toLowerCase()
    const rawTitle = $('.box--description--header').first().text().trim()
    if (!['ea', 'pk'].includes(unit) && rawTitle.length > 0) report.recordProductInfo(getProductInfo, $(element).toString())
  })
  return report
}
