import { Metadata } from 'next';
import { Shield, Award, MapPin, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda | Göksoylar İletişim - TT Yetkili Bayi',
  description: 'Göksoylar İletişim Ltd. Şti. - Manavgat/Antalya merkezli Türk Telekom Yetkili Bayisi. Hızlı başvuru, profesyonel destek.',
  alternates: { canonical: 'https://internetbasvuru.com/hakkimizda' },
};

export default function HakkimizdaPage() {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container-fluid max-w-4xl">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Hakkımızda
          </div>
          <h1 className="section-title mb-3">Göksoylar İletişim Ltd. Şti.</h1>
          <p className="section-subtitle">
            Türk Telekom Yetkili Bayisi olarak Antalya bölgesinde fiber internet başvurularınızı profesyonelce yönetiyoruz.
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-ink-700 leading-relaxed">
            <strong>Göksoylar İletişim Ltd. Şti.</strong>, Manavgat merkezli bir telekomünikasyon bayiliği şirketidir. AVES Telekom Dağıtım Merkezi üzerinden <strong>Türk Telekom</strong> A.Ş., TT Mobil İletişim Hizmetleri A.Ş. ve TTNET A.Ş.'nin yetkili bayiliğini yürütüyoruz.
          </p>
          <p className="text-ink-700 leading-relaxed">
            Antalya genelinde — özellikle Manavgat, Alanya, Side, Serik, Muratpaşa ve Kepez bölgelerinde — ev internetinden mobil hatta, Tivibu TV'den kurumsal çözümlere kadar tüm Türk Telekom hizmetlerinde abonelik başvurularını, kurulum süreçlerini ve müşteri destek hizmetlerini yürütüyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {[
            {
              icon: Award,
              title: 'Yetkili Bayi Statüsü',
              desc: 'Türk Telekom Grubu resmi yetkili bayisi — tüm abonelik süreçleri yasal ve resmi kanallarla gerçekleşir.',
            },
            {
              icon: MapPin,
              title: 'Yerel Deneyim',
              desc: 'Antalya bölgesinde yıllardır hizmet veren ekibimiz, ilçelere özgü kampanya ve altyapıyı en iyi bilir.',
            },
            {
              icon: Shield,
              title: 'KVKK Uyumlu',
              desc: 'Tüm müşteri bilgileri Türkiye sunucularında, KVKK ve Türk Telekom veri işleme sözleşmesine uygun şekilde işlenir.',
            },
            {
              icon: Users,
              title: 'Profesyonel Destek',
              desc: 'Başvurudan kuruluma, kurulumdan sorun çözümüne kadar her aşamada yanınızdayız.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="card p-5">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-brand-700" />
                </div>
                <h3 className="font-bold text-ink-900 mb-2">{item.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 bg-ink-50 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-ink-900 mb-4">Şirket Bilgileri</h2>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-ink-500 font-semibold">Unvan</dt>
              <dd className="text-ink-900">Göksoylar İletişim Ltd. Şti.</dd>
            </div>
            <div>
              <dt className="text-ink-500 font-semibold">Merkez</dt>
              <dd className="text-ink-900">Manavgat / Antalya</dd>
            </div>
            <div>
              <dt className="text-ink-500 font-semibold">Bayi Yetkisi</dt>
              <dd className="text-ink-900">Türk Telekom Grubu (AVES Telekom DM)</dd>
            </div>
            <div>
              <dt className="text-ink-500 font-semibold">İletişim</dt>
              <dd className="text-ink-900">0534 977 70 00</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
