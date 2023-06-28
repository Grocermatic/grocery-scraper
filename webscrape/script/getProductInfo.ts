import * as fs from 'fs'

import { getAllProductInfos } from '../src/website/getAllProductInfo'
import { roundDecimal } from '../src/dataCleaning/roundDecimal'



const logFilePath = './script/getProductLink.log'

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



export const getProductInfo = () => {
const filePath = `./data`
  const stores = ['aldi', 'coles', 'woolworths']

  stores.map(async(store) => {
    const urlsList = fs.readFileSync(`${filePath}/${store}Links.csv`).toString().split('\n')

    writeMessageToLog(`Scrape ${store} productInfo:`)
    performance.mark('Start scraping')
    const productInfos = await getAllProductInfos([urlsList], 20)
    performance.mark('Finish scraping')
    writePerformanceToLog(performance.measure('Scrape time (s)', 'Start scraping', 'Finish scraping'))
    writeMessageToLog('')
  
    const content = JSON.stringify(productInfos, null, 2)
    fs.writeFileSync(`${filePath}/${store}ProductInfo.json`, content)
  })
}



(async() => {
  getProductInfo()
})()