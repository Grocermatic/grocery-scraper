// @ts-nocheck
import { ulid } from 'ulid'
import MiniSearch from 'minisearch'
import { config } from '../../global'

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

// Fill search engine fast from parallel loaded JSON
const urls = Array.from({ length: config.numChunks }, (_, i) => `/product${i}.json`)
let i = 0
const getAllProducts = urls.map(async (url) => {
  const res = await fetch(url)
  const products = await res.json()
})
