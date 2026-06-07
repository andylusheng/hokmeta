/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hok: {
          gold: '#d4a84b',
          'gold-dim': '#9a7b2e',
          dark: '#0a0e14',
          'dark-2': '#0f1419',
          card: '#151c28',
          'card-hover': '#1c2636',
          border: '#2a3548',
          muted: '#6b7a90',
        },
        tier: {
          s: '#e8b923',
          a: '#a855f7',
          b: '#3b82f6',
          c: '#22c55e',
          d: '#6b7280',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'splash-gradient':
          'linear-gradient(105deg, rgba(10,14,20,0.97) 0%, rgba(10,14,20,0.75) 45%, rgba(10,14,20,0.35) 100%)',
        'hero-glow': 'radial-gradient(ellipse at 70% 40%, rgba(212,168,75,0.15), transparent 60%)',
      },
    },
  },
  plugins: [],
};
