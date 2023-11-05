import { createEffect, createSignal, splitProps } from 'solid-js'
import { miniSearch } from '../../store/search'
import { StoreSelection } from './StoreSelection'
import { SearchBar } from '../../components/SearchBar'
import { setSearchParam } from '../../store/searchParam'

export const SearchFilter = (props: any) => {
  const [local, _] = splitProps(props, ['setSearchResults'])
  const [suggestions, setSuggestions] = createSignal<any[]>([])
  const [activeStores, setActiveStores] = createSignal<string[]>([])
  const [searchQuery, setSearchQuery] = createSignal<string>('')

  // Initialise search query from search params
  const searchParams = new URLSearchParams(window.location.search) as any
  if (searchParams.get('query')) setSearchQuery(searchParams.get('query'))

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
    local.setSearchResults(searchResults())
    setSearchParam('query', searchQuery())
  })

  return (
    <section class="relative z-10 flex flex-col p-2 gap-2 shadow-md">
      <StoreSelection setActiveStores={setActiveStores} />
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
