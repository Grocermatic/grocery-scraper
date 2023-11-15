import { Show, createSignal, onMount, splitProps } from 'solid-js'
import { ProductCardInfo } from './ProductCardInfo'
import { ProductCalculator } from './ProductCalculator'
import { safeSha256 } from '../../logic/safeSha256'
import { config } from '../../../../global'
import { imageSupport } from '../../store/imageSupport'

const bufferToUrl = (buffer: ArrayBuffer) => {
  const blob = new Blob([buffer])
  return URL.createObjectURL(blob)
}

export const ProductCard = (props: any) => {
  const [local, _] = splitProps(props, ['name', 'img', 'amount'])
  const [isActive, setIsActive] = createSignal(false)
  const [imgUrl, setImgUrl] = createSignal('blank.svg')
  const originalImage = local.img.replace('/medium/', '/large/')

  const fetchOptimisedImage = async () => {
    if (imageSupport.type == 'jpg') return false
    const imageHash = await safeSha256(originalImage)
    const url = `${config.productBaseUrl}/image/${imageHash}.${imageSupport.type}`
    const res = await fetch(url)
    if (!res.ok) return false
    setImgUrl(bufferToUrl(await res.arrayBuffer()))
    return true
  }

  onMount(async () => {
    if (await fetchOptimisedImage()) return
    setImgUrl(originalImage)
  })

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
            src={imgUrl()}
            loading="lazy"
            alt={local.name}
            aria-label={local.name}
            style="background-image: url('spinner.svg'); background-repeat: no-repeat; background-size: contain;"
            onerror="this.src='favicon-light.svg';this.onerror='';"
          />
        </button>
        <div class="p-3 h-full flex-grow flex flex-col gap-2">
          <Show when={false} fallback={<ProductCardInfo isActive={isActive()} {...props} />}>
            <ProductCalculator {...props} amount={local.amount} />
          </Show>
        </div>
      </div>
    </>
  )
}
