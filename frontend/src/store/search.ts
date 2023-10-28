import MiniSearch from 'minisearch'
import { config } from '../../../global'

export const miniSearch = new MiniSearch({
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
})

let i = 0
const fillSearchEngineWithProduct = (products: any[]) => {
  miniSearch.addAll(
    products.map((productInfo: any) => {
      return { ...productInfo, id: i++ }
    }),
  )
}

// Fetch products with non-blocking webworker
const fetchJsonWorker = new Worker('fetchJsonWorker.js')
fetchJsonWorker.onmessage = (e: MessageEvent) => {
  const json: string = e.data
  const products = json as any
  fillSearchEngineWithProduct(products)
}

const urls = Array.from({ length: config.numChunks }, (_, i) => `product${i}.json`)
urls.map(async (url) => fetchJsonWorker.postMessage(url))
