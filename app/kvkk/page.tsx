import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni ve Veri İşleme Politikası',
  description:
    'internetbasvuru.com KVKK aydınlatma metni ve veri işleme politikası. Turkcell Superbox başvurularında 6698 sayılı KVKK kapsamında veri sorumlusu, veri işleyen, güvenlik tedbirleri ve ilgili kişi hakları.',
  alternates: { canonical: 'https://internetbasvuru.com/kvkk' },
  robots: { index: true, follow: true },
};

export default function KVKKPage() {
  return (
    <article className="max-w-3xl mx-auto px-[5%] py-12 sm:py-16 prose-custom">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 mb-3">
          Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni ve Veri İşleme Politikası
        </h1>
        <p className="text-ink-500 text-sm">
          Son güncelleme: 18.07.2026 · 6698 Sayılı Kişisel Verilerin Korunması Kanunu
          (&quot;KVKK&quot;) ve ikincil düzenlemeleri kapsamında hazırlanmıştır.
        </p>
      </header>

      <section className="space-y-6 text-ink-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">1. Tanımlar</h2>
          <p>İşbu metinde geçen;</p>
          <ul className="list-disc pl-6 mt-2 space-y-1.5">
            <li>
              <strong className="text-ink-900">&quot;Açık Rıza&quot;</strong>: Belirli bir konuya
              ilişkin, bilgilendirilmeye dayanan ve özgür iradeyle açıklanan rızayı,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Anonim Hale Getirme&quot;</strong>: Kişisel
              verilerin, başka verilerle eşleştirilerek dahi hiçbir surette kimliği belirli veya
              belirlenebilir bir gerçek kişiyle ilişkilendirilemeyecek hâle getirilmesini,
            </li>
            <li>
              <strong className="text-ink-900">&quot;İlgili Kişi&quot;</strong>: Kişisel verisi
              işlenen gerçek kişiyi (site ziyaretçileri ve başvuru sahipleri),
            </li>
            <li>
              <strong className="text-ink-900">&quot;İmha&quot;</strong>: Kişisel verilerin
              silinmesi, yok edilmesi veya anonim hale getirilmesini,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Kişisel Veri&quot;</strong>: Kimliği
              belirlenmiş ya da belirlenebilecek olan bir gerçek kişiye ilişkin her türlü bilgiyi,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Kurul&quot; / &quot;Kurum&quot;</strong>:
              Kişisel Verileri Koruma Kurulu&apos;nu / Kişisel Verileri Koruma Kurumu&apos;nu,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Özel Nitelikli Kişisel Veri&quot;</strong>:
              Kişilerin ırkı, etnik kökeni, siyasi düşüncesi, felsefi inancı, dini, mezhebi veya
              diğer inançları, kılık ve kıyafeti, dernek, vakıf ya da sendika üyeliği, sağlığı,
              cinsel hayatı, ceza mahkûmiyeti ve güvenlik tedbirleriyle ilgili veriler ile
              biyometrik ve genetik verileri,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Veri İşleme&quot;</strong>: Kişisel verilerin
              tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası
              olmak kaydıyla otomatik olmayan yollarla elde edilmesi, kaydedilmesi, depolanması,
              muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması, aktarılması,
              devralınması, elde edilebilir hâle getirilmesi, sınıflandırılması ya da
              kullanılmasının engellenmesi gibi veriler üzerinde gerçekleştirilen her türlü işlemi,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Veri Sorumlusu&quot;</strong>: Kişisel
              verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin
              kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişiyi,
            </li>
            <li>
              <strong className="text-ink-900">&quot;Veri İşleyen&quot;</strong>: Veri
              Sorumlusu&apos;nun verdiği yetkiye dayanarak onun adına kişisel verileri işleyen
              gerçek veya tüzel kişiyi
            </li>
          </ul>
          <p className="mt-2">
            ifade eder. Burada yer verilmeyen kavramlar, KVKK ve ikincil düzenlemelerindeki
            tanımlara tabidir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">2. Kapsam ve Taraflar</h2>
          <p>
            internetbasvuru.com, Turkcell Superbox kablosuz evde internet aboneliği başvurularının
            alındığı bir yetkili satış noktası sitesidir. Bu kapsamda:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1.5">
            <li>
              Abonelik sürecine konu kişisel veriler bakımından{' '}
              <strong className="text-ink-900">
                Turkcell İletişim Hizmetleri A.Ş. ve Turkcell Superonline İletişim Hizmetleri A.Ş.
              </strong>{' '}
              (birlikte &quot;Turkcell&quot;) <strong className="text-ink-900">Veri Sorumlusu</strong>{' '}
              sıfatını taşır; başvurunuzun Turkcell&apos;e iletilmesinden sonraki işleme
              faaliyetleri Turkcell&apos;in kendi aydınlatma metinlerine tabidir.
            </li>
            <li>
              Site işletmecisi (&quot;Şirket&quot;), başvurunuzun alınması ve Turkcell&apos;e
              iletilmesi sürecinde Turkcell&apos;in yetkilendirmesi, emir ve talimatları
              doğrultusunda <strong className="text-ink-900">Veri İşleyen</strong> sıfatıyla; site
              üzerinden yürüttüğü kendi iletişim ve kayıt faaliyetleri bakımından ise Veri
              Sorumlusu sıfatıyla hareket eder.
            </li>
          </ul>
          <p className="mt-2">
            Şirket, veri işleme faaliyetlerini KVKK, ikincil düzenlemeler ve Kurul&apos;un karar ve
            görüşlerine, ayrıca Turkcell ile yetkili satış noktası ilişkisi kapsamındaki veri
            işleme yükümlülüklerine uygun şekilde yürütmeyi kabul ve taahhüt eder.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">3. Toplanan Kişisel Veriler</h2>
          <p>internetbasvuru.com üzerinden başvuru gönderdiğinizde aşağıdaki veriler toplanır:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Kimlik bilgileri: Ad, soyad, T.C. kimlik no (opsiyonel), doğum tarihi (opsiyonel)</li>
            <li>İletişim bilgileri: Telefon numarası, e-posta (opsiyonel)</li>
            <li>Adres bilgileri: İl, ilçe, mahalle, açık adres (opsiyonel)</li>
            <li>İşlem güvenliği: IP adresi (anonimleştirilmiş hash), tarayıcı bilgisi</li>
            <li>Form tercihleri: Seçilen paket, kullanım profili, 5G kapsama beyanı, çağrı saati tercihi</li>
          </ul>
          <p className="mt-2">
            <strong className="text-ink-900">Özel nitelikli kişisel veri</strong> (sağlık, din,
            biyometrik veri vb.) site üzerinden talep edilmez ve işlenmez. Form alanlarına bu
            nitelikte veri yazmamanızı rica ederiz; sehven iletilmesi hâlinde bu veriler
            gecikmeksizin imha edilir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">4. İşleme Amaçları ve Hukuki Sebepler</h2>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Turkcell Superbox başvurunuzun alınması, değerlendirilmesi ve Turkcell&apos;e iletilmesi</li>
            <li>Adresinizdeki 5G/4.5G şebeke kapsamasının teyit edilmesi</li>
            <li>Yetkili satış noktamız tarafından sizinle iletişime geçilmesi</li>
            <li>Abonelik sözleşmesi süreçlerinin yürütülmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>İstatistik ve hizmet kalitesinin geliştirilmesi</li>
          </ul>
          <p className="mt-2">
            Hukuki sebepler: KVKK m. 5/2-(c) uyarınca sözleşmenin kurulması ve ifasıyla doğrudan
            ilgili olması, m. 5/2-(ç) uyarınca hukuki yükümlülüklerin yerine getirilmesi,
            m. 5/2-(f) uyarınca meşru menfaat ve gerekli hâllerde{' '}
            <strong className="text-ink-900">açık rızanız</strong>. Açık rıza gerektiren işleme
            faaliyetleri için rızanız, başvuru formundaki onay kutusu ile bilgilendirmeye dayalı ve
            özgür iradeyle alınır; rızanızı dilediğiniz zaman geri çekebilirsiniz.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">5. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, başvurunuzun değerlendirilmesi ve abonelik hizmetinin sağlanması
            amacıyla, gerekli teknik ve idari tedbirler alınarak güvenli aktarım yöntemleriyle{' '}
            <strong className="text-ink-900">
              Turkcell İletişim Hizmetleri A.Ş. ve Turkcell Superonline İletişim Hizmetleri A.Ş.
            </strong>
            &apos;ye aktarılır. Verileriniz; yetkili kamu kurum ve kuruluşlarının hukuka uygun
            talepleri haricinde, açık rızanız olmaksızın başka üçüncü kişilere aktarılmaz.
            Turkcell&apos;in önceden yazılı izni olmaksızın herhangi bir alt veri işleyene aktarım
            yapılmaz; izinli aktarım hâlinde alt veri işleyen asgari olarak bu metindeki
            yükümlülüklere tabi tutulur. Verileriniz yurt dışına aktarılmaz.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">
            6. Teknik ve İdari Güvenlik Tedbirleri
          </h2>
          <p>
            Şirket; kişisel verilerin hukuka aykırı olarak işlenmesini ve bu verilere hukuka aykırı
            erişilmesini önlemek, verilerin muhafazasını sağlamak amacıyla, verinin niteliğine uygun
            güvenlik düzeyini temin etmeye yönelik gerekli her türlü teknik ve idari tedbiri alır.
            Bu kapsamda asgari olarak:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Veriler şifreli (SSL/TLS) bağlantı üzerinden iletilir ve güvenli sistemlerde saklanır,</li>
            <li>Kişisel verilere erişim yetkileri görev bazlı tanımlanır ve sınırlandırılır,</li>
            <li>
              Erişim yetkisine sahip kişilerin erişim şifre ve yöntemlerini üçüncü kişilerle
              paylaşmaması sağlanır; ilgili personel ile gizlilik taahhütleri akdedilir,
            </li>
            <li>Personel, kişisel verilerin korunması konusunda bilgilendirilir,</li>
            <li>Alınan önlemlerin etkinliği düzenli olarak gözden geçirilir.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">7. Veri İhlali Bildirimi</h2>
          <p>
            İşlenen kişisel verilerin kanuni olmayan yollarla başkaları tarafından elde edilmesi
            veya şüpheli bir güvenlik ihlali hâlinde Şirket; gerekli kurtarma ve önleme tedbirlerini
            derhal alır, durumu Veri Sorumlusu sıfatını taşıyan Turkcell&apos;e gecikmeksizin (en
            geç 12 saat içinde) bildirir ve mevzuatın öngördüğü hâllerde Kurul&apos;a ve ilgili
            kişilere yapılacak bildirimlerin (72 saat kuralı dâhil) yerine getirilmesi için gerekli
            her türlü bilgi ve yardımı sağlar.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">8. Saklama Süresi ve İmha</h2>
          <p>
            Kişisel verileriniz; işleme amacının gerçekleşmesi veya ilgili mevzuatta öngörülen yasal
            saklama sürelerinin (vergi mevzuatı kapsamında 10 yıla kadar) sona ermesini takiben,
            periyodik imha süreleri içerisinde silinir, yok edilir veya anonim hale getirilir.
            Yetkili satış noktası ilişkisinin sona ermesi hâlinde, Turkcell&apos;in talimatları
            doğrultusunda aktarıma konu veriler yedekleriyle birlikte iade edilir veya imha edilir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">9. Denetim ve Uygunluk</h2>
          <p>
            Şirket; veri işleme faaliyetlerinin KVKK&apos;ya, ikincil düzenlemelere ve bu metne
            uygunluğunun Veri Sorumlusu Turkcell tarafından veya yetkilendireceği denetçiler
            eliyle denetlenebileceğini, Kurul tarafından KVKK m. 22 kapsamında yapılacak
            denetimlerde talep edilecek her türlü bilgi ve belgeyi zamanında ve doğru olarak
            sağlayacağını kabul eder.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">10. İlgili Kişinin Hakları</h2>
          <p>KVKK m. 11 uyarınca ilgili kişi sıfatıyla aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
            <li>KVKK m. 7 çerçevesinde silinmesini veya yok edilmesini isteme,</li>
            <li>Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
            <li>
              Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun
              ortaya çıkmasına itiraz etme,
            </li>
            <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">11. Başvuru Yöntemi</h2>
          <p>
            KVKK kapsamındaki taleplerinizi aşağıdaki yöntemlerle iletebilirsiniz:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Yazılı başvuru: <strong className="text-ink-900">Manavgat / Antalya</strong>{' '}
              adresimize ıslak imzalı başvuru,
            </li>
            <li>KEP yoluyla: Kayıtlı elektronik posta adresimize başvuru,</li>
            <li>
              <a
                href="/iletisim"
                className="text-brand-700 hover:text-brand-500 font-semibold underline"
              >
                İletişim sayfamız
              </a>{' '}
              üzerinden bizimle iletişime geçmek.
            </li>
          </ul>
          <p className="mt-2 text-sm text-ink-500">
            Başvurularınız, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ kapsamında
            değerlendirilir ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. Turkcell&apos;in
            Veri Sorumlusu olduğu işleme faaliyetlerine ilişkin talepler, ilgisi hâlinde
            Turkcell&apos;e yönlendirilir ve tarafınıza bilgi verilir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-2">12. Yürürlük ve Güncellemeler</h2>
          <p>
            İşbu metin yayımı tarihinde yürürlüğe girer. Mevzuatta veya Kurul karar ve
            görüşlerinde meydana gelen değişiklikler ile Turkcell tarafından iletilen ek
            talimatlar doğrultusunda güncellenebilir; güncel hâli her zaman bu sayfada yer alır.
            Metnin herhangi bir hükmünün uygulanamaz hâle gelmesi, diğer hükümlerin geçerliliğini
            etkilemez.
          </p>
        </div>

        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mt-8">
          <p className="text-sm text-ink-700 m-0">
            <strong className="text-ink-900">Önemli:</strong> Bu metin, internetbasvuru.com
            üzerinden hizmet alan tüm ziyaretçi ve kullanıcılar için geçerlidir. Turkcell, Superbox
            ve TV+ marka adları Turkcell İletişim Hizmetleri A.Ş.&apos;ye aittir; Turkcell&apos;in
            kendi kişisel veri politikalarına{' '}
            <strong className="text-ink-900">turkcell.com.tr</strong> adresinden ulaşabilirsiniz.
          </p>
        </div>
      </section>
    </article>
  );
}
