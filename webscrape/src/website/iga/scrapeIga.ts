/* istanbul ignore file */

import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoSection } from './getProductInfoSection'

export const scrapeIga = async (cookie?: string) => {
  const report = new ProductInfoReport()

  // Page links with get request health star filters
  const sectionNames: string[] = [
    // fruit-and-vegetable
    'Vegetables',
    'Fruit',
    'Salads',
    // pantry
    'International Foods',
    'Canned Food and Instant Meals',
    'Rice, Pasta and Grains',
    'Desserts and Toppings',
    'Jam, Honey and Spreads',
    'Confectionary',
    'Snacks',
    'Health Food',
    'Baking',
    'Condiments and Dressings',
    'Cooking Sauces',
    'Breakfast Foods',
    'Soups',
    // meat-seafood-and-deli
    'Meat Seafood and Deli',
    // dairy-eggs-and-fridge
    'Chilled and Fresh',
    'Milk and Cream',
    'Yoghurt',
    'Eggs, Butter and Margarine',
    'Vegetarian and Vegan',
    'Cheese',
    'Cream, Custards and Desserts',
    // bakery
    'Bakery',
    // drinks
    'Drinks',
    // frozen
    'Frozen',
  ].map((category: string) => category.replaceAll(' ', '_').replaceAll(',', ''))

  for (const sectionName of sectionNames) {
    await report.recordProductInfoSection(getProductInfoSection, sectionName, cookie)
  }
  return report.removeDuplicate().sortProductInfoUnitPrice().recordScrapeSecond()
}
