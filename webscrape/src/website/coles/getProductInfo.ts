import * as cheerio from 'cheerio'

import { ProductInfo, ProductNutrition, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getMetricQuantity, getNumFromString, getUnitPriceFromString, roundDecimal } from "../../util/dataCleaning";
import { scrapeStatic } from '../../request/scrapeStatic';



export const getColesProductInfo:GetProductInfo = (html) => {
  // Coles provides information rich JSON in script
  const $ = cheerio.load(html)
  let jsonString = $('#__NEXT_DATA__').text()
  if (jsonString === '') return null

  const rawJson = JSON.parse(jsonString)
  const rawProductJson = rawJson['props']['pageProps']['product']

  const unitPriceImplicitString = $('span.price__calculation_method').first().text().split(' | ')[0]
  const unitPrice = getUnitPriceFromString(unitPriceImplicitString)
  const productTitleString = $('h1.product__title').first().text()
  const quantity = getMetricQuantity(productTitleString)

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: rawProductJson['name'],
    url: `https://www.coles.com.au/product/${rawJson['query']['slug']}`,
    img: `https://productimages.coles.com.au/productimages${rawProductJson['imageUris'][0]['uri']}`,
    price: rawProductJson['pricing']['now'],
    quantity: roundDecimal(quantity, 3),
    unitPrice: roundDecimal(unitPrice, 2)
  }

  // Check if nutrition information is available
  if (!rawProductJson['nutrition']) { return productInfo }

  const servingsPerPack:number|null = getNumFromString(rawProductJson['nutrition']['servingsPerPackage'])[0]
  let servingSize:number|null = getMetricQuantity(rawProductJson['nutrition']['servingSize'])
  if (!servingSize && servingsPerPack) {
    servingSize = roundDecimal(productInfo.quantity / servingsPerPack, 3)
  } else if (!servingSize) {
    servingSize = null
  }

  const nutrition:ProductNutrition = {
    servingSize: servingSize,
    kilojoules: null,
    protein: null,
    fat: null,
    fatSaturated: null,
    carb: null,
    sugar: null,
    sodium: null
  }

  // Extract 7 mandatory labeled nutirents
  rawProductJson['nutrition']['breakdown'][0].nutrients.forEach((nutrient:any) => {
    let nutrientQuantity:number|null = getNumFromString(nutrient.value)[0]
    if (!nutrientQuantity) {
      nutrientQuantity = null
    }

    switch (nutrient.nutrient) {
      case 'Energy':
        nutrition.kilojoules = nutrientQuantity
        break
      case 'Protein':
        nutrition.protein = nutrientQuantity
        break
      case 'Total Fat':
        nutrition.fat = nutrientQuantity
        break
      case 'Saturated Fat':
        nutrition.fatSaturated = nutrientQuantity
        break
      case 'Carbohydrate':
        nutrition.carb = nutrientQuantity
        break
      case 'Sugars':
        nutrition.sugar = nutrientQuantity
        break
      case 'Sodium':
        nutrition.sodium = nutrientQuantity
        break
      default:
    }
  })

  productInfo.nutrition = nutrition
  return productInfo
}



export const getColesBatchProductInfo:GetBatchProductInfo = async(urls) => {
  const productInfos:ProductInfo[] = []
  for (const url of urls) {
    const html = await scrapeStatic(url)
    const productInfo = getColesProductInfo(html)
    if (productInfo != null) { productInfos.push(productInfo) }
  }
  return productInfos
}