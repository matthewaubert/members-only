/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      fontFamily: {
        display: 'proxima-nova-condensed, sans-serif',
        sans: 'proxima-nova, sans-serif',
      },
    },
    screens: {
      sm: '475px', // default: 640px
      md: '768px', // default: 768px
      lg: '900px', // default: 1024px
      xl: '1280px', // default: 1280px
    },
  },
  plugins: [],
};
