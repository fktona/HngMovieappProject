/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily:{
        mono:['Montserrat', 'sans-serifve'],
        popi:['Poppins', 'sans-serifve'],
        lato:['Lato', 'sans-serifve'],
        robo:['Roboto', 'sans-serifve'],
        geor:['Noto Sans Georgian', 'sans-seri'],
        danc:['Dancing Script', 'cursive'],
      }
    },
  },
  plugins: [],
}