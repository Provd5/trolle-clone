/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ["12px", "16px"],
      base: ["14px", "18px"],
      xl: ["16px", "20px"],
      "2xl": ["18px", "22px"],
      "3xl": ["20px", "24px"],
      "4xl": ["22px", "26px"],
      "5xl": ["24px", "28px"],
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
