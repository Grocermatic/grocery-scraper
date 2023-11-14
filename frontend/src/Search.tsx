import { For, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import { ProductCard } from './molecules/productList/ProductCard'
import { SearchFilter } from './molecules/filter/SearchFilter'
import { AdCard } from './components/AdCard'

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

export const Search = () => {
  const [searchResults, setSearchResults] = createSignal<any[]>([])
  const searchLength = createMemo(() => searchResults().length)

  let productListref: HTMLDivElement | undefined
  createEffect(() => {
    searchResults()
    productListref?.scrollTo(0, 0)
  })

  const [visibleLength, setVisibleLength] = createSignal<number>(10)
  const visibleResults = createMemo(() => searchResults().slice(0, visibleLength()))
  let intersectionRef: HTMLDivElement | undefined
  onMount(() => {
    let options = {
      rootMargin: "0px",
      threshold: makeArr(0, 1, 100),
    }
    const observer = new IntersectionObserver((e) => {
      setVisibleLength(visibleLength() + 1)
      if (searchLength() == visibleLength()) observer.unobserve(intersectionRef)
    }, options)
    if (intersectionRef) observer.observe(intersectionRef)

    onCleanup(() => {
      if (intersectionRef) observer.unobserve(intersectionRef)
    })
  })

  return (
    <div class="h-full flex flex-col">
      <SearchFilter setSearchResults={setSearchResults} />
      <section
        ref={productListref}
        class="flex animate-none h-full flex-col p-2 overflow-y-auto no-scrollbar"
      >
        <AdCard class="shrink-0" />

        <For each={visibleResults()}>{(productInfo, _) => <ProductCard {...productInfo} />}</For>
        <div class="h-2 shrink-0 snap-start"></div>
        
        <div ref={intersectionRef} class="card flex-shrink-0 grid place-content-center w-full h-full">
          <h1 class="text-center font-bold text-2xl">No more results</h1>
        </div>

      </section>
    </div>
  )
}
