/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E8600A',
          dark: '#C65008',
          light: '#FFF3EB',
        },
        navy: {
          DEFAULT: '#1B3A5C',
          deep: '#0F2440',
        },
      },
    },
  },
  plugins: [],
}
