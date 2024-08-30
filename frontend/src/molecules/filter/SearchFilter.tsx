import { createSignal } from 'solid-js'
import { ParamStore } from './ParamStore'
import { SearchBar } from './SearchBar'
import { SortFilter } from './SortFilter'
import { StoreSelection } from './StoreSelection'

export const SearchFilter = () => {
  const [showAll, setShowAll] = createSignal<boolean>(true)

  return (
    <section
      onMouseLeave={() => setShowAll(false)}
      onMouseDown={() => setShowAll(true)}
      class="relative z-10 flex flex-col p-2 gap-2 shadow-md border-b-[1px] border-neutral-dark rounded-b-xl"
    >
      <SearchBar placeholder="Search product..." id="search" />
      <StoreSelection class={showAll() ? '' : 'hidden'} />
      <SortFilter class={showAll() ? '' : 'hidden'} />
      <ParamStore />
    </section>
  )
}
