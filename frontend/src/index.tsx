import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'
import { Search } from './Search'
import { createEffect } from 'solid-js'
import { loadExternalJs } from './logic/externalJs'
import { miniSearchLoaded } from './store/search'

const App = () => {
  createEffect(() => {
    if (miniSearchLoaded()) {
      loadExternalJs(
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6950110112582359',
      )
    }
  })

  // Temporary redirect all to search page
  if (window.location.pathname != '/search') window.location.pathname = '/search'

  return (
    <Router>
      <Routes>
        <Route path="/search" component={Search} />
      </Routes>
    </Router>
  )
}

const root = document.getElementById('root')
render(() => <App />, root!)
