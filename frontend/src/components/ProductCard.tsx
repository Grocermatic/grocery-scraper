import { Show, createSignal } from 'solid-js'
import { ProductCardInfo } from './ProductCardInfo'
import { ProductCalculator } from './ProductCalculator'

export const ProductCard = (props: any) => {
  const { name, img } = props

  const [isActive, setIsActive] = createSignal(false)

  return (
    <>
      <div class="h-2 shrink-0 snap-start"></div>
      <div
        class={`card transition-all duration-75 ease-out max-w-96 shrink-0 flex justify-between ${
          isActive() ? 'h-48' : 'h-28'
        }`}
      >
        <div
          class={`h-full shrink-0 rounded-lg bg-white border-r ${
            isActive() ? 'p-6' : 'p-3'
          }`}
        >
          <img
            class="object-cover h-full aspect-square"
            onclick={() => setIsActive(!isActive())}
            src={img}
            loading="lazy"
            alt={name}
            aria-label={`Image of: ${name}`}
          />
        </div>
        <div class="p-3 h-full flex-grow flex flex-col gap-2">
          <Show when={isActive()} fallback={<ProductCardInfo {...props} />}>
            <ProductCalculator {...props} amount={2} />
          </Show>
        </div>
      </div>
    </>
  )
}
