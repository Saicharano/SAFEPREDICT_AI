/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a0e18',
        primary: { DEFAULT: '#1e90ff', light: '#64b5f6', dark: '#0d6efd' },
        danger: '#e53935',
        warning: '#fb8c00',
        success: '#43a047',
        glass: 'rgba(255,255,255,0.08)'
      },
      backdropBlur: { xs: '2px' },
      animation: { 'float': 'float 6s ease-in-out infinite', 'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite' },
      keyframes: { float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } } }
    }
  },
  plugins: []
};
