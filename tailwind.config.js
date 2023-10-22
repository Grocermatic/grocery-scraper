import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["frontend/**/*.{js,ts,jsx,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.green[500],
        light: colors.white,
        dark: colors.neutral[800],
      },
      fontFamily: {
        // to change, update font in _document.js
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
