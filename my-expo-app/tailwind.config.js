/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        oficiar: {
          'very-dark': '#051A26',
          dark: '#0B3954',
          blue: '#3D80B7',
          'blue-btn': '#0077B5',
          yellow: '#FFC107',
          gray: '#EDEDED',
        },
      },
    },
  },
  plugins: [],
};
