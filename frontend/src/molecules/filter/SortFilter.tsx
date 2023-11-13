import { createEffect, splitProps } from 'solid-js'
import { ActionButton } from '../../components/ActionButton'
import { keys } from '../../logic/keys'
import { useSearchParams } from '@solidjs/router'
import { createStoredStore } from '../../store/createStoredStore'

export const SortFilter = (props: any) => {
  const [local, _] = splitProps(props, ['filteredResults', 'setSortedResults'])
  const [sort, setSort] = createStoredStore('SortFilter', { id: 0 })

  const sortFuncs: {
    [key: string]: (a: any, b: any) => number
  } = {
    'unit price': (a: any, b: any) => a.unitPrice - b.unitPrice,
    price: (a: any, b: any) => a.price - b.price,
    relevance: () => 0,
  }
  const sortFuncKeys = keys(sortFuncs)
  let sortFuncIdHash: any = {}
  for (let i = 0; i < sortFuncKeys.length; i++) sortFuncIdHash[sortFuncKeys[i]] = i

  // Initialise sort filter from search params
  const [searchParams, setSearchParams] = useSearchParams()
  if (searchParams.sort && sortFuncIdHash[searchParams.sort])
    setSort({ id: sortFuncIdHash[searchParams.sort] })

  createEffect(() => {
    const sortFunction = sortFuncs[sortFuncKeys[sort.id]]
    const sortedResults = structuredClone(local.filteredResults()).sort(sortFunction)
    local.setSortedResults(sortedResults)
    if (sort.id == 0) setSearchParams({ sort: '' })
    else setSearchParams({ sort: sortFuncKeys[sort.id] })
  })

  const onClick = () => {
    setSort({ id: (sort.id + 1) % sortFuncKeys.length })
  }

  return (
    <div class="flex">
      <ActionButton onClick={onClick} class="!w-40 !border-dark !border-[2px]">
        <p class=" text-left font-bold px-4 py-2">Sort: {sortFuncKeys[sort.id]}</p>
      </ActionButton>
    </div>
  )
}
