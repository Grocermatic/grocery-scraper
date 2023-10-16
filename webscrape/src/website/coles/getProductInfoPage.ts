import { ProductInfo } from "../interface"
import { filterUncomparableProduct } from "./filterUncomparableProduct"
import { getProductInfo } from "./getProductInfo"



export const getProductInfoPage = (jsonData: any) => {
  const productInfos: ProductInfo[] = []

  const products = filterUncomparableProduct(jsonData)
  for (const product of products) {
    const productInfo = getProductInfo(product)
    productInfos.push(productInfo)
  }
  return productInfos
}

// const $ = cheerio.load(html)
// const jsonData = JSON.parse($('#__NEXT_DATA__').text())
