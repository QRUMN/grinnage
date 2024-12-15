/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#E6FAF2',
          100: '#CCF5E5',
          200: '#99EBCC',
          300: '#66E1B2',
          400: '#56E39F',
          500: '#33D789',
          600: '#2AB372',
          700: '#228F5B',
          800: '#1B6C45',
          900: '#13482E',
        },
        dark: {
          50: '#F7F7FF',
          100: '#E6E6E9',
          200: '#CDCDD3',
          300: '#B4B4BD',
          400: '#9B9BA7',
          500: '#828291',
          600: '#69697B',
          700: '#505065',
          800: '#2A2A3C',
          900: '#131112',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};