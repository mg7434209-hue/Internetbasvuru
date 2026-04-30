import { headers } from 'next/headers';
import { findCityByName, type City } from '@/data/turkey';

/**
 * Server Component'lerde Cloudflare IP geo bilgisini al.
 * Header üzerinden gelir (Cloudflare otomatik ekler).
 *
 * Kullanım:
 *   const detected = await getDetectedLocation();
 *   if (detected.city?.coverage === 'covered') { ... }
 */
export async function getDetectedLocation(): Promise<{
  country: string;
  cityName: string;
  city: City | undefined;
}> {
  const h = await headers();

  // Cloudflare header'ları (proxy aktifse otomatik gelir)
  const country = h.get('cf-ipcountry') || h.get('x-detected-country') || '';
  const cityName = h.get('cf-ipcity') || h.get('x-detected-city') || '';

  // Türkiye il adıyla eşleştir
  const city = findCityByName(cityName);

  return {
    country: country.toUpperCase(),
    cityName,
    city,
  };
}
