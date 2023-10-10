import * as cheerio from 'cheerio'

import { ProductInfo, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getUnitPriceFromString } from "../../dataCleaning/getUnitPriceFromString";
import { scrapeStatic } from '../../request/scrapeStatic';
import { getMetricQuantity } from '../../dataCleaning/getMetricQuantity';



export const getColesProductInfo = (product:any) => {
  const urlSlug = `${product.brand}-${product.name}-${product.size}-${product.id}`.toLowerCase().split(' ').join('-')
  
  const productUnit = product.pricing.unit
  let quantity = getMetricQuantity(`${productUnit.quantity * productUnit.ofMeasureQuantity}${productUnit.ofMeasureUnits}`)
  try { quantity = getMetricQuantity(product.size) } catch {}

  const productInfo:ProductInfo = {
    name: product.name,
    url: `https://www.coles.com.au/product/${urlSlug}`,
    img: `https://productimages.coles.com.au/productimages${product.imageUris[0].uri}`,
    price: product.pricing.now,
    quantity: getMetricQuantity(product.size),
    unitPrice: getUnitPriceFromString(product.pricing.comparable)
  }
  return productInfo
}



export const colesPageProducts = (jsonData:any) => {
  const productInfos:ProductInfo[] = []

  // Filter non-available products and quantities with each
  const products = JSON.parse(jsonData).props.pageProps.searchResults.results.filter((product:any) => {
    return product.availability == true && product.pricing.unit.ofMeasureUnits != 'ea'
  })

  for (const product of products) {
    const productInfo = getColesProductInfo(product)
    productInfos.push(productInfo)
  }
  return productInfos
}



export const getColesBatchProductInfo:GetBatchProductInfo = async(urls) => {
  
  const productHtmlPromiseArray = urls.map(productUrl => {
    return scrapeStatic(productUrl)
  })
  const htmlArray = await Promise.all(productHtmlPromiseArray)

  const productInfos:ProductInfo[] = []
  for (let i = 0; i < htmlArray.length; i++) {
    const html =  htmlArray[i]
    const productInfo = getColesProductInfo(html)
    if (productInfo) { productInfos.push(productInfo) }
  }

  return productInfos
}