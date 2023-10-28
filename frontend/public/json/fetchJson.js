// @ts-nocheck
self.onmessage = async (e) => {
  const url = e.data
  const res = await fetch(url)
  const json = await res.json()
  postMessage(json)
}
