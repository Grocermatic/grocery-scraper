import * as cheerio from 'cheerio'

import { ProductInfo, ProductNutrition, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getNumFromString, getUnitFromString, roundDecimal } from "../../util/dataCleaning";
import { scrapeDynamic } from '../../request/scrapeDynamic';



export const getWoolworthsProductInfo:GetProductInfo = (html) => {
  // Coles provides information rich JSON in script
  const $ = cheerio.load(html)
  
  let priceString = $('div.primary[_ngcontent-serverapp-c372=""]').contents().toString()
  if (priceString === '') {
    const dollarString = $('span.price-dollars').contents().toString()
    const centString = $('span.price-cents').contents().toString()
    priceString = `${dollarString}.${centString}`
  }
  const price = getNumFromString(priceString)[0]

  let unitPriceCalc = getNumFromString($('span.price-per-cup').contents().toString())
  if (unitPriceCalc.length < 2) {
    unitPriceCalc = getNumFromString($('div.shelfProductTile-cupPrice').contents().toString())
  }
  const unitPrice = roundDecimal(unitPriceCalc[0] / unitPriceCalc[1], 2)
  const quantity = roundDecimal(price / unitPrice, 2)

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: $('h1.shelfProductTile-title[_ngcontent-serverapp-c158=""]').contents().toString(),
    url: $('meta[name="url"]').attr('content') as string,
    img: $('img.main-image-v2').attr('src') as string,
    price: price,
    quantity: quantity,
    unitPrice: unitPrice
  }

  // Add nutritional information if possible
  const servings = getNumFromString($('div[*ngif="productServingsPerPack"]').contents().toString())[0]
  const servingSize = roundDecimal(quantity / servings, 3)

  const nutrition:ProductNutrition = {
    servings: servings,
    servingSize: servingSize,
    kilojoules: 0,
    protein: 0,
    fat: 0,
    fatSaturated: 0,
    carb: 0,
    sugar: 0,
    sodium: 0
  }

  // Extract 7 mandatory labeled nutirents
  $('ul.nutrition-row').each((index, nutrientRow) => {
    const $ = cheerio.load(nutrientRow)
    const nutirentColumn = $('li.nutrition-column').contents()
    const nutrientName = nutirentColumn[0].data
    const nutrientQuantity = getNumFromString(nutirentColumn[1].data)[0]

    switch (nutrientName) {
      case 'Energy':
        nutrition.kilojoules = nutrientQuantity
        break
      case 'Protein':
        nutrition.protein = nutrientQuantity
        break
      case 'Fat, Total':
        nutrition.fat = nutrientQuantity
        break
      case '– Saturated':
        nutrition.fatSaturated = nutrientQuantity
        break
      case 'Carbohydrate':
        nutrition.carb = nutrientQuantity
        break
      case '– Sugars':
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



export const getWoolworthsBatchProductInfo:GetBatchProductInfo = async(urls) => {
  const productInfos:ProductInfo[] = []
  for (const url of urls) {
    const html = await scrapeDynamic(url)
    const productInfo = getWoolworthsProductInfo(html)
    if (productInfo != null) { productInfos.push(productInfo) }
  }
  return productInfos
}


import * as fs from 'fs'
(async() => {

  const url = 'https://www.woolworths.com.au/shop/productdetails/156015'
  //const productInfo = await getWoolworthsBatchProductInfo([url])
  //console.log(productInfo)

  //const html = await scrapeDynamic(url)
  //fs.writeFileSync('sweetPotato.test.html', html)

})()