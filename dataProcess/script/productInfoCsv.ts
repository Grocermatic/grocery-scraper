import * as fs from 'fs'

import { objectToCsvLine, productInfoCsv } from "../src/productInfoCsv"



(async()=>{
  
  let csv:string = "name,url,img,price,quantity,unitPrice,servingSize,kilojoules,protein,fat,fatSaturated,carb,sugar,sodium\n"
  let cleanCsv:string = "name,url,img,price,quantity,unitPrice,servingSize,kilojoules,protein,fat,fatSaturated,carb,sugar,sodium\n"
  const stores = ['aldi', 'coles', 'woolworths']
  stores.forEach(store => {
    const productInfos = JSON.parse(fs.readFileSync(`./data/${store}ProductInfo.json`).toString())
    for (let i = 0; i < productInfos.length; i++) {
      productInfos[i].name = productInfos[i].name.replaceAll(',','')
      const csvLine = objectToCsvLine(productInfos[i])
      if (productInfos[i].hasOwnProperty('nutrition') && !csvLine.split(',').includes('')) {
        cleanCsv += `${csvLine}\n`
      }
    }
    csv += productInfoCsv(productInfos)
  })
  fs.writeFileSync('./data/productInfo.csv', csv)
  fs.writeFileSync('./data/cleanProductInfo.csv', cleanCsv)

})()