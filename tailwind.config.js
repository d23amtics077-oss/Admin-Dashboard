/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A3D98',
        accent: '#FF6F61',
        gold: {
          900: '#4fc3e6ff',
          800: '#4aa7eaff',
          700: '#6bbfe9ff',
        }
      },
    },
  },
  plugins: [],
}