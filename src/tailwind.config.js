// tailwind.config.js
export default {
  darkMode: 'class', // change from 'media' if you want manual dark mode control
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-900": "#0F0F0F",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // optional
      },
    },
  },
  plugins: [],
}











