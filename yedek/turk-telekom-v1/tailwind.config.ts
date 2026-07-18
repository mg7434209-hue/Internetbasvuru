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
        // TT Mavi (Türk Telekom marka rengi)
        brand: {
          50:  '#E5F5FC',
          100: '#CCEBF9',
          200: '#99D7F3',
          300: '#66C3ED',
          400: '#33AFE7',
          500: '#009ADA',  // ANA TT mavisi
          600: '#007BB0',
          700: '#00547B',
          800: '#003E5C',
          900: '#00283D',
        },
        // Accent — turuncu (CTA için)
        accent: {
          50:  '#FFF3E6',
          100: '#FFE0C2',
          200: '#FFC399',
          300: '#FFA670',
          400: '#FF8847',
          500: '#FF6B1F',
          600: '#FF3D00',  // Mockup accent
          700: '#CC3100',
          800: '#992500',
          900: '#661900',
        },
        // Yeşil (success, KVKK uyumlu rozetleri)
        prime: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#059669',  // Success
          700: '#047857',
        },
        // Koyu paletler (text, secondary)
        ink: {
          50:  '#F4F7FA',  // bg-light
          100: '#EEF2F6',  // border
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',  // text-faint
          500: '#64748B',  // text-muted
          600: '#475569',
          700: '#334155',
          800: '#1E293B',  // secondary-soft
          900: '#0F172A',  // secondary
        },
        // WhatsApp
        wa: {
          500: '#25D366',
          600: '#1DA851',
        },
        // Genel
        success: '#059669',
        'success-bg': '#D1FAE5',
        warning: '#B45309',
        'warning-bg': '#FEF3C7',
        danger: '#DC2626',
        // TT marka renkleri (alias)
        'tt-blue': '#009ADA',
        'tt-blue-dark': '#007BB0',
        'tt-blue-darker': '#00547B',
        'tt-yellow': '#FFE600',  // Demo banner
      },
      fontFamily: {
        body: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        'display': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'lg-mockup': '24px',
        'md-mockup': '16px',
        'sm-mockup': '12px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0,0,0,0.04)',
        'medium': '0 20px 40px rgba(0,0,0,0.06)',
        'strong': '0 25px 50px rgba(0,154,218,0.15)',
        'modal': '0 30px 60px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease',
        'modal-in': 'modalIn 0.25s ease',
        'pulse-slow': 'pulse 2s infinite',
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
