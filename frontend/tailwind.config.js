/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-base': '#0a0e1a',
        'dark-card': '#0f1628',
        'dark-mid': '#0d1220',
        'navy': '#1e3a8a',
        'navy-border': '#1e2d50',
        'orange': '#f59218',
        'orange-dark': '#e88510',
        'text-white': '#eef1f6',
        'text-muted': '#8090b0',
        'text-dim': '#6b7fa0',
        'text-faint': '#4a5a7a',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Figtree', 'sans-serif'],
      },
      keyframes: {
        'pulse-wa': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(37,211,102,0)' },
        },
      },
      animation: {
        'pulse-wa': 'pulse-wa 2s infinite',
      },
    },
  },
  plugins: [],
};
