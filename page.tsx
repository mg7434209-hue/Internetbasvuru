import type { Metadata } from 'next';
import PackageGrid from '@/components/PackageGrid';

export const metadata: Metadata = {
  title: 'Türk Telekom Fiber İnternet Paketleri | İnternet Başvuru',
  description:
    "Türk Telekom yetkili bayisi Göksoylar İletişim güvencesiyle fiber internet paketleri. 16 Mbps'den 1000 Mbps'e kadar, 18 ay sözleşmede sabit fiyat, enflasyon koruması, ücretsiz kurulum.",
  keywords: [
    'türk telekom fiber paketleri',
    'türk telekom 100 mbps',
    'türk telekom 1000 mbps',
    'fiber gücü yaşa',
    'türk telekom başvuru',
    'türk telekom yetkili bayi',
    'evde internet kampanyaları',
  ],
  alternates: { canonical: 'https://internetbasvuru.com/paketler' },
  openGraph: {
    title: 'Türk Telekom Fiber İnternet Paketleri',
    description:
      'Yetkili bayi güvencesiyle fiber internet başvurusu. 18 ay sabit fiyat, enflasyon koruması, ücretsiz kurulum.',
    url: 'https://internetbasvuru.com/paketler',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function PaketlerPage() {
  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Hero başlık alanı */}
      <section className="bg-white border-b border-ink-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            ⚡ Türkiye geneli · Yetkili bayi
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-ink-800 leading-tight tracking-tight mb-4">
            Türk Telekom Fiber İnternet Paketleri
          </h1>
          <p className="text-base md:text-lg text-ink-400 max-w-3xl font-medium leading-relaxed">
            Göksoylar İletişim güvencesiyle 16 Mbps&apos;den 1000 Mbps&apos;e kadar fiber internet
            paketleri. 18 ay sözleşmede sabit fiyat, enflasyon koruması, ücretsiz kurulum.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-x-7 gap-y-2 mt-6 text-sm text-ink-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-success-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              KVKK uyumlu
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-success-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Ücretsiz kurulum
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-success-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              15 dk içinde geri dönüş
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-success-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Türk Telekom yetkili bayi
            </span>
          </div>
        </div>
      </section>

      {/* Paket grid alanı */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <PackageGrid />

        {/* Disclaimer */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 md:p-6 mt-10 text-sm text-ink-500 leading-relaxed">
          <p className="mb-2">
            <strong className="text-ink-800">Fiyatlandırma şeffaflığı:</strong> İlk 9 ay TT Hoş
            Geldin İndirimi uygulanır, 10-18. ay TT standart fiyatı geçerlidir. Her iki dönemde de
            fiyat sözleşmede sabittir; <strong>18 ay boyunca enflasyon zammı uygulanmaz</strong>.
            KDV ve ÖİV dahildir. Kurulum ücretsizdir.
          </p>
          <p className="mb-2">
            <strong className="text-ink-800">Modem:</strong> Modem kiralama isteğe bağlıdır
            (+90₺/ay) — kendi modemini bağlamak isteyenler için ücretsizdir.
          </p>
          <p>
            <strong className="text-ink-800">Altyapı:</strong> FTTH altyapı 100 Mbps üstü hızlarda
            kullanılır. 300 ve 750 Mbps paketleri yalnızca telefonla görüşmede önerilir. Adresinizde
            altyapı uygunluğu telefon görüşmesinde kontrol edilir.
          </p>
        </div>
      </section>
    </div>
  );
}
