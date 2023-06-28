import * as fs from 'fs'

import { productInfoCsv } from "../src/dataCleaning/productInfoCsv"



export const cleanProductInfo = () => {
  const filePath = './data'
  let csv:string = "name,url,img,price,quantity,unitPrice,servingSize,kilojoules,protein,fat,fatSaturated,carb,sugar,sodium\n"
  
  const stores = ['aldi', 'coles', 'woolworths']

  stores.forEach(store => {
    const productInfos = JSON.parse(fs.readFileSync(`${filePath}/ProductInfo/${store}.json`).toString())
    csv += productInfoCsv(productInfos)
  })

  fs.writeFileSync(`${filePath}/cleanProductInfo.csv`, csv)
}



(async() => {
  cleanProductInfo()
})()