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
import { getMetricQuantity, getUnitFromString } from '../src/util/dataCleaning'



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

  const desiredArrayLength = 3

  const oldArrays:any[][] = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    [1,2,3,4,5,6,7,8],
    [1],
    [1,2,3,4,5]
  ]

  const limitArrayLengths = (oldArrays:any[][], desiredArrayLength:number) => {
    const newArrays:any[] = []

    const lengthOfEachArray = oldArrays.map((val)=>{return val.length})
    const maxArrayLength = Math.max(...lengthOfEachArray)

    for (let arrayLengthCounter = 0; arrayLengthCounter < maxArrayLength; arrayLengthCounter += desiredArrayLength) {
      const subsetArrays = []
      for (let arrayID = 0; arrayID < oldArrays.length; arrayID++) {
        const arraySample = oldArrays[arrayID].slice(0,desiredArrayLength)
        if (arraySample.length > 0) {
          subsetArrays.push(arraySample)
        }
        oldArrays[arrayID] = oldArrays[arrayID].slice(desiredArrayLength)
      }
      if (subsetArrays.length > 0) {
        newArrays.push(subsetArrays)
      }
    }
    return newArrays
  }
  console.log(limitArrayLengths(oldArrays,desiredArrayLength))

})()