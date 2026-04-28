import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  metadataBase: new URL('https://internetbasvuru.com'),
  title: {
    default: 'Türk Telekom Fiber İnternet Başvurusu | Yetkili Bayi',
    template: '%s | internetbasvuru.com',
  },
  description: 'Türk Telekom fiber internet paketleri için online başvuru. Antalya, Manavgat, Alanya, Muratpaşa bölgesel kampanyaları. Yetkili bayiden hızlı kurulum.',
  keywords: ['türk telekom', 'fiber internet', 'tt bayi', 'internet başvuru', 'manavgat internet', 'alanya fiber', 'antalya ttnet'],
  authors: [{ name: 'Göksoylar İletişim Ltd. Şti.' }],
  creator: 'Göksoylar İletişim Ltd. Şti.',
  publisher: 'Göksoylar İletişim Ltd. Şti.',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://internetbasvuru.com',
    siteName: 'internetbasvuru.com',
    title: 'Türk Telekom Fiber İnternet Başvurusu | Yetkili Bayi',
    description: 'Türk Telekom fiber internet paketleri için online başvuru. Antalya bölgesel kampanyaları.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Türk Telekom Fiber İnternet Başvurusu',
    description: 'Antalya ve Türkiye geneli Türk Telekom fiber başvurusu, yetkili bayiden hızlı kurulum.',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Göksoylar İletişim - Türk Telekom Yetkili Bayi',
    alternateName: 'internetbasvuru.com',
    description: 'Türk Telekom fiber internet yetkili bayisi. Antalya bölgesi kampanyaları.',
    url: 'https://internetbasvuru.com',
    telephone: '+90-534-977-70-00',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manavgat',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    areaServed: [
      { '@type': 'City', name: 'Manavgat' },
      { '@type': 'City', name: 'Alanya' },
      { '@type': 'City', name: 'Antalya' },
      { '@type': 'Country', name: 'Türkiye' },
    ],
    priceRange: '₺₺',
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
        <WhatsAppFloat />
      </body>
    </html>
  );
}
