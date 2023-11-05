import MiniSearch from 'minisearch'
import { config } from '../../../global'
import { webWorkerFactory } from '../logic/webWorkerFactory'
import { createSignal } from 'solid-js'

const searchOptions = {
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
}

let allProducts: any[] = []
export const [miniSearch, setMiniSearch] = createSignal(new MiniSearch(searchOptions))

let i = 0
const fillSearchEngineWithProduct = (products: any[]) => {
  allProducts = [...allProducts, ...products]
  const miniSearch =  new MiniSearch(searchOptions)
  miniSearch.addAll(
    allProducts.map((productInfo: any) => {
      return { ...productInfo, id: i++ }
    }),
  )
  setMiniSearch(miniSearch)
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
