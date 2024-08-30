import { For, Show, createMemo, splitProps } from 'solid-js'
import { keys } from '../../../../common/keys'
import { ActionButton } from '../../components/ActionButton'
import { type ProductSearchStore, productSearch } from '../../store/search'
import { CheckCircleIcon } from '../../svg/CheckCircleIcon'
import { PlusCircleIcon } from '../../svg/PlusCircleIcon'
import { param, setParam } from './ParamStore'

export const StoreSelection = (props: any) => {
  const [local, _] = splitProps(props, ['class'])

  const toggleStore = (store: ProductSearchStore) => {
    const newStores = [...param.stores]
    const storeId = newStores.indexOf(store)
    storeId > -1 ? newStores.splice(storeId, 1) : newStores.push(store)
    if (newStores.length === 0) return // At least 1 selected store
    setParam('stores', newStores)
  }

  // Memoise calculation of selected stores
  const stores = createMemo(() => {
    const storeState: { [key in ProductSearchStore]?: boolean } = {}
    for (const store of productSearch.storesDefault) {
      storeState[store] = param.stores.indexOf(store) > -1
    }
    return storeState
  })

  return (
    <>
      <div class={`flex gap-2 overflow-x-auto no-scrollbar ${local.class}`}>
        <For each={keys(stores())}>
          {(store, _) => (
            <ActionButton
              onClick={() => toggleStore(store)}
              class={`card relative pl-3 pr-6 py-2 gap-4 flex flex-grow flex-shrink-0 items-center ${
                stores()[store]
                  ? 'fill-neutral-light bg-neutral-dark'
                  : 'fill-shade bg-white'
              }`}
            >
              <Show
                when={stores()[store]}
                fallback={<PlusCircleIcon class="h-4" />}
              >
                <CheckCircleIcon class="h-4" />
              </Show>
              <p
                class={`font-bold ${stores()[store] ? 'text-neutral-light' : 'text-shade'}`}
              >
                {store}
              </p>
            </ActionButton>
          )}
        </For>
      </div>
    </>
  )
}
