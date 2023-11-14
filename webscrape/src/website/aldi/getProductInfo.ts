import * as cheerio from 'cheerio'

import { ProductInfo } from '../../../../common/interface'
import { roundDecimal } from '../../dataCleaning/roundDecimal'
import { getNumFromString } from '../../dataCleaning/getNumFromString'
import { getMetricQuantity } from '../../dataCleaning/getMetricQuantity'
import { getUnitPriceFromString } from '../../dataCleaning/getUnitPriceFromString'

export const getProductInfo = (html: string) => {
  // No json data is found for Aldi
  const $ = cheerio.load(html)

  const rawTitle = $('.box--description--header').first().text().trim()
  const rawTitleWords = rawTitle.split(' ')

  const rawQuantity = $('.box--amount').first().text()
  let quantity = getMetricQuantity(rawQuantity)

  // All price in dollars
  const cents = $('.box--decimal').first().text()
  const dollars = $('.box--value').first().text()
  let price = getNumFromString(dollars + cents)[0]
  if (cents.length == 0 && dollars.length != 0) {
    price = getNumFromString('0.' + dollars)[0]
  }

  const imgContent = $('.box--wrapper')
    .first()
    .toString()
    .match(/src="[^ ]+/g)
  let imgUrl = ''
  if (imgContent) imgUrl = imgContent[0].slice(5, imgContent[0].length - 1)

  const unitPriceStrings = $('.box--baseprice').first().text()
  let unitPrice = getUnitPriceFromString(unitPriceStrings)
  if (!unitPriceStrings) unitPrice = roundDecimal(price / quantity, 2)

  // Prefill mandatory values
  const productInfo: ProductInfo = {
    name: rawTitle.slice(0, -1 - rawTitleWords.slice(-1)[0].length),
    url: `${$('.box--wrapper').first().attr('href')}`,
    img: `${imgUrl}`,
    price: price,
    quantity: quantity,
    unitPrice: unitPrice,
  }

  // No nutritional information provided by Aldi
  return productInfo
}
