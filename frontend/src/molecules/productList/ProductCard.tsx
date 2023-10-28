import { Show, createSignal } from 'solid-js'
import { ProductCardInfo } from './ProductCardInfo'
import { ProductCalculator } from './ProductCalculator'

export const ProductCard = (props: any) => {
  const { name, img } = props

  const [isActive, setIsActive] = createSignal(false)

  return (
    <>
      <div class="h-2 shrink-0 snap-start"></div>
      <div class={`card max-w-96 shrink-0 flex justify-between ${isActive() ? 'h-48' : 'h-28'}`}>
        <button
          onclick={() => setIsActive(!isActive())}
          class={`h-full aspect-square shrink-0 rounded-lg bg-white border-r ${
            isActive() ? 'p-6' : 'p-3'
          }`}
        >
          <img
            class="object-cover select-none h-full aspect-square"
            src={img}
            loading="lazy"
            alt={name}
            aria-label={name}
          />
        </button>
        <div class="p-3 h-full flex-grow flex flex-col gap-2">
          <Show when={isActive()} fallback={<ProductCardInfo {...props} />}>
            <ProductCalculator {...props} amount={2} />
          </Show>
        </div>
      </div>
    </>
  )
}
