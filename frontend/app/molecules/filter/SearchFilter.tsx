import { createEffect, createMemo, createSignal, splitProps } from 'solid-js'
import { miniSearch } from '../../store/search'
import { StoreSelection } from './StoreSelection'
import { SearchBar } from '../../components/SearchBar'
import { SortFilter } from './SortFilter'
import { ParamStore, param } from './ParamStore'

export const SearchFilter = (props: any) => {
  const [local, _] = splitProps(props, ['setSearchResults'])
  const [showAll, setShowAll] = createSignal<boolean>(true)
  const [sortedResults, setSortedResults] = createSignal<any[]>([])

  createEffect(() => local.setSearchResults(sortedResults()))

  const searchFilter = (product: any) => {
    for (let storeName of param.stores) {
      if (storeName == 'Iga') storeName = 'igashop' as any
      const storeDomain = `${storeName}.com.au`.toLowerCase()
      if (product.url.match(storeDomain)) return true
    }
    return false
  }

  const filteredResults = createMemo(() =>
    miniSearch().search(param.query, {
      filter: searchFilter,
    }),
  )

  return (
    <section
      onMouseLeave={() => setShowAll(false)}
      onMouseDown={() => setShowAll(true)}
      class="relative z-10 flex flex-col p-2 gap-2 shadow-md border-b-[1px] border-neutral-dark rounded-b-xl"
    >
      <SearchBar placeholder="Search product..." id="search" />
      <StoreSelection class={showAll() ? '' : 'hidden'} />
      <SortFilter
        class={showAll() ? '' : 'hidden'}
        filteredResults={filteredResults}
        setSortedResults={setSortedResults}
      />
      <ParamStore />
    </section>
  )
}
