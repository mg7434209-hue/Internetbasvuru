// Turkcell Superbox logosu — tamamen SVG/metin tabanlı, dış görsel gerektirmez.
// Marka renkleri: Turkcell Sarısı #FFC900 + Parlament Mavisi #2856A5 / #12294F
// Variant API'si: mini | cobrand (mavi header) | featured | footer

interface TurkcellLogoProps {
  variant?: 'mini' | 'cobrand' | 'featured' | 'footer';
  className?: string;
}

/** Sarı yuvarlak kare içinde lacivert sinyal amblemi — Superbox */
function Mark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="48" height="48" rx="12" fill="#FFC900" />
      {/* Sinyal yayları — kablosuz evde internet */}
      <path
        d="M14 30a10 10 0 0 1 20 0"
        fill="none"
        stroke="#17356C"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M9 30a15 15 0 0 1 30 0"
        fill="none"
        stroke="#17356C"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="24" cy="33.5" r="4" fill="#17356C" />
    </svg>
  );
}

/** "turkcell" yazı markası + SUPERBOX alt etiketi */
function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`text-[19px] font-extrabold tracking-tight lowercase ${
          dark ? 'text-white' : 'text-tc-navy'
        }`}
      >
        turkcell
      </span>
      <span
        className={`text-[10px] font-extrabold tracking-[0.24em] uppercase mt-0.5 ${
          dark ? 'text-accent-500' : 'text-brand-500'
        }`}
      >
        Superbox
      </span>
    </span>
  );
}

export default function TurkcellLogo({ variant = 'mini', className = '' }: TurkcellLogoProps) {
  if (variant === 'mini') {
    // Küçük kullanım, koyu zemin için
    return (
      <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
        <Mark size={20} />
        <span className="text-[11px] font-extrabold tracking-wider text-white/90 lowercase">
          turkcell
        </span>
      </span>
    );
  }

  if (variant === 'cobrand') {
    // Header için — parlament mavisi zemin üzerinde beyaz yazı
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <Mark size={40} />
        <Wordmark dark />
      </span>
    );
  }

  if (variant === 'featured') {
    // Paket kartı badge için
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Mark size={14} />
      </span>
    );
  }

  if (variant === 'footer') {
    // Footer için (koyu zemin)
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <Mark size={40} />
        <Wordmark dark />
      </span>
    );
  }

  return null;
}
