import { For, Show, createSignal, splitProps } from "solid-js"
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
  const [selectedId, setSelectedId] = createSignal(0)
  let listRef: HTMLUListElement | undefined

  const search = () => {
    // Allow other events to complete before searching
    setTimeout(() => {
      local.onChange(searchQuery())
      setSuggestions([])
    }, 50)
  }

  const selectListElement = (listRef: HTMLUListElement, diff: number) => {
    const newSelectedId = (selectedId() + diff) % (suggestions().length + 1)

    // Update selected styles
    const listItemElement = listRef.getElementsByTagName("li")[selectedId()]
    const newListItemElement = listRef.getElementsByTagName("li")[newSelectedId]
    if (selectedId() != 0) listItemElement.classList.remove("font-bold")
    if (newSelectedId != 0) newListItemElement.classList.add("font-bold")

    setSelectedId(newSelectedId)
  }

  document.addEventListener("keydown", (event) => {
    if (!listRef) return
    if (suggestions().length == 0) return

    if (event.code === "ArrowDown") selectListElement(listRef, 1)
    else if (event.code === "ArrowUp") selectListElement(listRef, -1)
    else if (event.code === "Enter" && selectedId() > 0) {
      const listItemElement = listRef.getElementsByTagName("li")[selectedId()]
      setSearchQuery(listItemElement.innerHTML)
      setSelectedId(0)
    }
  })

  return (
    <>
      <ul
        ref={listRef}
        class="card px-2 !border-dark ring-2 ring-inset ring-dark divide-y"
      >
        <li class="flex">
          <input
            onChange={search}
            onInput={(e) => {
              setSearchQuery(e.target.value)
              setSuggestions(local.suggestions)
              local.onInput(e.target.value)
            }}
            value={searchQuery()}
            id={local.id}
            placeholder={local.placeholder}
            type="text"
            autocorrect="on"
            autocomplete="off"
            class="w-full p-2 bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
          />
          <button aria-label="Search product" onClick={search} class="w-10">
            <SearchIcon class="m-auto h-5" />
          </button>
        </li>
        <Show when={local.suggestions.length > 0}>
          <For each={suggestions()}>
            {(suggestion, id) => (
              <li
                onclick={() => setSearchQuery(suggestion)}
                class="flex p-2 hover:font-bold"
              >
                {suggestion}
              </li>
            )}
          </For>
        </Show>
      </ul>
    </>
  )
}
