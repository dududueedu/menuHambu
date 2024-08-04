/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'Roboto', 'sans serif']
    },
    extend: {
      backgroundImage: {
        "home": "url('/assets/background.jpg')"
      }
    },
  },
  plugins: [],
}

