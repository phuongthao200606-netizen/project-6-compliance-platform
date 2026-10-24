/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a0f1d',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b'
        },
        regblue: {
          400: '#38bdf8',
          500: '#0284c7',
          600: '#0369a1',
          700: '#1d4ed8'
        }
      }
    },
  },
  plugins: [],
}
