/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Roboto', 'sans-serif'],
        'content': ['Nunito sans', 'sans-serif']
      },
      colors: {
        'btn': '#047FFF',
        'btn-text': '#FFFFFF',
        'content': '#31304E',
        'label': '#6b7280'
      }
    },
  }
}
