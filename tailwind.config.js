/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "primary": "#2D2AA5",
      "secondary": "#45CBA4",
      "background": "#F1F3F6",
      "white": "#FFFFFF",
      "danger": "#DC2626",
      "success": "#4D7C0F"
    },
  },
  plugins: [],
}

