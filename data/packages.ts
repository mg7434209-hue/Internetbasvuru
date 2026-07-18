// Turkcell Superbox Evde İnternet Paketleri
// Akıllı kampanya seçimi: il/ilçe + TV+ tercihine göre doğru fiyat
// Superbox: kablosuz (4.5G/5G) evde internet — kablo/altyapı beklemeden kurulum
// Son güncelleme: Temmuz 2026

import { type CampaignZone } from './turkey';

export interface Package {
  type: 'fiber';                // ← Discriminator (GB'li paketlerle ayırt etmek için — dahili anahtar, UI'da görünmez)
  id: string;
  speedMbps: number;
  // Fiyat: ilk 9 ay (Hoş Geldin) + 10-18. ay
  priceFirstPeriod: number;     // İlk 9 ay
  priceSecondPeriod: number;    // 10-18. ay
  // Bölgesel Fırsat'ta tek fiyat (24 ay)
  priceMonthly?: number;
  commitmentMonths: number;     // 18 veya 24
  isPopular?: boolean;          // Vitrinde gösterilecek mi
  badge?: string;               // "En Çok Tercih Edilen"
  campaignName?: string;        // "Superbox 5G Fırsat"
  features?: string[];          // Vitrin için özellikler
}

// ============ STANDART (Superbox Limitsiz - 81 il) - 18 ay ============
// 16-50 Mbps: Superbox 4.5G Limitsiz · 100 Mbps ve üzeri: Superbox 5G Limitsiz
export const standartPackages: Package[] = [
  { type: 'fiber', id: 'std-16',   speedMbps: 16,   priceFirstPeriod: 800,  priceSecondPeriod: 900,  commitmentMonths: 18 },
  { type: 'fiber', id: 'std-24',   speedMbps: 24,   priceFirstPeriod: 800,  priceSecondPeriod: 900,  commitmentMonths: 18 },
  { type: 'fiber', id: 'std-35',   speedMbps: 35,   priceFirstPeriod: 850,  priceSecondPeriod: 950,  commitmentMonths: 18 },
  { type: 'fiber', id: 'std-50',   speedMbps: 50,   priceFirstPeriod: 850,  priceSecondPeriod: 950,  commitmentMonths: 18,
    isPopular: true, badge: 'Başlangıç', campaignName: 'Superbox Limitsiz 50',
    features: ['Kablosuz kurulum — altyapı beklemeden', '18 ay sabit fiyat sözü', 'Kotasız, limitsiz internet'] },
  { type: 'fiber', id: 'std-100',  speedMbps: 100,  priceFirstPeriod: 900,  priceSecondPeriod: 1000, commitmentMonths: 18 },
  { type: 'fiber', id: 'std-200',  speedMbps: 200,  priceFirstPeriod: 950,  priceSecondPeriod: 1050, commitmentMonths: 18,
    isPopular: true, badge: 'En Çok Tercih Edilen', campaignName: 'Superbox 5G Fırsat',
    features: ['5G hızında kotasız internet', '4K Ultra HD kesintisiz yayın', '18 ay enflasyon koruması'] },
  { type: 'fiber', id: 'std-500',  speedMbps: 500,  priceFirstPeriod: 1050, priceSecondPeriod: 1150, commitmentMonths: 18 },
  { type: 'fiber', id: 'std-750',  speedMbps: 750,  priceFirstPeriod: 1100, priceSecondPeriod: 1200, commitmentMonths: 18 },
  { type: 'fiber', id: 'std-1000', speedMbps: 1000, priceFirstPeriod: 1150, priceSecondPeriod: 1250, commitmentMonths: 18,
    isPopular: true, badge: 'En Hızlı', campaignName: 'Superbox 5G Max',
    features: ['5G ile ışık hızında internet', 'Profesyonel oyuncu ping', 'Kalabalık ev/ofis için ideal'] },
];

