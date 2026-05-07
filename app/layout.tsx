import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';

// =============================================
// VIEWPORT — mobile için kritik
// =============================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0E1F4D' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1F4D' },
  ],
  colorScheme: 'light',
  // iOS Safari mobil klavye için: input açıldığında viewport küçülmesin
  // (klavye footer'ın üstüne çıksın, butonlar görünür kalsın)
  interactiveWidget: 'resizes-content',
};

// =============================================
// METADATA — SEO + Sosyal paylaşım
// =============================================
export const metadata: Metadata = {
  metadataBase: new URL('https://internetbasvuru.com'),
  title: {
    default: 'Türk Telekom Fiber İnternet Başvurusu | Yetkili Bayi',
    template: '%s | internetbasvuru.com',
  },
  description:
    'Türk Telekom fiber internet paketleri için online başvuru. 81 il açık, bölgesel kampanyalar, ücretsiz kurulum, 18 ay sabit fiyat. Göksoylar İletişim Yetkili Bayi.',
  keywords: [
    'türk telekom',
    'türk telekom fiber',
    'fiber internet başvuru',
    'tt yetkili bayi',
    'internet başvuru',
    'fiber gücü yaşa',
    'manavgat internet',
    'antalya fiber',
    'ücretsiz kurulum',
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
    telephone: false, // 0850 hat alındığında true yap
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://internetbasvuru.com',
    siteName: 'internetbasvuru.com',
    title: 'Türk Telekom Fiber İnternet Başvurusu | Yetkili Bayi',
    description:
      'Türkiye geneli yetkili bayiden hızlı kurulum. 18 ay sabit fiyat, ücretsiz kurulum, KVKK uyumlu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Türk Telekom Fiber İnternet Başvurusu',
    description: 'Türkiye geneli yetkili bayiden hızlı kurulum. 18 ay sabit fiyat.',
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
    // iOS Safari için ek meta
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'TT Başvuru',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // =============================================
  // JSON-LD: Multiple structured data types
  // =============================================
  // 1. LocalBusiness (organization)
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://internetbasvuru.com#organization',
    name: 'Göksoylar İletişim - Türk Telekom Yetkili Bayi',
    alternateName: 'internetbasvuru.com',
    description:
      'Türk Telekom fiber internet yetkili bayisi. Türkiye geneli kampanyalar, ücretsiz kurulum, 18 ay sabit fiyat.',
    url: 'https://internetbasvuru.com',
    logo: 'https://internetbasvuru.com/tt-logo.png',
    image: 'https://internetbasvuru.com/opengraph-image.png',
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
      'Türk Telekom Fiber',
      'TTNET',
      'Fiber İnternet',
      'Tivibu',
      'Modem Kurulumu',
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

  // 2. WebSite + SearchAction (Google Sitelinks Searchbox için)
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

  // 3. FAQ — sıkça sorulan sorular (SEO için zengin sonuç)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Türk Telekom fiber internet başvurusu nasıl yapılır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'internetbasvuru.com üzerinden online başvuru formunu doldurabilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz. Yetkili bayimiz 15 dakika içinde sizi arar ve adresinizdeki altyapı uygunluğunu teyit eder.',
        },
      },
      {
        '@type': 'Question',
        name: 'Fiber internet kurulumu ücretsiz mi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet. Türk Telekom Fiber Gücü Yaşa kampanyası kapsamında modem ve kurulum tüm Türkiye genelinde ücretsizdir.',
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
          text: 'Türkiye geneli 81 ilde Türk Telekom fiber internet başvurusu kabul ediyoruz. Antalya bölgesinde özel bölgesel kampanyalarımız mevcuttur (Manavgat, Alanya, Kepez, Muratpaşa).',
        },
      },
      {
        '@type': 'Question',
        name: 'Mevcut TT hattım yoksa başvurabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet. Yeni başvuru veya mevcut hat üzerinden başvuru, her ikisi de mümkündür. Form üzerinde bunu seçebilirsiniz.',
        },
      },
    ],
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
