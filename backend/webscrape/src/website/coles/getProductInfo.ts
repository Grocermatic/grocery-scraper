import * as cheerio from 'cheerio'

import { ProductInfo, ProductNutrition, GetProductInfo } from "../interface"
import { getNumFromString, roundDecimal } from "../../util/dataCleaning";



export const colesProductInfo:GetProductInfo = (html) => {
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
    const nutrition:ProductNutrition = {
      servings: getNumFromString(rawProductJson.nutrition.servingsPerPackage)[0],
      servingSize: getNumFromString(rawProductJson.nutrition.servingSize)[0],
      kilojoules: 0,
      protein: 0,
      fat: 0,
      fatSaturated: 0,
      carb: 0,
      sugar: 0,
      sodium: 0
    }

    // Extract 7 mandatory labeled
    rawProductJson.nutrition.breakdown[1].nutrients.forEach((nutrient:any) => {
      switch (nutrient.nutrient) {
        case 'Energy':
          nutrition.kilojoules = getNumFromString(nutrient.value)[0]
          break
        case 'Protein':
          nutrition.protein = getNumFromString(nutrient.value)[0]
          break
        case 'Total Fat':
          nutrition.fat = getNumFromString(nutrient.value)[0]
          break
        case 'Saturated Fat':
          nutrition.fatSaturated = getNumFromString(nutrient.value)[0]
          break
        case 'Carbohydrate':
          nutrition.carb = getNumFromString(nutrient.value)[0]
          break
        case 'Sugars':
          nutrition.sugar = getNumFromString(nutrient.value)[0]
          break
        case 'Sodium':
          nutrition.sodium = getNumFromString(nutrient.value)[0]
          break
        default:
      }
    })

    productInfo.nutrition = nutrition
  } catch (err:any) {}
  return productInfo
}
colesProductInfo('')