import { render } from 'solid-js/web'
import { analytics } from './store/analytics'
import { Route, Router, Routes } from '@solidjs/router'
import { Search } from './Search'

const App = () => {
  analytics

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
