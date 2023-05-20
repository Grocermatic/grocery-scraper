import * as fs from 'fs'

import { GetProductInfo, GetBatchProductInfo } from '../src/website/interface'

import { scrapeDynamic } from '../src/request/scrapeDynamic'
import { scrapeStatic } from '../src/request/scrapeStatic'
import { scrapeJson } from '../src/request/scrapeJson'
import { getCookie } from '../src/request/getCookie'

import { getAldiProductInfo, aldiPageProducts, getAldiBatchProductInfo } from '../src/website/aldi/getProductInfo'
import { getColesBatchProductInfo, getColesProductInfo } from '../src/website/coles/getProductInfo'
import { getWoolworthsProductInfo, getWoolworthsBatchProductInfo } from '../src/website/woolworths/getProductInfo'



const liveScrapeSave = async(url:string, filePath:string, requesterFunction:any, scraperFunction:any) => {
  console.log('Live scraping starting...')
  const html = await requesterFunction(url)

  console.log('Writing file...')
  fs.writeFileSync(filePath, html)

  console.log('Extracting info...')
  const productInfo = await scraperFunction(html)

  console.log(productInfo)
  console.log('Live scraping finished!')
}



const liveScrape = async(urls:string[], batchScrapeFunction:GetBatchProductInfo) => {
  console.log('Live scraping starting...')
  const productInfos = await batchScrapeFunction(urls)
  console.log(productInfos)
  console.log('Live scraping finished!')
}



const testScrape = async(filePath:string, scraperFunction:any) => {
  console.log('Reading file...')
  const html:string = await fs.readFileSync(filePath).toString()

  console.log('Extracting info...')
  const productInfo = await scraperFunction(html)

  console.log(productInfo)
  console.log('Test scraping finished!')
}



(async() => {

  let url = 'https://www.woolworths.com.au/shop/productdetails/888141'
  const productCode = url.match(/\/[0-9]+/)?.toString().slice(1)
  url = `https://www.woolworths.com.au/apis/ui/product/detail/${productCode}`

  const filePath = './src/website/woolworths/test/milk.test.json'
  //const filePath = 'test.html'

  const woolworthsCookie = await getCookie('https://www.woolworths.com.au')
  const scrapeWoolworths = async(url:string) => {return await scrapeJson(url, woolworthsCookie)}
  
  liveScrapeSave(url, filePath, scrapeWoolworths, getWoolworthsProductInfo)
  //testScrape(filePath, getWoolworthsProductInfo)
  //liveScrape([url], getWoolworthsBatchProductInfo)

  //const req = await scrapeJson(url, woolworthsCookie)
  //console.log(req)
  //fs.writeFileSync(filePath, req)

})()