/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "primary" : ['Fredoka', 'sans-serif'],
      "seconday" : ['Roboto', 'sans-serif']
    }
  },
  plugins: [],
}

