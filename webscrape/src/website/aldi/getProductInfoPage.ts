import * as Cheerio from "cheerio"
import { getProductInfo } from "./getProductInfo"
import { ProductInfoReport } from "../ProductInfoReport"



export const aldiPageProducts = (html: string) => {
  const report = new ProductInfoReport()

  const $ = Cheerio.load(html)
  $('.box--wrapper').each((id, element: any) => {
    report.recordProductInfo(getProductInfo, $(element).toString())
  })
  return report
}
