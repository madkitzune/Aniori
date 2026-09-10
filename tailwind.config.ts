import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1a1a1a',
        card: '#2a2a2a',
        header: '#111111',
        accent: '#808080',
        highlight: '#a0a0a0',
        secondary: '#aaaaaa',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        logoGradient: 'logoGradient 4s ease infinite',
        gradientGlow: 'gradientGlow 2s linear infinite',
        fadeInUp: 'fadeInUp 0.4s ease forwards',
        fadeSlide: 'fadeSlide 60s infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        logoGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientGlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeSlide: {
          '0%, 100%': { opacity: '0' },
          '10%, 20%': { opacity: '1' },
          '30%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
