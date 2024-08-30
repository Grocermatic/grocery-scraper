/* c8 ignore start */

import { scrapeStatic } from '../../request/scrapeStatic'
import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoPage } from './getProductInfoPage'

export const getProductInfoSection = async (url: string, _cookie?: string) => {
  const report = new ProductInfoReport()

  const html = await scrapeStatic(url)
  await report.recordProductInfoSection(getProductInfoPage, html)

  const numProducts = report.get().productInfo.length
  const section = url.split('/').slice(-1)[0]
  console.debug(`Aldi - ${section} - ${numProducts} products`)
  return report
}
