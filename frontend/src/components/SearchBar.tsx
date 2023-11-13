import { For, Show, createSignal, onCleanup, onMount, splitProps } from 'solid-js'
import { SearchIcon } from '../svg/SearchIcon'

export const SearchBar = (props: any) => {
  const [local, _] = splitProps(props, [
    'id',
    'placeholder',
    'onChange',
    'onInput',
    'suggestions',
    'initialValue',
  ])
  const [searchQuery, setSearchQuery] = createSignal(local.initialValue)
  const [typedInput, setTypedInput] = createSignal('')
  const [suggestions, setSuggestions] = createSignal([])
  const [selectedId, setSelectedId] = createSignal(0)
  let listRef: HTMLUListElement | undefined

  const search = () => {
    local.onChange(searchQuery())
    setSuggestions([])
  }

  const input = (e: any) => {
    const query = e.target.value
    local.onInput(query)
    setSearchQuery(query)
    setTypedInput(query)
    setSuggestions(local.suggestions)
    setSelectedId(0)
  }

  const mod = (n: number, m: number) => {
    // Ensure modulus always gives positive value
    return ((n % m) + m) % m
  }

  const selectListElementToggle = (listElement: any, on: boolean) => {
    if (on) {
      setSelectedId(Number(listElement.value))
      selectListElementToggle(listElement, false)
      listElement.classList.add('bg-light')
    } else if (listRef) {
      for (const listItemElement of listRef.getElementsByTagName('li')) {
        listItemElement.classList.remove('bg-light')
      }
    }
  }

  const selectListElement = (listRef: HTMLUListElement, diff: number) => {
    const newSelectedId = mod(selectedId() + diff, suggestions().length + 1)
    const newListItemElement = listRef.getElementsByTagName('li')[newSelectedId]
    selectListElementToggle(newListItemElement, true)
    if (newSelectedId == 0) setSearchQuery(typedInput())
    else setSearchQuery(newListItemElement.innerText)
    setSelectedId(newSelectedId)
  }

  const selectSuggestion = (e: KeyboardEvent) => {
    if (!listRef) return
    const searchElement = listRef.getElementsByTagName('input')[0]
    if (e.key === 'ArrowDown') selectListElement(listRef, 1)
    else if (e.key === 'ArrowUp') {
      selectListElement(listRef, -1)
      searchElement.blur()
      setTimeout(() => {
        searchElement.focus()
      }, 0)
    } else if (document.activeElement === searchElement && e.key === 'Enter') search()
    else if (e.key.match(/[a-zA-Z ]/gi)?.length == 1 && listRef) {
      searchElement.focus()
    } else if (e.key === 'Escape') {
      searchElement.blur()
    }
  }

  onMount(() => {
    document.addEventListener('keydown', selectSuggestion)
  })

  onCleanup(() => {
    document.removeEventListener('keydown', selectSuggestion)
  })

  return (
    <>
      <ul ref={listRef} class="card overflow-clip !border-dark !border-[2px]">
        <li class="flex bg-white">
          <input
            onSubmit={search}
            onInput={input}
            value={searchQuery()}
            id={local.id}
            placeholder={local.placeholder}
            type="text"
            autocorrect="on"
            autocomplete="off"
            class="w-full px-4 font-bold py-2 focus:border-transparent focus:outline-none"
          />
          <button aria-label="Search product" onClick={search} class="w-10">
            <SearchIcon class="m-auto h-5" />
          </button>
        </li>
        <Show when={local.suggestions.length > 0}>
          <For each={suggestions()}>
            {(suggestion, id) => (
              <>
                <li
                  value={id().toString()}
                  onMouseEnter={(e) => selectListElementToggle(e.target, true)}
                  onMouseLeave={(e) => selectListElementToggle(e.target, false)}
                  onclick={() => {
                    setSearchQuery(suggestion)
                    search()
                  }}
                  class="flex flex-col"
                >
                  <div class="h-px mx-3 bg-light" />
                  <p class="px-4 py-2">{suggestion}</p>
                </li>
              </>
            )}
          </For>
        </Show>
      </ul>
    </>
  )
}
