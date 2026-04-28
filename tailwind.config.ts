import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EEF2FB',
          100: '#D6DEF4',
          200: '#AEBDE9',
          300: '#869CDE',
          400: '#5E7BD2',
          500: '#3F5DBE',
          600: '#2D4BA6',
          700: '#1B3A8A',
          800: '#152E6E',
          900: '#0F2252',
        },
        accent: {
          50:  '#FFF3E6',
          100: '#FFE2C2',
          200: '#FFD09F',
          300: '#FFB875',
          400: '#FFA050',
          500: '#FF8B30',
          600: '#FF6B00',
          700: '#D85A00',
          800: '#A14400',
          900: '#6E2F00',
        },
        prime: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        ink: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        wa: {
          500: '#25D366',
          600: '#1DA851',
        },
        success: '#16A34A',
        danger: '#DC2626',
        'tt-navy': '#1B3A8A',
        'tt-orange': '#FF6B00',
      },
      fontFamily: {
        body: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};

export default config;
