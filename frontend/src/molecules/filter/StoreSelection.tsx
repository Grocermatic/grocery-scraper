import { ActionButton } from '../../components/ActionButton'
import { For, Show, splitProps } from 'solid-js'
import { CheckCircleIcon } from '../../svg/CheckCircleIcon'
import { PlusCircleIcon } from '../../svg/PlusCircleIcon'
import { StoreLogo } from '../../svg/StoreLogo'

export const StoreSelection = (props: any) => {
  const [local, _] = splitProps(props, ['stores', 'setStores'])

  const storeOnClick = (storeName: string) => {
    let tempStore = JSON.parse(JSON.stringify(local.stores))
    tempStore[storeName] = !tempStore[storeName]
    local.setStores(tempStore)
  }
  console.log()

  return (
    <>
      <div class="flex gap-2 overflow-x-auto no-scrollbar">
        <For each={Object.keys(local.stores)}>
          {(storeName, _) => (
            <ActionButton
              onClick={() => storeOnClick(storeName)}
              class={`card relative gap-2 flex flex-col flex-grow flex-shrink-0 items-center w-40 p-4 ${
                local.stores[storeName] ? 'fill-light bg-dark' : 'fill-shade'
              }`}
            >
              <StoreLogo storeName={storeName} class="h-5" />
              <p class={`font-bold text-xs ${local.stores[storeName] ? 'text-light' : 'text-shade'}`}>
                {storeName}
              </p>
              <Show
                when={local.stores[storeName]}
                fallback={<PlusCircleIcon class="absolute h-4 top-3 left-3" />}
              >
                <CheckCircleIcon class="absolute h-4 top-3 left-3" />
              </Show>
            </ActionButton>
          )}
        </For>
      </div>
    </>
  )
}
