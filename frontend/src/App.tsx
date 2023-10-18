import { createSignal } from 'solid-js'
import productInfos from '../../webscrape/data/production/product0.json'
import { ProductCard } from './ProductCard'



function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
      <ProductCard productInfo={productInfos[0]}/>
    </>
  )
}

export default App
