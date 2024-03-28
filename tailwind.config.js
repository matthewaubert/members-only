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
  },
  plugins: [],
};
