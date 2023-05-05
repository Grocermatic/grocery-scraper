import { scrapeStatic } from "../../util/scrapeStatic"
import * as cheerio from 'cheerio';
import * as fs from 'fs'



export const scrapeProductInfo = (html:string) => {
  const $ = cheerio.load(html)
  const productInfo = {
    'productName': $('h1.product__title').text()
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
    const $ = cheerio.load(html)
  })

}