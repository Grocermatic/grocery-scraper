import * as Cheerio from "cheerio"
import { GetBatchProductInfo, ProductInfo } from "../interface"
import { getProductInfo } from "./getProductInfo"
import { scrapeStatic } from "../../request/scrapeStatic"
import { generateUniqueArray } from "../../dataCleaning/generateUniqueArray"



export const aldiPageProducts = (html:string):ProductInfo[] => {
  const productInfos:ProductInfo[] = []
  const $ = Cheerio.load(html)
  $('.box--wrapper').each((id, element: any) => {
    const productInfo = getProductInfo($(element).toString())
    if (productInfo != null) { productInfos.push(productInfo) }
  })
  return productInfos
}



export const getAldiBatchProductInfo:GetBatchProductInfo = async(urls) => {
  let productInfos:ProductInfo[] = []
  for (const url of urls) {
    const html = await scrapeStatic(url)
    const productInfoSublist = aldiPageProducts(html)
    if (productInfoSublist.length > 0) {
      productInfos = productInfos.concat(productInfoSublist)
    }
  }
  return generateUniqueArray(productInfos)
}