import { ProductInfo } from "../interface"
import { filterUncomparableProduct } from "./filterUncomparableProduct"
import { getProductInfo } from "./getProductInfo"



export const getPageProductInfo = (productJson: string) => {
  const productInfos: ProductInfo[] = []
  const report = {
    store: 'Woolworths',
    success: 0,
    failure: 0,
    failedData: [] as any[]
  }

  const products = filterUncomparableProduct(productJson)
  for (const product of products) {
    try {
      const productInfo = getProductInfo(product)
      productInfos.push(productInfo)
      report.success += 1
    } catch {
      report.failure += 1
      report.failedData.push(product)
    }
  }
  return { productInfos, report }
}