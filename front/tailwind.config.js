/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ["12px", "14px"],
      base: ["14px", "16px"],
      xl: ["16px", "18px"],
      "2xl": ["18px", "20px"],
      "3xl": ["20px", "22px"],
      "4xl": ["22px", "24px"],
      "5xl": ["24px", "26px"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#242424",
        mgreen: {
          dark: "#48A024",
          DEFAULT: "#59C230",
          light: "#7DCE5C",
        },
        myellow: {
          DEFAULT: "#F3C23B",
          light: "#F1E12B",
        },
        mbrown: {
          dark: "#A05423",
          DEFAULT: "#C76D33",
          light: "#DF8A57",
        },
      },
    },
  },
  plugins: [],
};
