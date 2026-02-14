/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#F8FBFF',
        'surface-alt': '#EEF6FF',
        card: '#FFFFFF',
        primary: '#60A5FA',
        'primary-hover': '#3B82F6',
        secondary: '#86EFAC',
        'secondary-hover': '#4ADE80',
        'hover-highlight': '#DBEAFE',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
        success: '#22C55E',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'modal-in': 'modalIn 0.2s ease-out',
        'hero-in': 'heroFadeIn 1s ease-out 0.2s both',
        'toast-in': 'toastIn 0.3s ease-out',
        'toast-out': 'toastOut 0.25s ease-in forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-slow-a': 'floatSlow 7s ease-in-out infinite',
        'float-slow-b': 'floatSlow 8s ease-in-out infinite',
        'float-slow-c': 'floatSlow 5s ease-in-out infinite',
        'turf-float': 'turfFloat 5s ease-in-out infinite',
        'turf-pulse': 'turfPulse 3s ease-in-out infinite',
        'ball-drift': 'ballDrift 4s ease-in-out infinite',
        'section-reveal': 'sectionReveal 0.5s ease-in-out forwards',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        turfFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg) scale(1.02)' },
          '66%': { transform: 'translateY(-4px) rotate(-1deg) scale(0.99)' },
        },
        turfPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        ballDrift: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(12px, -6px)' },
          '50%': { transform: 'translate(6px, 4px)' },
          '75%': { transform: 'translate(-8px, 2px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        sectionReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heroFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'float': '0 10px 40px -10px rgba(15, 23, 42, 0.08)',
        'float-hover': '0 20px 50px -15px rgba(15, 23, 42, 0.12)',
        'card-glow': '0 0 0 1px rgba(96, 165, 250, 0.08), 0 20px 50px -15px rgba(15, 23, 42, 0.1)',
      },
    },
  },
  plugins: [],
}
