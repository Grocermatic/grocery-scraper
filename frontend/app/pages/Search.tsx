import type { Coordinates, ProductPriceDay } from '../../../common/interface'
import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import { ProductCard } from '../molecules/productList/ProductCard'
import { SearchFilter } from '../molecules/filter/SearchFilter'
import { ProductLoadProgress } from '../components/ProductLoadProgress'
import { ChartLine } from '../components/ChartLine'
import { productSearchEngine } from '../store/search'
import { roundDecimal } from '../../../common/roundDecimal'
import { transpose } from '../logic/chart/transpose'
import { mergeStepChart } from '../logic/chart/mergeStepChart'
import { daySinceEpoch } from '../../../common/daysSinceEpoch'
import { param } from '../molecules/filter/ParamStore'

function makeArr(startValue: number, stopValue: number, step: number) {
  let arr = []
  for (let currentValue = startValue; currentValue < stopValue; currentValue += step) {
    arr.push(currentValue)
  }
  return arr
}

export const Search = () => {
  const searchResults = createMemo(() => productSearchEngine.search(param))
  const searchLength = createMemo(() => searchResults().length)

  let productListref: HTMLDivElement | undefined
  createEffect(() => {
    searchResults()
    productListref?.scrollTo(0, 0)
  })

  const [visibleLength, setVisibleLength] = createSignal<number>(0)
  const visibleResults = createMemo(() => searchResults().slice(0, visibleLength()))
  let intersectionRef: HTMLDivElement | undefined
  onMount(() => {
    let options = {
      threshold: makeArr(0, 1, 0.01),
    }
    const observer = new IntersectionObserver(() => {
      setVisibleLength(visibleLength() + 1)
      if (searchLength() == visibleLength() && intersectionRef) observer.unobserve(intersectionRef)
    }, options)
    if (intersectionRef) observer.observe(intersectionRef)

    onCleanup(() => {
      if (intersectionRef) observer.unobserve(intersectionRef)
    })
  })

  const lowestPriceGraph = () => {
    const priceGraphs: Coordinates[][] = []
    searchResults().map((product, _) => {
      const data: Coordinates[] = product.history.map((p: ProductPriceDay) => [
        p.daySinceEpoch,
        roundDecimal(p.price / product.quantity, 2),
      ])
      return priceGraphs.push(data)
    })
    return transpose(mergeStepChart(priceGraphs, daySinceEpoch))
  }

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
            <ChartLine data={lowestPriceGraph()} />
          </div>
        </Show>
        <For each={visibleResults()}>{(result, _) => <ProductCard {...result} />}</For>

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
