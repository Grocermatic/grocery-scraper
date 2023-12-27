import { ActionButton } from '../../components/ActionButton'
import { For, Show, createEffect, createSignal, splitProps } from 'solid-js'
import { CheckCircleIcon } from '../../svg/CheckCircleIcon'
import { PlusCircleIcon } from '../../svg/PlusCircleIcon'
import { defaultStoreSelection } from '../../store/default'
import { keys } from '../../../../common/keys'
import { useSearchParams } from '@solidjs/router'
import { cloneJson } from '../../logic/cloneJson'

const listTrueKeys = (object: any) => Object.keys(object).filter((key) => object[key])
const activeStoresToParams = (activeStores: string[]) => {
  if (activeStores.length == keys(defaultStoreSelection).length) return ''
  return activeStores.join(' ')
}
const paramsToActiveStores = (params: string) => {
  const initStores = cloneJson(defaultStoreSelection) as any
  keys(initStores).forEach((val) => (initStores[val] = false))
  for (const activeStore of params.split(' ')) {
    if (initStores[activeStore] == false) initStores[activeStore] = true
  }
  return initStores
}

export const StoreSelection = (props: any) => {
  const [local, _] = splitProps(props, ['setActiveStores', 'class'])
  const [stores, setStores] = createSignal(cloneJson(defaultStoreSelection))
  const setActiveStores = (stores: any) => {
    setStores(stores)
    local.setActiveStores(listTrueKeys(stores))
  }
  const [searchParams, setSearchParams] = useSearchParams()

  createEffect(() => setStoreFromParams())
  const setStoreFromParams = () => {
    const paramStores = searchParams.stores
    if (!paramStores) setActiveStores(defaultStoreSelection)
    else setActiveStores(paramsToActiveStores(paramStores))
  }

  const onClick = (storeName: any) => {
    const newStores = structuredClone(stores())
    newStores[storeName] = !newStores[storeName]
    const activeStores = listTrueKeys(newStores)
    if (activeStores.length == 0) return
    setSearchParams({ stores: activeStoresToParams(activeStores) })
  }

  return (
    <>
      <div class={`flex gap-2 overflow-x-auto no-scrollbar ${local.class}`}>
        <For each={keys(stores())}>
          {(storeName: any, _) => (
            <ActionButton
              onClick={() => onClick(storeName)}
              class={`card relative pl-3 pr-6 py-2 gap-4 flex flex-grow flex-shrink-0 items-center ${
                stores()[storeName] ? 'fill-neutral-light bg-neutral-dark' : 'fill-shade bg-white'
              }`}
            >
              <Show when={stores()[storeName]} fallback={<PlusCircleIcon class="h-4" />}>
                <CheckCircleIcon class="h-4" />
              </Show>
              <p class={`font-bold ${stores()[storeName] ? 'text-neutral-light' : 'text-shade'}`}>
                {storeName.replace('Woolworths', 'Woolies')}
              </p>
            </ActionButton>
          )}
        </For>
      </div>
    </>
  )
}
