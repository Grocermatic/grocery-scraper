import { createStore, type SetStoreFunction } from 'solid-js/store'

export const createStoredStore = (
  key: string,
  defaultValue: any,
  storage: any = localStorage,
): [proxy: any, setter: SetStoreFunction<any>] => {
  const initialValue = storage.getItem(key)
    ? (JSON.parse(storage.getItem(key)) as Object)
    : defaultValue

  const [value, setValue] = createStore(initialValue as any)

  const setValueAndStore = ((arg: any) => {
    setValue(arg)
    storage.setItem(key, JSON.stringify(arg))
  }) as typeof setValue

  return [value, setValueAndStore]
}
