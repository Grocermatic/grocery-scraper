import { daySinceEpoch } from '../../../common/daysSinceEpoch'
import { ProductInfo } from '../../../common/interface'
import { keys } from '../../../frontend/src/logic/keys'
import { getProductsFromUrl } from './getProductsFromUrl'

export const hashProducts = (products: ProductInfo[]) => {
  const hash: { [key: string]: ProductInfo } = {}
  products.forEach((p) => (hash[p.url] = p))
  return hash
}

export const hashToArray = (hash: { [key: string]: ProductInfo }) => {
  return Object.keys(hash).map((key) => hash[key])
}

export const initProduct = (newProduct: ProductInfo) => {
  newProduct.priceHistory = [{
    price: newProduct.price as number,
    daySinceEpoch: daySinceEpoch
  }]
  delete newProduct.unitPrice
  return newProduct
}

export const mergeProduct = (oldProduct: ProductInfo, newProduct: ProductInfo) => {
  if (oldProduct.priceHistory && oldProduct.priceHistory.length > 0) {
    const lastPrice = oldProduct.priceHistory[0].price
    const priceHistory = oldProduct.priceHistory
    if (newProduct.price == lastPrice) priceHistory[0].daySinceEpoch = daySinceEpoch
    else if (newProduct.price) {
      priceHistory.unshift({
        price: newProduct.price,
        daySinceEpoch: daySinceEpoch
      })
    }
    oldProduct.priceHistory = priceHistory.slice(0, 10)
  } else oldProduct = initProduct(newProduct)
  oldProduct.price = newProduct.price
  delete oldProduct.unitPrice
  return oldProduct
}

export const mergeProducts = async (currentProducts: ProductInfo[]) => {
  const oldProducts = await getProductsFromUrl()
  const productsHash = hashProducts(oldProducts)
  for (const oldProductUrl of keys(productsHash)) {
    const oldProduct = productsHash[oldProductUrl]
    productsHash[oldProductUrl] = initProduct(oldProduct)
  }
  for (const newProduct of currentProducts) {
    const productId = newProduct.url
    const oldProduct = productsHash[productId]
    if (oldProduct) productsHash[productId] = mergeProduct(oldProduct, newProduct)
    else initProduct(newProduct)
  }
  hashToArray(productsHash)
}
