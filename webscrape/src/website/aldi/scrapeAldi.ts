import { generateUniqueArray } from "../../dataCleaning/generateUniqueArray"
import { scrapeStatic } from "../../request/scrapeStatic"
import { ProductInfo } from "../interface"
import { aldiPageProducts } from "./getProductInfoPage"



export const scrapeAldi = async(cookie?: string) => {
  let productInfos:ProductInfo[] = []

  const productLinks = [
    'https://www.aldi.com.au/en/groceries/super-savers/',
    'https://www.aldi.com.au/en/groceries/seasonal-range/',
    'https://www.aldi.com.au/en/groceries/price-reductions/',
    'https://www.aldi.com.au/en/groceries/freezer/',
    'https://www.aldi.com.au/en/groceries/pantry/olive-oil/',
    'https://www.aldi.com.au/en/groceries/fresh-produce/dairy-eggs/'
  ]

  for (const url of productLinks) {
    const html = await scrapeStatic(url, cookie)
    const productInfoSublist = aldiPageProducts(html)
    if (productInfoSublist.length > 0) {
      productInfos = productInfos.concat(productInfoSublist)
    }
  }
  return generateUniqueArray(productInfos)
}
