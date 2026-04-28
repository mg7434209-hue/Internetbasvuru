// SEO için optimize edilmiş bölge sayfaları verisi

export interface Region {
  slug: string;
  il: string;
  ilce: string;
  applicableCampaigns: string[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  highlight: string;
}

export const regions: Region[] = [
  {
    slug: 'manavgat',
    il: 'Antalya',
    ilce: 'Manavgat',
    applicableCampaigns: ['bolgesel-avantaj', 'fiber-gucu-yasa', 'tivibulu'],
    seoTitle: 'Manavgat Türk Telekom Fiber İnternet | Yetkili Bayi Başvuru',
    seoDescription: 'Manavgat\'ta Türk Telekom fiber internet başvurusu. Bölgesel avantaj kampanyası ile 16-1000 Mbps paketler, ücretsiz kurulum. 18 ay taahhütlü fiyatlar 750₺\'den başlayan.',
    h1: 'Manavgat Türk Telekom Fiber İnternet Başvurusu',
    intro: 'Manavgat\'ta yaşıyorsanız, Türk Telekom\'un Bölgesel Avantaj kampanyası size özel indirimli fiyatlar sunuyor. 18 ay taahhütle 16 Mbps paketi 750₺\'den başlıyor. WhatsApp üzerinden dakikalar içinde başvuruda bulunabilir, altyapı uygunluğunu bayimizle hızlıca kontrol ettirebilirsiniz.',
    highlight: 'Bölgesel Avantaj fiyatları',
  },
  {
    slug: 'alanya',
    il: 'Antalya',
    ilce: 'Alanya',
    applicableCampaigns: ['bolgesel-avantaj', 'fiber-gucu-yasa', 'tivibulu'],
    seoTitle: 'Alanya Türk Telekom Fiber İnternet | Bayi Başvuru',
    seoDescription: 'Alanya\'da Türk Telekom fiber internet. 16 Mbps\'den 1000 Mbps\'e kadar paketler, bölgesel avantaj kampanyasıyla uygun fiyatlar. Yetkili bayi üzerinden anında başvuru.',
    h1: 'Alanya Türk Telekom Fiber İnternet Başvurusu',
    intro: 'Alanya\'da Türk Telekom\'un Bölgesel Avantaj kampanyasından yararlanabilirsiniz. 18 ay taahhütle başlayan paketlerde fiber hızının keyfini çıkarın. Göksoylar İletişim yetkili bayi olarak tüm kurulum ve başvuru süreçlerinizi yönetir.',
    highlight: 'Bölgesel kampanya geçerli',
  },
  {
    slug: 'muratpasa',
    il: 'Antalya',
    ilce: 'Muratpaşa',
    applicableCampaigns: ['bolgesel-firsat', 'fiber-gucu-yasa', 'tivibulu'],
    seoTitle: 'Muratpaşa Türk Telekom Fiber | 24 Ay Tek Fiyat Kampanya',
    seoDescription: 'Muratpaşa\'ya özel Türk Telekom Bölgesel Fırsat kampanyası. 24 ay boyunca sabit fiyat, 24 Mbps 680₺, 100 Mbps 720₺. Artış olmadan uygun internet.',
    h1: 'Muratpaşa Türk Telekom Bölgesel Fırsat Kampanyası',
    intro: 'Muratpaşa\'da yaşıyorsanız, Türk Telekom\'un size özel Bölgesel Fırsat kampanyasından yararlanabilirsiniz. 24 ay boyunca fiyat artışı olmadan, tek fiyatla fiber internet. 24 Mbps paketi 680₺\'den başlıyor.',
    highlight: '24 ay sabit fiyat',
  },
  {
    slug: 'kepez',
    il: 'Antalya',
    ilce: 'Kepez',
    applicableCampaigns: ['bolgesel-avantaj', 'fiber-gucu-yasa', 'tivibulu'],
    seoTitle: 'Kepez Türk Telekom Fiber İnternet | Bayi Başvuru',
    seoDescription: 'Kepez\'de Türk Telekom fiber internet paketleri. Bölgesel avantaj kampanyasıyla 750₺\'den başlayan 18 ay taahhütlü paketler. WhatsApp\'tan hızlı başvuru.',
    h1: 'Kepez Türk Telekom Fiber İnternet Başvurusu',
    intro: 'Kepez bölgesinde Türk Telekom Bölgesel Avantaj kampanyası geçerli. 16-1000 Mbps arası hız seçenekleriyle evinize uygun paketi bulun. Yetkili bayimiz tüm süreci sizin için yönetir.',
    highlight: 'Bölgesel Avantaj geçerli',
  },
  {
    slug: 'side',
    il: 'Antalya',
    ilce: 'Side',
    applicableCampaigns: ['fiber-gucu-yasa', 'tivibulu'],
    seoTitle: 'Side Türk Telekom Fiber İnternet | Yetkili Bayi',
    seoDescription: 'Side\'de Türk Telekom fiber internet. Fiber Gücü Yaşa kampanyasıyla 800₺\'den başlayan paketler, ücretsiz kurulum, yetkili bayi desteği.',
    h1: 'Side Türk Telekom Fiber İnternet Başvurusu',
    intro: 'Side\'de Türk Telekom Fiber Gücü Yaşa kampanyasından yararlanabilirsiniz. 18 ay taahhütle avantajlı fiyatlar, ücretsiz kurulum ve profesyonel bayi desteği.',
    highlight: 'Fiber Gücü Yaşa',
  },
  {
    slug: 'serik',
    il: 'Antalya',
    ilce: 'Serik',
    applicableCampaigns: ['fiber-gucu-yasa', 'tivibulu'],
    seoTitle: 'Serik Türk Telekom Fiber İnternet | Bayi Başvuru',
    seoDescription: 'Serik\'te Türk Telekom fiber internet paketleri. 16 Mbps\'den 1000 Mbps\'e kadar, 18 ay taahhütle avantajlı fiyatlar. WhatsApp\'tan anında başvuru.',
    h1: 'Serik Türk Telekom Fiber İnternet Başvurusu',
    intro: 'Serik\'te Türk Telekom\'un ana kampanyası olan Fiber Gücü Yaşa ile fiber internet başvurusu yapabilirsiniz. Göksoylar İletişim yetkili bayi desteğiyle hızlı ve güvenli süreç.',
    highlight: 'Fiber Gücü Yaşa',
  },
  {
    slug: 'antalya',
    il: 'Antalya',
    ilce: 'Tümü',
    applicableCampaigns: ['fiber-gucu-yasa', 'bolgesel-avantaj', 'bolgesel-firsat', 'tivibulu'],
    seoTitle: 'Antalya Türk Telekom Fiber İnternet | Yetkili Bayi Başvuru',
    seoDescription: 'Antalya\'da Türk Telekom fiber internet. Manavgat, Alanya, Muratpaşa, Kepez özel kampanyaları. 750₺\'den başlayan paketler, WhatsApp\'tan başvuru.',
    h1: 'Antalya Türk Telekom Fiber İnternet',
    intro: 'Antalya\'nın tüm ilçelerinde Türk Telekom fiber internet paketleri için yetkili bayiniz. İlçenize göre değişen özel kampanya fiyatlarını görmek için aşağıdan ilçenizi seçin.',
    highlight: 'Tüm Antalya ilçeleri',
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug);
}
