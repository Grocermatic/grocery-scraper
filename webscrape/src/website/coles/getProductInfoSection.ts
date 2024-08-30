/* c8 ignore start */

import * as Cheerio from 'cheerio'
import { getNumFromString } from '../../dataCleaning/getNumFromString'
import { scrapeStatic } from '../../request/scrapeStatic'
import { wait } from '../../request/wait'
import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoPage } from './getProductInfoPage'

export const getProductInfoSection = async (url: string, _cookie?: string) => {
  const report = new ProductInfoReport()

  let pageLimit = Number.POSITIVE_INFINITY
  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber++) {
    let jsonData = ''
    let backoffMillisecs = 2000
    let retry = 2
    while (jsonData === '') {
      const pageUrl = `${url}?sortBy=unitPriceAscending&page=${pageNumber}`
      try {
        await wait(1000)
        const html = await scrapeStatic(pageUrl, _cookie)
        const $ = Cheerio.load(html)

        if (pageLimit === Number.POSITIVE_INFINITY) {
          const paginationHtml = $(
            'nav.coles-targeting-PaginationPaginationRoot',
          ).toString()
          const $$ = Cheerio.load(paginationHtml)
          const newPageLimit = getNumFromString($$('span').text())[1]
          if (newPageLimit) pageLimit = newPageLimit
        }

        jsonData = $('#__NEXT_DATA__').text()
      } catch {
        console.warn(`Coles - backoff scrape - ${pageUrl}`)
        await wait(backoffMillisecs)
      }
      backoffMillisecs *= 2
      if (retry-- === 0) break
    }
    report.recordProductInfoPage(getProductInfoPage, jsonData)

    const numProducts = report.get().productInfo.length
    const section = url.split('/').slice(-1)[0]
    console.debug(
      `Coles - ${section} - Page ${pageNumber}/${pageLimit} - ${numProducts} products`,
    )
  }
  return report
}
