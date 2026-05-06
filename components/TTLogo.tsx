'use client';

import { useState } from 'react';

// Brand assets toggle - TT izni iptal olursa false yap
export const BRAND_ASSETS_ENABLED = true;

// Self-hosted TT logosu (public/tt-logo.png)
// NOT: PNG'nin arka planı KOYU/SİYAH (şeffaf değil)
// Bu yüzden:
// - Mini (siyah bar üstünde): filter yok, siyah bg zemine karışır
// - Cobrand (beyaz header üstünde): koyu kutu içinde "yetki rozeti" gibi
const TT_LOGO_URL = '/tt-logo.png';

interface TTLogoProps {
  variant?: 'mini' | 'cobrand' | 'featured' | 'footer';
  className?: string;
}

/**
 * Türk Telekom logosu wrapper
 * variant'a göre farklı boyut ve container
 * Logo yüklenmezse otomatik text fallback
 */
export default function TTLogo({ variant = 'mini', className = '' }: TTLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showFallback = !BRAND_ASSETS_ENABLED || imgFailed;

  if (variant === 'mini') {
    // Dealer-strip için: filter yok, koyu zemine karışır
    return (
      <span className={`inline-flex items-center align-middle ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-5 w-auto"
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
    // Header için: koyu kurumsal "yetki rozeti" içinde — beyaz header üzerinde temiz görünür
    return (
      <span
        className={`inline-flex items-center bg-ink-900 rounded-lg px-3 py-2 shadow-sm ${className}`}
      >
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-7 w-auto"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-sm font-extrabold text-white tracking-wider leading-none">
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
            className="h-3 w-auto"
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
    // Footer için büyük (footer zaten koyu zeminli, doğal gösterim)
    return (
      <span className={`inline-flex items-center ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-12 w-auto"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-2xl font-extrabold text-white tracking-tight">
            TÜRK TELEKOM
          </span>
        )}
      </span>
    );
  }

  return null;
}
