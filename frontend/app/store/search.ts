import { createSignal } from 'solid-js'
import MiniSearch, { type SearchResult, type Suggestion } from 'minisearch'
import { config } from '../../../common/global'
import { webWorkerFactory } from '../../../common/webWorkerFactory'
import { cloneInstance } from '../logic/cloneInstance'
import type { ProductInfoPublic } from '../../../common/interface'

const searchOptions = Object.freeze({
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
})

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

// Fetch products with non-blocking webworker
const fetchJson = () => {
  self.onmessage = async (e: MessageEvent) => {
    const url: string = e.data
    const res = await fetch(url)
    if (!res) return
    const json = await res.json()
    postMessage(json)
  }
}
const fetchJsonWorker = webWorkerFactory(fetchJson)

let loadedChunks = 0
fetchJsonWorker.onmessage = (e: MessageEvent) => {
  const products: ProductInfoPublic[] = e.data
  fillSearchEngineWithProduct(products)
  setMiniSearchLoaded(++loadedChunks / config.numChunks)
  if (loadedChunks === config.numChunks) fetchJsonWorker.terminate()
}

const urls = Array.from(
  { length: config.numChunks },
  (_, i) => `${config.productBaseUrl}/product${i}.json`,
)
urls.map(async (url) => fetchJsonWorker.postMessage(url))

// Define product search engine query type and defaults
const freezeArray = <T extends string[]>(...o: T) => Object.freeze(o)
export const productSearch = Object.freeze({
  queryDefault: '',
  sortOptions: freezeArray('unit price', 'relevance', 'price'),
  storesDefault: freezeArray('Aldi', 'Coles', 'Iga', 'Woolie'),
})
export type ProductSearchSort = (typeof productSearch.sortOptions)[number]
export type ProductSearchStore = (typeof productSearch.storesDefault)[number]
export type ProductSearchParam = {
  query: string
  stores: ProductSearchStore[]
  sort: ProductSearchSort
}

// Product search engine abstraction type
export const productSearchEngine = new (class {
  #storeDomain: { [key in ProductSearchStore]: string } = Object.freeze({
    Aldi: 'aldi.com.au',
    Coles: 'coles.com.au',
    Iga: 'igashop.com.au',
    Woolie: 'woolworths.com.au',
  })

  #sortFuncs: {
    [key in ProductSearchSort]: (a: ProductInfoPublic, b: ProductInfoPublic) => number
  } = Object.freeze({
    'unit price': (a, b) => a.unitPrice! - b.unitPrice!,
    price: (a, b) => a.price! - b.price!,
    relevance: () => 0,
  })

  #searchFilter = (param: ProductSearchParam) => (product: any) => {
    for (const store of param.stores) {
      if (product.url.match(this.#storeDomain[store])) return true
    }
    return false
  }

  suggest = (param: ProductSearchParam, numSuggest = 5) =>
    miniSearch()
      .autoSuggest(param.query, { filter: this.#searchFilter(param) })
      .slice(0, numSuggest)
      .map((sug: Suggestion) => sug.suggestion)

  search = (param: ProductSearchParam) =>
    miniSearch()
      .search(param.query, { filter: this.#searchFilter(param) })
      .map((result: SearchResult) => productInfos[result.id]!)
      .sort(this.#sortFuncs[param.sort])
})()
