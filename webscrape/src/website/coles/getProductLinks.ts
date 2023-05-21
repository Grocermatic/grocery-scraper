/* istanbul ignore file */

import * as cheerio from "cheerio";

import { GetProductLinks } from "../interface";
import { scrapeStatic } from "../../request/scrapeStatic";
import { generateUniqueArray } from "../../util/dataCleaning";



const getColesSectionProductLinks = async(pageLink:string):Promise<string[]> => {
  const baseUrl = 'https://www.coles.com.au'
  const productLinks:string[] = []

  for (let pageNumber = 1;;pageNumber++) {

    const pageHtml = await scrapeStatic(pageLink + `?page=${pageNumber}`)
    const $ = cheerio.load(pageHtml)

    // Focus on extracting from product grid
    const sectionElement = $('section.coles-targeting-ProductTileProductTileWrapper')
    if (sectionElement.length == 0) { break }

    sectionElement.each((index, element) => {
      const productLink = $(element).find('a.product__link').attr('href')
      const unitPriceString = $(element).find('div.product__pricing_area').find('span.price__calculation_method').text()
      const productAvailable = $(element).find('span.coles-targeting-ButtonButtonChildContainer').text() == 'Add'
      if (productLink == undefined) { return }
      if (!productAvailable) {return }
      if (unitPriceString.includes('ea')) { return } // Include only measurable products
      if (productLinks.includes(productLink)) { return }
      productLinks.push(baseUrl + productLink)
    })
  }
  return productLinks
}



export const getColesProductLinks:GetProductLinks = async() => {
  // Page links with get request health star filters
  const pageLinks = [
    'https://www.coles.com.au/browse/fruit-vegetables',
    'https://www.coles.com.au/browse/dairy-eggs-fridge',
    'https://www.coles.com.au/browse/bakery',
    'https://www.coles.com.au/browse/pantry',
    'https://www.coles.com.au/browse/deli',
    'https://www.coles.com.au/browse/drinks',
    'https://www.coles.com.au/browse/frozen',
    'https://www.coles.com.au/browse/meat-seafood'
  ]

  let productLinks:string[] = []
  for (let productLinkIndex = 0; productLinkIndex < pageLinks.length; productLinkIndex++) {
    const productSubLinks = await getColesSectionProductLinks(pageLinks[productLinkIndex])
    productLinks = productLinks.concat(productSubLinks)
  }
  return generateUniqueArray(productLinks)
}