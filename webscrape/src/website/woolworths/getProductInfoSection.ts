import { postRequestJson } from "../../request/scrapeJson"
import { ProductInfoReport } from "../ProductInfoReport"
import { getProductInfoPage } from "./getProductInfoPage"



export const getProductInfoSection = async (pageLinkRequestDatum: [string, string[]], woolworthsCookie: string) => {
  const report = new ProductInfoReport()

  // Configure Woolworths post payload for section json
  const foodHealthStarRatings = pageLinkRequestDatum[1].map(foodStarRating => { return { 'Term': foodStarRating } })
  const postRequestPayload = {
    'categoryId': pageLinkRequestDatum[0],
    'filters': [
      {
        'Key': 'Healthstar',
        'Items': foodHealthStarRatings
      }
    ],
    'formatObject': '{}',
    'pageNumber': 1,
    'pageSize': 36,
    'url': ''
  }
  const woolworthsProductListUrl = 'https://www.woolworths.com.au/apis/ui/browse/category'

  // Loop until no products show
  for (let pageNumber = 1; ; pageNumber++) {
    postRequestPayload['pageNumber'] = pageNumber
    const productJson = await postRequestJson(woolworthsProductListUrl, postRequestPayload, woolworthsCookie)
    if (productJson == '') { break }

    report.recordProductInfoPage(getProductInfoPage, productJson)
  }
  return report
}