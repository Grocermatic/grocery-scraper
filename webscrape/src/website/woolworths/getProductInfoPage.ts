import { ProductInfoReport } from "../ProductInfoReport"
import { filterUncomparableProduct } from "./filterUncomparableProduct"
import { getProductInfo } from "./getProductInfo"



export const getProductInfoPage = (productJson: string) => {
  const report = new ProductInfoReport()

  const products = filterUncomparableProduct(productJson)
  for (const product of products) {
    report.recordProductInfo(getProductInfo, product)
  }
  return report
}