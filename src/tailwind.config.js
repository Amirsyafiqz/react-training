/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'],
      },
      colors: {
        'dark-900': '#0f0f0f',
        'dark-800': '#1c1c1c',
        'dark-700': '#2e2e2e',
        primary: '#db5dbd',
        secondary: '#1b1b1b',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #db5dbd, #5d4ddb)',
      },
    },
  },
  plugins: [],
}




