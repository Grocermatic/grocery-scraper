import { wait } from "../../request/wait"
import { ProductInfoReport } from "../ProductInfoReport"
import { getProductInfoSection } from "./getProductInfoSection"



export const scrapeColes = async (cookie?: string) => {
  const report = new ProductInfoReport()

  // Page links with get request health star filters
  const sectionLinks = [
    // fruit-vegetables
    'https://www.coles.com.au/browse/fruit-vegetables',
    // dairy-eggs-fridge
    'https://www.coles.com.au/browse/dairy-eggs-fridge',
    // bakery
    'https://www.coles.com.au/browse/bakery',
    // deli
    'https://www.coles.com.au/browse/deli',
    // pantry
    'https://www.coles.com.au/browse/pantry/baking',
    'https://www.coles.com.au/browse/pantry/breakfast',
    'https://www.coles.com.au/browse/pantry/canned-food-soups-noodles',
    'https://www.coles.com.au/browse/pantry/coffee',
    'https://www.coles.com.au/browse/pantry/herbs-spices',
    'https://www.coles.com.au/browse/pantry/international-foods',
    'https://www.coles.com.au/browse/pantry/jams-honey-spreads',
    'https://www.coles.com.au/browse/pantry/oils-vinegars',
    'https://www.coles.com.au/browse/pantry/pasta-rice-legumes-grains',
    'https://www.coles.com.au/browse/pantry/pickled-vegetables-condiments',
    'https://www.coles.com.au/browse/pantry/sauces',
    'https://www.coles.com.au/browse/pantry/stocks-gravy',
    // frozen
    'https://www.coles.com.au/browse/frozen',
    // meat-seafood
    'https://www.coles.com.au/browse/meat-seafood'
  ]

  /*
  const promiseArray = sectionLinks.map(sectionLink => {
    return report.recordProductInfoSection(getProductInfoSection, sectionLink, cookie)
  })
  await Promise.all(promiseArray)
  //*/
  for (const sectionLink of sectionLinks) {
    await report.recordProductInfoSection(getProductInfoSection, sectionLink, cookie)
  }

  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
