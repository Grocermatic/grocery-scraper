import * as fs from 'fs'
import { ProductInfo } from '../src/website/interface'



export const cleanProductInfo = async() => {
  const filePath = 'webscrape/data'
  let allProductInfos:ProductInfo[] = []
  
  const stores = ['aldi', 'coles', 'woolworths']
  for (let i = 0; i < stores.length; i++) {
    const store = stores[i]
    const productInfos = JSON.parse(fs.readFileSync(`${filePath}/ProductInfo/${store}.json`).toString())
    allProductInfos = allProductInfos.concat(productInfos)
  }
  allProductInfos.sort((a,b) => {return a.unitPrice - b.unitPrice})
  
  fs.writeFileSync(`${filePath}/cleanProductInfo.json`, JSON.stringify(allProductInfos, null, 2))
}



(async() => {
  await cleanProductInfo()
})()