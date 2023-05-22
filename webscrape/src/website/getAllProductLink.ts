/* istanbul ignore file */

import { GetProductLinks } from "./interface"



export const getAllProductLinks = async(productLinkFinders:GetProductLinks[]):Promise<string[][]> => {
  const productLinkFindersPromiseArray = productLinkFinders.map(asyncFunc => {return asyncFunc()} )
  const supplierProductLinks = await Promise.all(productLinkFindersPromiseArray)
  return supplierProductLinks
}