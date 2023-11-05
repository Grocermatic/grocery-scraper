import { For, createEffect, createSignal } from 'solid-js'
import { ProductCard } from './molecules/productList/ProductCard'
import { SearchFilter } from './molecules/filter/SearchFilter'

export const Search = () => {

  const [searchResults, setSearchResults] = createSignal<any[]>([])

  let productListref: HTMLDivElement | undefined
  createEffect(() => {
    searchResults()
    productListref?.scrollTo(0, 0)
  })

  return (
    <div class="h-full flex flex-col">
      <SearchFilter setSearchResults={setSearchResults}/>
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