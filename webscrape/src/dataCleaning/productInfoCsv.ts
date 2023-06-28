import { ProductInfo, ProductNutrition } from "../website/interface"
import { roundDecimal } from "../dataCleaning/roundDecimal"
import { nutritionixNlp } from "./nutritionixNLP"



export const objectToCsvLine = (object:Object):string => {
  let csvLine = ''
  Object.entries(object).forEach(entry => {
    csvLine += ','
    if (typeof entry[1] === 'object' && entry[1] != null) {
      csvLine += objectToCsvLine(entry[1])
    } else if (entry[1] != null) {
      csvLine += entry[1]
    }
  })
  return csvLine.slice(1)
}



export const fillMissingNutrition = async(productInfo:ProductInfo) => {
  // Fill in missing nutrition
  if (productInfo.nutrition == null) {
    const nutrition = await nutritionixNlp(productInfo.name)
    if (nutrition) {
      productInfo.nutrition = nutrition
    }
  } else if (Object.values(productInfo.nutrition).includes(null)) {
    const nutrition = await nutritionixNlp(productInfo.name)
    if (nutrition) {
      Object.getOwnPropertyNames(nutrition).forEach((value) => {
        const key = value as keyof ProductNutrition
        if (productInfo.nutrition && productInfo.nutrition[key] == null) {
          productInfo.nutrition[key] = nutrition[key]
        }
      })
    }
  }
  return productInfo
}



export const productInfoCsv = async(productInfos:ProductInfo[]) => {
  let csv = ''
  for (let i = 0; i < productInfos.length; i++) {
    let productInfo = productInfos[i]
    if (productInfo.unitPrice) {
      productInfo.name = productInfo.name.replaceAll(',','')
      const quantity = roundDecimal(productInfo.price / productInfo.unitPrice, 3)
      if (productInfo.quantity == 0 || (productInfo.quantity > 1 && productInfo.quantity != quantity)) {
        productInfo.quantity = quantity
      }

      // Filter outlier unitPrice
      if (productInfo.unitPrice > 0.8 && productInfo.unitPrice <= 50) {
        productInfo = await fillMissingNutrition(productInfo)
        csv += `${objectToCsvLine(productInfo)}\n`
        
      }
    }
  }
  return csv
}
