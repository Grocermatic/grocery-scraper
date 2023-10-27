// @ts-nocheck
import { ulid } from 'ulid'
import MiniSearch from 'minisearch'

export const miniSearch = new MiniSearch({
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
})

export const fillSearchEngineWithProduct = (products: any[]) => {
  miniSearch.addAll(
    products.map((productInfo: any) => {
      return { ...productInfo, id: ulid() }
    }),
  )
}

// Fill search engin fast from parallel loaded JSON
const urls = ['/product0.json', '/product1.json', '/product2.json', '/product3.json']
const getAllProducts = urls.map((url) => {
  const getProductsFromUrl = async () => {
    const products = await (await fetch(url)).json()
    fillSearchEngineWithProduct(products)
  }
  return getProductsFromUrl()
})
Promise.all(getAllProducts)
