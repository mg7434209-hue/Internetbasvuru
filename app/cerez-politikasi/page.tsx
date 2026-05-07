import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description:
    'internetbasvuru.com çerez politikası. Hangi çerezleri ne amaçla kullandığımız ve tercihlerinizi nasıl yönetebileceğiniz hakkında detaylı bilgi.',
  alternates: { canonical: 'https://internetbasvuru.com/cerez-politikasi' },
  robots: { index: true, follow: true },
};

export default function CerezPolitikasiPage() {
  return (
    <article className="max-w-3xl mx-auto px-[5%] py-12 sm:py-16 prose-custom">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 mb-3">
          Çerez Politikası
        </h1>
        <p className="text-ink-500 text-sm">
          Son güncelleme: 06.05.2026
        </p>
      </header>

      <section className="space-y-6 text-ink-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Çerez (Cookie) Nedir?</h2>
          <p>
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza
            veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar; sitenin doğru
            çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek ve sitenin nasıl
            kullanıldığına dair anonim istatistik toplamak amacıyla kullanılır.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Hangi Çerezleri Kullanıyoruz?</h2>
          <p>internetbasvuru.com&apos;da 3 kategori çerez kullanılmaktadır:</p>

          <div className="mt-4 space-y-4">
            <div className="bg-ink-50 border border-ink-100 rounded-xl p-4">
              <h3 className="font-bold text-ink-900 mb-1">1. Zorunlu Çerezler</h3>
              <p className="text-sm">
                Sitenin temel işlevini sağlayan, kapatılamayan çerezlerdir. KVKK 5. madde 2-c bendi
                uyarınca açık rıza gerektirmez.
              </p>
              <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>cookie_consent_v1</strong>: Çerez tercihlerinizi 6 ay saklar
                </li>
                <li>Form işlem güvenliği ve oturum yönetimi</li>
              </ul>
            </div>

            <div className="bg-ink-50 border border-ink-100 rounded-xl p-4">
              <h3 className="font-bold text-ink-900 mb-1">2. Analitik Çerezler</h3>
              <p className="text-sm">
                Sitenin nasıl kullanıldığına dair anonim istatistik toplar. Sadece açık rızanızla
                aktif olur.
              </p>
              <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Google Analytics 4 (_ga, _gid)</strong>: Anonim site trafiği analizi.
                  IP adresleri anonimleştirilir.
                </li>
              </ul>
            </div>

            <div className="bg-ink-50 border border-ink-100 rounded-xl p-4">
              <h3 className="font-bold text-ink-900 mb-1">3. Pazarlama Çerezleri</h3>
              <p className="text-sm">
                Reklam kampanyalarımızın etkinliğini ölçmek ve size daha alakalı içerik sunmak
                için kullanılır. Sadece açık rızanızla aktif olur.
              </p>
              <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Google Ads</strong>: Reklam dönüşüm ölçümü ve yeniden pazarlama
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Tercihlerinizi Nasıl Yönetebilirsiniz?</h2>
          <p>Çerez tercihlerinizi şu yöntemlerle yönetebilirsiniz:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Site ilk açıldığında görünen <strong className="text-ink-900">Çerez Onayı banner</strong>
              &apos;ından &quot;Tercihler&quot; seçeneğine tıklayın
            </li>
            <li>
              Tarayıcınızın gizlilik ayarlarından çerezleri yönetin (Chrome, Safari, Firefox vb.)
            </li>
            <li>
              Çerezleri tamamen reddetmek için &quot;Reddet&quot; butonunu kullanın — bu durumda
              sitemiz çalışmaya devam eder, ancak analitik ve pazarlama özellikleri devreye girmez
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Üçüncü Taraf Çerezleri</h2>
          <p>
            Sitemizde Google LLC tarafından sağlanan analitik (Google Analytics) ve reklam
            (Google Ads) hizmetlerini kullanmaktayız. Bu hizmetlere ait çerezler kullanıcı
            açık rızasına bağlıdır. Detaylı bilgi için:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>
              <a
                href="https://policies.google.com/privacy?hl=tr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-500 font-semibold underline"
              >
                Google Gizlilik Politikası
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">Politika Güncellemeleri</h2>
          <p>
            Bu çerez politikası gerektiğinde güncellenebilir. Güncel sürümü her zaman bu sayfada
            yer alır. Değişiklikler sayfa başında belirtilen &quot;Son güncelleme&quot; tarihi ile
            işaretlenir.
          </p>
        </div>

        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mt-8">
          <p className="text-sm text-ink-700 m-0">
            <strong className="text-ink-900">İlgili belgeler:</strong>{' '}
            <a href="/kvkk" className="text-brand-700 hover:text-brand-500 font-semibold underline">
              KVKK Aydınlatma Metni
            </a>
            {' · '}
            <a
              href="/iletisim"
              className="text-brand-700 hover:text-brand-500 font-semibold underline"
            >
              İletişim
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