// ============ BÖLGESEL AVANTAJ (Manavgat, Alanya, Kepez) - 18 ay ============
export const bolgeselAvantajPackages: Package[] = [
  { type: 'fiber', id: 'ba-16',   speedMbps: 16,   priceFirstPeriod: 750,  priceSecondPeriod: 890,  commitmentMonths: 18 },
  { type: 'fiber', id: 'ba-24',   speedMbps: 24,   priceFirstPeriod: 750,  priceSecondPeriod: 890,  commitmentMonths: 18 },
  { type: 'fiber', id: 'ba-35',   speedMbps: 35,   priceFirstPeriod: 775,  priceSecondPeriod: 905,  commitmentMonths: 18 },
  { type: 'fiber', id: 'ba-50',   speedMbps: 50,   priceFirstPeriod: 775,  priceSecondPeriod: 905,  commitmentMonths: 18,
    isPopular: true, badge: 'Başlangıç', campaignName: 'Bölgesel Avantaj 50',
    features: ['Bölgesel kampanya fiyatı', 'Kablosuz kurulum — altyapı beklemeden', '18 ay sabit fiyat'] },
  { type: 'fiber', id: 'ba-100',  speedMbps: 100,  priceFirstPeriod: 825,  priceSecondPeriod: 955,  commitmentMonths: 18 },
  { type: 'fiber', id: 'ba-200',  speedMbps: 200,  priceFirstPeriod: 950,  priceSecondPeriod: 1050, commitmentMonths: 18,
    isPopular: true, badge: 'En Çok Tercih Edilen', campaignName: 'Bölgesel Avantaj 5G 200',
    features: ['5G hızında kotasız internet', 'Bölgesel özel fiyat', '18 ay enflasyon koruması'] },
  { type: 'fiber', id: 'ba-500',  speedMbps: 500,  priceFirstPeriod: 1050, priceSecondPeriod: 1150, commitmentMonths: 18 },
  { type: 'fiber', id: 'ba-750',  speedMbps: 750,  priceFirstPeriod: 1100, priceSecondPeriod: 1200, commitmentMonths: 18 },
  { type: 'fiber', id: 'ba-1000', speedMbps: 1000, priceFirstPeriod: 1150, priceSecondPeriod: 1250, commitmentMonths: 18,
    isPopular: true, badge: 'En Hızlı', campaignName: 'Bölgesel Avantaj 5G Max',
    features: ['5G ile ışık hızında bölgesel fiyat', 'Profesyonel oyuncu ping', 'Kalabalık ev/ofis için'] },
];

// ============ BÖLGESEL FIRSAT (Muratpaşa) - 24 ay TEK FİYAT ============
export const bolgeselFirsatPackages: Package[] = [
  { type: 'fiber', id: 'bf-24',   speedMbps: 24,   priceFirstPeriod: 680,  priceSecondPeriod: 680,  priceMonthly: 680,  commitmentMonths: 24 },
  { type: 'fiber', id: 'bf-35',   speedMbps: 35,   priceFirstPeriod: 720,  priceSecondPeriod: 720,  priceMonthly: 720,  commitmentMonths: 24 },
  { type: 'fiber', id: 'bf-50',   speedMbps: 50,   priceFirstPeriod: 720,  priceSecondPeriod: 720,  priceMonthly: 720,  commitmentMonths: 24,
    isPopular: true, badge: 'Başlangıç', campaignName: 'Bölgesel Fırsat 50',
    features: ['24 ay TEK fiyat (zam yok)', 'Kablosuz kurulum — altyapı beklemeden', 'Bölgesel özel fiyat'] },
  { type: 'fiber', id: 'bf-100',  speedMbps: 100,  priceFirstPeriod: 760,  priceSecondPeriod: 760,  priceMonthly: 760,  commitmentMonths: 24 },
  { type: 'fiber', id: 'bf-200',  speedMbps: 200,  priceFirstPeriod: 800,  priceSecondPeriod: 800,  priceMonthly: 800,  commitmentMonths: 24,
    isPopular: true, badge: 'En Çok Tercih Edilen', campaignName: 'Bölgesel Fırsat 5G 200',
    features: ['24 ay TEK fiyat (zam yok)', '5G hızında kotasız internet', 'Bölgesel özel fiyat'] },
  { type: 'fiber', id: 'bf-500',  speedMbps: 500,  priceFirstPeriod: 880,  priceSecondPeriod: 880,  priceMonthly: 880,  commitmentMonths: 24 },
  { type: 'fiber', id: 'bf-750',  speedMbps: 750,  priceFirstPeriod: 920,  priceSecondPeriod: 920,  priceMonthly: 920,  commitmentMonths: 24 },
  { type: 'fiber', id: 'bf-1000', speedMbps: 1000, priceFirstPeriod: 960,  priceSecondPeriod: 960,  priceMonthly: 960,  commitmentMonths: 24,
    isPopular: true, badge: 'En Hızlı', campaignName: 'Bölgesel Fırsat 5G Max',
    features: ['24 ay TEK fiyat', '5G ile ışık hızında internet', 'Profesyonel oyuncu ping'] },
];

