import { createEffect, createMemo, createSignal, splitProps } from 'solid-js'
import { miniSearch } from '../../store/search'
import { StoreSelection } from './StoreSelection'
import { SearchBar } from '../../components/SearchBar'
import { useSearchParams } from '@solidjs/router'
import { SortFilter } from './SortFilter'

export const SearchFilter = (props: any) => {
  const [local, _] = splitProps(props, ['setSearchResults'])
  const [showAll, setShowAll] = createSignal<boolean>(true)
  const [suggestions, setSuggestions] = createSignal<any[]>([])
  const [activeStores, setActiveStores] = createSignal<string[]>([])
  const [searchQuery, _setSearchQuery] = createSignal<string>('')
  const [sortedResults, setSortedResults] = createSignal<any[]>([])

  const [searchParams, setSearchParams] = useSearchParams()
  const setSearchQuery = (query: string) => {
    if (!query) return
    _setSearchQuery(query)
    setSearchParams({ query: query })
  }
  createEffect(() => setSearchQuery(searchParams.query))
  createEffect(() => local.setSearchResults(sortedResults()))

  const searchFilter = (product: any) => {
    for (const storeName of activeStores()) {
      const storeDomain = `${storeName}.com.au`.toLowerCase()
      if (product.url.match(storeDomain)) return true
    }
    return false
  }

  const filteredResults = createMemo(() =>
    miniSearch().search(searchQuery(), {
      filter: searchFilter,
    }),
  )

  const searchBarInput = (searchQuery: string) => {
    const rawSuggestions = miniSearch().autoSuggest(searchQuery, {
      filter: searchFilter,
    })
    const suggestions = rawSuggestions.map((sug: any) => sug.suggestion)
    setSuggestions(suggestions.slice(0, 5)) // Top 5 suggestions
  }

  return (
    <section
      onMouseLeave={() => setShowAll(false)}
      onMouseDown={() => setShowAll(true)}
      class="relative z-10 flex flex-col p-2 gap-2 shadow-md border-b-[1px] border-dark rounded-b-xl"
    >
      <SearchBar
        searchQuery={searchQuery()}
        onChange={setSearchQuery}
        onInput={searchBarInput}
        suggestions={suggestions()}
        placeholder="Search product..."
        id="search"
      />
      <StoreSelection class={showAll() ? '' : 'hidden'} setActiveStores={setActiveStores} />
      <SortFilter
        class={showAll() ? '' : 'hidden'}
        filteredResults={filteredResults}
        setSortedResults={setSortedResults}
      />
    </section>
  )
}
