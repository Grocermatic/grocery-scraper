import { For, Show, createSignal, splitProps } from "solid-js"
import { SearchIcon } from "../svg/SearchIcon"

export const SearchBar = (props: any) => {
  const [local, others] = splitProps(props, [
    "label",
    "id",
    "placeholder",
    "onChange",
    "onInput",
    "suggestions",
  ])
  const [searchQuery, setSearchQuery] = createSignal("")

  return (
    <>
      <label
        for={local.id}
        class="card relative px-4 p-2 !border-dark ring-2 ring-inset ring-dark"
      >
        <input
          onChange={() => {
            local.onChange(searchQuery())
            local.onInput("")
          }}
          onInput={(e) => {
            setSearchQuery(e.target.value)
            local.onInput(e.target.value)
          }}
          type="text"
          value={searchQuery()}
          spellcheck={true}
          autocorrect="on"
          id={local.id}
          list={local.id}
          placeholder={local.placeholder}
          class="w-full focus:border-transparent focus:outline-none focus:ring-0"
        />
        <button
          onClick={() => local.onChange(searchQuery())}
          type="button"
          class="absolute inset-y-0 end-0 grid w-10 place-content-center"
        >
          <SearchIcon class="h-5" />
        </button>
      </label>
      <Show when={local.suggestions.length > 0}>
        <datalist
          id={local.id}
          class="card flex flex-col w-full bg-white !border-dark ring-2 ring-inset ring-dark"
        >
          <For each={local.suggestions}>
            {(suggestion, id) => (
              <option
                onClick={() => {
                  setSearchQuery(suggestion)
                  local.onChange(suggestion)
                  local.onInput("")
                }}
                value={suggestion}
                class="flex px-4 py-2 hover:font-bold"
              >
                {suggestion}
              </option>
            )}
          </For>
        </datalist>
      </Show>
      <div class="flex-shrink-0 h-full">
        <input
          class="card relative px-4 p-2 !border-dark ring-2 ring-inset ring-dark"
          list="browsers"
          onChange={() => {
            console.log("search" + searchQuery())
            local.onChange(searchQuery())
            local.onInput("")
          }}
        />
        <datalist class="block" id="browsers">
          <For each={["apple", "bread", "bannana", "cake"]}>
            {(suggestion, id) => (
              <button
                onClick={() => {
                  console.log("sug" + suggestion)
                  setSearchQuery(suggestion)
                  local.onChange(suggestion)
                  local.onInput("")
                }}
                class="flex px-4 py-2 hover:font-bold"
                value={suggestion}
              >
                {suggestion}
              </button>
            )}
          </For>
        </datalist>
      </div>
    </>
  )
}
