import { createEffect, createSignal, splitProps } from 'solid-js'
import { miniSearch } from '../../store/search'
import { StoreSelection } from './StoreSelection'
import { SearchBar } from '../../components/SearchBar'
import { createStoredStore } from '../../store/createStoredStore'
import { storeSelection } from '../../store/default'
import { setSearchParam } from '../../store/searchParam'

export const SearchFilter = (props: any) => {
  const [local, _] = splitProps(props, ['setSearchResults'])

  const searchParams = new URLSearchParams(window.location.search) as any
  const [searchQuery, setSearchQuery] = createSignal<string>('')
  if (searchParams.get('query')) setSearchQuery(searchParams.get('query'))
  const [suggestions, setSuggestions] = createSignal<any[]>([])
  
  const [stores, setStores] = createStoredStore('storeSelection', storeSelection)
  const activeStores = () => Object.keys(stores).filter(key => {return stores[key]})
  
  if (!searchParams.get('stores')) setStores(storeSelection)
  else {
    let initStores = storeSelection as any
    Object.keys(storeSelection).forEach(val => initStores[val] = false)
    for (const activeStore of searchParams.get('stores').split(' ')) {
      if (initStores[activeStore] == false) initStores[activeStore] = true
    }
    setStores(initStores)
  }

  const searchFilter = (product: any) => {
    for (const storeName of activeStores()) {
      const storeDomain = `${storeName}.com.au`.toLowerCase()
      if (product.url.match(storeDomain)) return true
    }
    return false
  }

  const searchResults = () =>
    miniSearch().search(searchQuery(), {
      filter: searchFilter,
    })

  const searchBarInput = (searchQuery: string) => {
    const rawSuggestions = miniSearch().autoSuggest(searchQuery, {
      filter: searchFilter,
    })
    const suggestions = rawSuggestions.map((sug: any) => sug.suggestion)
    setSuggestions(suggestions.slice(0, 5)) // Top 5 suggestions
  }

  createEffect(() => {
    searchResults()
    local.setSearchResults(searchResults())
    setSearchParam('query', searchQuery())
    const storesParam = activeStores().length == Object.keys(storeSelection).length ? '' : activeStores().join(' ')
    setSearchParam('stores', storesParam)
  })

  return (
    <section class="relative z-10 flex flex-col p-2 gap-2 shadow-md">
      <StoreSelection stores={stores} setStores={setStores} />
      <SearchBar
        initialValue={searchQuery()}
        onChange={setSearchQuery}
        onInput={searchBarInput}
        suggestions={suggestions()}
        placeholder="Search product..."
        id="search"
      />
    </section>
  )
}
