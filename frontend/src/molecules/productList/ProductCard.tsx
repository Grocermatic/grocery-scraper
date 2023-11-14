import { Show, createSignal, onMount, splitProps } from 'solid-js'
import { ProductCardInfo } from './ProductCardInfo'
import { ProductCalculator } from './ProductCalculator'
import { safeSha256 } from '../../../../common/safeSha256'
import { config } from '../../../../global'
import { imageSupport } from '../../store/imageSupport'

export const ProductCard = (props: any) => {
  const [local, _] = splitProps(props, ['name', 'img', 'amount'])
  const [isActive, setIsActive] = createSignal(false)
  const [imgUrl, setImgUrl] = createSignal('spinner.svg')

  onMount(async () => {
    const img = local.img.replace('/medium/', '/large/')
    const imgHash = await safeSha256(img)
    const imgBase = `${config.productBaseUrl}/image/${imgHash}`
    const imgUrls: {
      [key: string]: string
    } = {
      avif: `${imgBase}.avif`,
      webp: `${imgBase}.webp`,
      jpg: img,
    }
    setImgUrl(imgUrls[imageSupport.type])
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
