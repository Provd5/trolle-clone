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
        white: "rgb(var(--white) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        "current-1": "rgb(var(--current-1) / <alpha-value>)",
        "current-2": "rgb(var(--current-1) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
