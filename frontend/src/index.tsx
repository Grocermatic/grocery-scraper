import { render } from 'solid-js/web'
import { For, createEffect, createSignal } from 'solid-js'
import { ProductCard } from './molecules/productList/ProductCard'
import { SearchBar } from './components/SearchBar'
import { miniSearch } from './store/search'
import { analytics } from './store/analytics'
import { StoreSelection } from './molecules/filter/StoreSelection'

const App = () => {
  analytics

  const [suggestions, setSuggestions] = createSignal<any[]>([])
  const [searchQuery, setSearchQuery] = createSignal('')
  const [stores, setStores] = createSignal<any>([])

  const searchFilter = (product: any) => {
    for (const store of stores()) {
      if (store.active && product.url.match(store.domain)) return true
    }
    return false
  }

  const searchResults = () =>
    miniSearch.search(searchQuery(), {
      filter: searchFilter,
    })
    
  const searchBarChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)
  }

  const searchBarInput = (searchQuery: string) => {
    const rawSuggestions = miniSearch.autoSuggest(searchQuery, {
      filter: searchFilter,
    })
    const suggestions = rawSuggestions.map((sug) => sug.suggestion)
    setSuggestions(suggestions.slice(0, 5)) // Top 5 suggestions
  }

  let productListref: HTMLDivElement | undefined
  createEffect(() => {
    searchResults()
    productListref?.scrollTo(0, 0)
  })

  return (
    <div class="h-full flex flex-col">
      <section class="relative z-10 flex flex-col p-2 gap-2 shadow-md">
        <StoreSelection onChange={setStores} />
        <SearchBar
          onChange={searchBarChange}
          onInput={searchBarInput}
          suggestions={suggestions()}
          placeholder="Search product..."
          id="search"
        />
      </section>
      <section
        ref={productListref}
        class="flex animate-none h-full flex-col p-2 overflow-y-auto snap-mandatory snap-both no-scrollbar"
      >
        <For each={searchResults()}>{(productInfo, _) => <ProductCard {...productInfo} />}</For>
        <div class="h-2 shrink-0 snap-start"></div>
        <div class="card flex-shrink-0 grid place-content-center w-full h-full">
          <h1 class="text-center font-bold text-2xl">No more results</h1>
        </div>
        <div class="h-2 shrink-0"></div>
      </section>
    </div>
  )
}

const root = document.getElementById('root')
render(() => <App />, root!)
