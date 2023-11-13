/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#042F2E",
        secondary: {
          100: "#0E5649",
          900: "#002C2B",
        } 
      }
    },
  },
  plugins: [],
}