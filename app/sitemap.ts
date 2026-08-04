import type { MetadataRoute } from 'next';

const BASE_URL = 'https://internetbasvuru.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/rehber`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kvkk`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cerez-politikasi`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
