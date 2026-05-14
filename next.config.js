/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // ============ MEVCUT REDIRECT'LER ============
      // Silinen SSS sayfası → Rehber'e yönlendir
      { source: '/sss', destination: '/rehber', permanent: true },
      // Eski paket detay sayfaları → ana sayfa
      { source: '/paketler/:slug*', destination: '/', permanent: true },
      { source: '/paketler', destination: '/', permanent: true },
      // Silinen KVKK → çerez politikası (KVKK içeriği orada)
      { source: '/kvkk', destination: '/cerez-politikasi', permanent: true },

      // ============ YENİ: Çürük kampanya URL'leri → wizard ============
      // Google indexinde duran eski Bölgesel Fırsat sayfaları
      { source: '/bolgesel-firsat-:speed-mbps', destination: '/#wizard', permanent: true },
      { source: '/bolgesel-firsat', destination: '/#wizard', permanent: true },
      // Bölgesel Avantaj eski URL'leri (Manavgat/Alanya/Kepez)
      { source: '/bolgesel-avantaj-:speed-mbps', destination: '/#wizard', permanent: true },
      { source: '/bolgesel-avantaj', destination: '/#wizard', permanent: true },
      // Standart Fiber Gücü eski URL'leri
      { source: '/fiber-gucu-:speed-mbps', destination: '/#wizard', permanent: true },
      // Defansif: pure /1000-mbps gibi URL'ler (Google'da varsa yakalar)
      { source: '/:speed(\\d+)-mbps', destination: '/#wizard', permanent: true },
    ];
  },
};
module.exports = nextConfig;
