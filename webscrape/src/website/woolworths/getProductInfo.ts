import { ProductInfo, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getUnitPriceFromString } from "../../dataCleaning/getUnitPriceFromString";
import { getRequestJson } from '../../request/scrapeJson';
import { getCookie } from "../../request/getCookie";
import { wait } from "../../request/wait";
import { roundDecimal } from "../../dataCleaning/roundDecimal";
import { getMetricQuantity } from "../../dataCleaning/getMetricQuantity";



export const getWoolworthsProductInfo:GetProductInfo = (productJsonString) => {
  if (productJsonString.length == 0) return null
  const productJson = JSON.parse(productJsonString)
  const productInfoJson = productJson['Product']
  if (productInfoJson == null) return null
  const url = `https://www.woolworths.com.au/shop/productdetails/${productInfoJson['Stockcode']}`

  try {
    const unitPriceImplicitString = productInfoJson['CupString']
    const unitPrice = getUnitPriceFromString(unitPriceImplicitString)
    const packageSizeString = productInfoJson['PackageSize']
    const quantity = getMetricQuantity(packageSizeString)

    // Prefill mandatory values
    const productInfo:ProductInfo = {
      name: productInfoJson['Name'],
      url: url,
      img: productInfoJson['LargeImageFile'],
      price: productInfoJson['Price'],
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


let woolworthsCookie = ''
export const getWoolworthsBatchProductInfo:GetBatchProductInfo = async(urls) => {
  await wait(3000)

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