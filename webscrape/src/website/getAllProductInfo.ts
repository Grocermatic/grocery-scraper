/* istanbul ignore file */

import { limitArrayLengths } from "../dataCleaning/dataCleaning"
import { getAldiBatchProductInfo } from "./aldi/getProductInfo"
import { getColesBatchProductInfo } from "./coles/getProductInfo"
import { GetBatchProductInfo, ProductInfo } from "./interface"
import { getWoolworthsBatchProductInfo } from "./woolworths/getProductInfo"



const productInfoScraperHash = new Map(Object.entries({
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



export const getAllProductInfos = async(urlsList:string[][], batchSize:number) => {
  const limitedUrlsList = limitArrayLengths(urlsList, batchSize)
  let productInfos:ProductInfo[] = []
  for (let i = 0; i < limitedUrlsList.length; i++) {
    for (let j = 0; j < limitedUrlsList[i].length; j++) {
      const urls = limitedUrlsList[i][j]
      const productInfoSubArray = await getAllProductInfo(urls)
      if (productInfoSubArray.length > 0) {
        productInfos = productInfos.concat(productInfoSubArray)
      }
    }
  }

  return productInfos
}