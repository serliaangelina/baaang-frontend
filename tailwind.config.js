/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flame: {
          50: '#FFF8F3',
          100: '#FFF1E6',
          200: '#FFD9BD',
          300: '#FFC194',
          400: '#FFB74D',
          500: '#FF8A3D',
          600: '#FF6B2C',
          700: '#F4511E',
          800: '#D84315',
          900: '#BF360C',
        },
        dark: {
          950: '#0A0A0A',
          900: '#1A1A1A',
          800: '#2A2A2A',
        },
        cream: {
          50: '#FDFCFB',
          100: '#F9F6F1',
          200: '#F5F1E8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
