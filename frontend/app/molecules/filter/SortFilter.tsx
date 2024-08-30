import { createEffect, createSignal, splitProps } from 'solid-js'
import { ActionButton } from '../../components/ActionButton'
import { productSearch } from '../../store/search'
import { param, setParam } from './ParamStore'

export const SortFilter = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  const [sortId, setSortId] = createSignal(0)
  const onClick = () =>
    setSortId((sortId() + 1) % productSearch.sortOptions.length)
  const sortStrategy = () => productSearch.sortOptions[sortId()]!
  createEffect(() => setParam('sort', sortStrategy()))
  createEffect(() => setSortId(productSearch.sortOptions.indexOf(param.sort)))

  return (
    <div class={`flex ${local.class}`}>
      <ActionButton onClick={onClick} class="!w-40 bg-white">
        <p class=" text-left font-bold px-4 py-2">Sort: {sortStrategy()}</p>
      </ActionButton>
    </div>
  )
}
