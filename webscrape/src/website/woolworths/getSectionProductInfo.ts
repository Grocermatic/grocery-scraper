import { postRequestJson } from "../../request/scrapeJson"
import { ProductInfo } from "../interface"
import { getPageProductInfo } from "./getPageProductInfo"


export const getSectionProductLinks = async(pageLinkRequestDatum:[string,string[]], woolworthsCookie:string) => {
  let productInfos:ProductInfo[] = []
  const report = {
    success: 0,
    failedData: [] as any[]
  }

  // Configure Woolworths post payload for section json
  const foodHealthStarRatings = pageLinkRequestDatum[1].map(foodStarRating => { return {'Term': foodStarRating} })
  const postRequestPayload = {
    'categoryId': pageLinkRequestDatum[0],
    'filters': [
      {
        'Key': 'Healthstar',
        'Items': foodHealthStarRatings
      }
    ],
    'formatObject': '{}',
    'gpBoost': 500,
    'pageNumber': 1,
    'pageSize': 36,
    'url': ''
  }
  const woolworthsProductListUrl = 'https://www.woolworths.com.au/apis/ui/browse/category'
    
  // Loop until no products show
  for (let pageNumber = 1;;pageNumber++) {
    postRequestPayload['pageNumber'] = pageNumber
    const productJson:any = (await postRequestJson(woolworthsProductListUrl, postRequestPayload, woolworthsCookie))
    if (productJson == '') { break }
    
    const page = getPageProductInfo(productJson)
    productInfos = productInfos.concat(page.productInfos)
  
    report.success += page.report.success
    report.failedData = report.failedData.concat(page.report.failedData)
  }
  return { productInfos, report }
}