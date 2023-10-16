import { ProductInfoReport } from "../ProductInfoReport"
import { filterUncomparableProduct } from "./filterUncomparableProduct"
import { getProductInfo } from "./getProductInfo"



export const getProductInfoPage = (jsonData: any) => {
  const report = new ProductInfoReport()

  const products = filterUncomparableProduct(jsonData)
  for (const product of products) {
    report.recordProductInfo(getProductInfo, product)
  }
  return report
}

// const $ = cheerio.load(html)
// const jsonData = JSON.parse($('#__NEXT_DATA__').text())
