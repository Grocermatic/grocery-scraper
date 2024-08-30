import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { Search } from './pages/Search'
import './index.css'
/*
import { createEffect } from 'solid-js'
import { loadExternalJs } from './logic/externalJs'
import { miniSearchLoaded } from './store/search'
createEffect(() => {
  if (miniSearchLoaded() == 1) {
    loadExternalJs(
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6950110112582359',
    )
  }
})
//*/

const root = document.getElementById('root')
render(() => {
  navigator.serviceWorker?.register('/sw.js')
  return (
    <Router>
      <Route path="/" component={Search} />
    </Router>
  )
}, root)
