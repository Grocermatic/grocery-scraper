import * as cheerio from 'cheerio'

import { ProductInfo, ProductNutrition, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getNumFromString, roundDecimal } from "../../util/dataCleaning";
import { scrapeStatic } from '../../request/scrapeStatic';



export const getColesProductInfo:GetProductInfo = (html) => {
  // Coles provides information rich JSON in script
  const $ = cheerio.load(html)
  const jsonString = $('script[type="application/json"]').text()
  if (jsonString === '') return null

  const rawJson = JSON.parse(jsonString)
  const rawProductJson = rawJson.props.pageProps.product

  // Calculate inaccurately provided info
  const unitPriceCalc = getNumFromString(rawProductJson.pricing.comparable)
  const unitPrice = roundDecimal(unitPriceCalc[0] / unitPriceCalc[1], 2)
  const quantity = roundDecimal(rawProductJson.pricing.now / unitPrice, 2)

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: rawProductJson.name,
    url: `https://www.coles.com.au/product/${rawJson.query.slug}`,
    img: `https://productimages.coles.com.au/productimages${rawProductJson.imageUris[0].uri}`,
    price: rawProductJson.pricing.now,
    quantity: quantity,
    unitPrice: unitPrice
  }
  
  // Add nutritional information if possible
  try{
    const servings = getNumFromString(rawProductJson.nutrition.servingsPerPackage)[0]
    const nutrition:ProductNutrition = {
      servings: servings,
      servingSize: roundDecimal(quantity / servings , 2),
      kilojoules: 0,
      protein: 0,
      fat: 0,
      fatSaturated: 0,
      carb: 0,
      sugar: 0,
      sodium: 0
    }

    const nutritionSize = getNumFromString(rawProductJson.nutrition.breakdown[0].title)[0]
    const scaleNutrient = 1000 * nutrition.servingSize / nutritionSize

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