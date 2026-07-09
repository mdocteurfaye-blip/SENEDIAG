/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT: '#167B93', light: '#2FA3B9', dark: '#0B5267' },
        sky:      { soft: '#DFF3F7', mid: '#BFE7EE', strong: '#8CCFDC' },
        teal:     { DEFAULT: '#2498AD', light: '#D5F1F5' },
        brand:    { dark: '#083D52', ink: '#062E42' },
        sos:      '#EF4444',
        navy:     '#082F44',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 4px 32px rgba(8,61,82,.12)',
        hover: '0 12px 48px rgba(8,61,82,.22)',
        sos:   '0 0 0 8px rgba(239,68,68,.2)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':      'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow':  'spin 12s linear infinite',
        'ecg':        'ecg 3s linear infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(239,68,68,.5)' },
          '50%':     { boxShadow: '0 0 0 12px rgba(239,68,68,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        ecg: {
          '0%':   { strokeDashoffset: 800 },
          '100%': { strokeDashoffset: 0 },
        },
      },
    },
  },
  plugins: [],
}
