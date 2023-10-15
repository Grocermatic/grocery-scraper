import { generateUniqueArray } from "../dataCleaning/generateUniqueArray"
import { GetProductInfo, ProductInfo } from "./interface"



interface ProductInfoReportReport {
  productInfo: ProductInfo[],
  failedProduct: any[],
  failedSection: any[],
  scrapeSecond: number
}

export class ProductInfoReport {
  #report: ProductInfoReportReport = {
    productInfo: [],
    failedProduct: [],
    failedSection: [],
    scrapeSecond: 0
  }
  #creationMilliSecond = Date.now()

  constructor(report? : ProductInfoReportReport) { if (report) this.#report = report }

  recordScrapeSecond() {
    this.#report.scrapeSecond = ( Date.now() - this.#creationMilliSecond ) / 1000
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

  #addFailedProduct(product: any) { this.#report.failedProduct.push(product) }

  #addFailedSection(section: string) { this.#report.failedSection.push(section) }

  #merge(anotherScrapeReport: ProductInfoReport) {
    const report = anotherScrapeReport.get()
    
    this.#report.productInfo = [...this.#report.productInfo, ...report.productInfo]
    this.#report.failedProduct = [...this.#report.failedProduct, ...report.failedProduct]
    this.#report.failedSection = [...this.#report.failedSection, ...report.failedSection]
  }

  recordProductInfo(getProductInfo: GetProductInfo, product: any) {
    try {
      const productInfo = getProductInfo(product)
      this.#addProductInfo(productInfo)
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
    this.#report.failedProduct = generateUniqueArray(this.#report.failedProduct)
    this.#report.failedSection = generateUniqueArray(this.#report.failedSection)
    return this
  }
}
