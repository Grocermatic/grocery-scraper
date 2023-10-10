import { ProductInfo } from "../website/interface"
import { roundDecimal } from "../dataCleaning/roundDecimal"



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



export const productInfoCsv = (productInfos:ProductInfo[]) => {
  let csv = ''
  for (let i = 0; i < productInfos.length; i++) {
    let productInfo = productInfos[i]
    if (productInfo.unitPrice) {
      productInfo.name = productInfo.name.replace(',','')
      const quantity = roundDecimal(productInfo.price / productInfo.unitPrice, 3)
      if (productInfo.quantity == 0 || (productInfo.quantity > 1 && productInfo.quantity != quantity)) {
        productInfo.quantity = quantity
      }

      // Filter outlier unitPrice
      if (productInfo.unitPrice > 0.8 && productInfo.unitPrice <= 50) {
        csv += `${objectToCsvLine(productInfo)}\n`
        
      }
    }
  }
  return csv
}
