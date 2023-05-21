import * as cheerio from 'cheerio'

import { ProductInfo, ProductNutrition, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getNumFromString, getUnitFromString, roundDecimal } from "../../util/dataCleaning";
import { scrapeStatic } from '../../request/scrapeStatic';



export const getColesProductInfo:GetProductInfo = (html) => {
  // Coles provides information rich JSON in script
  const $ = cheerio.load(html)
  let jsonString = $('#__NEXT_DATA__').text()
  if (jsonString === '') return null

  const rawJson = JSON.parse(jsonString)
  const rawProductJson = rawJson.props.pageProps.product

  // Calculate inaccurately provided info
  const unitPriceString = $('span.price__calculation_method').first().text().split(' | ')[0]
  const unitPriceMeasure = getUnitFromString(unitPriceString)
  const unitPriceCalc = getNumFromString(unitPriceString)
  let unitPrice = unitPriceCalc[0] / unitPriceCalc[1]
  if (['g','ml'].includes(unitPriceMeasure)) {
    unitPrice *= 1000
  }

  const productTitleString = $('h1.product__title').first().text()
  let quantity = getNumFromString(productTitleString).slice(-1)[0]
  const quantityMeasure = getUnitFromString(productTitleString)
  if (['g','ml'].includes(quantityMeasure)) {
    quantity /= 1000
  }


  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: rawProductJson.name,
    url: `https://www.coles.com.au/product/${rawJson.query.slug}`,
    img: `https://productimages.coles.com.au/productimages${rawProductJson.imageUris[0].uri}`,
    price: rawProductJson.pricing.now,
    quantity: roundDecimal(quantity, 3),
    unitPrice: roundDecimal(unitPrice, 2)
  }
  
  // Add nutritional information if possible
  try{
    const servings = getNumFromString(rawProductJson.nutrition.servingsPerPackage)[0]
    const nutrition:ProductNutrition = {
      servingSize: roundDecimal(quantity / servings , 3),
      kilojoules: 0,
      protein: 0,
      fat: 0,
      fatSaturated: 0,
      carb: 0,
      sugar: 0,
      sodium: 0
    }

    const nutritionSize = getNumFromString(rawProductJson.nutrition.breakdown[0].title)[0]
    const scaleNutrient = 1000 * quantity / servings / nutritionSize

    // Extract 7 mandatory labeled
    rawProductJson.nutrition.breakdown[0].nutrients.forEach((nutrient:any) => {
      switch (nutrient.nutrient) {
        case 'Energy':
          nutrition.kilojoules = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        case 'Protein':
          nutrition.protein = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        case 'Total Fat':
          nutrition.fat = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        case 'Saturated Fat':
          nutrition.fatSaturated = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        case 'Carbohydrate':
          nutrition.carb = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        case 'Sugars':
          nutrition.sugar = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        case 'Sodium':
          nutrition.sodium = roundDecimal(getNumFromString(nutrient.value)[0] * scaleNutrient, 2)
          break
        default:
      }
    })

    productInfo.nutrition = nutrition
  } catch (err:any) {}
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