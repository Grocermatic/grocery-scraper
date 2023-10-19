import { For } from 'solid-js'
import productInfos from '../../webscrape/data/production/product0.json'
import { ProductCard } from './components/ProductCard'

function App() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col" aria-label="Product image"></th>
            <th scope="col" aria-label="Product text information"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <For each={productInfos.slice(0, 16)}>
            {(productInfo, i) => <ProductCard productInfo={productInfo} />}
          </For>
        </tbody>
      </table>
    </>
  )
}

export default App
