import { ActionButton } from '../../components/ActionButton'
import { For, Show, createEffect, splitProps } from 'solid-js'
import { CheckCircleIcon } from '../../svg/CheckCircleIcon'
import { PlusCircleIcon } from '../../svg/PlusCircleIcon'
import { StoreLogo } from '../../svg/StoreLogo'
import { createStoredStore } from '../../store/createStoredStore'
import { defaultStoreSelection } from '../../store/default'
import { useSearchParams } from '@solidjs/router'

export const StoreSelection = (props: any) => {
  const [local, _] = splitProps(props, ['setActiveStores'])
  const [stores, setStores] = createStoredStore('storeSelection', defaultStoreSelection)

  // Initialise stores from search params to enable url search
  const [searchParams, setSearchParams] = useSearchParams()
  if (!searchParams.stores) setStores(defaultStoreSelection)
  else {
    let initStores = defaultStoreSelection as any
    Object.keys(initStores).forEach((val) => (initStores[val] = false))
    for (const activeStore of searchParams.stores.split(' ')) {
      if (initStores[activeStore] == false) initStores[activeStore] = true
    }
    setStores(initStores)
  }

  // Expose array of active stores to parent for filtering
  const activeStores = () =>
    Object.keys(stores).filter((key) => {
      return stores[key]
    })
  local.setActiveStores(activeStores())

  const allStoresSelected = () => activeStores().length == Object.keys(stores).length
  createEffect(() =>
    setSearchParams({ stores: allStoresSelected() ? '' : activeStores().join(' ') }),
  )

  const onClick = (storeName: string) => {
    // Require at least one store to be selected
    if (activeStores().length == 1 && activeStores()[0] == storeName) return
    const tempStore = JSON.parse(JSON.stringify(stores))
    tempStore[storeName] = !stores[storeName]
    setStores(tempStore)
    local.setActiveStores(activeStores())
  }

  return (
    <>
      <div class="flex gap-2 overflow-x-auto no-scrollbar">
        <For each={Object.keys(stores)}>
          {(storeName, _) => (
            <ActionButton
              onClick={() => onClick(storeName)}
              class={`card relative gap-2 flex flex-col flex-grow flex-shrink-0 items-center w-40 p-4 ${
                stores[storeName] ? 'fill-light bg-dark' : 'fill-shade'
              }`}
            >
              <StoreLogo storeName={storeName} class="h-5" />
              <p class={`font-bold text-xs ${stores[storeName] ? 'text-light' : 'text-shade'}`}>
                {storeName}
              </p>
              <Show
                when={stores[storeName]}
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
