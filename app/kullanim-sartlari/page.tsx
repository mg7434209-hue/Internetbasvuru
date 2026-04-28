import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description: 'internetbasvuru.com kullanım şartları.',
  robots: { index: false, follow: true },
};

export default function KullanimPage() {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container-fluid max-w-3xl">
        <div className="mb-8">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">Yasal</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">Kullanım Şartları</h1>
          <p className="text-ink-600">Son güncelleme: 22 Nisan 2026</p>
        </div>

        <article className="prose prose-slate max-w-none space-y-6 text-ink-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">1. Genel</h2>
            <p>
              internetbasvuru.com ("Site"), Göksoylar İletişim Ltd. Şti. tarafından işletilen bir Türk Telekom Yetkili Bayi sitesidir. Siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">2. Sitenin Amacı</h2>
            <p>
              Bu site, Türk Telekom fiber internet paketleri hakkında bilgi vermek ve başvuru almak amacıyla hazırlanmıştır. Site, Türk Telekom A.Ş.'nin resmi web sitesi <strong>değildir</strong>. Yetkili bayi olarak sunulan bir ara yüzdür.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">3. Fiyat ve Kampanyalar</h2>
            <p>
              Sitede yer alan tüm fiyat ve kampanya bilgileri Türk Telekom tarafından belirlenir. Bu bilgiler zamana ve bölgeye göre değişebilir. Site güncellemeleri mümkün olduğunca hızlı yapılmakla birlikte, en güncel fiyat ve kampanya bilgileri için başvuru sürecinde size yetkili bayi tarafından net bilgi verilecektir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">4. Başvuru ve Sözleşme</h2>
            <p>
              Site üzerinden yapılan başvurular bir ön bilgi toplama amaçlıdır. Kesin abonelik, Türk Telekom'un onayı ve karşılıklı imzalanan sözleşme ile gerçekleşir. Site üzerinden başvuru yapmanız otomatik olarak abonelik hakkı doğurmaz. Altyapı uygunluğu, kredi değerlendirmesi ve TT'nin genel abonelik şartları geçerlidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">5. Marka ve İçerik</h2>
            <p>
              "Türk Telekom", "TTNET", "Tivibu" gibi markalar Türk Telekomünikasyon A.Ş.'ye aittir ve burada yalnızca yetkili bayilik kapsamında bilgilendirme amacıyla kullanılmaktadır. Sitenin genel içeriği (metinler, görseller, düzen) Göksoylar İletişim Ltd. Şti.'ne aittir ve izinsiz kopyalanamaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">6. Sorumluluk Sınırları</h2>
            <p>
              Site bilgi amaçlı sunulmaktadır. Bilgilerin güncelliği için azami gayret gösterilmekle birlikte, herhangi bir yazım veya fiyat hatasından doğabilecek zararlardan Göksoylar İletişim Ltd. Şti. sorumlu tutulamaz. Teknik aksaklıklar nedeniyle sitenin geçici olarak hizmet vermemesi durumunda WhatsApp veya telefon üzerinden bize ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">7. Uyuşmazlık</h2>
            <p>
              Bu şartlardan doğabilecek uyuşmazlıklarda Antalya Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">8. İletişim</h2>
            <p>
              <strong>Göksoylar İletişim Ltd. Şti.</strong><br />
              Manavgat / Antalya<br />
              Telefon: 0534 977 70 00
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
