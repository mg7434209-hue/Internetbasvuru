import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // TT Primary — Türk Telekom mavisi
        brand: {
          50:  '#E5F5FC',
          100: '#CCEBFA',
          200: '#99D7F4',
          300: '#66C3EE',
          400: '#33AFE7',
          500: '#009ADA',  // Ana TT mavisi
          600: '#007BB0',
          700: '#00547B',
          800: '#003C5A',
          900: '#002438',
        },
        // Secondary — koyu lacivert (TT corporate)
        ink: {
          50:  '#F4F7FA',
          100: '#EEF2F6',
          200: '#E1E7EE',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617',
        },
        // Accent — turuncu (CTA, dikkat çekici badge'ler)
        accent: {
          50:  '#FFF4ED',
          100: '#FFE6D5',
          400: '#FF8A3D',
          500: '#FF6B00',  // Ana turuncu
          600: '#E55C00',
          700: '#C24D00',
        },
        success: {
          50:  '#D1FAE5',
          500: '#059669',
          600: '#047857',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.04)',
        'card': '0 20px 40px rgba(0, 0, 0, 0.06)',
        'brand': '0 25px 50px rgba(0, 154, 218, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease',
        'modal-in': 'modalIn 0.25s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
