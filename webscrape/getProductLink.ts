import { getAldiProductLinks } from "./src/website/aldi/getProductLinks"
import { getColesProductLinks } from "./src/website/coles/getProductLinks"
import { getAllProductLinks } from "./src/website/getAllProductLink"
import { getWoolworthsProductLinks } from "./src/website/woolworths/getProductLinks"



export const serverlessHandler = async (event:any) => {
  const info = await getAllProductLinks([getAldiProductLinks, getColesProductLinks, getWoolworthsProductLinks])
  return info
}
