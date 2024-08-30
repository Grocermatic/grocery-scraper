import {
  For,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js'
import { cloneJson } from '../../logic/cloneJson'
import { productSearchEngine } from '../../store/search'
import { CrossIcon } from '../../svg/CrossIcon'
import { SearchIcon } from '../../svg/SearchIcon'
import { param, setParam } from './ParamStore'

export const SearchBar = (props: any) => {
  const [local, _] = splitProps(props, ['id', 'placeholder'])
  const [searchQuery, setSearchQuery] = createSignal('')
  createEffect(() => setSearchQuery(param.query))

  const [typedInput, setTypedInput] = createSignal('')
  const [suggestions, setSuggestions] = createSignal<string[]>([])
  const [selectedId, setSelectedId] = createSignal(0)
  let listRef: HTMLUListElement | undefined

  const search = () => {
    setParam('query', searchQuery())
    setSuggestions([])
  }

  const input = (e: any) => {
    const searchParam = cloneJson(param)
    searchParam.query = e.target.value
    const suggestions = productSearchEngine.suggest(searchParam)
    setSearchQuery(e.target.value)
    setTypedInput(e.target.value)
    setSuggestions(suggestions)
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
      listElement.classList.add('bg-neutral-light')
    } else if (listRef) {
      for (const listItemElement of listRef.getElementsByTagName('li')) {
        listItemElement.classList.remove('bg-neutral-light')
      }
    }
  }

  const selectListElement = (listRef: HTMLUListElement, diff: number) => {
    const newSelectedId = mod(selectedId() + diff, suggestions().length + 1)
    const newListItemElement = listRef.getElementsByTagName('li')[newSelectedId]
    selectListElementToggle(newListItemElement, true)
    if (newSelectedId === 0) setSearchQuery(typedInput())
    else if (newListItemElement) setSearchQuery(newListItemElement.innerText)
    setSelectedId(newSelectedId)
  }

  const selectSuggestion = (e: KeyboardEvent) => {
    if (!listRef) return
    const searchElement = listRef.getElementsByTagName('input')[0]
    if (e.key === 'ArrowDown') selectListElement(listRef, 1)
    else if (e.key === 'ArrowUp') {
      selectListElement(listRef, -1)
      searchElement?.blur()
      setTimeout(() => {
        searchElement?.focus()
      }, 0)
    } else if (document.activeElement === searchElement && e.key === 'Enter')
      search()
    else if (e.key.match(/[a-zA-Z ]/gi)?.length === 1 && listRef) {
      searchElement?.focus()
    } else if (e.key === 'Escape') {
      searchElement?.blur()
    }
  }

  onMount(() => {
    document.addEventListener('keydown', selectSuggestion)
  })

  onCleanup(() => {
    document.removeEventListener('keydown', selectSuggestion)
  })

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <>
      <ul
        ref={listRef!}
        class="card overflow-clip !border-neutral-dark !border-[2px]"
      >
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
          <Show
            when={suggestions().length === 0}
            fallback={
              <button
                type="button"
                aria-label="Search product"
                onClick={search}
                class="w-10"
              >
                <SearchIcon class="m-auto h-5" />
              </button>
            }
          >
            <button
              type="button"
              aria-label="Search product"
              onClick={clearSearch}
              class="w-10"
            >
              <CrossIcon class="m-auto h-5" />
            </button>
          </Show>
        </li>
        <Show when={suggestions().length > 0}>
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
                  class="flex flex-col bg-white"
                >
                  <div class="h-px mx-3 bg-neutral-light" />
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
