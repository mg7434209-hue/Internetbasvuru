// Turkcell Superbox Evde İnternet Paketleri
// Kaynak: superonline.net / turkcell.com.tr Superbox tarifeleri (Temmuz 2026)
// 5G Hazır: 500 GB / 1 TB / 2 TB · 4.5G: 100 GB(+50 hediye) / 300 GB(+50 hediye) / 1 TB
// Tüm paketler 12 ay taahhütlü TEK fiyattır; taahhüt süresince zam yapılmaz.

export type Network = '5G' | '4.5G';

export interface Package {
  type: 'superbox';
  id: string;
  name: string;             // "Superbox 5G Hazır 500 GB"
  network: Network;
  portable: boolean;        // false = sabit evde internet (5G) · true = taşınabilir (4.5G)
  quota: string;            // Gösterilen toplam kota (hediye GB dahil): "500 GB", "1 TB", "150 GB"
  priceMonthly: number;     // ₺/ay — 12 ay sabit
  commitmentMonths: number; // 12
  isPopular?: boolean;
  badge?: string;           // "En Popüler"
  features: string[];
}

/** Kullanım şekli etiketi: 5G sabit evde, 4.5G taşınabilir */
export function mobilityLabel(pkg: Package): string {
  return pkg.portable ? 'Taşınabilir · Evde ve Yanında' : 'Sabit Evde İnternet';
}

// Tüm Superbox paketlerinde ortak vaatler
export const STANDARD_FEATURES = [
  'Alt yapı derdi yok',
  'Tek priz yeterli',
  '12 ay sabit fiyat',
  'Aşım derdi yok',
];

// ============ SUPERBOX 5G HAZIR — Sabit Evde İnternet ============
export const packages5G: Package[] = [
  {
    type: 'superbox', id: 'sb5g-500', name: 'Superbox 5G Hazır 500 GB',
    network: '5G', portable: false, quota: '500 GB', priceMonthly: 900, commitmentMonths: 12,
    isPopular: true, badge: 'En Popüler', features: STANDARD_FEATURES,
  },
  {
    type: 'superbox', id: 'sb5g-1tb', name: 'Superbox 5G Hazır 1 TB',
    network: '5G', portable: false, quota: '1 TB', priceMonthly: 1200, commitmentMonths: 12,
    isPopular: true, badge: 'En Popüler', features: STANDARD_FEATURES,
  },
  {
    type: 'superbox', id: 'sb5g-2tb', name: 'Superbox 5G Hazır 2 TB',
    network: '5G', portable: false, quota: '2 TB', priceMonthly: 1500, commitmentMonths: 12,
    isPopular: true, badge: 'En Popüler', features: STANDARD_FEATURES,
  },
];

// ============ SUPERBOX 4.5G — Taşınabilir (Evde ve Yanında) ============
// 100 GB ve 300 GB tarifelerinde +50 GB hediye internet gösterilen kotaya dahildir.
export const packages45G: Package[] = [
  {
    type: 'superbox', id: 'sb45g-100', name: 'Superbox 4.5G 100 GB',
    network: '4.5G', portable: true, quota: '150 GB', priceMonthly: 790, commitmentMonths: 12,
    features: STANDARD_FEATURES,
  },
  {
    type: 'superbox', id: 'sb45g-300', name: 'Superbox 4.5G 300 GB',
    network: '4.5G', portable: true, quota: '350 GB', priceMonthly: 1000, commitmentMonths: 12,
    features: STANDARD_FEATURES,
  },
  {
    type: 'superbox', id: 'sb45g-1tb', name: 'Superbox 4.5G 1 TB',
    network: '4.5G', portable: true, quota: '1 TB', priceMonthly: 1500, commitmentMonths: 12,
    features: STANDARD_FEATURES,
  },
];

export const allPackages: Package[] = [...packages5G, ...packages45G];

// ============ YARDIMCI FONKSİYONLAR ============

export function getPackageById(id: string): Package | undefined {
  return allPackages.find(p => p.id === id);
}

/**
 * Kullanım profili + şebeke durumuna göre önerilen paket
 * hafif → 500 GB / 150 GB · orta → 1 TB / 350 GB · yoğun → 2 TB / 1 TB
 */
export function recommendPackage(
  usage: 'hafif' | 'orta' | 'yogun',
  network: Network
): Package {
  const list = network === '5G' ? packages5G : packages45G;
  switch (usage) {
    case 'hafif': return list[0];
    case 'orta':  return list[1];
    case 'yogun': return list[2];
  }
}
