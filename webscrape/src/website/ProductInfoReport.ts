import { generateUniqueArray } from "../dataCleaning/generateUniqueArray"
import { GetProductInfo, ProductInfo } from "./interface"



export class ProductInfoReport {
  #report: {
    productInfo: ProductInfo[],
    failedProduct: any[],
    failedSection: any[]
  } = {
    productInfo: [],
    failedProduct: [],
    failedSection: []
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

  recordPageProductInfo(getPageProductInfo: any, rawPageData: string) {
    const page = getPageProductInfo(rawPageData)
    this.#merge(page.report)
  }

  async recordSectionProductInfo(getSectionProductInfo: any, requestDatum: any, cookie: string) {
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
