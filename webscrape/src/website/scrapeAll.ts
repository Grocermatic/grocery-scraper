/* istanbul ignore file */

import { getAldiProductLinks } from "./aldi/getProductLinks"
import { getColesProductLinks } from "./coles/getProductLinks"
import { getWoolworthsProductLinks } from "./woolworths/getProductLinks"



export const getAllScrapeLinks = () => {
  const productLinkFinders = [
    getAldiProductLinks,
    getColesProductLinks,
    getWoolworthsProductLinks
  ]
  
}