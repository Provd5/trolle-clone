//prettier-ignore
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#242424',
    },
    extend: {},
  },
  plugins: [],
};
