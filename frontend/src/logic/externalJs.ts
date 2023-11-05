import { webWorkerFactory } from './webWorkerFactory'

// Load dependencies
const externalJs: string[] = [
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6950110112582359',
]

const fetchJs = () => {
  self.onmessage = async (e: MessageEvent) => {
    const url: string = e.data
    const res = await fetch(url)
    if (!res) return
    const js = await res.text()
    self.postMessage(js)
  }
}

const runJs = (js: string) => {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.innerHTML = js
  document.head.appendChild(script)
}

export const loadExternaljs = () => {
  const loadJsWorker = webWorkerFactory(fetchJs)
  loadJsWorker.onmessage = (e: MessageEvent) => {
    const js: string = e.data
    runJs(js)
  }
  externalJs.map(async (url) => loadJsWorker.postMessage(url))
}
