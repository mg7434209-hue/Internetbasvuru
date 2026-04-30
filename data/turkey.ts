// Türkiye İl/İlçe Verisi
// 14 il "covered" (Göksoylar İletişim bayilik kapsamı)
// 67 il "interest_only" (kapsam dışı, lead için bekleme listesi)

export type CoverageStatus = 'covered' | 'interest_only';

export interface City {
  plate: number;          // Plaka kodu
  name: string;           // "Antalya"
  slug: string;           // "antalya" (URL için)
  region: string;         // "Akdeniz", "Ege" vb.
  coverage: CoverageStatus;
  districts?: string[];   // Sadece covered iller için
}

// 🟢 KAPSAMA İÇİ (14 İL) - İLÇELERİ İLE
export const COVERED_CITIES: City[] = [
  {
    plate: 7, name: 'Antalya', slug: 'antalya', region: 'Akdeniz', coverage: 'covered',
    districts: [
      'Akseki', 'Aksu', 'Alanya', 'Demre', 'Döşemealtı', 'Elmalı',
      'Finike', 'Gazipaşa', 'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer',
      'Kepez', 'Konyaaltı', 'Korkuteli', 'Kumluca', 'Manavgat',
      'Muratpaşa', 'Serik',
    ],
  },
  {
    plate: 9, name: 'Aydın', slug: 'aydin', region: 'Ege', coverage: 'covered',
    districts: [
      'Bozdoğan', 'Buharkent', 'Çine', 'Didim', 'Efeler', 'Germencik',
      'İncirliova', 'Karacasu', 'Karpuzlu', 'Koçarlı', 'Köşk',
      'Kuşadası', 'Kuyucak', 'Nazilli', 'Söke', 'Sultanhisar', 'Yenipazar',
    ],
  },
  {
    plate: 10, name: 'Balıkesir', slug: 'balikesir', region: 'Marmara', coverage: 'covered',
    districts: [
      'Altıeylül', 'Ayvalık', 'Balya', 'Bandırma', 'Bigadiç', 'Burhaniye',
      'Dursunbey', 'Edremit', 'Erdek', 'Gömeç', 'Gönen', 'Havran',
      'İvrindi', 'Karesi', 'Kepsut', 'Manyas', 'Marmara', 'Savaştepe',
      'Sındırgı', 'Susurluk',
    ],
  },
  {
    plate: 11, name: 'Bilecik', slug: 'bilecik', region: 'Marmara', coverage: 'covered',
    districts: [
      'Bozüyük', 'Gölpazarı', 'İnhisar', 'Merkez', 'Osmaneli',
      'Pazaryeri', 'Söğüt', 'Yenipazar',
    ],
  },
  {
    plate: 16, name: 'Bursa', slug: 'bursa', region: 'Marmara', coverage: 'covered',
    districts: [
      'Büyükorhan', 'Gemlik', 'Gürsu', 'Harmancık', 'İnegöl', 'İznik',
      'Karacabey', 'Keles', 'Kestel', 'Mudanya', 'Mustafakemalpaşa',
      'Nilüfer', 'Orhaneli', 'Orhangazi', 'Osmangazi', 'Yenişehir',
      'Yıldırım',
    ],
  },
  {
    plate: 15, name: 'Burdur', slug: 'burdur', region: 'Akdeniz', coverage: 'covered',
    districts: [
      'Ağlasun', 'Altınyayla', 'Bucak', 'Çavdır', 'Çeltikçi',
      'Gölhisar', 'Karamanlı', 'Kemer', 'Merkez', 'Tefenni', 'Yeşilova',
    ],
  },
  {
    plate: 17, name: 'Çanakkale', slug: 'canakkale', region: 'Marmara', coverage: 'covered',
    districts: [
      'Ayvacık', 'Bayramiç', 'Biga', 'Bozcaada', 'Çan', 'Eceabat',
      'Ezine', 'Gelibolu', 'Gökçeada', 'Lapseki', 'Merkez', 'Yenice',
    ],
  },
  {
    plate: 20, name: 'Denizli', slug: 'denizli', region: 'Ege', coverage: 'covered',
    districts: [
      'Acıpayam', 'Babadağ', 'Baklan', 'Bekilli', 'Beyağaç', 'Bozkurt',
      'Buldan', 'Çal', 'Çameli', 'Çardak', 'Çivril', 'Güney', 'Honaz',
      'Kale', 'Merkezefendi', 'Pamukkale', 'Sarayköy', 'Serinhisar', 'Tavas',
    ],
  },
  {
    plate: 35, name: 'İzmir', slug: 'izmir', region: 'Ege', coverage: 'covered',
    districts: [
      'Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ',
      'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir',
      'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa',
      'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere',
      'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla',
    ],
  },
  {
    plate: 43, name: 'Kütahya', slug: 'kutahya', region: 'Ege', coverage: 'covered',
    districts: [
      'Altıntaş', 'Aslanapa', 'Çavdarhisar', 'Domaniç', 'Dumlupınar',
      'Emet', 'Gediz', 'Hisarcık', 'Merkez', 'Pazarlar', 'Şaphane',
      'Simav', 'Tavşanlı',
    ],
  },
  {
    plate: 45, name: 'Manisa', slug: 'manisa', region: 'Ege', coverage: 'covered',
    districts: [
      'Ahmetli', 'Akhisar', 'Alaşehir', 'Demirci', 'Gölmarmara', 'Gördes',
      'Kırkağaç', 'Köprübaşı', 'Kula', 'Salihli', 'Sarıgöl', 'Saruhanlı',
      'Selendi', 'Soma', 'Şehzadeler', 'Turgutlu', 'Yunusemre',
    ],
  },
  {
    plate: 48, name: 'Muğla', slug: 'mugla', region: 'Ege', coverage: 'covered',
    districts: [
      'Bodrum', 'Dalaman', 'Datça', 'Fethiye', 'Kavaklıdere', 'Köyceğiz',
      'Marmaris', 'Menteşe', 'Milas', 'Ortaca', 'Seydikemer', 'Ula', 'Yatağan',
    ],
  },
  {
    plate: 64, name: 'Uşak', slug: 'usak', region: 'Ege', coverage: 'covered',
    districts: ['Banaz', 'Eşme', 'Karahallı', 'Merkez', 'Sivaslı', 'Ulubey'],
  },
  {
    plate: 77, name: 'Yalova', slug: 'yalova', region: 'Marmara', coverage: 'covered',
    districts: ['Altınova', 'Armutlu', 'Çınarcık', 'Çiftlikköy', 'Merkez', 'Termal'],
  },
];

