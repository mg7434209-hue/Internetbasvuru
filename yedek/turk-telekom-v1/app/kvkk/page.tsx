import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description:
    'Göksoylar İletişim Ltd. Şti. KVKK aydınlatma metni. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sahibi haklarınız ve verilerin işlenme amaçları.',
  alternates: { canonical: 'https://internetbasvuru.com/kvkk' },
  robots: { index: true, follow: true },
};

export default function KVKKPage() {
  return (
    <article className="max-w-3xl mx-auto px-[5%] py-12 sm:py-16 prose-custom">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 mb-3">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-ink-500 text-sm">
          Son güncelleme: 06.05.2026 · 6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında
        </p>
      </header>

      <section className="space-y-6 text-ink-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">1. Veri Sorumlusu</h2>
          <p>
            6698 Sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
            kişisel verileriniz; veri sorumlusu sıfatıyla{' '}
            <strong className="text-ink-900">Göksoylar İletişim Ltd. Şti.</strong>{' '}
            (&quot;Şirket&quot;) tarafından aşağıda açıklanan kapsamda işlenmektedir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">2. Toplanan Kişisel Veriler</h2>
          <p>internetbasvuru.com üzerinden başvuru gönderdiğinizde aşağıdaki veriler toplanır:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Kimlik bilgileri: Ad, soyad, T.C. kimlik no (opsiyonel), doğum tarihi (opsiyonel)</li>
            <li>İletişim bilgileri: Telefon numarası, e-posta (opsiyonel)</li>
            <li>Adres bilgileri: İl, ilçe, mahalle, açık adres (opsiyonel)</li>
            <li>İşlem güvenliği: IP adresi (anonimleştirilmiş hash), tarayıcı bilgisi</li>
            <li>Form tercihleri: Seçilen paket, kullanım profili, çağrı saati tercihi</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">3. İşleme Amaçları</h2>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Türk Telekom fiber internet başvurunuzun değerlendirilmesi</li>
            <li>Adresinizdeki altyapı uygunluğunun teyit edilmesi</li>
            <li>Yetkili bayimiz tarafından sizinle iletişime geçilmesi</li>
            <li>Sözleşme süreçlerinin yürütülmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>İstatistik ve hizmet kalitesinin geliştirilmesi</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">4. Hukuki Sebep</h2>
          <p>
            Kişisel verileriniz, KVKK madde 5/2-(c) bendi uyarınca sözleşmenin kurulması ve ifası
            için, madde 5/2-(f) bendi uyarınca meşru menfaat kapsamında ve açık rızanıza dayalı
            olarak işlenmektedir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">5. Aktarım</h2>
          <p>
            Kişisel verileriniz, başvurunuzun değerlendirilmesi ve hizmetin sağlanması amacıyla
            Türk Telekom A.Ş.&apos;ye, yetkili bayilik faaliyetleri kapsamında aktarılabilir. Yasal
            zorunluluklar haricinde üçüncü taraflara aktarılmaz.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">6. Saklama Süresi</h2>
          <p>
            Verileriniz, başvurunuzun sonuçlanmasından itibaren 10 yıl süreyle (vergi mevzuatı
            kapsamında) veya yasal saklama süreleri boyunca saklanır. Süre bitiminde silinir,
            yok edilir veya anonim hale getirilir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">7. Veri Sahibi Hakları</h2>
          <p>KVKK madde 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Hangi amaçla işlendiğini öğrenme</li>
            <li>Yurt içinde/dışında aktarıldığı tarafları öğrenme</li>
            <li>Eksik veya yanlış işlenmiş ise düzeltilmesini isteme</li>
            <li>Silinmesini veya yok edilmesini isteme</li>
            <li>Aktarıldığı tarafların bilgilendirilmesini isteme</li>
            <li>Otomatik işlemlerle aleyhinize sonuç çıkmasına itiraz etme</li>
            <li>Zarara uğramışsanız tazminat talep etme</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">8. Başvuru Yöntemi</h2>
          <p>
            KVKK haklarınızı kullanmak için Şirketimize aşağıdaki yöntemlerle başvurabilirsiniz:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Yazılı başvuru: <strong className="text-ink-900">Manavgat / Antalya</strong>{' '}
              adresimize ıslak imzalı başvuru
            </li>
            <li>
              KEP yoluyla: Şirketimizin kayıtlı elektronik posta adresine başvuru
            </li>
            <li>
              <a
                href="/iletisim"
                className="text-brand-700 hover:text-brand-500 font-semibold underline"
              >
                İletişim sayfamız
              </a>{' '}
              üzerinden bizimle iletişime geçmek
            </li>
          </ul>
          <p className="mt-2 text-sm text-ink-500">
            Başvurularınız, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ
            kapsamında değerlendirilir ve en geç 30 gün içinde sonuçlandırılır.
          </p>
        </div>

        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mt-8">
          <p className="text-sm text-ink-700 m-0">
            <strong className="text-ink-900">Önemli:</strong> Bu metin, internetbasvuru.com
            üzerinden hizmet alan tüm ziyaretçi ve kullanıcılar için geçerlidir. Metnin
            güncellenmiş hâli her zaman bu sayfada yer alır.
          </p>
        </div>
      </section>
    </article>
  );
}
