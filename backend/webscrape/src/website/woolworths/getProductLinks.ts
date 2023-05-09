import * as cheerio from "cheerio";

import { GetProductLinks } from "../interface";
import { scrapeDynamic } from "../../request/scrapeDynamic";



const getWoolworthsPageLinks = async(pageLink:string):Promise<string[]> => {
  const baseUrl = 'https://www.woolworths.com.au'
  const productLinks:string[] = []

  for (let pageNumber = 1;;pageNumber++) {
    console.log(productLinks)
    console.log(productLinks.length)

    const pageHtml = await scrapeDynamic(pageLink + `&pageNumber=${pageNumber}`)
    const $ = cheerio.load(pageHtml)

    // Check if results exist
    const noResultHeader = $('.zero-filter-results-header')
    if (noResultHeader.length > 0) { break }

    // Focus on extracting from product grid
    $('shared-grid').find('div.product-tile-v2--image').each((index, element) => {
      const productLink = $(element).find('a').attr('href')
      if (productLink == undefined) { return }
      if (productLinks.includes(productLink)) { return }
      productLinks.push(baseUrl + productLink)
    })
  }
  return productLinks
}
getWoolworthsPageLinks('https://www.woolworths.com.au/shop/browse/meat-seafood-deli?&filter=Healthstar(4%2C4.5%2C5)').then((list)=>{
  console.log(list)
})



export const getWoolworthsProductLinks:GetProductLinks = async() => {
  // Page links with get request health star filters
  const pageLinks = [
    'https://www.woolworths.com.au/shop/browse/fruit-veg?&filter=Healthstar(5)',
    'https://www.woolworths.com.au/shop/browse/freezer?&filter=Healthstar(4.5%2C5)',
    'https://www.woolworths.com.au/shop/browse/pantry?&filter=Healthstar(4.5%2C5%2C5.0)',
    'https://www.woolworths.com.au/shop/browse/bakery?&filter=Healthstar(4.5%2C5)',
    'https://www.woolworths.com.au/shop/browse/meat-seafood-deli?&filter=Healthstar(4%2C4.5%2C5)',
    'https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge?&filter=Healthstar(4%2C4.0%2C4.5%2C5%2C5.0)',
    'https://www.woolworths.com.au/shop/browse/lunch-box?&filter=Healthstar(4.5%2C5%2C5.0)',
    'https://www.woolworths.com.au/shop/browse/health-wellness?&filter=Healthstar(4.5%2C5%2C5.0)',
    'https://www.woolworths.com.au/shop/browse/drinks?&filter=Healthstar(4.5%2C5%2C5.0)'
  ]

  const productLinks:string[] = []
  for (const pagelink in pageLinks) {
    getWoolworthsPageLinks(pagelink)
  }
  return pageLinks 
}