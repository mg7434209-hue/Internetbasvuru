import type { MetadataRoute } from 'next';
import { allPackages, campaigns, getPackageSlug } from '@/data/packages';
import { regions } from '@/data/regions';

const BASE_URL = 'https://internetbasvuru.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/paketler`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/kampanyalar`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/bolgeler`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/basvuru`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/rehber`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/sss`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/kvkk-aydinlatma`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const packagePages = allPackages.map((pkg) => ({
    url: `${BASE_URL}/paketler/${getPackageSlug(pkg)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const campaignPages = campaigns.map((c) => ({
    url: `${BASE_URL}/kampanyalar/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const regionPages = regions.map((r) => ({
    url: `${BASE_URL}/bolgeler/${r.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...packagePages, ...campaignPages, ...regionPages];
}
