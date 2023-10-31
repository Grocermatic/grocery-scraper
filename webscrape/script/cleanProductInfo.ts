import { readFileSync, readdirSync } from 'fs'
import { ProductInfo } from '../src/website/interface'
import { saveJson } from '../src/dataCleaning/saveJson'
import { ProductInfoReport } from '../src/website/ProductInfoReport'
import { config } from '../../global'

const basePath = 'webscrape/data'
const sourcePath = `${basePath}/productInfo`
const productionPath = `webscrape/data/production`
const maxUnitPrice = 50
const minUnitPrice = 0.5

const stringKiloByte = (val: string) => {
  return Math.round(val.length * 0.001)
}

const splitArray = (array: any[], lengths: number[]) => {
  const newArrays: any[][] = []
  for (const length of lengths) {
    const newArray = array.slice(0, length)
    if (newArray.length == 0) break
    newArrays.push(newArray)
    array = array.slice(length)
  }
  if (array.length != 0) newArrays.push(array)
  return newArrays
}

const report = new ProductInfoReport()

const files = readdirSync(sourcePath)
for (const file of files) {
  const reportJson = readFileSync(`${sourcePath}/${file}`).toString()
  const productInfoReport = new ProductInfoReport(JSON.parse(reportJson))
  report.merge(productInfoReport)
}
const productInfoReport = report.removeDuplicate().sortProductInfoUnitPrice().get()

console.table({
  Success: productInfoReport.productInfo.length,
  'Invalid data': productInfoReport.failedProductInfo.length,
  'Failed to scrape': productInfoReport.failedProduct.length,
  'Failed sections': productInfoReport.failedSection.length,
})

const productInfos = productInfoReport.productInfo.filter((productInfo: ProductInfo) => {
  if (productInfo.unitPrice > maxUnitPrice) return false
  if (productInfo.unitPrice < minUnitPrice) return false
  return true
})

console.debug(`Output data size: ${stringKiloByte(JSON.stringify(productInfos))} kb`)

saveJson(`${basePath}/cleanProductInfo.json`, productInfos)

const sumConsecutive = 0.5 * config.numChunks * (config.numChunks + 1)
const chunkLengths = Array.from({ length: config.numChunks }, (_, i) =>
  Math.ceil((++i * productInfos.length) / sumConsecutive),
)
const productInfosBatch: ProductInfo[][] = splitArray(productInfos, chunkLengths)
productInfosBatch.map(async (productInfo, id) => {
  const name = `product${id}.json`
  const filePath = `${productionPath}/${name}`
  saveJson(filePath, productInfo)
})
console.table({ 'Production chunk sizes': chunkLengths })
