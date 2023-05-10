/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica'],
        serif: ['Le Jour Serif']
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};

