import { createEffect, createSignal, onMount, splitProps } from 'solid-js'
import { miniSearch } from '../../store/search'
import { StoreSelection } from './StoreSelection'
import { SearchBar } from '../../components/SearchBar'
import { createStoredStore } from '../../store/createStoredStore'
import { storeSelection } from '../../store/default'

export const SearchFilter = (props: any) => {
  const [local, _] = splitProps(props, ['setSearchResults'])

  const searchParams = new URLSearchParams(window.location.search) as any
  const [searchQuery, setSearchQuery] = createSignal<string>(searchParams.get('query'))
  const [suggestions, setSuggestions] = createSignal<any[]>([])
  
  const [stores, setStores] = createStoredStore('storeSelection', storeSelection)
  const activeStores = () => Object.keys(stores).filter(key => {return stores[key]})
  
  let initStores = storeSelection as any
  Object.keys(storeSelection).forEach(val => initStores[val] = false)
  for (const activeStore in activeStores) stores[activeStore] = true

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

  const searchBarChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)
  }

  const searchBarInput = (searchQuery: string) => {
    const rawSuggestions = miniSearch().autoSuggest(searchQuery, {
      filter: searchFilter,
    })
    const suggestions = rawSuggestions.map((sug: any) => sug.suggestion)
    setSuggestions(suggestions.slice(0, 5)) // Top 5 suggestions
  }

  onMount(() => {
    searchResults()
  })

  createEffect(() => {
    searchResults()
    local.setSearchResults(searchResults())
    const searchParams = new URLSearchParams('')
    searchParams.set('query', searchQuery())
    searchParams.set('stores', activeStores().join(' '))
    history.pushState(null, '', window.location.pathname + '?' + searchParams.toString())
  })

  return (
    <section class="relative z-10 flex flex-col p-2 gap-2 shadow-md">
      <StoreSelection stores={stores} setStores={setStores} />
      <SearchBar
        initialValue={searchQuery()}
        onChange={searchBarChange}
        onInput={searchBarInput}
        suggestions={suggestions()}
        placeholder="Search product..."
        id="search"
      />
    </section>
  )
}
