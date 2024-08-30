import type { GetProductInfo, ProductInfo } from '../../../../common/interface'
import { roundDecimal } from '../../../../common/roundDecimal'
import { getMetricQuantity } from '../../dataCleaning/getMetricQuantity'
import { getNumFromString } from '../../dataCleaning/getNumFromString'

export const getProductInfo: GetProductInfo = (product) => {
  const quantityString = `${product.unitOfSize.size} ${product.unitOfSize.abbreviation}`
  const urlName = product.name.toLowerCase().replace(/\s/g, '-')
  let unitPrice = product.wholePrice
  const splitTextUnitPriceNumbers = getNumFromString(product.pricePerUnit)
  if (splitTextUnitPriceNumbers.length === 2) {
    const splitTextUnitPrice = product.pricePerUnit.split('/')
    const kilograms = getMetricQuantity(splitTextUnitPrice[1])
    const cost = splitTextUnitPriceNumbers[0]
    unitPrice = roundDecimal(cost / kilograms, 2)
  }

  const productInfo: ProductInfo = {
    name: product.name,
    url: `https://www.igashop.com.au/product/${urlName}-${product.productId}`,
    img: product.image.default,
    price: getNumFromString(product.price)[0],
    quantity: getMetricQuantity(quantityString),
    unitPrice: unitPrice,
  }
  return productInfo
}
