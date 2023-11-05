export const setSearchParam = (key: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  if (value != '') searchParams.set(key, value)
  else searchParams.delete(key)
  const paramString = searchParams.toString() ? '?' + searchParams.toString() : ''
  history.pushState(null, '', window.location.pathname + paramString)
}
