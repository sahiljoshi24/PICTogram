/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./styles/**/*.{html,js}",
    "./styles/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        socialBg: "#F5F7FB",
        socialBlue: "#218DFA",
      },
    },
  },
  plugins: [],
};
