import { getRequestJson } from '../../request/scrapeJson'
import { wait } from '../../request/wait'
import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoPage } from './getProductInfoPage'

export const getProductInfoSection = async (sectionName: string, cookie?: string) => {
  const report = new ProductInfoReport()
  const storeCode = '17742'
  const paginationSize = 100
  const baseUrl = `https://www.igashop.com.au/api/storefront/stores/${storeCode}/categories/${sectionName}/search`

  let totalProduct = Infinity
  for (let skipProduct = 0; skipProduct < totalProduct; skipProduct += paginationSize) {
    const productJson = await getRequestJson(
      `${baseUrl}?take=${paginationSize}&skip=${skipProduct}`,
      cookie
    )
    if (productJson == '') break
    if (totalProduct == Infinity) totalProduct = JSON.parse(productJson).total
    await wait(1500)

    report.recordProductInfoPage(getProductInfoPage, productJson)
    const numProducts = report.get().productInfo.length
    console.debug(`IGA - ${sectionName} - ${numProducts} / ${totalProduct} products`)
  }
  return report
}
