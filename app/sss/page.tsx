import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular | Türk Telekom Fiber İnternet',
  description: 'Türk Telekom fiber internet başvurusu hakkında sık sorulan sorular. Kurulum süresi, taahhüt, fiyatlandırma, altyapı sorgulama ve daha fazlası.',
  alternates: { canonical: 'https://internetbasvuru.com/sss' },
};

const faqs = [
  {
    category: 'Başvuru Süreci',
    items: [
      { q: 'Başvurum ne zaman sonuçlanır?', a: 'Form veya WhatsApp üzerinden başvurunuzu ilettikten sonra maksimum 15 dakika içinde yetkili bayimiz sizi arar. Altyapı uygunluğu onaylandıktan sonra kurulum randevusu aynı gün veya ertesi gün verilebilir.' },
      { q: 'Başvuru için hangi belgeler gerekli?', a: 'Yeni abonelik için TC kimlik kartı (veya geçerli kimlik belgesi), varsa daha önceki TT hattına ait bilgiler. Detayları bayi temsilcimizle telefonda paylaşırsınız.' },
      { q: 'Adresimde Türk Telekom fiber var mı?', a: 'Başvurunuzu aldıktan sonra biz altyapı kontrolünü yetkili TT sistemi üzerinden yaparız. Fiber yoksa VDSL, ADSL veya Superbox (4.5G ev interneti) alternatifleri değerlendirilebilir.' },
      { q: 'Kurulum ne kadar sürer?', a: 'Altyapı müsaitse 1-3 iş günü içinde teknik ekip evinize gelir. Yoğun sezonlarda bu süre uzayabilir.' },
    ],
  },
  {
    category: 'Fiyat ve Kampanyalar',
    items: [
      { q: 'Kurulum ücretli mi?', a: 'Hayır, kampanyalı tüm paketlerde kurulum ücretsizdir. Taahhütsüz aboneliklerde kurulum ücreti uygulanabilir.' },
      { q: 'Modem ücreti ne kadar?', a: 'Kampanyaya göre aylık +60₺ veya +90₺ modem kira ücreti vardır. Modem kampanya sonunda sizde kalmaz, iade edilir.' },
      { q: 'Taahhüt süresi sonunda fiyatım artar mı?', a: 'Taahhüt bitiminde liste fiyatına dönülür ve kampanya indirimleri kalkar. Dilerseniz yeni bir kampanyaya geçebilirsiniz.' },
      { q: 'Muratpaşa kampanyasında fiyatım sabit mi kalır?', a: 'Evet, Bölgesel Fırsat kampanyasında 24 ay boyunca aylık fiyat artmaz. Tek fiyatla sabit kalır.' },
      { q: 'Bölgesel kampanyalar ne demek?', a: 'Türk Telekom bazı bölgelerde (Manavgat, Alanya, Kepez, Muratpaşa) rekabet nedeniyle özel indirimli paketler sunar. Bu paketler sadece o bölgedeki adreslerde geçerlidir.' },
    ],
  },
  {
    category: 'Teknik Sorular',
    items: [
      { q: 'Fiber ile VDSL arasındaki fark ne?', a: 'Fiber optik kablolarla taşınır, VDSL ise telefon hattı bakır teli üzerinden çalışır. Fiber daha hızlı, daha stabil ve uzun mesafede hız kaybı yaşamaz. Fiber olan binalarda kesinlikle fiber tercih edilmelidir.' },
      { q: 'Limitsiz gerçekten limitsiz mi?', a: 'Evet, tüm ev interneti paketleri aylık limitsizdir. Adil kullanım kotası yoktur.' },
      { q: 'Kendi modemimi kullanabilir miyim?', a: 'TT\'nin onayladığı modem listesinde yer alan cihazlarınızı kullanabilirsiniz, ancak TT\'nin sağladığı modem daha kolay destek alımı için tercih edilir.' },
      { q: 'Wi-Fi şifremi nasıl değiştirebilirim?', a: 'Modem arkasındaki adrese (genellikle 192.168.1.1) tarayıcıdan girip modem ayarlarından değiştirebilirsiniz. Sorun yaşarsanız bayimizden destek alabilirsiniz.' },
    ],
  },
  {
    category: 'Tivibu ve TV Paketleri',
    items: [
      { q: 'Tivibulu paket ne demek?', a: 'İnternet ile birlikte Tivibu TV hizmetinin de dahil olduğu birleşik pakettir. Canlı TV kanalları, spor içerikleri ve film kütüphanesi kullanılabilir.' },
      { q: 'Tivibu ek cihaz gerektirir mi?', a: 'TV\'ye bağlanacak IPTV modemi (+60₺/ay) gerekir. Tablet/telefondan Tivibu uygulamasıyla da izleyebilirsiniz.' },
      { q: 'Hangi kanallar var?', a: 'Standart paket 140+ kanal içerir. Sinema, spor ve premium ek paketler ayrıca sunulur.' },
    ],
  },
  {
    category: 'Yetkili Bayi ve Güvenlik',
    items: [
      { q: 'Siz Türk Telekom mu yoksa bayi misiniz?', a: 'Göksoylar İletişim Ltd. Şti. olarak Türk Telekom Yetkili Bayisiyiz. Aboneliğiniz Türk Telekom\'a yapılır, biz sadece başvurunuzu onlar adına alırız ve kurulum sürecinde yanınızda oluruz.' },
      { q: 'Bilgilerim güvende mi?', a: 'Evet. Tüm bilgileriniz KVKK uyumlu olarak Türkiye\'deki sunucularda saklanır. Bilgileriniz yalnızca başvurunuzu sonuçlandırmak için Türk Telekom\'a aktarılır.' },
      { q: 'Başvurumu iptal edebilir miyim?', a: 'Evet, sözleşme imzalanmadan önce istediğiniz zaman başvurunuzu iptal edebilirsiniz. Sözleşme sonrası 14 gün içinde cayma hakkınız vardır.' },
    ],
  },
];

export default function SssPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  };

  return (
    <div className="bg-white py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-fluid max-w-3xl">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Yardım Merkezi
          </div>
          <h1 className="section-title mb-3">Sık Sorulan Sorular</h1>
          <p className="section-subtitle">
            Başvurmadan önce merak edilen konular. Cevabı bulamadığınız soru için WhatsApp'tan bize yazabilirsiniz.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((cat) => (
            <section key={cat.category}>
              <h2 className="text-xl font-extrabold text-ink-900 mb-4 pb-2 border-b-2 border-brand-700">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, i) => (
                  <details key={i} className="card p-5 group">
                    <summary className="flex items-center justify-between cursor-pointer font-bold text-ink-900 list-none">
                      <span>{item.q}</span>
                      <ChevronRight className="w-5 h-5 text-ink-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="mt-4 text-sm text-ink-600 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
