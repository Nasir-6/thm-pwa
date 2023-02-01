/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Pass in the paths to all the files using tailwind classes
  theme: {
    extend: {
      // Add colors here so as not to reset defaults!!
      colors: {
        primary: {
          light: '#005e6d',
          dark: '#005e6d',
        },
        accent: {
          light: '#ffb673',
          dark: '#c47f45',
        },
      },
      fontFamily: {
        logo: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
};
