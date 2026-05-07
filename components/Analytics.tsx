'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getStoredConsent, trackPageView, updateGoogleConsent } from '@/lib/analytics';

/**
 * GA4 + Google Ads scripts — ortak yükleyici.
 *
 * Çalışma mantığı:
 * 1. Hiç ID env var'ı yoksa → HİÇBİR script yüklenmez (geliştirme/staging için güvenli)
 * 2. Yüklendiyse Google Consent Mode v2 default 'denied' başlar
 * 3. Kullanıcı CookieConsent banner'da onaylayınca consent update olur
 * 4. Route değişiminde otomatik page_view tetiklenir
 */
export default function Analytics() {
  const pathname = usePathname();

  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const adsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
  const hasTracking = !!(gaId || adsId);

  useEffect(() => {
    if (!hasTracking) return;
    trackPageView(pathname || '/');
  }, [pathname, hasTracking]);

  useEffect(() => {
    if (!hasTracking) return;
    const consent = getStoredConsent();
    if (consent) updateGoogleConsent(consent);
  }, [hasTracking]);

  if (!hasTracking) return null;

  return (
    <>
      <Script
        id="gtag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId || adsId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());

          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });

          ${gaId ? `gtag('config', '${gaId}', { send_page_view: false });` : ''}
          ${adsId ? `gtag('config', '${adsId}');` : ''}
        `}
      </Script>
    </>
  );
}
