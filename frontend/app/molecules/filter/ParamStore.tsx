import { createStore } from 'solid-js/store'
import { createEffect } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { type ProductSearchParam, productSearch } from '../../store/search'

// Search engine param store with URL update and trigger
export const [param, setParam] = createStore<ProductSearchParam>({
  query: '',
  stores: [...productSearch.storesDefault],
  sort: productSearch.sortOptions[0],
})

export const ParamStore = () => {
  type SearchParam = { [key in keyof ProductSearchParam]?: any }
  const [searchParam, setSearchParam] = useSearchParams() as [SearchParam, (_: SearchParam) => void]

  // Default values don't show in URL
  createEffect(() => setParam('query', searchParam.query!))
  createEffect(() => setSearchParam({ query: param.query }))

  const splitSymbol = ' '
  createEffect(() => {
    const isDefault = searchParam.stores == undefined
    setParam(
      'stores',
      isDefault ? productSearch.storesDefault : searchParam.stores.split(splitSymbol),
    )
  })
  createEffect(() => {
    const isDefault = param.stores.length == productSearch.storesDefault.length
    setSearchParam({ stores: isDefault ? '' : param.stores.join(splitSymbol) })
  })

  createEffect(() => {
    const isDefault = !searchParam.sort
    setParam('sort', isDefault ? productSearch.sortOptions[0] : searchParam.sort)
  })
  createEffect(() => {
    const isDefault = param.sort === productSearch.sortOptions[0]
    setSearchParam({ sort: isDefault ? '' : param.sort })
  })

  return <></>
}
