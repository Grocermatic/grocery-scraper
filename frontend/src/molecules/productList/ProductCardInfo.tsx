import { Show, splitProps } from 'solid-js'
import { limitStringLength } from '../../logic/limitStringLength'

export const ProductCardInfo = (props: any) => {
  const [local, _] = splitProps(props, [
    'name',
    'url',
    'price',
    'quantity',
    'unitPrice',
    'isActive',
  ])
  const productName = limitStringLength(local.name, 45)
  return (
    <>
      <div class="flex">
        <a href={local.url} target="blank">
          <h2 class="underline text-blue-700">{productName}</h2>
        </a>
      </div>
      <div class="flex-grow"></div>
      <div class={`flex justify-between gap-4 ${local.isActive ? 'flex-col' : ''}`}>
        <p class="font-bold">${local.price}</p>
        <Show when={local.quantity < 1} fallback={<p class="font-bold">{local.quantity}kg</p>}>
          <p class="font-bold">{local.quantity * 1000}g</p>
        </Show>
        <p class="font-bold">{local.unitPrice} $/kg</p>
      </div>
    </>
  )
}
