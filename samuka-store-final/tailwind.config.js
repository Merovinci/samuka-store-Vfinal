/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0D0D0D",
          soft: "#121212",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C766",
          dark: "#8A6D1A",
        },
      },
      fontFamily: {
        serif: ["Georgia", "ui-serif", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
