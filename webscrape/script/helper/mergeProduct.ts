import { daySinceEpoch } from '../../../common/daysSinceEpoch'
import { ProductInfo, ProductInfoPublic } from '../../../common/interface'
import { cloneJson } from '../../../frontend/src/logic/cloneJson'
import { keys } from '../../../frontend/src/logic/keys'
import { getProductsFromUrl } from './getProductsFromUrl'
import { hashToArray } from './hashToArray'

export const hashProducts = (products: any[]) => {
  const hash: { [key: string]: any } = {}
  products.forEach((p) => (hash[p.url] = p))
  return hash
}

// Todo: Remove after migration: converts ProductInfo to ProductInfoPublic
export const initProduct = (newProduct: any) => {
  if (newProduct.history) return newProduct
  const product: ProductInfoPublic = {
    name: newProduct.name,
    url: newProduct.url,
    img: newProduct.img,
    quantity: newProduct.quantity,
    history: [
      {
        daySinceEpoch: daySinceEpoch,
        price: newProduct.price,
      },
    ],
  }
  return product
}

export const mergeProduct = (oldProduct: ProductInfoPublic, newProduct: ProductInfo) => {
  const product: ProductInfoPublic = {
    name: oldProduct.name,
    url: oldProduct.url,
    img: oldProduct.img,
    quantity: oldProduct.quantity,
    history: cloneJson(oldProduct.history),
  }
  // Add new price to history
  const lastPrice = oldProduct.history[0].price
  if (newProduct.price != lastPrice) {
    product.history.unshift({
      daySinceEpoch: daySinceEpoch,
      price: newProduct.price,
    })
    product.history = product.history.slice(0, 10)
  } else product.history[0].daySinceEpoch = daySinceEpoch
  return product
}

export const mergeOldProducts = async (currentProducts: ProductInfo[]) => {
  const oldProducts = await getProductsFromUrl()
  const productsHash = hashProducts(oldProducts)

  // Todo: Remove after migration: converts ProductInfo to ProductInfoPublic
  for (const oldProductUrl of keys(productsHash)) {
    const oldProduct = productsHash[oldProductUrl]
    productsHash[oldProductUrl] = initProduct(oldProduct as any)
  }

  for (const newProduct of currentProducts) {
    const productId = newProduct.url
    const oldProduct = productsHash[productId]
    productsHash[productId] = oldProduct
      ? mergeProduct(oldProduct, newProduct)
      : initProduct(newProduct)
  }
  return hashToArray(productsHash) as ProductInfoPublic[]
}
