import * as cheerio from 'cheerio'

import { ProductInfo, GetProductInfo, GetBatchProductInfo } from "../interface"
import { generateUniqueArray } from "../../dataCleaning/dataCleaning";
import { scrapeStatic } from '../../request/scrapeStatic';
import { roundDecimal } from '../../dataCleaning/roundDecimal';
import { getNumFromString } from '../../dataCleaning/getNumFromString';
import { getUnitFromString } from '../../dataCleaning/getUnitFromString';



export const getAldiProductInfo:GetProductInfo = (html) => {
  // Aldi provides product html in boxes - product urls don't provide much info
  const $ = cheerio.load(html)
  
  const rawTitle = $('.box--description--header').text().trim()
  if (rawTitle.length == 0) { return null }

  const rawTitleWords = rawTitle.split(' ')
  const rawQuantity = rawTitleWords[rawTitleWords.length - 1]
  const name = rawTitle.slice(0, -1 - rawQuantity.length)

  // Calculate quantity in 'kg' or 'l'
  let quantity = getNumFromString(rawQuantity).slice(-1)[0]
  const unit = getUnitFromString(rawQuantity)
  if (['g','ml'].includes(unit)) { 
    quantity /= 1000
  }
  
  // All price in dollars
  const smallNumbers = $('.box--decimal').text()
  let price = getNumFromString($('.box--value').text() + smallNumbers)[0]
  if (smallNumbers.length == 0) {
    price = getNumFromString('0.' + $('.box--value').text())[0]
  }

  const imgContent = $('.box--wrapper').toString().match(/src="[^ ]+/g)
  let imgUrl = ''
  if (imgContent) imgUrl = imgContent[0].slice(5, imgContent[0].length - 1)

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: name,
    url: `${$('.box--wrapper').attr('href')}`,
    img: `${imgUrl}`,
    price: price,
    quantity: quantity,
    unitPrice: roundDecimal(price / quantity, 2)
  }

  // No nutritional information provided by Aldi
  return productInfo
}



export const aldiPageProducts = (html:string):ProductInfo[] => {
  const productInfos:ProductInfo[] = []
  const $ = cheerio.load(html)
  $('.box--wrapper').each((index, element) => {
    const productInfo = getAldiProductInfo($(element).toString())
    if (productInfo != null) { productInfos.push(productInfo) }
  })
  return productInfos
}



export const getAldiBatchProductInfo:GetBatchProductInfo = async(urls) => {
  let productInfos:ProductInfo[] = []
  for (const url of urls) {
    const html = await scrapeStatic(url)
    const productInfoSublist = aldiPageProducts(html)
    if (productInfoSublist.length > 0) {
      productInfos = productInfos.concat(productInfoSublist)
    }
  }
  return generateUniqueArray(productInfos)
}