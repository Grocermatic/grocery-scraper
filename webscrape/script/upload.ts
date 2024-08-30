import { readFileSync, readdirSync } from 'node:fs'
import { uploadToR2 } from './helper/uploadToR2'

const productionPath = 'data/production'
const files = readdirSync(productionPath)
files.map(async (fileName) => {
  const filePath = `${productionPath}/${fileName}`
  await uploadToR2(
    readFileSync(filePath),
    'grocermatic-product',
    fileName,
    'application/json',
  )
})
;(async () => {
  const fileName = 'cleanProductInfo.json'
  const buffer = readFileSync(`data/${fileName}`)
  await uploadToR2(buffer, 'grocermatic-product', fileName, 'application/json')
})()
