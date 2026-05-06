import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
 
// =============================================
// VIEWPORT — mobile için kritik
// Next.js 14+ ayrı export gerektiriyor
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
    // opengraph-image.png otomatik kullanılır (app/ içinde)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Türk Telekom Fiber İnternet Başvurusu',
    description: 'Türkiye geneli yetkili bayiden hızlı kurulum. 18 ay sabit fiyat.',
    // twitter-image.png otomatik kullanılır
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
  // PWA manifest (public/manifest.json)
  manifest: '/manifest.json',
  // Search Console verification — Mustafa hesap açtığında ekleyecek
  // verification: {
  //   google: 'google-site-verification-code-here',
  //   yandex: 'yandex-verification-code-here',
  // },
  other: {
    // Google Ads / SEO için: doğru lokasyon
    'geo.region': 'TR-07',
    'geo.placename': 'Manavgat, Antalya',
    'geo.position': '36.7867;31.4374',
    ICBM: '36.7867, 31.4374',
  },
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD: LocalBusiness structured data
  // NOT: 0850 hat alınınca telephone alanı geri eklenecek
  const jsonLd = {
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
  };
 
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
