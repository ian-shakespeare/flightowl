/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'fo-pink': '#D651F5',
        'fo-magenta': '#B054FF',
        'fo-purple': '#7F58E8',
        'fo-blue': '#5455FF',
        'fo-aqua': '#517DF5',
      },
      fontFamily: {
        'golos': ['Golos Text', 'sans-serif']
      }
    },
  },
  plugins: [],
}
