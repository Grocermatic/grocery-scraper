import { roundDecimal } from '../../../common/roundDecimal'
import { ProductInfo } from '../../../common/interface'

export const validProductInfo = (productInfo: ProductInfo) => {
  const { name, url, img, price, quantity, unitPrice } = productInfo

  // Ensure valid string data
  if (typeof name != 'string') return null
  if (name.length == 0) return null
  try {
    new URL(url)
  } catch {
    return null
  }
  try {
    new URL(img)
  } catch {
    return null
  }

  // Repair invalid numeric data if possible
  const validNum = (val: any) => {
    if (typeof val != 'number') return 0
    if (val <= 0) return 0
    return 1
  }
  const validCount = validNum(price) + validNum(quantity) + validNum(unitPrice)

  if (validCount < 2) return null
  if (validCount == 3) {
    const ratio = price / quantity / unitPrice
    if (roundDecimal(ratio, 1) != 1) return null
  }
  if (!validNum(productInfo.price)) productInfo.price = roundDecimal(unitPrice * quantity, 2)
  if (!validNum(productInfo.quantity)) productInfo.quantity = roundDecimal(price / unitPrice, 3)
  if (!validNum(productInfo.unitPrice)) productInfo.unitPrice = roundDecimal(price / quantity, 2)

  const validCount2 =
    validNum(productInfo.price) + validNum(productInfo.quantity) + validNum(productInfo.unitPrice)
  if (validCount2 < 3) return null

  return productInfo
}
