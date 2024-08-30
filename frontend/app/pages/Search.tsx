import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { ChartLine } from '../components/ChartLine'
import { ProductLoadProgress } from '../components/ProductLoadProgress'
import { lowestPriceGraph } from '../logic/chart/lowestPriceGraph'
import { param } from '../molecules/filter/ParamStore'
import { SearchFilter } from '../molecules/filter/SearchFilter'
import { ProductCard } from '../molecules/productList/ProductCard'
import { productSearchEngine } from '../store/search'

export const Search = () => {
  const searchResults = createMemo(() => productSearchEngine.search(param))
  const searchLength = createMemo(() => searchResults().length)

  let productListref: HTMLDivElement | undefined
  createEffect(() => {
    searchResults()
    productListref?.scrollTo(0, 0)
  })

  const [visibleLength, setVisibleLength] = createSignal<number>(12)
  const visibleResults = createMemo(() =>
    searchResults().slice(0, visibleLength()),
  )

  let intersectionRef: HTMLDivElement | undefined
  onMount(() => {
    const observer = new IntersectionObserver(
      () => {
        setVisibleLength(visibleLength() + 12)
        if (searchLength() <= visibleLength() && intersectionRef)
          setVisibleLength(searchLength())
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    )
    if (intersectionRef) observer.observe(intersectionRef)
    onCleanup(() => {
      if (intersectionRef) observer.unobserve(intersectionRef)
    })
  })

  return (
    <div class="h-full flex flex-col">
      <SearchFilter />
      <section
        ref={productListref!}
        class="flex animate-none h-full flex-col p-2 gap-2 overflow-y-auto no-scrollbar"
      >
        <ProductLoadProgress class="shrink-0" />
        <Show when={searchLength() > 0}>
          <div class="card pt-4">
            <p class="px-4 text-center font-bold">Lowest price history</p>
            <ChartLine data={lowestPriceGraph(searchResults())} />
          </div>
        </Show>
        <For each={visibleResults()}>
          {(result, _) => <ProductCard {...result} />}
        </For>
        <div
          ref={intersectionRef!}
          class="card flex-shrink-0 grid place-content-center w-full h-full"
        >
          <h1 class="text-center font-bold text-2xl">No more results</h1>
        </div>
      </section>
    </div>
  )
}
