import { generateUniqueArray } from "../dataCleaning/generateUniqueArray"
import { roundDecimal } from "../dataCleaning/roundDecimal"
import { GetProductInfo, ProductInfo } from "./interface"



interface ProductInfoReportReport {
  productInfo: ProductInfo[],
  failedProductInfo: ProductInfo[],
  failedProduct: any[],
  failedSection: any[],
  scrapeSecond: number
}

export class ProductInfoReport {
  #report: ProductInfoReportReport = {
    productInfo: [],
    failedProductInfo: [],
    failedProduct: [],
    failedSection: [],
    scrapeSecond: 0
  }
  #creationMilliSecond = Date.now()

  constructor(report?: ProductInfoReportReport) { if (report) this.#report = report }

  recordScrapeSecond() {
    this.#report.scrapeSecond = (Date.now() - this.#creationMilliSecond) / 1000
    return this
  }

  sortProductInfoUnitPrice() {
    this.#report.productInfo.sort((a: ProductInfo, b: ProductInfo) => {
      return a.unitPrice - b.unitPrice
    })
    return this
  }

  get() { return this.#report }

  #addProductInfo(productInfo: ProductInfo) { this.#report.productInfo.push(productInfo) }

  #addFailedProductInfo(productInfo: ProductInfo) { this.#report.failedProductInfo.push(productInfo) }

  #addFailedProduct(product: any) { this.#report.failedProduct.push(product) }

  #addFailedSection(section: string) { this.#report.failedSection.push(section) }

  #merge(anotherScrapeReport: ProductInfoReport) {
    const report = anotherScrapeReport.get()

    this.#report.productInfo = [...this.#report.productInfo, ...report.productInfo]
    this.#report.failedProductInfo = [...this.#report.failedProductInfo, ...report.failedProductInfo]
    this.#report.failedProduct = [...this.#report.failedProduct, ...report.failedProduct]
    this.#report.failedSection = [...this.#report.failedSection, ...report.failedSection]
  }

  #validProductInfo(productInfo: ProductInfo) {
    const { name, url, img, price, quantity, unitPrice } = productInfo

    // Ensure valid string data
    if (typeof name != 'string') return false
    if (name.length == 0) return false
    try { new URL(url) } catch { return false }
    try { new URL(img) } catch { return false }

    // Repair invalid numeric data if possible
    const validNum = (val: any) => {
      if (typeof val != 'number') return 0
      if (val <= 0) return 0
      return 1
    }
    const validCount = validNum(price) + validNum(quantity) + validNum(unitPrice)

    if (validCount < 2) return false
    if (validCount == 3) {
      const ratio = price / quantity / unitPrice
      if (roundDecimal(ratio, 1) != 1) productInfo.unitPrice = roundDecimal(price / quantity, 2)
    }
    if (!validNum(productInfo.price)) productInfo.price = roundDecimal(unitPrice * quantity, 2)
    if (!validNum(productInfo.quantity)) productInfo.quantity = roundDecimal(price / unitPrice, 3)
    if (!validNum(productInfo.unitPrice)) productInfo.unitPrice = roundDecimal(price / quantity, 2)

    return true
  }

  recordProductInfo(getProductInfo: GetProductInfo, product: any) {
    try {
      let productInfo = getProductInfo(product)
      this.#validProductInfo(productInfo) ? this.#addProductInfo(productInfo) : this.#addFailedProductInfo(productInfo)
    } catch {
      this.#addFailedProduct(product)
    }
  }

  recordProductInfoPage(getPageProductInfo: any, rawPageData: string) {
    const page = getPageProductInfo(rawPageData)
    this.#merge(page)
  }

  async recordProductInfoSection(getSectionProductInfo: any, requestDatum: any, cookie: string) {
    try {
      const section = await getSectionProductInfo(requestDatum, cookie)
      this.#merge(section)
    } catch {
      this.#addFailedSection(requestDatum)
    }
  }

  removeDuplicate() {
    this.#report.productInfo = generateUniqueArray(this.#report.productInfo)
    this.#report.failedProductInfo = generateUniqueArray(this.#report.failedProductInfo)
    this.#report.failedProduct = generateUniqueArray(this.#report.failedProduct)
    this.#report.failedSection = generateUniqueArray(this.#report.failedSection)
    return this
  }
}
