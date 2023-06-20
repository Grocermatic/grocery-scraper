/* istanbul ignore file */

import { getAldiBatchProductInfo } from "./aldi/getProductInfo"
import { getColesBatchProductInfo } from "./coles/getProductInfo"
import { GetBatchProductInfo, GetProductLinks, ProductInfo } from "./interface"
import { getWoolworthsBatchProductInfo } from "./woolworths/getProductInfo"



export const productInfoScraperHash = new Map(Object.entries({
  "coles": getColesBatchProductInfo,
  "aldi": getAldiBatchProductInfo,
  "woolworths": getWoolworthsBatchProductInfo
}))

export const getAllProductInfo:GetBatchProductInfo = async(urls) => {
  const baseUrl = urls[0].match(/[a-z]*.com/i)
  if (baseUrl) {
    const storeName:string = baseUrl[0].split('.')[0]
    const productInfoScraper = productInfoScraperHash.get(storeName)
    if (productInfoScraper) {
      const productInfos = await productInfoScraper(urls)
      return productInfos
    }
  }
  return []
}