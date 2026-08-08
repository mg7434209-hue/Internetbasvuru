import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
import { allPackages, mobilityLabel } from '@/data/packages';
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
    { media: '(prefers-color-scheme: light)', color: '#2856A5' },
    { media: '(prefers-color-scheme: dark)', color: '#2856A5' },
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
    'Turkcell Superbox kablosuz evde internet paketleri için online başvuru. 5G Hazır 250 GB / 500 GB / 1 TB / 2 TB ve taşınabilir 4.5G paketleri, 12 ay sabit fiyat, aşım derdi yok. Yetkili satış noktası.',
  keywords: [
    'turkcell',
    'turkcell superbox',
    'superbox başvuru',
    'superbox paketleri',
    'kablosuz evde internet',
    '5g evde internet',
    'evde internet başvuru',
    'taşınabilir internet',
    'manavgat internet',
    'antalya superbox',
    'sabit fiyat internet',
  ],
  authors: [{ name: 'internetbasvuru.com' }],
  creator: 'internetbasvuru.com',
  publisher: 'internetbasvuru.com',
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
      'Türkiye geneli yetkili satış noktasından Superbox kablosuz evde internet. 5G hızı, 12 ay sabit fiyat, tek priz yeterli, KVKK uyumlu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turkcell Superbox Başvurusu',
    description: 'Türkiye geneli yetkili satış noktasından Superbox kablosuz evde internet. 12 ay sabit fiyat.',
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
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      'SlafSkYmKtezliRU0m2yk5pasNK-xVPBmp2p4We5NBU',
  },
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
    name: 'internetbasvuru.com - Turkcell Superbox Yetkili Satış Noktası',
    alternateName: 'internetbasvuru.com',
    description:
      'Turkcell Superbox kablosuz evde internet yetkili satış noktası. Sabit 5G Hazır ve taşınabilir 4.5G paketleri, 12 ay sabit fiyat, aşım derdi yok, tek priz yeterli.',
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

  // Paket kataloğu — arama motorları ve AI asistanları için ürün/fiyat verisi
  const packagesLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://internetbasvuru.com#paketler',
    name: 'Turkcell Superbox Paketleri',
    itemListElement: allPackages.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: `${p.quota} aylık kota · ${p.network} hızında · ${mobilityLabel(p)} · ${p.commitmentMonths} ay taahhüt, taahhüt süresince sabit fiyat, kota aşımında ek ücret yok.`,
        brand: { '@type': 'Brand', name: 'Turkcell Superbox' },
        offers: {
          '@type': 'Offer',
          price: p.priceMonthly,
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          url: 'https://internetbasvuru.com/#paketler',
          seller: { '@id': 'https://internetbasvuru.com#organization' },
        },
      },
    })),
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
          text: 'internetbasvuru.com üzerinden online başvuru formunu doldurmanız yeterlidir. Yetkili satış noktamız 15 dakika içinde sizi arar ve adresinizdeki şebeke kapsamasını teyit eder.',
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
        name: 'Superbox paketlerinde fiyat ve kota nasıl işler?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tüm Superbox paketleri 12 ay taahhütlüdür ve fiyat taahhüt süresince sabit kalır. Aşım derdi yoktur: aylık kota tamamlandığında ek ücret yansıtılmaz. 5G Hazır paketler 250 GB, 500 GB, 1 TB ve 2 TB; taşınabilir 4.5G paketler 150 GB, 350 GB ve 1 TB seçenekleriyle sunulur.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hangi şehirlerde hizmet veriyorsunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Türkiye geneli 81 ilde Turkcell Superbox başvurusu kabul ediyoruz. Paket fiyatları tüm Türkiye\'de aynıdır; adresinizdeki 5G/4.5G kapsaması telefon görüşmesinde teyit edilir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Superbox 5G ile 4.5G paketleri arasındaki fark nedir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Superbox 5G Hazır paketleri sabit evde internettir: kurulum adresinize tanımlanır ve 5G hızında çalışır. Superbox 4.5G paketleri taşınabilirdir: cihazı yanınıza alarak evde, iş yerinde veya yazlıkta dilediğiniz adreste kullanabilirsiniz. Mevcut Turkcell hattınız olmasa da başvurabilirsiniz.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesLd) }}
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
