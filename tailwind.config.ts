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
        // Parlament Mavisi (turkcell.com.tr kurumsal mavi — header, başlık, fiyat)
        brand: {
          50:  '#EBF1FA',
          100: '#D6E2F5',
          200: '#ADC6EB',
          300: '#84A9E0',
          400: '#5580C8',
          500: '#2856A5',  // ANA parlament mavisi
          600: '#1E4489',
          700: '#17356C',
          800: '#12294F',
          900: '#0C1B36',
        },
        // Accent — Turkcell Sarısı (CTA'lar için; üzerinde koyu lacivert metin kullan)
        accent: {
          50:  '#FFF9E5',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC900',  // ANA Turkcell sarısı
          600: '#E6B500',
          700: '#B38D00',
          800: '#806500',
          900: '#4D3C00',
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
        // Turkcell marka renkleri (alias)
        'tc-yellow': '#FFC900',
        'tc-yellow-dark': '#E6B500',
        'tc-navy': '#12294F',   // Parlament koyu (footer, sarı üstü metin)
        'tc-blue': '#2856A5',   // Parlament mavisi
        // Superbox 4.5G kart yeşili
        'sb-green': {
          500: '#00A876',
          600: '#00905F',
          700: '#007D58',
        },
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
        'strong': '0 25px 50px rgba(255,201,0,0.25)',
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
