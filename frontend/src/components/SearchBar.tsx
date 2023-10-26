import {
  For,
  Show,
  createSignal,
  onCleanup,
  onMount,
  splitProps,
} from "solid-js"
import { SearchIcon } from "../svg/SearchIcon"

export const SearchBar = (props: any) => {
  const [local, others] = splitProps(props, [
    "id",
    "placeholder",
    "onChange",
    "onInput",
    "suggestions",
  ])
  const [searchQuery, setSearchQuery] = createSignal("")
  const [suggestions, setSuggestions] = createSignal([])
  const [selectedId, setSelectedId] = createSignal(-1)
  let listRef: HTMLUListElement | undefined

  const search = () => {
    // Allow other events to complete before searching
    setTimeout(() => {
      local.onChange(searchQuery())
      setSuggestions([])
      setSelectedId(-1)
    }, 50)
  }

  const input = (e: any) => {
    const query = e.target.value
    setSearchQuery(query)
    local.onInput(query)
    setSuggestions(local.suggestions)
  }

  const mod = (n: number, m: number) => {
    // Ensure modulus always gives positive value
    return ((n % m) + m) % m
  }

  const selectListElement = (listRef: HTMLUListElement, diff: number) => {
    // Update styles of selected
    if (selectedId() != -1) {
      const listItemElement = listRef.getElementsByTagName("li")[selectedId()]
      listItemElement.classList.remove("bg-light")
    }
    const newSelectedId = mod(selectedId() + diff, suggestions().length)
    const newListItemElement = listRef.getElementsByTagName("li")[newSelectedId]
    newListItemElement.classList.add("bg-light")

    setSearchQuery(newListItemElement.innerText)
    setSelectedId(newSelectedId)
  }

  const selectSuggestion = (e: KeyboardEvent) => {
    if (!listRef) return
    if (suggestions().length == 0) return
    if (e.code === "ArrowDown") selectListElement(listRef, 1)
    else if (e.code === "ArrowUp") selectListElement(listRef, -1)
  }

  onMount(() => {
    document.addEventListener("keydown", selectSuggestion)
  })

  onCleanup(() => {
    document.removeEventListener("keydown", selectSuggestion)
  })

  return (
    <>
      <ul ref={listRef} class="card overflow-clip !border-dark !border-[3px]">
        <div class="flex">
          <input
            onChange={search}
            onInput={input}
            value={searchQuery()}
            id={local.id}
            placeholder={local.placeholder}
            type="text"
            autocorrect="on"
            autocomplete="off"
            class="w-full px-4 py-2 bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
          />
          <button aria-label="Search product" onClick={search} class="w-10">
            <SearchIcon class="m-auto h-5" />
          </button>
        </div>
        <Show when={local.suggestions.length > 0}>
          <For each={suggestions()}>
            {(suggestion, _) => (
              <>
                <div class="h-px mx-2 bg-light" />
                <li
                  onclick={() => setSearchQuery(suggestion)}
                  class="flex px-4 py-2 hover:bg-light hover hover:border-light"
                >
                  {suggestion}
                </li>
              </>
            )}
          </For>
        </Show>
      </ul>
    </>
  )
}
