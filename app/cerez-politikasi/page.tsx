import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'internetbasvuru.com çerez kullanım politikası.',
  robots: { index: false, follow: true },
};

export default function CerezPage() {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container-fluid max-w-3xl">
        <div className="mb-8">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">Yasal</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">Çerez Politikası</h1>
          <p className="text-ink-600">Son güncelleme: 22 Nisan 2026</p>
        </div>

        <article className="prose prose-slate max-w-none space-y-6 text-ink-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">1. Çerez Nedir?</h2>
            <p>
              Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde sizi tanımak, tercihlerinizi hatırlamak ve hizmet kalitesini artırmak için kullanılır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">2. Kullandığımız Çerezler</h2>
            <h3 className="font-bold text-ink-900 mt-4 mb-2">a) Zorunlu Çerezler</h3>
            <p>
              Sitenin çalışması için teknik olarak gerekli olan çerezlerdir. Oturum yönetimi, güvenlik, form gönderim koruması gibi işlevler için kullanılır. Bu çerezler olmadan site düzgün çalışmaz.
            </p>

            <h3 className="font-bold text-ink-900 mt-4 mb-2">b) Analitik Çerezler (Opsiyonel)</h3>
            <p>
              Google Analytics tarafından sağlanan, ziyaretçi sayısı, sayfada geçirilen süre, hangi sayfaların daha çok ilgi gördüğü gibi anonim istatistikleri toplar. Kişisel kimliğinizle ilişkilendirilmez.
            </p>

            <h3 className="font-bold text-ink-900 mt-4 mb-2">c) Pazarlama Çerezleri (Opsiyonel)</h3>
            <p>
              Google Ads gibi reklam platformlarından gelen ziyaretçilerin dönüşümlerini takip etmek için kullanılır. Size özel reklam göstermek veya reklam performansını ölçmek amaçlıdır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">3. Çerez Yönetimi</h2>
            <p>Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman silebilir, belirli sitelerden gelen çerezleri engelleyebilirsiniz:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
              <li><strong>Firefox:</strong> Tercihler → Gizlilik ve Güvenlik</li>
              <li><strong>Safari:</strong> Tercihler → Gizlilik</li>
              <li><strong>Edge:</strong> Ayarlar → Gizlilik, arama ve hizmetler</li>
            </ul>
            <p className="mt-3">
              Zorunlu çerezleri devre dışı bırakırsanız sitenin bazı bölümleri düzgün çalışmayabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">4. Üçüncü Taraf Çerezler</h2>
            <p>
              Sitemizde Google (Analytics, Ads) gibi üçüncü taraf hizmetlere ait çerezler bulunabilir. Bu çerezlerin gizlilik politikaları ilgili şirketlerin kendi politikalarına tabidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-6 mb-3">5. İletişim</h2>
            <p>Sorularınız için: <strong>0534 977 70 00</strong> · Manavgat / Antalya</p>
          </section>
        </article>
      </div>
    </div>
  );
}
