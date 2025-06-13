/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f1f5',
          100: '#d0d5e2',
          200: '#b1b9d0',
          300: '#929dbd',
          400: '#7382ab',
          500: '#5e6d9a',
          600: '#4a5779',
          700: '#374158',
          800: '#232a38',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};