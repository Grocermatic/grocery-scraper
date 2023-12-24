import MiniSearch from 'minisearch'
import { config } from '../../../common/global'
import { webWorkerFactory } from '../../../common/webWorkerFactory'
import { createSignal } from 'solid-js'
import { cloneInstance } from '../logic/cloneInstance'
import { ProductInfoPublic } from '../../../common/interface'

const searchOptions = {
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
}

export const productInfos: ProductInfoPublic[] = []
export const [miniSearch, setMiniSearch] = createSignal(new MiniSearch(searchOptions))
export const [miniSearchLoaded, setMiniSearchLoaded] = createSignal(0)

let i = 0
const _miniSearch = new MiniSearch(searchOptions)
const fillSearchEngineWithProduct = (products: ProductInfoPublic[]) => {
  _miniSearch?.addAll(
    products.map((productInfo: ProductInfoPublic) => {
      productInfos.push(productInfo)
      const price = productInfo.history[0].price
      return {
        name: productInfo.name,
        url: productInfo.url,
        price: price,
        unitPrice: price / productInfo.quantity,
        id: i++,
      }
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
  const products: ProductInfoPublic[] = e.data
  fillSearchEngineWithProduct(products)
  loadedChunks += 1
  setMiniSearchLoaded(loadedChunks / config.numChunks)
  if (loadedChunks === config.numChunks) {
    fetchJsonWorker.terminate()
  }
}

const urls = Array.from(
  { length: config.numChunks },
  (_, i) => `${config.productBaseUrl}/product${i}.json`,
)
urls.map(async (url) => fetchJsonWorker.postMessage(url))