// ============ TV+ (TV+İnternet ek seçeneği için fiyat farkı) ============
export const TV_EXTRA_FEE = 250;        // Turkcell TV+ eklendiğinde aylık ek
export const MODEM_RENTAL_FEE = 90;     // Superbox cihazı kiralama (opsiyonel)

// ============ ANA FONKSİYONLAR ============

/**
 * il/ilçe ve TV+ tercihine göre doğru paket listesini döndürür
 * Mockup mantığı: kullanıcı 9 hız görür ama fiyatlar bölgeye göre değişir
 */
export function getPackagesForLocation(zone: CampaignZone): Package[] {
  switch (zone) {
    case 'bolgesel-avantaj':
      return bolgeselAvantajPackages;
    case 'bolgesel-firsat':
      return bolgeselFirsatPackages;
    default:
      return standartPackages;
  }
}

/**
 * Vitrinde gösterilecek 3 popüler paket
 */
export function getFeaturedPackages(zone: CampaignZone = 'standart'): Package[] {
  return getPackagesForLocation(zone).filter(p => p.isPopular);
}

/**
 * Belirli bir hız için paket bulur
 */
export function getPackageBySpeed(speedMbps: number, zone: CampaignZone = 'standart'): Package | undefined {
  return getPackagesForLocation(zone).find(p => p.speedMbps === speedMbps);
}

/**
 * Kullanım profiline göre önerilen hız
 * hafif → 50, orta → 200, yoğun → 1000
 */
export function recommendSpeed(usage: 'hafif' | 'orta' | 'yogun'): number {
  switch (usage) {
    case 'hafif': return 50;
    case 'orta':  return 200;
    case 'yogun': return 1000;
  }
}

/**
 * Paket fiyatını TV+ ve cihaz ile birlikte hesaplar
 */
export function calcPackagePrices(
  pkg: Package,
  options: { tv: boolean; modem: boolean }
): { firstPeriod: number; secondPeriod: number; isFlat: boolean } {
  const tvAdd = options.tv ? TV_EXTRA_FEE : 0;
  const modemAdd = options.modem ? MODEM_RENTAL_FEE : 0;

  // Bölgesel Fırsat = tek fiyat
  if (pkg.priceMonthly !== undefined) {
    return {
      firstPeriod: pkg.priceMonthly + tvAdd + modemAdd,
      secondPeriod: pkg.priceMonthly + tvAdd + modemAdd,
      isFlat: true,
    };
  }

  return {
    firstPeriod: pkg.priceFirstPeriod + tvAdd + modemAdd,
    secondPeriod: pkg.priceSecondPeriod + tvAdd + modemAdd,
    isFlat: false,
  };
}

/**
 * Kampanya zone'unun adını döndür (UI'da göstermek için)
 */
export function getCampaignDisplayName(zone: CampaignZone): string {
  switch (zone) {
    case 'bolgesel-avantaj': return 'Bölgesel Avantaj';
    case 'bolgesel-firsat':  return 'Bölgesel Fırsat (24 ay tek fiyat)';
    default: return 'Superbox Limitsiz';
  }
}

/**
 * Ana sayfa için: standart fiyatlarla 3 popüler paket
 * Kullanıcı il seçince Wizard'da gerçek bölgesel fiyat gelecek
 */
export const featuredPackages = getFeaturedPackages('standart');
export const allStandartPackages = standartPackages;

// Tüm paketler (legacy uyumluluk için)
export const allPackages = [
  ...standartPackages,
  ...bolgeselAvantajPackages,
  ...bolgeselFirsatPackages,
];

