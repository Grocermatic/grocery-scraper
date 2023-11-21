import { Show, splitProps } from 'solid-js'
import { limitStringLength } from '../../logic/limitStringLength'
import { roundDecimal } from '../../../../common/roundDecimal'

export const ProductCardInfo = (props: any) => {
  const [local, _] = splitProps(props, [
    'name',
    'url',
    'quantity',
    'isActive',
    'history'
  ])
  const productName = limitStringLength(local.name, 45)
  const price = local.history[0].price
  const unitPrice = roundDecimal(price / local.quantity, 2)
  return (
    <>
      <div class="flex">
        <a href={local.url} target="blank" class="text-blue-700 visited:text-dark">
          <h2 class="underline">{productName}</h2>
        </a>
      </div>
      <div class="flex-grow"></div>
      <div class={`flex justify-between gap-4 ${local.isActive ? 'flex-col' : ''}`}>
        <p class="font-bold">${price}</p>
        <Show when={local.quantity < 1} fallback={<p class="font-bold">{local.quantity}kg</p>}>
          <p class="font-bold">{local.quantity * 1000}g</p>
        </Show>
        <p class="font-bold">{unitPrice} $/kg</p>
      </div>
    </>
  )
}
