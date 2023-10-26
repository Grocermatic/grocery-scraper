import { For, createEffect, createSignal } from 'solid-js'
import { ProductCard } from './molecules/productList/ProductCard'
import { StoreSelection } from './molecules/filter/StoreSelection'
import { SearchBar } from './components/SearchBar'
import { miniSearch } from '../store/product'

export const App = () => {
  const [searchResults, setSearchResults] = createSignal<any[]>([])
  const [suggestions, setSuggestions] = createSignal<any[]>([])

  const searchBarChange = (searchQuery: string) => {
    setSearchResults(miniSearch.search(searchQuery))
  }

  const searchBarInput = (searchQuery: string) => {
    const rawSuggestions = miniSearch.autoSuggest(searchQuery).map((sug) => sug.suggestion)
    setSuggestions(rawSuggestions.slice(0, 5))
  }

  let productListref: HTMLDivElement | undefined
  createEffect(() => {
    searchResults()
    productListref?.scrollTo(0, 0)
  })

  return (
    <div class="h-screen flex flex-col">
      <section class="relative z-10 flex flex-col p-2 gap-2 shadow-md">
        <StoreSelection />
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
        <For each={searchResults()}>{(productInfo, id) => <ProductCard {...productInfo} />}</For>
        <div class="h-2 shrink-0"></div>
        <div class="card flex-shrink-0 grid place-content-center snap-start w-full h-full">
          <h1 class="text-center font-bold text-2xl">No more results</h1>
          <h1 class="text-center font-bold text-2xl">Alternative prompts</h1>
        </div>
      </section>
    </div>
  )
}
