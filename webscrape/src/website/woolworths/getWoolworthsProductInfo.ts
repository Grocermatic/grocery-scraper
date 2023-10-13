/* istanbul ignore file */

import { ProductInfoReport } from "../ProductInfoReport"
import { getSectionProductInfo } from "./getSectionProductInfo"



export const getWoolworthsProductInfo = async (cookie: string) => {
  const report = new ProductInfoReport()

  // Page links with get request health star filters
  const pageRequestData: [string, string[]][] = [
    ['1-E5BEE36E', ['5']], // 'https://www.woolworths.com.au/shop/browse/fruit-veg?&filter=Healthstar(5)'
    ['1_ACA2FC2', ['4.5', '5']], // 'https://www.woolworths.com.au/shop/browse/freezer?&filter=Healthstar(4.5%2C5)'
    ['1_39FD49C', ['4.5', '5', '5.0']], // 'https://www.woolworths.com.au/shop/browse/pantry?&filter=Healthstar(4.5%2C5%2C5.0)'
    ['1_DEB537E', ['4.5', '5']], // 'https://www.woolworths.com.au/shop/browse/bakery?&filter=Healthstar(4.5%2C5)'
    ['1_D5A2236', ['4', '4.5', '5']], // 'https://www.woolworths.com.au/shop/browse/meat-seafood-deli?&filter=Healthstar(4%2C4.5%2C5)'
    ['1_6E4F4E4', ['4', '4.0', '4.5', '5', '5.0']], // 'https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge?&filter=Healthstar(4%2C4.0%2C4.5%2C5%2C5.0)'
    ['1_9E92C35', ['4.5', '5', '5.0']], // 'https://www.woolworths.com.au/shop/browse/lunch-box?&filter=Healthstar(4.5%2C5%2C5.0)'
    ['1_9851658', ['4.5', '5', '5.0']], // 'https://www.woolworths.com.au/shop/browse/health-wellness?&filter=Healthstar(4.5%2C5%2C5.0)'
    ['1_5AF3A0A', ['4.5', '5', '5.0']] // 'https://www.woolworths.com.au/shop/browse/drinks?&filter=Healthstar(4.5%2C5%2C5.0)'
  ]

  for (const pageRequestDatum of pageRequestData) {
    await report.recordSectionProductInfo(getSectionProductInfo, pageRequestDatum, cookie)
  }
  return report.removeDuplicate()
}
