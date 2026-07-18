import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
// 1. Next.js Script bileşenini import ediyoruz
import Script from 'next/script';

// =============================================
// VIEWPORT — mobile için kritik
// =============================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A2540' },
    { media: '(prefers-color-scheme: dark)', color: '#0A2540' },
  ],
  colorScheme: 'light',
  interactiveWidget: 'resizes-content',
};

// =============================================
// METADATA — SEO + Sosyal paylaşım
// =============================================
export const metadata: Metadata = {
  metadataBase: new URL('https://internetbasvuru.com'),
  title: {
    default: 'Turkcell Superbox Başvurusu | Yetkili Satış Noktası',
    template: '%s | internetbasvuru.com',
  },
  description:
    'Turkcell Superbox kablosuz evde internet paketleri için online başvuru. 81 il açık, 5G hızı, kablosuz tak-çalıştır kurulum, 18 ay sabit fiyat. Göksoylar İletişim Yetkili Satış Noktası.',
  keywords: [
    'turkcell',
    'turkcell superbox',
    'superbox başvuru',
    'superbox paketleri',
    'kablosuz evde internet',
    '5g evde internet',
    'evde internet başvuru',
    'manavgat internet',
    'antalya superbox',
    'sabit fiyat internet',
  ],
  authors: [{ name: 'Göksoylar İletişim Ltd. Şti.' }],
  creator: 'Göksoylar İletişim Ltd. Şti.',
  publisher: 'Göksoylar İletişim Ltd. Şti.',
  applicationName: 'internetbasvuru.com',
  category: 'telecommunications',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://internetbasvuru.com',
    siteName: 'internetbasvuru.com',
    title: 'Turkcell Superbox Başvurusu | Yetkili Satış Noktası',
    description:
      'Türkiye geneli yetkili satış noktasından Superbox kablosuz evde internet. 5G hızı, 18 ay sabit fiyat, tak-çalıştır kurulum, KVKK uyumlu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turkcell Superbox Başvurusu',
    description: 'Türkiye geneli yetkili satış noktasından Superbox kablosuz evde internet. 18 ay sabit fiyat.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://internetbasvuru.com',
  },
  manifest: '/manifest.json',
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  }),
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Manavgat, Antalya',
    'geo.position': '36.7867;31.4374',
    ICBM: '36.7867, 31.4374',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Superbox Başvuru',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // =============================================
  // JSON-LD: Multiple structured data types
  // =============================================
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://internetbasvuru.com#organization',
    name: 'Göksoylar İletişim - Turkcell Superbox Yetkili Satış Noktası',
    alternateName: 'internetbasvuru.com',
    description:
      'Turkcell Superbox kablosuz evde internet yetkili satış noktası. Türkiye geneli kampanyalar, 5G hızı, tak-çalıştır kurulum, 18 ay sabit fiyat.',
    url: 'https://internetbasvuru.com',
    logo: 'https://internetbasvuru.com/icon',
    image: 'https://internetbasvuru.com/opengraph-image',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manavgat',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.7867,
      longitude: 31.4374,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    priceRange: '₺₺',
    knowsAbout: [
      'Turkcell Superbox',
      'Kablosuz Evde İnternet',
      '5G Evde İnternet',
      'Turkcell TV+',
      'Superbox Kurulumu',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://internetbasvuru.com#website',
    url: 'https://internetbasvuru.com',
    name: 'internetbasvuru.com',
    inLanguage: 'tr-TR',
    publisher: {
      '@id': 'https://internetbasvuru.com#organization',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Turkcell Superbox başvurusu nasıl yapılır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'internetbasvuru.com üzerinden online başvuru formunu doldurabilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz. Yetkili satış noktamız 15 dakika içinde sizi arar ve adresinizdeki şebeke kapsamasını teyit eder.',
        },
      },
      {
        '@type': 'Question',
        name: 'Superbox kurulumu nasıl olur, teknisyen gerekir mi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Superbox kablosuz çalışır; kablo çekimi ve altyapı beklemesi yoktur. Cihazı prize takıp açmanız yeterlidir — dakikalar içinde internete bağlanırsınız.',
        },
      },
      {
        '@type': 'Question',
        name: 'Fiyat ne kadar süreyle sabit kalır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standart kampanyalarda fiyatınız 18 ay sözleşme süresince sabit kalır, enflasyon zammı uygulanmaz. Bölgesel Fırsat kampanyalarında 24 ay tek fiyat seçeneği vardır.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hangi şehirlerde hizmet veriyorsunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Türkiye geneli 81 ilde Turkcell Superbox başvurusu kabul ediyoruz. Antalya bölgesinde özel bölgesel kampanyalarımız mevcuttur (Manavgat, Alanya, Kepez, Muratpaşa).',
        },
      },
      {
        '@type': 'Question',
        name: 'Superbox için 5G şart mı? Mevcut Turkcell hattım yoksa başvurabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '5G kapsaması olmayan adreslerde Superbox 4.5G muadili paketlerle hizmet verir. Mevcut Turkcell hattınız olmasa da yeni başvuru yapabilirsiniz; form üzerinde bunu seçebilirsiniz.',
        },
      },
    ],
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* =============================================
            GOOGLE ADS TAG (gtag.js) ENTEGRASYONU
           ============================================= */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17931293168"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17931293168');
            `,
          }}
        />

        {/* JSON-LD structured data — multiple types */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body>
        <Analytics />
        <Header />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
