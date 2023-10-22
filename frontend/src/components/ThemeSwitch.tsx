import { SunIcon } from '../svg/SunIcon'
import { MoonIcon } from '../svg/MoonIcon'
import { createSignal } from 'solid-js'

export const ThemeSwitch = () => {
  const initialTheme = localStorage.getItem('theme') || 'light'
  const [theme, setTheme] = createSignal(initialTheme)

  const root = document.getElementById('root')
  if (root) root.className = initialTheme

  const onChange = () => {
    const newTheme = theme() === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (root) root.className = newTheme
  }

  return (
    <button class="h-24 w-24 flex justify-center border" onClick={onChange}>
      <SunIcon class="dark:hidden" />
      <MoonIcon class="hidden dark:flex" />
    </button>
  )
}
