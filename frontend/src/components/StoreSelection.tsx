import { createStore } from "solid-js/store"
import { AldiLogo } from "../svg/AldiLogo"
import { ColesLogo } from "../svg/ColesLogo"
import { WoolworthsLogo } from "../svg/WoolworthsLogo"
import { ActionButton } from "./ActionButton"
import { For, Show } from "solid-js"
import { CheckCircleIcon } from "../svg/CheckCircleIcon"
import { PlusCircleIcon } from "../svg/PlusCircleIcon"

export const StoreSelection = (props: any) => {
  const [stores, setStores] = createStore([
    {
      name: "Aldi",
      logo: <AldiLogo class="h-5" />,
      active: true,
    },
    {
      name: "Coles",
      logo: <ColesLogo class="h-5" />,
      active: true,
    },
    {
      name: "Woolworths",
      logo: <WoolworthsLogo class="h-5" />,
      active: true,
    },
  ])

  return (
    <>
      <div class="flex gap-2 overflow-scroll no-scrollbar">
        <For each={stores}>
          {(store, i) => (
            <ActionButton
              onClick={() => setStores(i(), "active", !store.active)}
              class={`card relative gap-2 flex flex-col flex-grow flex-shrink-0 items-center w-40 p-4 ${
                store.active ? "fill-light bg-dark" : "fill-shade"
              }`}
            >
              {store.logo}
              <p
                class={`font-bold text-xs ${
                  store.active ? "text-light" : "text-shade"
                }`}
              >
                {store.name}
              </p>
              <Show
                when={store.active}
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
