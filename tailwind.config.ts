import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        skyCandy: '#d6f0ff',
        candyPink: '#ffe2f1',
        cloudWhite: '#f8fbff',
        blueberry: '#70b4ff'
      },
      boxShadow: {
        candy: '0 10px 30px rgba(112, 180, 255, 0.25)'
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pop: {
          '0%': { transform: 'scale(0.9)' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        bob: 'bob 1.6s ease-in-out infinite',
        pop: 'pop 280ms ease-out'
      }
    }
  },
  plugins: []
};

export default config;
