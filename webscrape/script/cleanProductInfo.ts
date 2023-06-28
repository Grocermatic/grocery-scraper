import * as fs from 'fs'

import { productInfoCsv } from "../src/dataCleaning/productInfoCsv"



export const cleanProductInfo = async() => {
  const filePath = './data'
  let csv:string = "name,url,img,price,quantity,unitPrice,servingSize,kilojoules,protein,fat,fatSaturated,carb,sugar,sodium\n"
  
  const stores = ['aldi', 'coles', 'woolworths']
  for (let i = 0; i < stores.length; i++) {
    const store = stores[i]
    const productInfos = JSON.parse(fs.readFileSync(`${filePath}/ProductInfo/${store}.json`).toString())
    csv += await productInfoCsv(productInfos)
  }

  fs.writeFileSync(`${filePath}/cleanProductInfo.csv`, csv)
}



(async() => {
  await cleanProductInfo()
})()