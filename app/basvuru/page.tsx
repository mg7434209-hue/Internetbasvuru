import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { Shield, Clock, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türk Telekom Fiber İnternet Başvuru Formu',
  description: 'Türk Telekom fiber internet başvuru formu. Bilgilerinizi bırakın, 15 dakika içinde yetkili bayimiz sizi arasın.',
  alternates: { canonical: 'https://internetbasvuru.com/basvuru' },
};

export default function BasvuruPage() {
  return (
    <div className="bg-ink-50 min-h-screen py-10 md:py-16">
      <div className="container-fluid max-w-4xl">
        <div className="text-center mb-8">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Başvuru Formu
          </div>
          <h1 className="section-title mb-3">Türk Telekom Fiber Başvurusu</h1>
          <p className="text-ink-600 max-w-xl mx-auto">
            Aşağıdaki bilgileri doldurun — yetkili bayimiz 15 dakika içinde sizi arasın. Hızlı yol olarak WhatsApp'ı da tercih edebilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <LeadForm variant="inline" sourceLabel="basvuru-page" />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-brand-700" />
                </div>
                <h3 className="font-bold text-ink-900">Hızlı Dönüş</h3>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">
                Başvurunuzu aldıktan sonra 15 dakika içinde arama yapıyoruz. Mesai saatleri dışındaki başvurular bir sonraki gün ilk sırada yanıtlanır.
              </p>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-brand-700" />
                </div>
                <h3 className="font-bold text-ink-900">Veri Güvenliği</h3>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">
                Tüm bilgileriniz Türkiye'deki sunucularda KVKK uyumlu olarak saklanır. Veriler Türk Telekom adına yalnızca başvurunuzu sonuçlandırmak için kullanılır.
              </p>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-700" />
                </div>
                <h3 className="font-bold text-ink-900">Yetkili Bayi Desteği</h3>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">
                Göksoylar İletişim Ltd. Şti. olarak Türk Telekom yetkili bayisiyiz (AVES Telekom Dağıtım Merkezi). Antalya bölgesi kampanyalarında uzmanız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
