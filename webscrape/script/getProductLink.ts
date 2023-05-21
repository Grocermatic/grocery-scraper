import * as fs from 'fs'

import { GetProductLinks } from '../src/website/interface'
import { getWoolworthsProductLinks, getWoolworthsSectionProductLinks } from '../src/website/woolworths/getProductLinks'
import { getColesProductLinks } from '../src/website/coles/getProductLinks'
import { getCookie } from '../src/request/getCookie'



const logFilePath = './script/getProductLink.log'

const writePerformanceToLog = (performaneMeasure:PerformanceMeasure) => {
  console.log(performaneMeasure)
  const logMessage = `${performaneMeasure.name}, ${performaneMeasure.duration}\n`
  fs.appendFileSync(logFilePath, logMessage)
}



const writeMessageToLog = (message:string) => {
  console.log(message)
  fs.appendFileSync(logFilePath, `${message}\n`)
}



const clearLog = () => {
  fs.writeFileSync(logFilePath, '')
}



const saveProductLinksCsv = async(filePath:string, getLinksFunction:GetProductLinks) => {
  writeMessageToLog(`Writing file: ${filePath}`)

  performance.mark('Find links')
  const productLinks = await getLinksFunction()
  performance.mark('Process links')
  writePerformanceToLog(performance.measure('Find link time', 'Find links', 'Process links'))

  const productLinkCsvString = productLinks.join('\n')
  performance.mark('Save links')
  writePerformanceToLog(performance.measure('Process link time', 'Process links', 'Save links'))

  fs.writeFileSync(filePath, productLinkCsvString)
  performance.mark('Finalise links')
  writePerformanceToLog(performance.measure('Save link time',  'Save links', 'Finalise links'))

  writePerformanceToLog(performance.measure('Total CSV generation time', 'Find links', 'Finalise links'))

  writeMessageToLog('')
}



(async() => {

  const fileName = 'woolworthsLinks1.csv'
  const filePath = `../dataProcess/data/${fileName}`
  //clearLog()
  saveProductLinksCsv(filePath, getWoolworthsProductLinks)

  //getWoolworthsSectionProductLinks()
  
  //const requestData:[string,string[]] = ['1-E5BEE36E', ['4','4.0','4.5','5','5.0']]
  //const woolworthsCookie = await getCookie('https://www.woolworths.com.au')
  //getWoolworthsSectionProductLinks(requestData, woolworthsCookie)
  //const data = requestData[1].map(foodStarRating => { return {'Term': foodStarRating} })
  //console.log(data)

})()