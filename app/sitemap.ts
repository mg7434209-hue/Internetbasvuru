import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://internetbasvuru.com';
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${base}/rehber`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${base}/iletisim`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];
}
