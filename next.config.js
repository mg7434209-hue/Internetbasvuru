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
      // Silinen SSS sayfası → Rehber'e yönlendir
      { source: '/sss', destination: '/rehber', permanent: true },
      // Eski paket detay sayfaları → ana sayfa
      { source: '/paketler/:slug*', destination: '/', permanent: true },
      { source: '/paketler', destination: '/', permanent: true },
      // Silinen KVKK → çerez politikası (KVKK içeriği orada)
      { source: '/kvkk', destination: '/cerez-politikasi', permanent: true },
    ];
  },
};

module.exports = nextConfig;
