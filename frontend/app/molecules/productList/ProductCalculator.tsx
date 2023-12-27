import { Show, createSignal, splitProps } from 'solid-js'
import { MinusIcon } from '../../svg/MinusIcon'
import { PlusIcon } from '../../svg/PlusIcon'
import { ActionButton } from '../../components/ActionButton'
import { LabelledInput } from './LabelledInput'
import { roundDecimal } from '../../../../common/roundDecimal'

export const ProductCalculator = (props: any) => {
  const [local, _] = splitProps(props, ['name', 'url', 'price', 'quantity', 'amount'])
  const [quantity, setQuantity] = createSignal(local.amount)

  const addQuantity = () => {
    setQuantity(quantity() + 1)
  }

  const subtractQuantity = () => {
    if (quantity() > 0) setQuantity(quantity() - 1)
  }

  const validSetQuantity = (newQuantity: number) => {
    newQuantity = Math.floor(newQuantity)
    setQuantity(null)
    if (newQuantity > 0) setQuantity(newQuantity)
    else setQuantity(0)
  }

  const inputQuantity = (e: any) => {
    validSetQuantity(e.target.value)
  }

  const inputPrice = (e: any) => {
    validSetQuantity(e.target.value / local.price)
  }

  const inputWeight = (e: any) => {
    validSetQuantity(e.target.value / local.quantity)
  }

  return (
    <>
      <div class="flex flex-grow justify-between gap-2">
        <LabelledInput
          type="number"
          id={local.url + ' price input'}
          label="Price"
          value={roundDecimal(quantity() * local.price, 2)}
          onChange={inputPrice}
        />
        <LabelledInput
          type="number"
          id={local.url + ' weight input'}
          label="Kg"
          value={roundDecimal(quantity() * local.quantity, 3)}
          onChange={inputWeight}
        />
      </div>
      <div class="flex flex-grow justify-between gap-2">
        <LabelledInput
          type="number"
          id={local.url + ' quantity input'}
          label="Quantity"
          value={quantity()}
          onChange={inputQuantity}
        />
      </div>
      <div class="flex flex-grow gap-2">
        <Show when={quantity() > 0}>
          <ActionButton
            aria-label={`Remove 1 item to list, currently ${quantity()} items in list: ${
              local.name
            }`}
            onClick={subtractQuantity}
            class="flex-grow p-2 bg-neutral-dark active:border-light active:contrast-75"
          >
            <MinusIcon class="fill-neutral-light m-auto h-4" />
          </ActionButton>
        </Show>
        <ActionButton
          aria-label={`Remove 1 item to list, currently ${quantity()} items in list: ${local.name}`}
          onClick={addQuantity}
          class="flex-grow p-2 bg-neutral-dark active:border-light active:contrast-75"
        >
          <PlusIcon class="fill-neutral-light m-auto h-4" />
        </ActionButton>
      </div>
    </>
  )
}
