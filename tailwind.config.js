/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: '#E5E7EB',
        navy: {
          50: '#F5F7FA',
          100: '#E4EAF1',
          200: '#C8D4E3',
          300: '#A5B4CC',
          400: '#7D94B2',
          500: '#5B7799',
          600: '#3B5A7F',
          700: '#2D486B',
          800: '#1F3657',
          900: '#162846',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa', // this is bg-primary-400
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};
