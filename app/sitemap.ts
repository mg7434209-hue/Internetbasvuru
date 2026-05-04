import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://internetbasvuru.com';
  const lastModified = new Date();

  const staticPages = [
    '',
    '/basvuru',
    '/iletisim',
    '/hakkimizda',
    '/sss',
    '/rehber',
    '/kvkk-aydinlatma',
    '/cerez-politikasi',
    '/gizlilik-politikasi',
    '/kullanim-sartlari',
  ];

  return staticPages.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.7,
  }));
}
