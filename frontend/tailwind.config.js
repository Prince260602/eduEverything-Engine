/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
],
  theme: {
    extend: {
      colors: {
        customGray: '#f5f5f5', // Custom light gray
        customDarkGreen: '#006400', // Custom dark green
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}