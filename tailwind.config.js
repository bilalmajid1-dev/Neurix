/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'monospace'],
        'sans': ['"InterVariable"', '"Inter"', 'sans-serif'],
      },
      colors: {
        'cyber-blue': '#00D4FF',
        'void-black': '#000000',
      },
      animation: {
        'spiral-enter': 'spiralEnter 3s cubic-bezier(0.23,1,0.32,1)',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      backdropBlur: {
        xs: '4px',
      }
    },
  },
  plugins: [],
}