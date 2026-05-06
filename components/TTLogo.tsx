'use client';

import { useState } from 'react';

// Brand assets toggle - TT izni iptal olursa false yap
export const BRAND_ASSETS_ENABLED = true;

// Self-hosted yüksek çözünürlüklü TT logosu (şeffaf arka planlı)
const TT_LOGO_URL = '/tt-logo.png';

interface TTLogoProps {
  variant?: 'mini' | 'cobrand' | 'featured' | 'footer';
  className?: string;
}

/**
 * Türk Telekom logosu wrapper
 * Şeffaf PNG'den farklı zeminlere uyum:
 * - Mini (koyu zemin): filter ile beyaza çevir
 * - Cobrand (beyaz header): doğal renkli, BÜYÜK
 * - Footer (koyu zemin): filter ile beyaza çevir
 */
export default function TTLogo({ variant = 'mini', className = '' }: TTLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showFallback = !BRAND_ASSETS_ENABLED || imgFailed;

  if (variant === 'mini') {
    // Küçük kullanım, koyu zemin için
    return (
      <span className={`inline-flex items-center align-middle ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-5 w-auto opacity-95"
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
    // Header için BÜYÜK, doğal renkli (h-12 → h-14, %17 büyüdü)
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
          <span className="text-base font-extrabold text-ink-900 tracking-wider leading-none">
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
            className="h-3.5 w-auto"
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
    // Footer için (koyu zemin varsayımıyla beyaza çevir)
    return (
      <span className={`inline-flex items-center ${className}`}>
        {!showFallback ? (
          <img
            src={TT_LOGO_URL}
            alt="Türk Telekom"
            className="h-14 w-auto opacity-95"
            style={{ filter: 'brightness(0) invert(1)' }}
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
