import * as fs from 'fs'

import { GetProductInfo } from '../src/website/interface'
import { GetBatchProductInfo } from '../src/website/interface'

import { scrapeDynamic } from '../src/request/scrapeDynamic'
import { scrapeStatic } from '../src/request/scrapeStatic'

import { getAldiProductInfo, aldiPageProducts, getAldiBatchProductInfo } from '../src/website/aldi/getProductInfo'
import { getColesBatchProductInfo, getColesProductInfo } from '../src/website/coles/getProductInfo'
import { getWoolworthsProductInfo, getWoolworthsBatchProductInfo } from '../src/website/woolworths/getProductInfo'



const liveScrapeSave = async(url:string, filePath:string, requesterFunction:any, scraperFunction:any) => {
  console.log('Live scraping starting...')
  const html = await requesterFunction(url)

  console.log('Writing file...')
  //fs.writeFileSync(filePath, html)

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

  const url = 'https://www.aldi.com.au/en/groceries/fresh-produce/dairy-eggs/'
  const filePath = './src/website/aldi/test/dairy-eggs.test.html'
  //liveScrapeSave(url, filePath, scrapeStatic, aldiPageProducts)
  //testScrape(filePath, aldiPageProducts)
  //liveScrape([url], getAldiBatchProductInfo)

})()