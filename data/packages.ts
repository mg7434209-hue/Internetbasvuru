// Görsellerdeki resmi TT bayi fiyat listelerinden alınmış veri
// Son güncelleme: Nisan 2026

export type CampaignCategory =
  | 'bolgesel-avantaj'   // Manavgat, Alanya, Kepez — 18 ay
  | 'bolgesel-firsat'    // Muratpaşa — 24 ay, tek fiyat
  | 'fiber-gucu-yasa'    // Ana kampanya — tüm iller, 18 ay
  | 'tivibulu';          // TV+İnternet — 18 ay

export interface Package {
  id: string;
  speedMbps: number;
  campaignCategory: CampaignCategory;
  isUnlimited: boolean;
  // Fiyat yapısı
  priceFirstPeriod?: number;    // İlk X ay fiyatı (null ise tek fiyat)
  firstPeriodMonths?: number;
  priceLastPeriod?: number;     // Son X ay fiyatı
  priceMonthly?: number;         // Tek fiyat kampanyaları için
  commitmentMonths: number;
  modemFee: number;             // +90₺ veya +60₺
  extraFee?: number;            // Tivibulu için IPTV modem kira
  hasTv: boolean;
  isFeatured?: boolean;
}

// ============ BÖLGESEL AVANTAJ (Manavgat, Alanya, Kepez — 18 ay) ============
export const bolgeselAvantajPackages: Package[] = [
  { id: 'ba-16', speedMbps: 16, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 750, firstPeriodMonths: 9, priceLastPeriod: 890, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'ba-24', speedMbps: 24, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 750, firstPeriodMonths: 9, priceLastPeriod: 890, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'ba-50', speedMbps: 50, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 775, firstPeriodMonths: 9, priceLastPeriod: 905, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'ba-100', speedMbps: 100, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 775, firstPeriodMonths: 9, priceLastPeriod: 905, commitmentMonths: 18, modemFee: 90, hasTv: false, isFeatured: true },
  { id: 'ba-200', speedMbps: 200, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 825, firstPeriodMonths: 9, priceLastPeriod: 955, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'ba-300', speedMbps: 300, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 950, firstPeriodMonths: 9, priceLastPeriod: 1050, commitmentMonths: 18, modemFee: 90, hasTv: false, isFeatured: true },
  { id: 'ba-500', speedMbps: 500, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 1050, firstPeriodMonths: 9, priceLastPeriod: 1150, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'ba-750', speedMbps: 750, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 1100, firstPeriodMonths: 9, priceLastPeriod: 1200, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'ba-1000', speedMbps: 1000, campaignCategory: 'bolgesel-avantaj', isUnlimited: true, priceFirstPeriod: 1150, firstPeriodMonths: 9, priceLastPeriod: 1250, commitmentMonths: 18, modemFee: 90, hasTv: false, isFeatured: true },
];

// ============ BÖLGESEL FIRSAT (Muratpaşa — 24 ay, tek fiyat) ============
export const bolgeselFirsatPackages: Package[] = [
  { id: 'bf-24', speedMbps: 24, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 680, commitmentMonths: 24, modemFee: 90, hasTv: false },
  { id: 'bf-50', speedMbps: 50, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 720, commitmentMonths: 24, modemFee: 90, hasTv: false },
  { id: 'bf-100', speedMbps: 100, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 720, commitmentMonths: 24, modemFee: 90, hasTv: false, isFeatured: true },
  { id: 'bf-200', speedMbps: 200, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 760, commitmentMonths: 24, modemFee: 90, hasTv: false },
  { id: 'bf-300', speedMbps: 300, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 800, commitmentMonths: 24, modemFee: 90, hasTv: false, isFeatured: true },
  { id: 'bf-500', speedMbps: 500, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 880, commitmentMonths: 24, modemFee: 90, hasTv: false },
  { id: 'bf-750', speedMbps: 750, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 920, commitmentMonths: 24, modemFee: 90, hasTv: false },
  { id: 'bf-1000', speedMbps: 1000, campaignCategory: 'bolgesel-firsat', isUnlimited: true, priceMonthly: 960, commitmentMonths: 24, modemFee: 90, hasTv: false, isFeatured: true },
];

