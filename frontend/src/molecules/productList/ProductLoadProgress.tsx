import { createEffect, createSignal, splitProps } from 'solid-js'
import { miniSearchLoaded } from '../../store/search'

export const ProductLoadProgress = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  const [hidden, setHidden] = createSignal(false)
  const progressPercentage = () => miniSearchLoaded() * 100

  createEffect(() => {
    console.log(progressPercentage())
    if (miniSearchLoaded() == 1) {
      setTimeout(() => setHidden(true), 1000)
    }
  })

  return (
    <div
      class={`card flex flex-col p-4 gap-2 overflow-hidden ${local.class} ${
        hidden() ? 'hidden' : ''
      }`}
    >
      <h3 class="text-base w-full font-bold">Loading products...</h3>
      <span
        class="block h-full w-full rounded-full bg-light overflow-hidden"
        role="progressbar"
        aria-labelledby="Product loading progress"
        aria-valuenow={progressPercentage()}
      >
        <span
          class="block h-2 animate-pulse transition-all duration-1000 rounded-full bg-dark"
          style={`width: ${progressPercentage()}%`}
        ></span>
      </span>
    </div>
  )
}
