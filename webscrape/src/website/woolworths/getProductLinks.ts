/* istanbul ignore file */

import { GetProductLinks } from "../interface";
import { getCookie } from "../../request/getCookie";
import { postRequestJson } from "../../request/scrapeJson";
import { getUnitFromString } from "../../dataCleaning/getUnitFromString";
import { generateUniqueArray } from "../../dataCleaning/generateUniqueArray";



export const getWoolworthsSectionProductLinks = async(pageLinkRequestDatum:[string,string[]], woolworthsCookie:string):Promise<string[]> => {
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
    
  const productLinks:string[] = []
  for (let pageNumber = 1;;pageNumber++) {
    postRequestPayload['pageNumber'] = pageNumber

    const response:any = (await postRequestJson(woolworthsProductListUrl, postRequestPayload, woolworthsCookie))
    if (response == '') { break }

    const productListJson = JSON.parse(response)['Bundles']
    if (productListJson.length == 0) { break }
    
    for (const productJson of productListJson) {
      const unitMeasure = getUnitFromString(productJson['Products'][0]['CupString'])
      if (unitMeasure != '') {
        const productCode = productJson['Products'][0]['Stockcode']
        const productLink = `https://www.woolworths.com.au/shop/productdetails/${productCode}`
        productLinks.push(productLink)
      }
    }
  }
  return productLinks
}



export const getWoolworthsProductLinks:GetProductLinks = async() => {
  // Page links with get request health star filters
  const pageLinkRequestData:[string,string[]][] = [
    ['1-E5BEE36E', ['5']], // 'https://www.woolworths.com.au/shop/browse/fruit-veg?&filter=Healthstar(5)'
    ['1_ACA2FC2', ['4.5','5']], // 'https://www.woolworths.com.au/shop/browse/freezer?&filter=Healthstar(4.5%2C5)'
    ['1_39FD49C', ['4.5','5','5.0']], // 'https://www.woolworths.com.au/shop/browse/pantry?&filter=Healthstar(4.5%2C5%2C5.0)'
    ['1_DEB537E', ['4.5','5']], // 'https://www.woolworths.com.au/shop/browse/bakery?&filter=Healthstar(4.5%2C5)'
    ['1_D5A2236', ['4','4.5','5']], // 'https://www.woolworths.com.au/shop/browse/meat-seafood-deli?&filter=Healthstar(4%2C4.5%2C5)'
    ['1_6E4F4E4', ['4','4.0','4.5','5','5.0']], // 'https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge?&filter=Healthstar(4%2C4.0%2C4.5%2C5%2C5.0)'
    ['1_9E92C35', ['4.5','5','5.0']], // 'https://www.woolworths.com.au/shop/browse/lunch-box?&filter=Healthstar(4.5%2C5%2C5.0)'
    ['1_9851658', ['4.5','5','5.0']], // 'https://www.woolworths.com.au/shop/browse/health-wellness?&filter=Healthstar(4.5%2C5%2C5.0)'
    ['1_5AF3A0A', ['4.5','5','5.0']] // 'https://www.woolworths.com.au/shop/browse/drinks?&filter=Healthstar(4.5%2C5%2C5.0)'
  ]

  const woolworthsCookie = await getCookie('https://www.woolworths.com.au')

  let productLinks:string[] = []
  const productLinkPromiseArray = pageLinkRequestData.map(pageData => {return getWoolworthsSectionProductLinks(pageData, woolworthsCookie)})
  const productSubLinks = await Promise.all(productLinkPromiseArray)
  for (let i = 0; i < productSubLinks.length; i++) {
    productLinks = productLinks.concat(productSubLinks[i])
  }
  return generateUniqueArray(productLinks)
}