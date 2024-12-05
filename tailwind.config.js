/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        lightBeige: '#eee5d7',
        lightGray: '#b7b8a9',
      },
      fontFamily: {
        sans: ['var(--font-dancing-script)'],
      },
    },
  },
  plugins: [],
}
