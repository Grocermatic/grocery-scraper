


import * as fs from 'fs'
import { scrapeDynamic } from '../src/request/scrapeDynamic'
import { getWoolworthsProductInfo } from '../src/website/woolworths/getProductInfo'



(async() => {

  const url = 'https://www.woolworths.com.au/shop/productdetails/144427'
  const filePath = './src/website/woolworths/test/onion.test.html'

  console.log('Live scraping starting...')

  const html = await scrapeDynamic(url)
  const productInfo = await getWoolworthsProductInfo(html)
  fs.writeFileSync(filePath, html)

  console.log(productInfo)
  console.log('Live scraping finished!')

})()