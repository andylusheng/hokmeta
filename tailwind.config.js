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
        hok: {
          gold: '#c9a227',
          dark: '#0f1419',
          card: '#1a2332',
          border: '#2a3544',
        },
      },
    },
  },
  plugins: [],
};
