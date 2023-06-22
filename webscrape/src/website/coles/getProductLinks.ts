/* istanbul ignore file */

import * as cheerio from "cheerio";

import { GetProductLinks } from "../interface";
import { scrapeStatic } from "../../request/scrapeStatic";
import { generateUniqueArray, getUnitPriceFromString } from "../../util/dataCleaning";



const getColesSectionProductLinks = async(pageLink:string):Promise<string[]> => {
  const baseUrl = 'https://www.coles.com.au'
  const productLinks:string[] = []

  for (let pageNumber = 1;;pageNumber++) {

    const pageHtml = await scrapeStatic(pageLink + `?sortBy=unitPriceAscending&page=${pageNumber}`)
    const $ = cheerio.load(pageHtml)

    // Focus on extracting from product grid
    const sectionElement = $('section.coles-targeting-ProductTileProductTileWrapper')
    if (sectionElement.length == 0) { break }

    const unitPriceThreshold = 20
    let totalUnitPrice = 0
    let numberOfProducts = 0
    for (const element of sectionElement) {
      const productLink = $(element).find('a.product__link').attr('href')
      const unitPriceString = $(element).find('div.product__pricing_area').find('span.price__calculation_method').text()
      const productAvailable = $(element).find('span.coles-targeting-ButtonButtonChildContainer').text() == 'Add'
      if (productLink == undefined) {}
      else if (!productAvailable) {}
      else if (unitPriceString.includes('ea')) {} // Include only measurable products
      else if (productLinks.includes(productLink)) {}
      else {
        productLinks.push(baseUrl + productLink)
        numberOfProducts++
        totalUnitPrice += getUnitPriceFromString(unitPriceString)
      }
    }

    // Limit products above price threshold
    const averageUnitPrice = totalUnitPrice / numberOfProducts
    if ((numberOfProducts != 0) && (averageUnitPrice > unitPriceThreshold)) { break }
  }
  return productLinks
}



export const getColesProductLinks:GetProductLinks = async() => {
  // Page links with get request health star filters
  const pageLinks = [
    'https://www.coles.com.au/browse/fruit-vegetables',
    'https://www.coles.com.au/browse/dairy-eggs-fridge',
    'https://www.coles.com.au/browse/bakery',
    'https://www.coles.com.au/browse/pantry/pasta-rice-legumes-grains',
    'https://www.coles.com.au/browse/pantry/pickled-vegetables-condiments',
    'https://www.coles.com.au/browse/pantry/stocks-gravy',
    'https://www.coles.com.au/browse/pantry/health-foods',
    'https://www.coles.com.au/browse/pantry/canned-food-soups-noodles',
    'https://www.coles.com.au/browse/pantry/breakfast',
    'https://www.coles.com.au/browse/deli',
    'https://www.coles.com.au/browse/frozen',
    'https://www.coles.com.au/browse/meat-seafood'
  ]

  let productLinks:string[] = []
  const productLinkPromiseArray = pageLinks.map(pageUrl => {return getColesSectionProductLinks(pageUrl)})
  const productSubLinks = await Promise.all(productLinkPromiseArray)
  for (let i = 0; i < productSubLinks.length; i++) {
    productLinks = productLinks.concat(productSubLinks[i])
  }
  return generateUniqueArray(productLinks)
}