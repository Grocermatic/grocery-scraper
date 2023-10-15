import { roundDecimal } from "../dataCleaning/roundDecimal"
import { ProductInfo } from "./interface"



export const validProductInfo = (productInfo: ProductInfo) => {
  const { name, url, img, price, quantity, unitPrice } = productInfo

  // Ensure valid string data
  if (typeof name != 'string') return false
  if (name.length == 0) return false
  try { new URL(url) } catch { return false }
  try { new URL(img) } catch { return false }

  // Repair invalid numeric data if possible
  const validNum = (val: any) => {
    if (typeof val != 'number') return 0
    if (val <= 0) return 0
    return 1
  }
  const validCount = validNum(price) + validNum(quantity) + validNum(unitPrice)

  if (validCount < 2) return false
  if (validCount == 3) {
    const ratio = price / quantity / unitPrice
    if (roundDecimal(ratio, 1) != 1) productInfo.unitPrice = roundDecimal(price / quantity, 2)
  }
  if (!validNum(productInfo.price)) productInfo.price = roundDecimal(unitPrice * quantity, 2)
  if (!validNum(productInfo.quantity)) productInfo.quantity = roundDecimal(price / unitPrice, 3)
  if (!validNum(productInfo.unitPrice)) productInfo.unitPrice = roundDecimal(price / quantity, 2)

  return true
}
