import { ActionButton } from '../../components/ActionButton'
import { For, Show, createEffect, splitProps } from 'solid-js'
import { CheckCircleIcon } from '../../svg/CheckCircleIcon'
import { PlusCircleIcon } from '../../svg/PlusCircleIcon'
import { createStoredStore } from '../../store/createStoredStore'
import { defaultStoreSelection } from '../../store/default'
import { useSearchParams } from '@solidjs/router'

export const StoreSelection = (props: any) => {
  const [local, _] = splitProps(props, ['setActiveStores', 'class'])
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
      <div class={`flex gap-2 overflow-x-auto no-scrollbar ${local.class}`}>
        <For each={Object.keys(stores)}>
          {(storeName, _) => (
            <ActionButton
              onClick={() => onClick(storeName)}
              class={`card relative pl-3 pr-6 py-2 gap-4 flex flex-grow flex-shrink-0 items-center ${
                stores[storeName] ? 'fill-light bg-dark' : 'fill-shade bg-white'
              }`}
            >
              <Show when={stores[storeName]} fallback={<PlusCircleIcon class="h-4" />}>
                <CheckCircleIcon class="h-4" />
              </Show>
              <p class={`font-bold ${stores[storeName] ? 'text-light' : 'text-shade'}`}>
                {storeName.replace('Woolworths', 'Woolies')}
              </p>
            </ActionButton>
          )}
        </For>
      </div>
    </>
  )
}
