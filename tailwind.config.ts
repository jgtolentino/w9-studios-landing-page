import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark theme from research
        'studio-black': '#1A1A1A',
        'studio-darker': '#0A0A0A',
        'studio-gray': '#2A2A2A',
        'studio-white': '#F5F5F5',
        'studio-blue': '#0066FF',
        'studio-red': '#E84141',
        'studio-gold': '#D4AF37',
      },
      fontFamily: {
        'display': ['Inter var', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography using clamp (Buck.co pattern)
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)',
        'fluid-2xl': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
        'fluid-3xl': 'clamp(2.5rem, 2rem + 3vw, 4rem)',
        'fluid-4xl': 'clamp(3rem, 2.5rem + 4vw, 5rem)',
        'fluid-5xl': 'clamp(4rem, 3rem + 5vw, 6rem)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

export default config
