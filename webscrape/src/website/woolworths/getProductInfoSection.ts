import { postRequestJson } from "../../request/scrapeJson"
import { ProductInfoReport } from "../ProductInfoReport"
import { getProductInfoPage } from "./getProductInfoPage"



export const getProductInfoSection = async (sectionId: string, woolworthsCookie: string) => {
  const report = new ProductInfoReport()

  // Configure Woolworths post payload for section json
  const postRequestPayload = {
    'categoryId': sectionId,
    'formatObject': '{}',
    'pageNumber': 1,
    'pageSize': 36,
    'sortType': 'CUPAsc',
    'url': ''
  }
  const woolworthsProductListUrl = 'https://www.woolworths.com.au/apis/ui/browse/category'

  // Loop until no products show
  for (let pageNumber = 1; ; pageNumber++) {
    postRequestPayload['pageNumber'] = pageNumber
    const productJson = await postRequestJson(woolworthsProductListUrl, postRequestPayload, woolworthsCookie)
    if (productJson == '') { break }
    const productListJson = JSON.parse(productJson)['Bundles']
    if (productListJson.length == 0) { break }

    report.recordProductInfoPage(getProductInfoPage, productJson)
  }
  return report
}