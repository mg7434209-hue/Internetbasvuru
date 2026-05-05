// Türk Telekom Fiber İnternet Paketleri
// Akıllı kampanya seçimi: il/ilçe + TV tercihine göre doğru fiyat
// Son güncelleme: Mayıs 2026
//
// MİMARİ NOT (v12):
// - Sitede SADECE standartPackages (TT resmi fiyatlar) gösterilir
// - bolgeselAvantajPackages ve bolgeselFirsatPackages SİTE'DE GÖRÜNMEZ
// - Bunlar arka planda lead'e zone olarak iliştirilir
// - Müşteri il/ilçe seçince modal'da yumuşak bir "bölgenize özel indirim var" mesajı çıkar
// - Bayi telefon görüşmesinde gerçek bölgesel fiyatı sunar (admin paneli üzerinden)

import { type CampaignZone } from './turkey';

export interface Package {
  id: string;
  speedMbps: number;
  // Fiyat: ilk 9 ay (Hoş Geldin) + 10-18. ay
  priceFirstPeriod: number;     // İlk 9 ay
  priceSecondPeriod: number;    // 10-18. ay
  // Bölgesel Fırsat'ta tek fiyat (24 ay)
  priceMonthly?: number;
  commitmentMonths: number;     // 18 veya 24
  isPopular?: boolean;          // Vitrinde gösterilecek mi
  isFeatured?: boolean;         // En çok öne çıkan kart (özel border)
  badge?: string;               // "En Çok Tercih Edilen"
  campaignName?: string;        // "Fiber Gücü Fırsat"
  features?: string[];          // Vitrin için özellikler
}

// ============ STANDART (Fiber Gücü Yaşa - 81 il) - 18 ay ============
// SİTEDE GÖRÜNEN paketler bunlardır
export const standartPackages: Package[] = [
  { id: 'std-16',   speedMbps: 16,   priceFirstPeriod: 800,  priceSecondPeriod: 900,  commitmentMonths: 18 },
  { id: 'std-24',   speedMbps: 24,   priceFirstPeriod: 800,  priceSecondPeriod: 900,  commitmentMonths: 18 },
  { id: 'std-50',   speedMbps: 50,   priceFirstPeriod: 850,  priceSecondPeriod: 950,  commitmentMonths: 18 },
  { id: 'std-100',  speedMbps: 100,  priceFirstPeriod: 850,  priceSecondPeriod: 950,  commitmentMonths: 18,
    isPopular: true, badge: 'Başlangıç', campaignName: 'Fiber Gücü Başlangıç',
    features: ['Ücretsiz kurulum', '18 ay sabit fiyat sözü', 'Limitsiz yüksek hız'] },
  { id: 'std-200',  speedMbps: 200,  priceFirstPeriod: 900,  priceSecondPeriod: 1000, commitmentMonths: 18 },
  { id: 'std-300',  speedMbps: 300,  priceFirstPeriod: 950,  priceSecondPeriod: 1050, commitmentMonths: 18,
    isPopular: true, isFeatured: true, badge: 'En Çok Tercih Edilen', campaignName: 'Fiber Gücü Fırsat',
    features: ['4K Ultra HD kesintisiz yayın', 'Limitsiz yüksek hız', '18 ay enflasyon koruması'] },
  { id: 'std-500',  speedMbps: 500,  priceFirstPeriod: 1050, priceSecondPeriod: 1150, commitmentMonths: 18 },
  { id: 'std-750',  speedMbps: 750,  priceFirstPeriod: 1100, priceSecondPeriod: 1200, commitmentMonths: 18 },
  { id: 'std-1000', speedMbps: 1000, priceFirstPeriod: 1150, priceSecondPeriod: 1250, commitmentMonths: 18,
    isPopular: true, badge: 'En Hızlı', campaignName: 'GigaFiber Gücü',
    features: ['Işık hızında download/upload', 'Profesyonel oyuncu ping', 'Kalabalık ev/ofis için ideal'] },
];

// ============ BÖLGESEL AVANTAJ (Manavgat, Alanya, Kepez) - 18 ay ============
// SİTEDE GÖRÜNMEZ — bayi telefon görüşmesinde sunar
export const bolgeselAvantajPackages: Package[] = [
  { id: 'ba-16',   speedMbps: 16,   priceFirstPeriod: 750,  priceSecondPeriod: 890,  commitmentMonths: 18 },
  { id: 'ba-24',   speedMbps: 24,   priceFirstPeriod: 750,  priceSecondPeriod: 890,  commitmentMonths: 18 },
  { id: 'ba-50',   speedMbps: 50,   priceFirstPeriod: 775,  priceSecondPeriod: 905,  commitmentMonths: 18 },
  { id: 'ba-100',  speedMbps: 100,  priceFirstPeriod: 775,  priceSecondPeriod: 905,  commitmentMonths: 18,
    isPopular: true, badge: 'Başlangıç', campaignName: 'Bölgesel Avantaj 100',
    features: ['Bölgesel kampanya fiyatı', 'Ücretsiz kurulum', '18 ay sabit fiyat'] },
  { id: 'ba-200',  speedMbps: 200,  priceFirstPeriod: 825,  priceSecondPeriod: 955,  commitmentMonths: 18 },
  { id: 'ba-300',  speedMbps: 300,  priceFirstPeriod: 950,  priceSecondPeriod: 1050, commitmentMonths: 18,
    isPopular: true, badge: 'En Çok Tercih Edilen', campaignName: 'Bölgesel Avantaj 300',
    features: ['4K kesintisiz yayın', 'Bölgesel özel fiyat', '18 ay enflasyon koruması'] },
  { id: 'ba-500',  speedMbps: 500,  priceFirstPeriod: 1050, priceSecondPeriod: 1150, commitmentMonths: 18 },
  { id: 'ba-750',  speedMbps: 750,  priceFirstPeriod: 1100, priceSecondPeriod: 1200, commitmentMonths: 18 },
  { id: 'ba-1000', speedMbps: 1000, priceFirstPeriod: 1150, priceSecondPeriod: 1250, commitmentMonths: 18,
    isPopular: true, badge: 'En Hızlı', campaignName: 'Bölgesel Avantaj GigaFiber',
    features: ['Işık hızında bölgesel fiyat', 'Profesyonel oyuncu ping', 'Kalabalık ev/ofis için'] },
];

