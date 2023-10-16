import * as Cheerio from "cheerio"
import { getProductInfo } from "./getProductInfo"
import { ProductInfoReport } from "../ProductInfoReport"



export const getProductInfoPage = (html: string) => {
  const report = new ProductInfoReport()

  const $ = Cheerio.load(html)
  $('.box--wrapper').each((id, element: any) => {
    const $ = Cheerio.load(element)
    const unit = $('.box--amount').text().slice(-2).toLowerCase()
    if (!['ea', 'pk'].includes(unit)) report.recordProductInfo(getProductInfo, $(element).toString())
  })
  return report
}
