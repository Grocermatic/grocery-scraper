import { limitStringLength } from '../../logic/limitStringLength'

export const ProductCardInfo = (props: any) => {
  const { name, url, price, quantity, unitPrice } = props
  const productName = limitStringLength(name, 45)
  return (
    <>
      <a href={url} target="blank">
        <h2 class="underline">{productName}</h2>
      </a>
      <div class="flex-grow"></div>
      <div class="flex justify-between gap-4">
        <p class="font-bold">${price}</p>
        <p class="font-bold">{quantity}kg</p>
        <p class="font-bold">{unitPrice} $/kg</p>
      </div>
    </>
  )
}
