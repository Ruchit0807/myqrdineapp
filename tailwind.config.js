/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFE8E8',
          100: '#FFCFCF',
          200: '#FFA7A7',
          300: '#FF8080',
          400: '#FF5858',
          500: '#FF2D2D', // Primary Red
          600: '#E52828',
          700: '#CC2424',
          800: '#B32020',
          900: '#991C1C',
        },
        secondary: {
          50: '#2a2a2a',
          100: '#232323',
          200: '#1e1e1e',
          300: '#1a1a1a',
          400: '#181818',
          500: '#161616',
          600: '#141414',
          700: '#131313',
          800: '#121212', // Charcoal black
          900: '#0f0f0f',
        },
        accent: {
          50: '#e6f9ff',
          100: '#ccf3ff',
          200: '#99e6ff',
          300: '#66d9ff',
          400: '#33ccff',
          500: '#00B8FF', // Cool blue accent for contrast
          600: '#00a6e6',
          700: '#0095cc',
          800: '#0083b3',
          900: '#007199',
        },
        neon: {
          green: '#39FF14',
          blue: '#00E5FF',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        premium: '0 10px 30px rgba(0,0,0,0.2)',
        glow: '0 0 20px rgba(0,229,255,0.35)',
        'glow-red': '0 0 30px rgba(255,45,45,0.3)',
        'glow-blue': '0 0 30px rgba(0,184,255,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 6s ease-in-out infinite 1s',
        'float-delay-2': 'float 6s ease-in-out infinite 2s',
        'shimmer': 'shimmer 2s infinite',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'rotate-slow': 'rotate 20s linear infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'all': 'all',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform',
      }
    },
  },
  plugins: [],
}
