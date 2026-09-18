import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      tablet: '1000px',
      xxl: '1440px',
      maxmobile: { max: '767px' },
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        xxs: '10px',
      },
      fontFamily: {
        causten: ['var(--font-causten-regular)', 'sans-serif'],
        caustenLight: ['var(--font-causten-light)', 'sans-serif'],
        caustenBold: ['var(--font-causten-bold)', 'sans-serif'],
        nexa1: ['nexa', 'sans-serif'],
        kanit: ['var(--font-kanit)'],
        nexa: ['var(--font-nexa-regular)'],
        nexathin: ['var(--font-nexa-light)'],
        nexablack: ['var(--font-nexa-black)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        brand: {
          charcoal: '#293132',
          gold: '#FF294F',
          rust: '#1C83FF',
          mint: '#1C83FF',
          pink: '#DC719B',
          white: '#F5F5F5',
          black: '#0B0B0B',
          gradientStart: '#FF294F',
          gradientEnd: '#1C83FF',
          gray: '#293132',
          red: '#FF294F',
          orange: '#FF7D45',
        },
        success: '#1C83FF',
        error: '#DC719B',
        primary: '#050505',
        light: '#1C1C1E',
        dark: '#0A0A0A',
        gray: '#706d6d',
      },
      boxShadow: {
        1: '0px 2px 20px 0px rgba(0, 0, 0, 0.02)',
        2: '0px 4px 12px 0px rgba(0, 0, 0, 0.02)',
        3: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-theme': 'linear-gradient(90deg, #05121E 0%, #0E1F30 100%)',
        'gradient-theme-2': 'linear-gradient(90deg, #FFAA21 0%, #00A3FF 100%)',
        'gradient-pattern': 'linear-gradient(90deg, #FFAA21 0%, #00A3FF 100%)',
        'gradient-gold': 'linear-gradient(90deg, #FF294F 0%, #1C83FF 100%)',
      },
    },
  },
  plugins: [tailwindScrollbar],
};

export default config;
