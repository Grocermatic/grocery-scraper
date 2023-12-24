import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export const tailwindConfig: Config = {
  content: ['**/*.{tsx,html,astro}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.green[500],
        light: colors.neutral[200],
        dark: colors.neutral[800],
      },
      fontFamily: {
        // to change, update font in _document.js
        sans: defaultTheme.fontFamily.sans,
        serif: defaultTheme.fontFamily.serif,
      },
    },
  },
  plugins: [],
}
