import * as fs from 'fs'

import { roundDecimal } from '../src/dataCleaning/roundDecimal'
import { GetProductLinks } from '../src/website/interface'
import { getAldiProductLinks } from '../src/website/aldi/getProductLinks'
import { getColesProductLinks } from '../src/website/coles/getProductLinks'
import { getWoolworthsProductLinks } from '../src/website/woolworths/getProductLinks'



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

  const totalTimeMeasure = performance.measure('Total CSV generation time', 'Find links', 'Finalise links')
  writePerformanceToLog(totalTimeMeasure)

  writeMessageToLog(`Number of links, ${productLinks.length}`)

  const timePerLink = roundDecimal(totalTimeMeasure.duration / productLinks.length / 1000, 3)
  writeMessageToLog(`Time per link, ${timePerLink}`)

  writeMessageToLog('')
}



(async() => {

  let store = 'aldi'
  const filePath = `./data`
  saveProductLinksCsv(`${filePath}/${store}Links.csv`, getAldiProductLinks)

})()