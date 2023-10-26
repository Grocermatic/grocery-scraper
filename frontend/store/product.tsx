import { ulid } from 'ulid'
import MiniSearch from 'minisearch'
import Dexie from 'dexie'

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

const db = new Dexie('productDatabase')
db.version(1).stores({
  products: `url, name, image, price, quantity, unitPrice`,
})

const loadProducts = new Promise(async () => {
  let products: any[] = []
  const storedProducts = await db.products.toArray()
  console.log(storedProducts)
  if (storedProducts.length > 0) {
    miniSearch.addAll(
      storedProducts.map((productInfo) => {
        return { ...productInfo, id: ulid() }
      }),
    )
    return
  }

  const getAllproducts: any[] = []
  for (const url of [productUrl0, productUrl1, productUrl2, productUrl3]) {
    const getProductSegment = async () => {
      const res = await fetch(url)
      const productJson = await res.json()
      miniSearch.addAll(
        productJson.map((productInfo: any) => {
          return { ...productInfo, id: ulid() }
        }),
      )
      products = [...products, ...productJson]
    }
    const promiseFunc = new Promise(getProductSegment)
    getAllproducts.push(promiseFunc)
  }
  await Promise.all(getAllproducts)
  await db.products.bulkPut([...products])
})

Promise.all([loadProducts])
