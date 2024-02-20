/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        '011000': "url('/src/assets/011000.jpg')",
        '040010': "url('/src/assets/040010.jpg')",
        '130010': "url('/src/assets/130010.jpg')",
        '471010': "url('/src/assets/471010.jpg')",
      },
    },
  },
  plugins: [],
};
