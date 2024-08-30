import { Show, createEffect, createSignal, splitProps } from 'solid-js'
import { miniSearchLoaded } from '../store/search'
import { FaviconLogo } from '../svg/FaviconLogo'

export const ProductLoadProgress = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  const [hidden, setHidden] = createSignal(false)
  const progressPercentage = () => miniSearchLoaded() * 100

  createEffect(() => {
    if (miniSearchLoaded() === 1) {
      setTimeout(() => setHidden(true), 500)
    }
  })

  return (
    <Show
      when={hidden()}
      fallback={
        <div class={`card aspect-[320/100] overflow-hidden ${local.class}`}>
          <span class="flex flex-col h-full p-4 gap-2 justify-center m-auto">
            <h3 class="w-full font-bold">Loading products...</h3>
            <span
              class="block w-full rounded-full bg-neutral-light overflow-hidden"
              aria-labelledby="Product loading progress"
              aria-valuenow={progressPercentage()}
            >
              <span
                class="block h-2 animate-pulse transition-all duration-300 rounded-full bg-neutral-dark"
                style={`width: ${progressPercentage()}%`}
              />
            </span>
          </span>
        </div>
      }
    >
      {/* <div class={`card aspect-[320/100] overflow-hidden ${local.class}`}>
        <ins
          class="h-full w-full block text-center"
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-6950110112582359"
          data-ad-slot="4758549840"
        >
          <span class="flex h-full justify-center m-auto">
            <FaviconLogo class="h-20 px-1 pr-2 my-auto aspect-square fill-neutral-light" />
            <div class="flex pr-2">
              <h1 class="my-auto font-bold text-4xl  text-neutral-light">
                Grocermatic
              </h1>
            </div>
          </span>
        </ins>
      </div> */}
    </Show>
  )
}
