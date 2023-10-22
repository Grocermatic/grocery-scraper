import { Show, createSignal } from "solid-js"
import { limitStringLength } from "../logic/limitStringLength"
import { ActionButton } from "./ActionButton"
import { MinusIcon } from "../svg/MinusIcon"
import { PlusIcon } from "../svg/PlusIcon"

export const ProductCard = (props: any) => {
  const { name, url, img, price, quantity, unitPrice } = props
  const productName = limitStringLength(name, 40)

  const [isActive, setIsActive] = createSignal(
    Math.round(Math.random() % 2) ? true : false
  )

  const amount = 2

  return (
    <>
      <div class="h-2 shrink-0 snap-start"></div>
      <div
        onclick={() => setIsActive(!isActive())}
        class={`card ${
          isActive() ? "h-48" : "h-24"
        } max-w-96 shrink-0 flex justify-between`}
      >
        <div
          class={`${
            isActive() ? "p-6" : "p-3"
          } h-full shrink-0 rounded-lg bg-white border-r`}
        >
          <img
            class="object-cover h-full aspect-square"
            src={img}
            loading="lazy"
            alt={name}
            aria-label={`Image of: ${name}`}
          />
        </div>
        <div class="p-3 h-full flex-grow flex flex-col">
          <a href={url} target="blank">
            <h2 class="underline font-semibold">{productName}</h2>
          </a>
          <div class="flex-grow"></div>
          <Show
            when={isActive()}
            fallback={
              <div class="flex justify-between gap-4">
                <p class="">${price}</p>
                <p class="">{quantity} kg</p>
                <p class="">{unitPrice} $/kg</p>
              </div>
            }
          >
            <div class="flex justify-between gap-2">
              <p class="">${price * amount}</p>
              <p class="">{quantity * amount} kg</p>
            </div>
            <div class="flex gap-1">
              <ActionButton class="flex-grow p-2 bg-light">
                <MinusIcon class="fill-dark m-auto"/>
              </ActionButton>
              <ActionButton class="flex-grow p-2 bg-light">
                <PlusIcon class="fill-dark m-auto"/>
              </ActionButton>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
