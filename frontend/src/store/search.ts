import MiniSearch from 'minisearch'
import { config } from '../../../global'
import { webWorkerFactory } from '../../../common/webWorkerFactory'
import { createSignal } from 'solid-js'
import { cloneInstance } from '../logic/cloneInstance'
import { ProductInfo } from '../../../common/interface'

const searchOptions = {
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
}

export const [miniSearch, setMiniSearch] = createSignal(new MiniSearch(searchOptions))
export const [miniSearchLoaded, setMiniSearchLoaded] = createSignal(false)

let i = 0
const _miniSearch = new MiniSearch(searchOptions)
const fillSearchEngineWithProduct = (products: ProductInfo[]) => {
  _miniSearch?.addAll(
    products.map((productInfo: ProductInfo) => {
      return { ...productInfo, id: i++ }
    }),
  )
  setMiniSearch(cloneInstance(_miniSearch))
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
let loadedChunks = 0
const fetchJsonWorker = webWorkerFactory(fetchJson)
fetchJsonWorker.onmessage = (e: MessageEvent) => {
  const products: ProductInfo[] = e.data
  fillSearchEngineWithProduct(products)
  loadedChunks += 1
  if (loadedChunks === config.numChunks) {
    setMiniSearchLoaded(true)
    fetchJsonWorker.terminate()
  }
}

const urls = Array.from(
  { length: config.numChunks },
  (_, i) => `${config.productBaseUrl}/product${i}.json`,
)
urls.map(async (url) => fetchJsonWorker.postMessage(url))
