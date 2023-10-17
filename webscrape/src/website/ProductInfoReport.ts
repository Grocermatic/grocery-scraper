import { generateUniqueArray } from "../dataCleaning/generateUniqueArray"
import { GetProductInfo, ProductInfo } from "./interface"
import { validProductInfo } from "./validProductInfo"



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
    this.#report.failedProductInfo.sort((a: ProductInfo, b: ProductInfo) => {
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

  recordProductInfo(getProductInfo: GetProductInfo, product: any) {
    try {
      let productInfo = getProductInfo(product)
      const validatedProductInfo = validProductInfo(productInfo)
      validatedProductInfo ? this.#addProductInfo(validatedProductInfo) : this.#addFailedProductInfo(productInfo)
    } catch {
      this.#addFailedProduct(product)
    }
  }

  recordProductInfoPage(getPageProductInfo: any, rawPageData: string) {
    const page = getPageProductInfo(rawPageData)
    this.#merge(page)
  }

  async recordProductInfoSection(getSectionProductInfo: any, requestDatum: any, cookie?: string) {
    try {
      const report = await getSectionProductInfo(requestDatum, cookie)
      if (report.get().productInfo.length == 0) throw(`Section failed: ${requestDatum}`)
      this.#merge(report)
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
