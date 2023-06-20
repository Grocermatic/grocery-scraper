import { ProductInfo, ProductNutrition, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getMetricQuantity, getNumFromString, getUnitPriceFromString, roundDecimal } from "../../util/dataCleaning";
import { getRequestJson } from '../../request/scrapeJson';
import { getCookie } from "../../request/getCookie";



export const getWoolworthsProductInfo:GetProductInfo = (productJsonString) => {
  const productJson = JSON.parse(productJsonString)
  const productInfoJson = productJson['Product']

  const unitPriceImplicitString = productInfoJson['CupString']
  const unitPrice = getUnitPriceFromString(unitPriceImplicitString)
  const packageSizeString = productInfoJson['PackageSize']
  const quantity = getMetricQuantity(packageSizeString)

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: productInfoJson['Name'],
    url: `https://www.woolworths.com.au/shop/productdetails/${productInfoJson['Stockcode']}`,
    img: productInfoJson['LargeImageFile'],
    price: productInfoJson['Price'],
    quantity: roundDecimal(quantity, 3),
    unitPrice: roundDecimal(unitPrice, 2)
  }

  // Add nutritional information if possible
  const productNutritionJson = productJson['NutritionalInformation']

  const servingsPerPack = productInfoJson['AdditionalAttributes']['servingsperpack-total-nip']
  let servingSize:number|null = null

  if (productNutritionJson) {
    getMetricQuantity(productNutritionJson[0]['ServingSize'])
  }
  if (!servingSize && servingsPerPack) {
    servingSize = roundDecimal(quantity / servingsPerPack, 3)
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
  if (productNutritionJson) {
    productNutritionJson.forEach((singleNutrientInfo:any) => {
      const nutrientValueJson = singleNutrientInfo['Values']
      let nutrientQuantity:number|null = getNumFromString(nutrientValueJson['Quantity Per 100g / 100mL'])[0]
      
      // Extrapolate quantity from serving if possible
      if (!nutrientQuantity && servingSize) {
        const servingNutrientQuantity = getNumFromString(nutrientValueJson['Quantity Per Serving'])[0]
        nutrientQuantity = roundDecimal(servingNutrientQuantity * 0.1 / servingSize, 2)
      } else if (!nutrientQuantity) {
        nutrientQuantity = null
      }

      switch (singleNutrientInfo['Name']) {
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
  }

  productInfo.nutrition = nutrition
  return productInfo
}


let woolworthsCookie = ''
export const getWoolworthsBatchProductInfo:GetBatchProductInfo = async(urls) => {
  if (woolworthsCookie == '') {
    woolworthsCookie = await getCookie('https://www.woolworths.com.au')
  }

  const productJsonPromiseArray = urls.map(productUrl => {
    const productCode = productUrl.match(/\/[0-9]+/)?.toString().slice(1)
    const jsonUrl = `https://www.woolworths.com.au/apis/ui/product/detail/${productCode}`
    return getRequestJson(jsonUrl, woolworthsCookie)
  })
  const jsonArray = await Promise.all(productJsonPromiseArray)

  const productInfos:ProductInfo[] = []
  for (let i = 0; i < jsonArray.length; i++) {
    const productJson = jsonArray[i]
    const productInfo = getWoolworthsProductInfo(productJson)
    if (productInfo) { productInfos.push(productInfo) }
  }

  return productInfos
}