'use client';

import { useState } from 'react';

// Brand assets toggle - TT izni iptal olursa false yap
export const BRAND_ASSETS_ENABLED = true;

// Self-hosted TT logosu (public/tt-logo.png)
const TT_LOGO_URL = '/tt-logo.png';

interface TTLogoProps {
  variant?: 'mini' | 'cobrand' | 'featured' | 'footer';
  className?: string;
}

/**
 * Türk Telekom logosu wrapper
 * variant'a göre farklı boyut ve stil
 * Logo yüklenmezse otomatik text fallback ("TÜRK TELEKOM")
 * BRAND_ASSETS_ENABLED=false ise sadece text gösterilir
 */
export default function TTLogo({ variant = 'mini', className = '' }: TTLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // Brand assets disabled veya image fail → text fallback
  const showFallback = !BRAND_ASSETS_ENABLED || imgFailed;

  if (variant === 'mini') {
    // Dealer-strip için, beyaz, küçük
    return (
      <span className={`inline-flex items-center align-middle ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-4 w-auto opacity-95"
            style={{ filter: 'brightness(0) invert(1)' }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-[10px] font-extrabold tracking-wider text-white/90">
            TÜRK TELEKOM
          </span>
        )}
      </span>
    );
  }

  if (variant === 'cobrand') {
    // Header için, koyu, orta boy
    return (
      <span className={`inline-flex items-center ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-[22px] w-auto"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-[11px] font-extrabold text-ink-900 tracking-wider leading-none">
            TÜRK TELEKOM
          </span>
        )}
      </span>
    );
  }

  if (variant === 'featured') {
    // Paket kartı badge için
    return (
      <span className={`inline-flex items-center ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="TT"
            className="h-[11px] w-auto"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-[9px] font-extrabold text-brand-700 tracking-wider">
            TT
          </span>
        )}
      </span>
    );
  }

  if (variant === 'footer') {
    // Footer için büyük
    return (
      <span className={`inline-flex items-center ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-14 w-auto"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-2xl font-extrabold text-ink-900 tracking-tight">
            TÜRK TELEKOM
          </span>
        )}
      </span>
    );
  }

  return null;
}
