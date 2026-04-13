/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#070707',
        'canvas-soft': '#101012',
        panel: '#151517',
        'panel-soft': '#1d1d21',
        accent: '#b91c1c',
        'accent-soft': '#991b1b',
        mist: '#a1a1aa',
        stroke: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 14px 36px rgba(0, 0, 0, 0.32)',
        card: '0 24px 48px rgba(0, 0, 0, 0.34)',
      },
    },
  },
  plugins: [],
};
