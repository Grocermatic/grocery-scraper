/* istanbul ignore file */

import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoSection } from './getProductInfoSection'

export const scrapeWoolworths = async (cookie?: string) => {
  const report = new ProductInfoReport()

  // Page links with get request health star filters
  const sectionIds: string[] = [
    // fruit-veg
    '1-5931EE89', // https://www.woolworths.com.au/shop/browse/fruit-veg/fruit
    '1_AC17EDD', // https://www.woolworths.com.au/shop/browse/fruit-veg/vegetables
    // bakery
    '1_5402F90', // https://www.woolworths.com.au/shop/browse/bakery/in-store-bakery
    '1_62B7AA0', // https://www.woolworths.com.au/shop/browse/bakery/packaged-bread-bakery
    // poultry-meat-seafood
    '1_CED9B86', // https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/meat
    '1_D610306', // https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/seafood
    // dairy-eggs-fridge
    '1_223D9D6', // https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/milk
    '1_AC76873', // https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/yoghurt
    '1_85274A0', // https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/eggs-butter-margarine
    '1_D3D428B', // https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/fresh-pasta-sauces
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
    // freezer
    '1_A96D7F8', // https://www.woolworths.com.au/shop/browse/freezer/frozen-vegetables
    '1_4B53D5A', // https://www.woolworths.com.au/shop/browse/freezer/frozen-fruit
  ]

  const promiseArray = sectionIds.map((sectionId) => {
    return report.recordProductInfoSection(getProductInfoSection, sectionId, cookie)
  })
  await Promise.all(promiseArray)

  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
