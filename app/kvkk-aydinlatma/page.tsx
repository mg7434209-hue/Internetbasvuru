import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'internetbasvuru.com Kişisel Verilerin Korunması Aydınlatma Metni.',
  robots: { index: false, follow: true },
};

export default function KvkkPage() {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container-fluid max-w-3xl">
        <div className="mb-8">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">Yasal</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-ink-600">Son güncelleme: 22 Nisan 2026</p>
        </div>

        <article className="prose prose-slate max-w-none space-y-6 text-ink-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">1. Veri Sorumlusu ve Veri İşleyen</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("<strong>KVKK</strong>") kapsamında, internetbasvuru.com ("<strong>Site</strong>") üzerinden toplanan kişisel veriler bakımından:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Veri Sorumlusu:</strong> Türk Telekomünikasyon A.Ş., TT Mobil İletişim Hizmetleri A.Ş. ve TTNET A.Ş. (birlikte "<strong>Türk Telekom</strong>" veya "<strong>TTG</strong>")
              </li>
              <li>
                <strong>Veri İşleyen:</strong> Göksoylar İletişim Ltd. Şti. — Türk Telekom Yetkili Bayi sıfatıyla, TTG'nin emir ve talimatları doğrultusunda kişisel verileri işler.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">2. İşlenen Kişisel Veriler</h2>
            <p>
              Site üzerinden aşağıdaki kişisel verileriniz işlenebilir:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
              <li><strong>İletişim Bilgileri:</strong> Cep telefonu, e-posta adresi, bulunduğunuz ilçe/mahalle</li>
              <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi (hash'lenmiş), tarayıcı bilgisi, site trafiği bilgileri</li>
              <li><strong>Pazarlama Bilgileri:</strong> Varsa UTM kaynakları (reklam izleme)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p>Bilgileriniz aşağıdaki amaçlarla işlenir:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Türk Telekom adına abonelik başvurunuzun oluşturulması ve süreç takibi</li>
              <li>Adresinize fiber altyapı uygunluk kontrolü yapılması</li>
              <li>Size uygun paket ve kampanyanın belirlenmesi</li>
              <li>Yetkili bayi tarafından sizinle telefon/WhatsApp üzerinden iletişim kurulması</li>
              <li>Yasal ve sözleşmesel yükümlülüklerin yerine getirilmesi</li>
              <li>Site kullanım istatistiklerinin anonim olarak çıkarılması</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">4. İşlemenin Hukuki Sebebi</h2>
            <p>Kişisel verileriniz KVKK md. 5/2 uyarınca:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Bir sözleşmenin (abonelik sözleşmesi) kurulması/ifası için gerekli olması</li>
              <li>Veri Sorumlusunun hukuki yükümlülüğünü yerine getirmesi için gerekli olması (Elektronik Haberleşme Kanunu, BTK düzenlemeleri)</li>
              <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için zorunlu olması</li>
              <li>Açık rızanızın bulunması (pazarlama iletileri için ayrıca onay alınır)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">5. Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, yalnızca başvurunuzun sonuçlandırılabilmesi amacıyla Türk Telekom'a aktarılır. Türk Telekom'un hizmet aldığı Dağıtım Merkezi (AVES Telekom Mad. İnş. Taah. İth. İhr. San. Tic. Ltd. Şti.) ile Veri İşleyen arasında imzalanmış sözleşme dahilinde verileriniz KVKK'ya uygun şekilde korunur.
            </p>
            <p className="mt-3">
              <strong>Verileriniz Türkiye içinde bulunan sunucularda saklanır</strong>, yurt dışına aktarılmaz. Site altyapısı sunan üçüncü taraf hizmet sağlayıcılar kişisel verilerinizi görmez ve işlemez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">6. Verilerin Saklama Süresi</h2>
            <p>
              Başvurunuz tamamlanmaz veya abonelik gerçekleşmezse verileriniz <strong>en fazla 6 ay</strong> saklanır ve sonrasında silinir/anonim hale getirilir. Abonelik gerçekleşirse ilgili mevzuat (özellikle Elektronik Haberleşme Kanunu ve vergi mevzuatı) kapsamındaki saklama süreleri uygulanır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">7. Güvenlik Önlemleri</h2>
            <p>
              Kişisel verileriniz; yetkisiz erişime, hukuka aykırı işlenmeye ve kayba karşı uygun teknik ve idari tedbirlerle korunur:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>SSL/TLS şifrelemeli bağlantı (HTTPS)</li>
              <li>Erişim yetkilendirme sistemi (sadece yetkili bayi personeli erişebilir)</li>
              <li>Periyodik güvenlik denetimleri ve sızma testleri</li>
              <li>Personel için gizlilik yükümlülüğü</li>
              <li>Türkiye'de barındırılan güvenli sunucular</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">8. Haklarınız (KVKK Md. 11)</h2>
            <p>Veri sahibi olarak her zaman aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşleniyorsa buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK md. 7 şartları oluşmuşsa silinmesini/yok edilmesini isteme</li>
              <li>Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>Otomatik analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işleme dolayısıyla zarar uğrarsanız zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">9. Başvuru Yolları</h2>
            <p>
              Haklarınızı kullanmak için Türk Telekom'un yayımlamış olduğu KVKK başvuru formu ile Türk Telekom'a başvurabilir veya aşağıdaki iletişim bilgileri üzerinden Göksoylar İletişim Ltd. Şti. ile iletişime geçebilirsiniz:
            </p>
            <div className="bg-ink-50 rounded-lg p-4 mt-4 not-prose">
              <p className="font-semibold text-ink-900 mb-2">Göksoylar İletişim Ltd. Şti.</p>
              <p className="text-sm text-ink-600">Manavgat / Antalya</p>
              <p className="text-sm text-ink-600">Telefon: 0534 977 70 00</p>
            </div>
            <p className="mt-4">
              Türk Telekom'un KVKK sayfasına{' '}
              <a href="https://www.turktelekom.com.tr/tr/bize-ulasin/kisisel-verilerin-korunmasi" target="_blank" rel="noopener noreferrer" className="text-brand-700 font-semibold hover:underline">
                buradan
              </a>{' '}
              erişebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink-900 mt-8 mb-3">10. Değişiklikler</h2>
            <p>
              Bu aydınlatma metni, mevzuat değişiklikleri veya iş süreçlerinin gerektirmesi halinde güncellenebilir. Güncel versiyon her zaman bu sayfada yayınlanır.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
