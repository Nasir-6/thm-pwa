/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Pass in the paths to all the files using tailwind classes
  theme: {
    extend: {       // Add colors here so as not to reset defaults!!
      colors: {
        primary: '#0A1045',
        accent: '#E9CD7A',
      },
      fontFamily: {
        'logo': ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
};
