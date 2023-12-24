import { createEffect, createSignal, splitProps } from 'solid-js'
import { ActionButton } from '../../components/ActionButton'
import { keys } from '../../logic/keys'
import { useSearchParams } from '@solidjs/router'

export const SortFilter = (props: any) => {
  const [local, _] = splitProps(props, ['filteredResults', 'setSortedResults', 'class'])
  const [sortId, setSortId] = createSignal(0)

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

  const [searchParams, setSearchParams] = useSearchParams()
  createEffect(() => setSortFromParams())
  const setSortFromParams = () => {
    if (!searchParams.sort && !sortFuncIdHash[searchParams.sort]) setSortId(0)
    else setSortId(sortFuncIdHash[searchParams.sort])
  }

  createEffect(() => {
    const sortFunction = sortFuncs[sortFuncKeys[sortId()]]
    const sortedResults = structuredClone(local.filteredResults()).sort(sortFunction)
    local.setSortedResults(sortedResults)
    if (sortId() == 0) setSearchParams({ sort: '' })
    else setSearchParams({ sort: sortFuncKeys[sortId()] })
  })

  const onClick = () => setSortId((sortId() + 1) % sortFuncKeys.length)

  return (
    <div class={`flex ${local.class}`}>
      <ActionButton onClick={onClick} class="!w-40 bg-white">
        <p class=" text-left font-bold px-4 py-2">Sort: {sortFuncKeys[sortId()]}</p>
      </ActionButton>
    </div>
  )
}
