import * as fs from 'fs'
import { ProductInfo } from '../src/website/interface'
import { saveJson } from '../src/dataCleaning/saveJson'
import { ProductInfoReport } from '../src/website/ProductInfoReport'



const stringKiloByte = (val: string) => {
  return Math.round(val.length * 0.001)
}

const basePath = 'webscrape/data'
const sourcePath = `${basePath}/productInfo`
const maxUnitPrice = 30
const minUnitPrice = 0.5

const report = new ProductInfoReport()

const files = fs.readdirSync(sourcePath)
for (const file of files) {
  const reportJson = fs.readFileSync(`${sourcePath}/${file}`).toString()
  const productInfoReport = new ProductInfoReport(JSON.parse(reportJson))
  report.merge(productInfoReport)
}
const productInfoReport = report.removeDuplicate().sortProductInfoUnitPrice().get()

console.table({
  "Success": productInfoReport.productInfo.length,
  "Invalid data": productInfoReport.failedProductInfo.length,
  "Failed to scrape": productInfoReport.failedProduct.length,
  "Failed sections": productInfoReport.failedSection.length
})

const allProductInfos = productInfoReport.productInfo.filter((productInfo: ProductInfo) => {
  if (productInfo.unitPrice > maxUnitPrice) return false
  if (productInfo.unitPrice < minUnitPrice) return false
  return true
})

console.debug(`Output data size: ${stringKiloByte(JSON.stringify(allProductInfos))} kb`)

saveJson(`${basePath}/cleanProductInfo.json`, allProductInfos)