// ============ FİBER GÜCÜ YAŞA (Ana kampanya — tüm iller, 18 ay) ============
export const fiberGucuYasaPackages: Package[] = [
  { id: 'fgy-16', speedMbps: 16, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 800, firstPeriodMonths: 9, priceLastPeriod: 900, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-24', speedMbps: 24, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 800, firstPeriodMonths: 9, priceLastPeriod: 900, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-50', speedMbps: 50, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 850, firstPeriodMonths: 9, priceLastPeriod: 950, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-100', speedMbps: 100, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 850, firstPeriodMonths: 9, priceLastPeriod: 950, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-200', speedMbps: 200, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 900, firstPeriodMonths: 9, priceLastPeriod: 1050, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-300', speedMbps: 300, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 950, firstPeriodMonths: 9, priceLastPeriod: 1150, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-500', speedMbps: 500, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 1050, firstPeriodMonths: 9, priceLastPeriod: 1200, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-750', speedMbps: 750, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 1100, firstPeriodMonths: 9, priceLastPeriod: 1250, commitmentMonths: 18, modemFee: 90, hasTv: false },
  { id: 'fgy-1000', speedMbps: 1000, campaignCategory: 'fiber-gucu-yasa', isUnlimited: true, priceFirstPeriod: 1150, firstPeriodMonths: 9, priceLastPeriod: 1250, commitmentMonths: 18, modemFee: 90, hasTv: false },
];

// ============ TİVİBULU (TV+İnternet — 18 ay) ============
export const tivibuluPackages: Package[] = [
  { id: 'tv-16', speedMbps: 16, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 570, firstPeriodMonths: 3, priceLastPeriod: 1055, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-24', speedMbps: 24, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 570, firstPeriodMonths: 3, priceLastPeriod: 1055, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-50', speedMbps: 50, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 620, firstPeriodMonths: 3, priceLastPeriod: 1115, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-100', speedMbps: 100, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 620, firstPeriodMonths: 3, priceLastPeriod: 1115, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-200', speedMbps: 200, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 670, firstPeriodMonths: 3, priceLastPeriod: 1165, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-300', speedMbps: 300, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 720, firstPeriodMonths: 3, priceLastPeriod: 1215, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true, isFeatured: true },
  { id: 'tv-500', speedMbps: 500, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 770, firstPeriodMonths: 3, priceLastPeriod: 1315, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-750', speedMbps: 750, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 820, firstPeriodMonths: 3, priceLastPeriod: 1365, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
  { id: 'tv-1000', speedMbps: 1000, campaignCategory: 'tivibulu', isUnlimited: true, priceFirstPeriod: 820, firstPeriodMonths: 3, priceLastPeriod: 1425, commitmentMonths: 18, modemFee: 60, extraFee: 60, hasTv: true },
];

export const allPackages = [
  ...bolgeselAvantajPackages,
  ...bolgeselFirsatPackages,
  ...fiberGucuYasaPackages,
  ...tivibuluPackages,
];

// ============ KAMPANYA META BİLGİLERİ ============
export interface Campaign {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  commitmentMonths: number;
  applicableRegions: string[];
  modemFee: number;
  packages: Package[];
  highlight?: string;
}

export const campaigns: Campaign[] = [
  {
    slug: 'bolgesel-avantaj',
    name: 'Bölgesel Avantaj Kampanyası',
    shortName: 'Bölgesel Avantaj',
    description: 'Manavgat, Alanya ve Kepez bölgelerinde geçerli 18 ay taahhütlü avantajlı paketler.',
    commitmentMonths: 18,
    applicableRegions: ['Manavgat', 'Alanya', 'Kepez'],
    modemFee: 90,
    packages: bolgeselAvantajPackages,
    highlight: 'Antalya bölgesi özel fiyatları',
  },
  {
    slug: 'bolgesel-firsat',
    name: 'Bölgesel Fırsat Kampanyası',
    shortName: 'Bölgesel Fırsat',
    description: 'Muratpaşa bölgesine özel 24 ay taahhütlü, tek fiyatla sabit kalan internet paketleri.',
    commitmentMonths: 24,
    applicableRegions: ['Muratpaşa'],
    modemFee: 90,
    packages: bolgeselFirsatPackages,
    highlight: '24 ay tek fiyat — artış yok',
  },
  {
    slug: 'fiber-gucu-yasa',
    name: 'Fiber Gücü Yaşa Kampanyası',
    shortName: 'Fiber Gücü Yaşa',
    description: 'Türkiye genelinde tüm illerde geçerli, 18 ay taahhütlü ana fiber internet kampanyası.',
    commitmentMonths: 18,
    applicableRegions: ['Tüm İller'],
    modemFee: 90,
    packages: fiberGucuYasaPackages,
    highlight: 'Tüm Türkiye geçerli',
  },
  {
    slug: 'tivibulu',
    name: 'Tivibu\'lu İnternet Kampanyası',
    shortName: 'Tivibu\'lu İnternet',
    description: 'Sinema, spor ve binlerce içerik için Tivibu TV ile birlikte internet paketleri.',
    commitmentMonths: 18,
    applicableRegions: ['Tüm İller'],
    modemFee: 60,
    packages: tivibuluPackages,
    highlight: 'TV + İnternet birlikte',
  },
];

// Öne çıkan paketler (ana sayfa için)
export const featuredPackages = allPackages.filter(p => p.isFeatured);

// Yardımcı: paket effective fiyatını hesapla
export function getEffectivePrice(pkg: Package): { display: string; note: string } {
  if (pkg.priceMonthly) {
    return {
      display: `${pkg.priceMonthly}₺`,
      note: 'Aylık sabit',
    };
  }
  if (pkg.priceFirstPeriod) {
    return {
      display: `${pkg.priceFirstPeriod}₺`,
      note: `İlk ${pkg.firstPeriodMonths} ay`,
    };
  }
  return { display: '—', note: '' };
}

// Paket slug oluşturucu
export function getPackageSlug(pkg: Package): string {
  return `${pkg.campaignCategory}-${pkg.speedMbps}-mbps`;
}
