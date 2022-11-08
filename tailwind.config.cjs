/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { peach: '#FFF1EB', 'morning-blue': '#ACE0F9' },
    },
  },
  plugins: [],
};
