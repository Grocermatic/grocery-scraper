import * as cheerio from 'cheerio'

import { ProductInfo, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getUnitPriceFromString } from "../../dataCleaning/getUnitPriceFromString";
import { scrapeStatic } from '../../request/scrapeStatic';
import { roundDecimal } from '../../dataCleaning/roundDecimal';
import { getMetricQuantity } from '../../dataCleaning/getMetricQuantity';



export const getColesProductInfo:GetProductInfo = (html) => {
  // Coles provides information rich JSON in script
  const $ = cheerio.load(html)
  let jsonString = $('#__NEXT_DATA__').text()
  if (jsonString === '') return null

  const rawJson = JSON.parse(jsonString)
  const url = `https://www.coles.com.au/product/${rawJson['query']['slug']}`

  try {
    const rawProductJson = rawJson['props']['pageProps']['product']
    if (rawProductJson['pricing'] == null) return null

    const unitPriceImplicitString = $('.price__calculation_method').first().text().split(' | ')[0]
    const unitPrice = getUnitPriceFromString(unitPriceImplicitString)
    const productTitleString = $('h1.product__title').first().text()
    const quantity = getMetricQuantity(productTitleString)
    
    const productInfo:ProductInfo = {
      name: rawProductJson['name'],
      url: url,
      img: `https://productimages.coles.com.au/productimages${rawProductJson['imageUris'][0]['uri']}`,
      price: rawProductJson['pricing']['now'],
      quantity: roundDecimal(quantity, 3),
      unitPrice: roundDecimal(unitPrice, 2)
    }
    if (Object.values(productInfo).includes(null)){
      throw new Error(`ProductInfo contains null: ${JSON.stringify(productInfo)}`)
    }
    return productInfo
  } catch {
    console.log(`Cannot scrape: ${url}`)
    return null
  }
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