// Turkcell Superonline logosu — tamamen SVG/metin tabanlı, dış görsel gerektirmez.
// Sarı amblem (stilize) + beyaz "TURKCELL / SUPERONLINE" yazı markası,
// parlament mavisi zemin üzerinde kullanım için tasarlanmıştır.
// Variant API'si: mini | cobrand (mavi header) | featured | footer

interface TurkcellLogoProps {
  variant?: 'mini' | 'cobrand' | 'featured' | 'footer';
  className?: string;
}

/**
 * Stilize sarı Turkcell amblemi. `hole` = zeminin rengi (amblem içindeki
 * nokta ve kuyruk kesikleri zemin renginde görünür).
 */
export function Mark({ size = 32, hole = '#2856A5' }: { size?: number; hole?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="46" fill="#FFC900" />
      <g fill={hole}>
        {/* Üst tadpole: baş + aşağı-sola süpüren kuyruk */}
        <circle cx="41" cy="28" r="9" />
        <path d="M35,34 C27,46 17,58 4,68 C7,58 12,49 18,41 C23,34 28,30 33,27 Z" />
        {/* Alt tadpole: baş + daha uzun kuyruk */}
        <circle cx="66" cy="44" r="9" />
        <path d="M60,50 C50,64 34,78 15,88 C21,77 30,66 41,56 C47,51 53,47 59,44 Z" />
      </g>
    </svg>
  );
}

/** "TURKCELL / SUPERONLINE" yazı markası — koyu zemin için beyaz */
function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-extrabold tracking-tight text-white uppercase ${
          compact ? 'text-[15px]' : 'text-[19px]'
        }`}
      >
        Turkcell
      </span>
      <span
        className={`font-extrabold uppercase text-white/95 mt-0.5 ${
          compact ? 'text-[8px] tracking-[0.18em]' : 'text-[10px] tracking-[0.2em]'
        }`}
      >
        Superonline
      </span>
    </span>
  );
}

export default function TurkcellLogo({ variant = 'mini', className = '' }: TurkcellLogoProps) {
  if (variant === 'mini') {
    // Küçük kullanım, koyu zemin için (ör. sihirbaz bölümü)
    return (
      <span className={`inline-flex items-center gap-2 align-middle ${className}`}>
        <Mark size={26} hole="#12294F" />
        <Wordmark compact />
      </span>
    );
  }

  if (variant === 'cobrand') {
    // Header için — parlament mavisi zemin
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <Mark size={42} hole="#2856A5" />
        <Wordmark />
      </span>
    );
  }

  if (variant === 'featured') {
    // Açık zeminli kart rozetleri için (amblem tek başına)
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Mark size={14} hole="#FFFFFF" />
      </span>
    );
  }

  if (variant === 'footer') {
    // Footer için (koyu lacivert zemin)
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <Mark size={42} hole="#12294F" />
        <Wordmark />
      </span>
    );
  }

  return null;
}
