import { For } from 'solid-js'
import productInfos from '../../webscrape/data/production/product0.json'
import { ProductCard } from './components/ProductCard'

function App() {
  return (
    <>
      <section class="flex animate-none flex-col p-2 overflow-scroll snap-mandatory snap-both h-screen">
        <For each={productInfos.slice(0, 16)}>
          {(productInfo, i) => <ProductCard {...productInfo} />}
        </For>
      </section>
    </>
  )
}

export default App