// 🟡 KAPSAMA DIŞI (67 İL) - Sadece il adı
export const INTEREST_CITIES: City[] = [
  { plate: 1, name: 'Adana', slug: 'adana', region: 'Akdeniz', coverage: 'interest_only' },
  { plate: 2, name: 'Adıyaman', slug: 'adiyaman', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 3, name: 'Afyonkarahisar', slug: 'afyon', region: 'Ege', coverage: 'interest_only' },
  { plate: 4, name: 'Ağrı', slug: 'agri', region: 'Doğu', coverage: 'interest_only' },
  { plate: 5, name: 'Amasya', slug: 'amasya', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 6, name: 'Ankara', slug: 'ankara', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 8, name: 'Artvin', slug: 'artvin', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 12, name: 'Bingöl', slug: 'bingol', region: 'Doğu', coverage: 'interest_only' },
  { plate: 13, name: 'Bitlis', slug: 'bitlis', region: 'Doğu', coverage: 'interest_only' },
  { plate: 14, name: 'Bolu', slug: 'bolu', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 18, name: 'Çankırı', slug: 'cankiri', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 19, name: 'Çorum', slug: 'corum', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 21, name: 'Diyarbakır', slug: 'diyarbakir', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 22, name: 'Edirne', slug: 'edirne', region: 'Marmara', coverage: 'interest_only' },
  { plate: 23, name: 'Elazığ', slug: 'elazig', region: 'Doğu', coverage: 'interest_only' },
  { plate: 24, name: 'Erzincan', slug: 'erzincan', region: 'Doğu', coverage: 'interest_only' },
  { plate: 25, name: 'Erzurum', slug: 'erzurum', region: 'Doğu', coverage: 'interest_only' },
  { plate: 26, name: 'Eskişehir', slug: 'eskisehir', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 27, name: 'Gaziantep', slug: 'gaziantep', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 28, name: 'Giresun', slug: 'giresun', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 29, name: 'Gümüşhane', slug: 'gumushane', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 30, name: 'Hakkari', slug: 'hakkari', region: 'Doğu', coverage: 'interest_only' },
  { plate: 31, name: 'Hatay', slug: 'hatay', region: 'Akdeniz', coverage: 'interest_only' },
  { plate: 32, name: 'Isparta', slug: 'isparta', region: 'Akdeniz', coverage: 'interest_only' },
  { plate: 33, name: 'Mersin', slug: 'mersin', region: 'Akdeniz', coverage: 'interest_only' },
  { plate: 34, name: 'İstanbul', slug: 'istanbul', region: 'Marmara', coverage: 'interest_only' },
  { plate: 36, name: 'Kars', slug: 'kars', region: 'Doğu', coverage: 'interest_only' },
  { plate: 37, name: 'Kastamonu', slug: 'kastamonu', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 38, name: 'Kayseri', slug: 'kayseri', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 39, name: 'Kırklareli', slug: 'kirklareli', region: 'Marmara', coverage: 'interest_only' },
  { plate: 40, name: 'Kırşehir', slug: 'kirsehir', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 41, name: 'Kocaeli', slug: 'kocaeli', region: 'Marmara', coverage: 'interest_only' },
  { plate: 42, name: 'Konya', slug: 'konya', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 44, name: 'Malatya', slug: 'malatya', region: 'Doğu', coverage: 'interest_only' },
  { plate: 46, name: 'Kahramanmaraş', slug: 'kahramanmaras', region: 'Akdeniz', coverage: 'interest_only' },
  { plate: 47, name: 'Mardin', slug: 'mardin', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 49, name: 'Muş', slug: 'mus', region: 'Doğu', coverage: 'interest_only' },
  { plate: 50, name: 'Nevşehir', slug: 'nevsehir', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 51, name: 'Niğde', slug: 'nigde', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 52, name: 'Ordu', slug: 'ordu', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 53, name: 'Rize', slug: 'rize', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 54, name: 'Sakarya', slug: 'sakarya', region: 'Marmara', coverage: 'interest_only' },
  { plate: 55, name: 'Samsun', slug: 'samsun', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 56, name: 'Siirt', slug: 'siirt', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 57, name: 'Sinop', slug: 'sinop', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 58, name: 'Sivas', slug: 'sivas', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 59, name: 'Tekirdağ', slug: 'tekirdag', region: 'Marmara', coverage: 'interest_only' },
  { plate: 60, name: 'Tokat', slug: 'tokat', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 61, name: 'Trabzon', slug: 'trabzon', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 62, name: 'Tunceli', slug: 'tunceli', region: 'Doğu', coverage: 'interest_only' },
  { plate: 63, name: 'Şanlıurfa', slug: 'sanliurfa', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 65, name: 'Van', slug: 'van', region: 'Doğu', coverage: 'interest_only' },
  { plate: 66, name: 'Yozgat', slug: 'yozgat', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 67, name: 'Zonguldak', slug: 'zonguldak', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 68, name: 'Aksaray', slug: 'aksaray', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 69, name: 'Bayburt', slug: 'bayburt', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 70, name: 'Karaman', slug: 'karaman', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 71, name: 'Kırıkkale', slug: 'kirikkale', region: 'İç Anadolu', coverage: 'interest_only' },
  { plate: 72, name: 'Batman', slug: 'batman', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 73, name: 'Şırnak', slug: 'sirnak', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 74, name: 'Bartın', slug: 'bartin', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 75, name: 'Ardahan', slug: 'ardahan', region: 'Doğu', coverage: 'interest_only' },
  { plate: 76, name: 'Iğdır', slug: 'igdir', region: 'Doğu', coverage: 'interest_only' },
  { plate: 78, name: 'Karabük', slug: 'karabuk', region: 'Karadeniz', coverage: 'interest_only' },
  { plate: 79, name: 'Kilis', slug: 'kilis', region: 'Güneydoğu', coverage: 'interest_only' },
  { plate: 80, name: 'Osmaniye', slug: 'osmaniye', region: 'Akdeniz', coverage: 'interest_only' },
  { plate: 81, name: 'Düzce', slug: 'duzce', region: 'Karadeniz', coverage: 'interest_only' },
];

// Tüm iller (plaka sırasıyla)
export const ALL_CITIES: City[] = [...COVERED_CITIES, ...INTEREST_CITIES]
  .sort((a, b) => a.plate - b.plate);

// 🔍 YARDIMCI FONKSİYONLAR

export function findCityByName(name: string): City | undefined {
  if (!name) return undefined;
  const normalized = name.toLowerCase().trim();
  return ALL_CITIES.find(c =>
    c.name.toLowerCase() === normalized ||
    c.slug === normalized
  );
}

export function findCityBySlug(slug: string): City | undefined {
  return ALL_CITIES.find(c => c.slug === slug);
}

export function isCovered(cityName: string): boolean {
  const city = findCityByName(cityName);
  return city?.coverage === 'covered';
}

export function getDistricts(cityName: string): string[] {
  const city = findCityByName(cityName);
  return city?.districts || [];
}

export function getCoveredCities(): City[] {
  return COVERED_CITIES;
}

export function getCoveredCitySlugs(): string[] {
  return COVERED_CITIES.map(c => c.slug);
}
