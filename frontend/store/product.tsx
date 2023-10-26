import { ulid } from 'ulid'
import MiniSearch from 'minisearch'

// @ts-ignore
import productUrl0 from '../../webscrape/data/production/product0.json?url'
// @ts-ignore
import productUrl1 from '../../webscrape/data/production/product1.json?url'
// @ts-ignore
import productUrl2 from '../../webscrape/data/production/product2.json?url'
// @ts-ignore
import productUrl3 from '../../webscrape/data/production/product3.json?url'

export const miniSearch = new MiniSearch({
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
})

let products: any[] = []

const loadProducts = new Promise(async () => {
  const localStore = localStorage.getItem('products')
  if (localStore) {
    products = JSON.parse(localStore)
    if (products.length > 0) {
      console.info('Loading productInfo from local storage')
      miniSearch.addAll(
        products.map((productInfo: any) => {
          return { ...productInfo, id: ulid() }
        }),
      )
      return
    }
  }

  const getAllProducts: any[] = []
  for (const url of [productUrl0, productUrl1, productUrl2, productUrl3]) {
    const getProductSegment = async () => {
      const res = await fetch(url)
      const productJson = await res.json()
      miniSearch.addAll(
        productJson.map((productInfo: any) => {
          return { ...productInfo, id: ulid() }
        }),
      )
      products = products.concat(productJson)
    }
    getAllProducts.push(getProductSegment())
  }
  await Promise.all(getAllProducts)
  localStorage.setItem('products', JSON.stringify(products))
})

Promise.all([loadProducts])
