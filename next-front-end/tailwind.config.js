/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // backgroundImage already here with next.js - remove if not used!
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Add colors here so as not to reset defaults!!
      colors: {
        primary: {
          //https://encycolorpedia.com/0990a7
          100: '#bdd9e1',
          200: '#9bc7d2',
          300: '#77b4c4',
          400: '#4fa2b5',
          500: '#0990a7',
          600: '#167789',
          700: '#1a5e6c',
          800: '#1a4751',
          900: '#163037',
        },
        accent: {
          // https://encycolorpedia.com/ff9026
          100: '#ffdab8',
          200: '#ffc795',
          300: '#ffb572',
          400: '#ffa24f',
          500: '#ff9026',
          600: '#d07723',
          700: '#a45e1f',
          800: '#79471b',
          900: '#513016',
        },
      },
    },
  },
  plugins: [],
};
