import { splitProps } from 'solid-js'
import { FaviconLogo } from '../svg/FaviconLogo'

export const AdCard = (props: any) => {
  const [local, _] = splitProps(props, ['class'])

  return (
    <div class={`card overflow-hidden ${local.class}`}>
      <ins
        class="h-28 w-full block text-center"
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
    </div>
  )
}
