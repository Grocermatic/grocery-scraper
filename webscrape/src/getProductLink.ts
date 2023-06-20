import { getAldiProductLinks } from "./website/aldi/getProductLinks"
import { getColesProductLinks } from "./website/coles/getProductLinks"
import { getAllProductLinks } from "./website/getAllProductLink"
import { getWoolworthsProductLinks } from "./website/woolworths/getProductLinks"



export const serverlessHandler = async (event:any) => {
  const info = await getAllProductLinks([getAldiProductLinks, getColesProductLinks, getWoolworthsProductLinks])
  return info
}
