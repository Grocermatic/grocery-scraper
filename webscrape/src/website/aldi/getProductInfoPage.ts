import * as Cheerio from "cheerio"
import { getProductInfo } from "./getProductInfo"
import { ProductInfo } from "../interface"



export const aldiPageProducts = (html:string):ProductInfo[] => {
  const productInfos:ProductInfo[] = []
  const $ = Cheerio.load(html)
  $('.box--wrapper').each((id, element: any) => {
    const productInfo = getProductInfo($(element).toString())
    if (productInfo != null) { productInfos.push(productInfo) }
  })
  return productInfos
}
