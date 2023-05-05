const axios = require('axios')
const fs = require('fs');
const cheerio = require('cheerio')



exports.scrapeStatic = async(url:string):Promise<any> => {
  performance.mark(`scraping-start-${url}`)
  const html = await axios.get(url)
  performance.mark(`scraping-end-${url}`)
  console.log(performance.measure(`scraping-start-end-${url}`, `scraping-start-${url}`, `scraping-end-${url}`))

  //fs.writeFile('./product.txt', html.data, (e:any)=>{})
  //const $ = cheerio.load(html.data)

  //*
  fs.readFile('./test/colesProduct.html', (e:any,data:any)=>{
    console.log(data)
    const $ = cheerio.load(data)
    const product = {
      'productName': $('h1.product__title').text(),
    }
    console.log(product)
  })
  //*/

  /*
  console.log(data)
  const $ = cheerio.load(data)
  const product = {
    'productName': $('.product__title').text(),
  }
  console.log(product)
  //*/
}





const url = 'https://www.coles.com.au/product/coles-full-cream-milk-3l-8150288'
exports.scrapeStatic(url).then()