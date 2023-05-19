import * as fs from 'fs'

import { GetProductLinks } from '../src/website/interface'
import { getWoolworthsProductLinks } from '../src/website/woolworths/getProductLinks'



const saveProductLinksCsv = async(filePath:string, getLinksFunction:GetProductLinks) => {
  const productLinks = await getLinksFunction()
  const productLinkCsvString = productLinks.join('\n')
  fs.writeFileSync(filePath, productLinkCsvString)
}

(async() => {

  const fileName = 'woolworthsLinks.csv'
  const filePath = `../../dataProcess/data/${fileName}`
  saveProductLinksCsv(filePath, getWoolworthsProductLinks)

})()