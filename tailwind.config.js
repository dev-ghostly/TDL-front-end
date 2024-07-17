/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // add colors
    colors : {
      one : "#F0F0F0",
      two : "#E3EAE9",
      three: "#BEE5D3",
      four : "#C0D6D2",
      five : "#4DB97E",
      six : "#C56363"
    },
    fontFamily: {
      website: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}