import { scrapeStatic } from "../../util/scrapeStatic"
import * as cheerio from 'cheerio';
import * as fs from 'fs'



export const scrapeProductInfo = (html:string) => {
  const $ = cheerio.load(html)
  const rawJson = JSON.parse($('script[type="application/json"]').text())
  const rawProductJson = rawJson['props']['pageProps']['product']
  const rawNutritionJson = rawProductJson['nutrition']['breakdown'][1]['nutrients']

  console.log(rawNutritionJson)
  const productInfo = {
    'name': rawProductJson['name'],
    'url': `https://www.coles.com.au/product/${rawJson['query']['slug']}`,
    'img': `https://productimages.coles.com.au/productimages${rawProductJson['imageUris'][0]['uri']}`,
    'price': rawProductJson['pricing']['now'],
    'unitPrice': rawProductJson['pricing']['unit']['price'],
    'unitMeasure': rawProductJson['pricing']['unit']['ofMeasureUnits'],
    'servingsPerPackage': rawProductJson['nutrition']['servingsPerPackage'],
    'servingSize': rawProductJson['nutrition']['servingSize'],
    'nutrition': {
      'kilojoules': rawNutritionJson[0]['value'],
      'protein': rawNutritionJson[1]['value'],
      'fat': rawNutritionJson[2]['value'],
      'carbohydrate': rawNutritionJson[3]['value'],
      'sugars': rawNutritionJson[4]['value'],
      'fibre': rawNutritionJson[8]['value'],
      'sodium': rawNutritionJson[6]['value'],
    }
  }
  return productInfo
}



try {

  console.log('Reading from file')
  const html = fs.readFileSync('./src/website/product.test.html').toString()
  const productInfo = scrapeProductInfo(html)
  console.log(productInfo)

} catch (err:any) {

  console.log('Webscraping')
  const testUrl = 'https://www.coles.com.au/product/coles-full-cream-milk-3l-8150288'
  scrapeStatic(testUrl).then((html:string) => {
    fs.writeFileSync('./src/website/product.test.html', html)
    const productInfo = scrapeProductInfo(html)
  })

}