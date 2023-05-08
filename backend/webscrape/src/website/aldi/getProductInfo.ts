import * as cheerio from 'cheerio'

import { ProductInfo, GetProductInfo } from "../interface"
import { getNumFromString, roundDecimal } from "../../util/dataCleaning";



export const aldiProductInfo:GetProductInfo = (html) => {
  // Aldi provides product html in boxes - product urls don't provide much info
  const $ = cheerio.load(html)
  
  const rawTitle = $('.box--description--header').text().trim()
  if (rawTitle.length == 0) { return null }

  const rawTitleWords = rawTitle.split(' ')
  const rawQuantity = rawTitleWords[rawTitleWords.length - 1]
  const name = rawTitle.slice(0, -1 - rawQuantity.length)

  // Calculate quantity in 'kg' or 'l'
  let quantity = getNumFromString(rawQuantity)[0]
  const unit = rawQuantity.slice(`${quantity}`.length).toLowerCase()
  if (['g','ml'].includes(unit)) { 
    quantity /= 1000
  }
  
  // All price in dollars
  const smallNumbers = $('.box--decimal').text()
  let price = getNumFromString($('.box--value').text() + smallNumbers)[0]
  if (smallNumbers.length == 0) {
    price = getNumFromString('0.' + $('.box--value').text())[0]
  }

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: name,
    url: `${$('.box--wrapper').attr('href')}`,
    img: `${$('.box--image-container').find('img').attr('src')}`,
    price: price,
    quantity: quantity,
    unitPrice: roundDecimal(price / quantity, 2)
  }

  // No nutritional information provided by Aldi
  return productInfo
}