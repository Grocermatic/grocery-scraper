import MiniSearch from 'minisearch'
import { config } from '../../../global'
import { webWorkerFactory } from './webWorkerFactory'

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

const fetchJson = () => {
  self.onmessage = async (e: MessageEvent) => {
    const url: string = e.data
    const res = await fetch(url)
    if (!res) return
    const json = await res.json()
    postMessage(json)
  }
}

// Fetch products with non-blocking webworker
const fetchJsonWorker = webWorkerFactory(fetchJson)
fetchJsonWorker.onmessage = (e: MessageEvent) => {
  const products: any = e.data
  fillSearchEngineWithProduct(products)
}

const urls = Array.from(
  { length: config.numChunks },
  (_, i) => `${config.productBaseUrl}/product${i}.json`,
)
urls.map(async (url) => fetchJsonWorker.postMessage(url))
