/* c8 ignore start */

import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoSection } from './getProductInfoSection'

export const scrapeWoolworths = async (cookie?: string) => {
  const report = new ProductInfoReport()
  console.debug('Begin scraping: Woolworths')

  // Page links with get request health star filters
  const sectionIds: string[] = [
    // fruit-veg
    '1-E5BEE36E', //https://www.woolworths.com.au/shop/browse/fruit-veg
    // bakery
    '1_DEB537E', // https://www.woolworths.com.au/shop/browse/bakery
    // poultry-meat-seafood
    '1_D5A2236', // https://www.woolworths.com.au/shop/browse/poultry-meat-seafood
    // deli-chilled-meals
    '1_3151F6F', // https://www.woolworths.com.au/shop/browse/deli-chilled-meals
    // dairy-eggs-fridge
    '1_6E4F4E4', // https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge
    // lunch-box
    '1_9E92C35', // https://www.woolworths.com.au/shop/browse/lunch-box
    // pantry
    '1_C7A623D', // https://www.woolworths.com.au/shop/browse/pantry/breakfast-spreads
    '1_0B44952', // https://www.woolworths.com.au/shop/browse/pantry/long-life-milk
    '1_8458E3A', // https://www.woolworths.com.au/shop/browse/pantry/baking
    '1_F779C5C', // https://www.woolworths.com.au/shop/browse/pantry/herbs-spices
    '1_B5F8608', // https://www.woolworths.com.au/shop/browse/pantry/pasta-rice-grains
    '1_83608CE', // https://www.woolworths.com.au/shop/browse/pantry/cooking-sauces-recipe-bases
    '1_6877157', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/baked-beans-spaghetti
    '1_B55DD8D', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/canned-soup-soup-ingredients
    '1_E56337E', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/canned-tuna
    '1_0418352', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/canned-salmon-seafood
    '1_69969BC', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/canned-vegetables
    '1_24957B7', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/canned-beans-legumes
    '1_050D440', // https://www.woolworths.com.au/shop/browse/pantry/canned-food-instant-meals/canned-fruit
    '1_E216643', // https://www.woolworths.com.au/shop/browse/pantry/oil-vinegar
    // snacks-confectionery
    '1_717445A', // https://www.woolworths.com.au/shop/browse/snacks-confectionery
    // freezer
    '1_ACA2FC2', // https://www.woolworths.com.au/shop/browse/freezer
    // drinks
    '1_5AF3A0A', // https://www.woolworths.com.au/shop/browse/drinks
  ]

  const promiseArray = sectionIds.map((sectionId) => {
    return report.recordProductInfoSection(
      getProductInfoSection,
      sectionId,
      cookie,
    )
  })
  await Promise.all(promiseArray)
  console.debug('Finish scraping: Woolworths')
  return report
    .removeDuplicate()
    .sortProductInfoUnitPrice()
    .recordScrapeSecond()
}
