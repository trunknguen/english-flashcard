/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        shake: 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both',
        'pop-in': 'popIn 0.15s ease-out both',
        'confetti-fall': 'confettiFall 3s ease-in forwards',
        'fire-glow': 'fireGlow 1.5s ease-in-out infinite',
        'slide-in': 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out': 'slideOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'fade-out': 'fadeOut 0.2s ease-out forwards',
        'fade-slide-up': 'fadeSlideUp 0.3s ease-out both',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '20%': { transform: 'translate3d(-6px,0,0)' },
          '40%': { transform: 'translate3d(6px,0,0)' },
          '60%': { transform: 'translate3d(-4px,0,0)' },
          '80%': { transform: 'translate3d(4px,0,0)' },
        },
        popIn: {
          '0%': { transform: 'scale3d(0.97,0.97,1)', opacity: '0' },
          '100%': { transform: 'scale3d(1,1,1)', opacity: '1' },
        },
        confettiFall: {
          '0%': { transform: 'translate3d(0,-100vh,0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate3d(0,100vh,0) rotate(720deg)', opacity: '0' },
        },
        fireGlow: {
          '0%, 100%': { boxShadow: '0 0 4px #f59e0b, 0 0 8px #ef4444' },
          '50%': { boxShadow: '0 0 8px #f59e0b, 0 0 16px #ef4444, 0 0 24px #dc2626' },
        },
        slideIn: {
          from: { transform: 'translate3d(-100%,0,0)' },
          to: { transform: 'translate3d(0,0,0)' },
        },
        slideOut: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-100%,0,0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
