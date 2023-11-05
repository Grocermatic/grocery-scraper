import { createEffect, createSignal, splitProps } from 'solid-js'
import { miniSearch } from '../../store/search'
import { StoreSelection } from './StoreSelection'
import { SearchBar } from '../../components/SearchBar'

export const SearchFilter = (props: any) => {
  const [local, _] = splitProps(props, ['setSearchResults'])

  const [suggestions, setSuggestions] = createSignal<any[]>([])
  const [searchQuery, setSearchQuery] = createSignal('')
  const [stores, setStores] = createSignal<any>([])

  const searchFilter = (product: any) => {
    for (const store of stores()) {
      const storeDomain = `${store.name}.com.au`.toLowerCase()
      if (store.active && product.url.match(storeDomain)) return true
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
    const suggestions = rawSuggestions.map((sug: any) => sug.suggestion)
    setSuggestions(suggestions.slice(0, 5)) // Top 5 suggestions
  }

  createEffect(() => {
    searchResults()
    local.setSearchResults(searchResults())
  })

  return (
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
  )
}
