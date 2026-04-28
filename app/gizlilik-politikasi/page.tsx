import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'internetbasvuru.com gizlilik politikası.',
  robots: { index: false, follow: true },
};

export default function GizlilikPage() {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container-fluid max-w-3xl">
        <div className="mb-8">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">Yasal</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">Gizlilik Politikası</h1>
          <p className="text-ink-600">Son güncelleme: 22 Nisan 2026</p>
        </div>

        <article className="prose prose-slate max-w-none space-y-6 text-ink-700 leading-relaxed">
          <section>
            <p className="text-lg">
              Göksoylar İletişim Ltd. Şti. ("Biz" veya "Şirket"), internetbasvuru.com ("Site") üzerinden toplanan kişisel verilerin gizliliğine büyük önem verir. Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">1. Toplanan Bilgiler</h2>
            <p>Site üzerinden aşağıdaki bilgiler toplanabilir:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Başvuru formu aracılığıyla: ad, soyad, telefon numarası, ilçe</li>
              <li>Opsiyonel olarak: mahalle, e-posta, tercih edilen arama saati</li>
              <li>Otomatik olarak: IP adresi (hash'lenerek), tarayıcı bilgileri, ziyaret edilen sayfalar, yönlendirme kaynağı</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">2. Bilgilerin Kullanımı</h2>
            <p>Topladığımız bilgiler yalnızca aşağıdaki amaçlarla kullanılır:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Türk Telekom abonelik başvurunuzun oluşturulması</li>
              <li>Size uygun paket ve kampanyanın belirlenmesi</li>
              <li>Telefon veya WhatsApp üzerinden sizinle iletişim kurulması</li>
              <li>Abonelik işleminin tamamlanması</li>
              <li>Site trafiği ve performans analizi (anonim olarak)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">3. Verilerin Saklanması</h2>
            <p>
              Kişisel verileriniz <strong>Türkiye Cumhuriyeti sınırları içinde bulunan sunucularda</strong> (Turhost — Türkiye datacenter) saklanır. Yurt dışına veri aktarımı yapılmaz. Veriler, abonelik süreci tamamlanmazsa en fazla 6 ay saklanır ve sonrasında silinir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">4. Verilerin Paylaşımı</h2>
            <p>
              Bilgileriniz yalnızca abonelik işleminizin gerçekleştirilmesi için Türk Telekom ile paylaşılır. Hiçbir şekilde reklamcılar, üçüncü taraf pazarlama şirketleri veya diğer kuruluşlarla satılmaz veya paylaşılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">5. Güvenlik</h2>
            <p>
              Bilgileriniz SSL/TLS şifrelemesi ile iletilir ve güvenli sunucularda korunur. Yalnızca yetkili bayi personelinin erişimi vardır ve bu personel gizlilik yükümlülüğü altındadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">6. Haklarınız</h2>
            <p>
              KVKK kapsamındaki tüm haklarınız için lütfen <a href="/kvkk-aydinlatma" className="text-brand-700 font-semibold hover:underline">KVKK Aydınlatma Metnimizi</a> inceleyin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">7. Değişiklikler</h2>
            <p>
              Bu gizlilik politikası zaman zaman güncellenebilir. Güncel versiyon her zaman bu sayfada yayınlanır.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
