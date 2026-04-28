import { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import { buildWhatsAppLink, buildPhoneLink, BAYI_PHONE_DISPLAY } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'İletişim | Göksoylar İletişim - TT Yetkili Bayi',
  description: 'Türk Telekom fiber internet başvurusu için bizimle iletişime geçin. Telefon, WhatsApp, veya form üzerinden 15 dakika içinde dönüş alın.',
  alternates: { canonical: 'https://internetbasvuru.com/iletisim' },
};

export default function IletisimPage() {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container-fluid">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            İletişim
          </div>
          <h1 className="section-title mb-3">Bize Ulaşın</h1>
          <p className="section-subtitle">
            Telefon, WhatsApp veya aşağıdaki form ile bize ulaşın — 15 dakika içinde dönüş yapıyoruz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div className="space-y-4 mb-8">
              <a
                href={buildPhoneLink()}
                className="card flex items-center gap-4 p-5 hover:border-brand-500"
              >
                <div className="w-12 h-12 bg-brand-700 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-500 font-semibold uppercase">Telefon</div>
                  <div className="text-lg font-bold text-ink-900">{BAYI_PHONE_DISPLAY}</div>
                </div>
              </a>

              <a
                href={buildWhatsAppLink({ type: 'contact' })}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-5 hover:border-wa-500"
              >
                <div className="w-12 h-12 bg-wa-500 rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-500 font-semibold uppercase">WhatsApp</div>
                  <div className="text-lg font-bold text-ink-900">Hemen Yaz</div>
                  <div className="text-xs text-ink-500">Ortalama 5 dk içinde yanıt</div>
                </div>
              </a>

              <div className="card flex items-center gap-4 p-5">
                <div className="w-12 h-12 bg-ink-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-ink-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-500 font-semibold uppercase">Merkez</div>
                  <div className="text-lg font-bold text-ink-900">Manavgat / Antalya</div>
                </div>
              </div>

              <div className="card flex items-center gap-4 p-5">
                <div className="w-12 h-12 bg-ink-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-ink-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-500 font-semibold uppercase">Çalışma Saatleri</div>
                  <div className="text-sm font-semibold text-ink-900">Pzt-Cmt: 09:00 - 19:00</div>
                  <div className="text-xs text-ink-500">WhatsApp 7/24 aktif</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <LeadForm variant="inline" sourceLabel="contact-page" />
          </div>
        </div>
      </div>
    </div>
  );
}