// ============================================================
// SUPERBOX GB'Lİ PAKETLER (Ekonomik kotalı seçenekler)
// Limitsiz yerine aylık GB kotasıyla daha uygun fiyat isteyenler için
// (Dahili tip adı 'turbobox' geriye dönük uyumluluk için korunmuştur;
//  arayüzde her yerde "Superbox GB'li Paket" olarak görünür.)
// ============================================================

export const TURBOBOX_MODEM_FEE = 240;  // Superbox cihazı (kiralama) aylık ücreti

export type TurboBoxPackage = {
  type: 'turbobox';          // ← Discriminator (dahili anahtar, UI'da görünmez)
  id: string;
  data: string;              // "250", "500", "∞"
  unit: 'GB' | 'Limitsiz';
  campaignName: string;
  dataPrice: number;         // Sadece veri ücreti (taahhütlü tarife ücreti)
  total45gDataPrice: number | null;  // 4.5G muadili veri ücreti (Limitsiz için null)
  data45gLabel: string;      // 4.5G muadili kapasite metni
  features: string[];
  isPopular?: boolean;
  badge?: string;
};

export type TurboBoxOptions = {
  modemChoice: 'have' | 'rent';     // "have" = müşterinin Superbox cihazı var, "rent" = kirala
  signal5g: 'yes' | 'no' | 'unsure'; // 5G şebeke durumu
};

export const turboBoxPackages: TurboBoxPackage[] = [
  {
    type: 'turbobox',
    id: 'turbobox-250',
    data: '250',
    unit: 'GB',
    campaignName: 'Superbox 250 GB',
    dataPrice: 960,
    total45gDataPrice: 660,
    data45gLabel: '250 GB',
    features: [
      'Tak-çalıştır Superbox 5G cihaz desteği',
      'Çift kişilik kullanım',
      'Tek hattan paylaşım',
    ],
    isPopular: false,
  },
  {
    type: 'turbobox',
    id: 'turbobox-500',
    data: '500',
    unit: 'GB',
    campaignName: 'Superbox 500 GB',
    dataPrice: 1160,
    total45gDataPrice: 1060,
    data45gLabel: '500 GB',
    features: [
      'HD streaming + video konferans',
      'Aileler için ideal kapasite',
      'En çok tercih edilen',
    ],
    isPopular: true,
    badge: 'En Çok Tercih Edilen',
  },
  {
    type: 'turbobox',
    id: 'turbobox-limitsiz',
    data: '∞',
    unit: 'Limitsiz',
    campaignName: 'Superbox GB Limitsiz',
    dataPrice: 1510,
    total45gDataPrice: null,
    data45gLabel: '500 GB (en yakın)',
    features: [
      'Veri kotası yok',
      'Sınırsız kullanım',
      'Yoğun kullanım için ideal',
    ],
    isPopular: false,
  },
];

/**
 * Superbox GB'li paket toplam aylık ücret hesaplaması.
 * Cihaz kiralanırsa veri ücretine sabit cihaz ücreti eklenir.
 */
export function calcTurboBoxPrice(
  pkg: TurboBoxPackage,
  options: TurboBoxOptions
): number {
  return pkg.dataPrice + (options.modemChoice === 'rent' ? TURBOBOX_MODEM_FEE : 0);
}

// ============================================================
// DISCRIMINATED UNION + TYPE GUARDS
// LeadModal'da Limitsiz ve GB'li paketleri tek prop'la kabul
// edebilmek için union tipi ve type-safe ayırt etme yardımcıları.
// ============================================================

/**
 * Limitsiz veya GB'li paket — LeadModal'da ortak prop tipi
 */
export type AnyPackage = Package | TurboBoxPackage;

/**
 * TypeScript type guard — GB'li (kotalı) paket mi kontrol eder
 * Kullanım: if (isTurboBox(pkg)) { pkg.data güvenli kullanılır }
 */
export function isTurboBox(pkg: AnyPackage): pkg is TurboBoxPackage {
  return pkg.type === 'turbobox';
}

/**
 * TypeScript type guard — Limitsiz (hız bazlı) paket mi kontrol eder
 * Kullanım: if (isFiber(pkg)) { pkg.speedMbps güvenli kullanılır }
 */
export function isFiber(pkg: AnyPackage): pkg is Package {
  return pkg.type === 'fiber';
}
