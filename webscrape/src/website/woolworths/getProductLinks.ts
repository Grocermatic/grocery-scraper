import * as cheerio from "cheerio";

import { GetProductLinks } from "../interface";
import { scrapeDynamic } from "../../request/scrapeDynamic";



const getWoolworthsSectionProductLinks = async(pageLink:string):Promise<string[]> => {
  const baseUrl = 'https://www.woolworths.com.au'
  const productLinks:string[] = []

  for (let pageNumber = 1;;pageNumber++) {

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

  let productLinks:string[] = []
  for (let productLinkIndex = 0; productLinkIndex < pageLinks.length; productLinkIndex++) {
    const productSubLinks = await getWoolworthsSectionProductLinks(pageLinks[productLinkIndex])
    productLinks = productLinks.concat(productSubLinks)
  }
  return productLinks 
}