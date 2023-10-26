/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBG: '#80B9FC',
        secondaryBG: '#62A5F4'
      }
    },
  },
  plugins: [],
}