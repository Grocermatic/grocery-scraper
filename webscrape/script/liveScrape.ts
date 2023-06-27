import * as fs from 'fs'

import { GetProductInfo, GetBatchProductInfo } from '../src/website/interface'

import { scrapeDynamic } from '../src/request/scrapeDynamic'
import { scrapeStatic } from '../src/request/scrapeStatic'
import { getRequestJson, postRequestJson } from '../src/request/scrapeJson'
import { getCookie } from '../src/request/getCookie'

import { getAldiProductInfo, aldiPageProducts, getAldiBatchProductInfo } from '../src/website/aldi/getProductInfo'
import { getColesBatchProductInfo, getColesProductInfo } from '../src/website/coles/getProductInfo'
import { getWoolworthsProductInfo, getWoolworthsBatchProductInfo } from '../src/website/woolworths/getProductInfo'
import axios from 'axios'
import { getWoolworthsSectionProductLinks } from '../src/website/woolworths/getProductLinks'
import { getMetricQuantity, getUnitFromString, roundDecimal } from '../src/dataCleaning/dataCleaning'
import { getAllProductInfo, getAllProductInfos } from '../src/website/getAllProductInfo'



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



const logFilePath = './script/liveScrape.log'

const writePerformanceToLog = (performaneMeasure:PerformanceMeasure) => {
  console.log(performaneMeasure)
  const duration = roundDecimal(performaneMeasure.duration / 1000, 3)
  const logMessage = `${performaneMeasure.name}, ${duration}\n`
  fs.appendFileSync(logFilePath, logMessage)
}

const writeMessageToLog = (message:string) => {
  console.log(message)
  fs.appendFileSync(logFilePath, `${message}\n`)
}



(async() => {
 
  const filePath = `../dataProcess/data/`
  const stores = ['aldi', 'coles', 'woolworths']

  stores.map(async(store) => {
    const urlsList = fs.readFileSync(filePath + `${store}Links.csv`).toString().split('\n')
    console.log(urlsList)

    writeMessageToLog(`Scrape ${store} productInfo:`)
    performance.mark('Start scraping')
    const productInfos = await getAllProductInfos([urlsList], 20)
    performance.mark('Finish scraping')
    writePerformanceToLog(performance.measure('Scrape time (s)', 'Start scraping', 'Finish scraping'))
    writeMessageToLog('')
  
    const content = JSON.stringify(productInfos, null, 2)
    fs.writeFileSync(filePath + `${store}ProductInfo.json`, content)
  })

})()