// ============ BÖLGESEL FIRSAT (Muratpaşa) - 24 ay TEK FİYAT ============
// SİTEDE GÖRÜNMEZ — bayi telefon görüşmesinde sunar
export const bolgeselFirsatPackages: Package[] = [
  { id: 'bf-24',   speedMbps: 24,   priceFirstPeriod: 680,  priceSecondPeriod: 680,  priceMonthly: 680,  commitmentMonths: 24 },
  { id: 'bf-50',   speedMbps: 50,   priceFirstPeriod: 720,  priceSecondPeriod: 720,  priceMonthly: 720,  commitmentMonths: 24 },
  { id: 'bf-100',  speedMbps: 100,  priceFirstPeriod: 720,  priceSecondPeriod: 720,  priceMonthly: 720,  commitmentMonths: 24,
    isPopular: true, badge: 'Başlangıç', campaignName: 'Bölgesel Fırsat 100',
    features: ['24 ay TEK fiyat (zam yok)', 'Ücretsiz kurulum', 'Bölgesel özel fiyat'] },
  { id: 'bf-200',  speedMbps: 200,  priceFirstPeriod: 760,  priceSecondPeriod: 760,  priceMonthly: 760,  commitmentMonths: 24 },
  { id: 'bf-300',  speedMbps: 300,  priceFirstPeriod: 800,  priceSecondPeriod: 800,  priceMonthly: 800,  commitmentMonths: 24,
    isPopular: true, badge: 'En Çok Tercih Edilen', campaignName: 'Bölgesel Fırsat 300',
    features: ['24 ay TEK fiyat (zam yok)', '4K kesintisiz yayın', 'Bölgesel özel fiyat'] },
  { id: 'bf-500',  speedMbps: 500,  priceFirstPeriod: 880,  priceSecondPeriod: 880,  priceMonthly: 880,  commitmentMonths: 24 },
  { id: 'bf-750',  speedMbps: 750,  priceFirstPeriod: 920,  priceSecondPeriod: 920,  priceMonthly: 920,  commitmentMonths: 24 },
  { id: 'bf-1000', speedMbps: 1000, priceFirstPeriod: 960,  priceSecondPeriod: 960,  priceMonthly: 960,  commitmentMonths: 24,
    isPopular: true, badge: 'En Hızlı', campaignName: 'Bölgesel Fırsat GigaFiber',
    features: ['24 ay TEK fiyat', 'Işık hızında upload/download', 'Profesyonel oyuncu ping'] },
];

// ============ TIVIBU + MODEM ============
export const TV_EXTRA_FEE = 250;        // Tivibu eklendiğinde aylık ek
export const MODEM_RENTAL_FEE = 90;     // Modem kiralama (opsiyonel)

// ============ ANA FONKSİYONLAR ============

/**
 * il/ilçe ve TV tercihine göre doğru paket listesini döndürür
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
 */
export function recommendSpeed(usage: 'hafif' | 'orta' | 'yogun'): number {
  switch (usage) {
    case 'hafif': return 100;
    case 'orta':  return 300;
    case 'yogun': return 1000;
  }
}

/**
 * Paket fiyatını TV ve modem ile birlikte hesaplar
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
    default: return 'Fiber Gücü Yaşa';
  }
}

/**
 * Bölgesel kampanya tetiklendiğinde modal'da gösterilecek mesaj
 * (Fiyat söylemeyiz, sadece "indirim var" deriz)
 */
export function getBolgeselIndirimMesaji(zone: CampaignZone, ilce?: string): string | null {
  if (zone === 'bolgesel-avantaj') {
    return ilce
      ? `${ilce}'da bu pakete özel kampanya fiyatımız var. Sizi aradığımızda detayları paylaşacağız.`
      : 'Bölgenize özel kampanya fiyatımız var. Sizi aradığımızda detayları paylaşacağız.';
  }
  if (zone === 'bolgesel-firsat') {
    return ilce
      ? `${ilce}'da bu pakete özel 24 ay sabit fiyat kampanyamız var. Sizi aradığımızda detayları paylaşacağız.`
      : 'Bölgenize özel 24 ay sabit fiyat kampanyamız var. Sizi aradığımızda detayları paylaşacağız.';
  }
  return null;
}

// ============ SAYFA EXPORTS ============
export const featuredPackages = getFeaturedPackages('standart');
export const allStandartPackages = standartPackages;

// ============ LEGACY UYUMLULUK ============
// Eski page.tsx'in `campaigns` import'u build kırılmasın diye
// Yeni mimari sadece standartPackages kullanıyor
export const campaigns = [
  {
    slug: 'fiber-gucu-yasa',
    name: 'Fiber Gücü Yaşa',
    shortName: 'Fiber Gücü Yaşa',
    description: 'Türk Telekom\'un Türkiye geneli ana kampanyası. 18 ay sabit fiyat, enflasyon koruması.',
    commitmentMonths: 18,
    applicableRegions: ['Türkiye Geneli (81 İl)'],
    packages: standartPackages,
  },
];

// Tüm paketler (admin/backend için)
export const allPackages = [
  ...standartPackages,
  ...bolgeselAvantajPackages,
  ...bolgeselFirsatPackages,
];
