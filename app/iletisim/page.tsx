import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Mail, MapPin, Award, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Göksoylar İletişim Ltd. Şti. — Türk Telekom yetkili bayisi. WhatsApp, e-posta ve online başvuru ile bize ulaşın.',
  alternates: { canonical: 'https://internetbasvuru.com/iletisim' },
};

export default function IletisimPage() {
  return (
    <article className="max-w-4xl mx-auto px-[5%] py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 mb-3">
          İletişim
        </h1>
        <p className="text-ink-500 text-base max-w-2xl mx-auto">
          Türk Telekom fiber internet başvurusu için aşağıdaki kanallardan bize ulaşabilirsiniz.
          15 dakika içinde dönüş yapıyoruz.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* WhatsApp Card — primary CTA */}
        <a
          href="https://wa.me/905349777000?text=Merhaba%2C%20T%C3%BCrk%20Telekom%20fiber%20internet%20ba%C5%9Fvurusu%20yapmak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-success/10 hover:bg-success/15 active:bg-success/20 border-2 border-success/30 rounded-2xl p-6 transition min-h-[140px]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-success" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-ink-900 text-lg mb-1">WhatsApp</h2>
              <p className="text-sm text-ink-500 mb-3 leading-relaxed">
                En hızlı yanıt. Mesajınızı atın, 15 dakika içinde dönüş yapalım.
              </p>
              <div className="inline-flex items-center gap-1.5 text-success font-bold text-sm group-hover:gap-2.5 transition-all">
                <span>WhatsApp&apos;tan yaz</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </a>

        {/* Online başvuru — primary CTA */}
        <Link
          href="/#wizard"
          className="group bg-brand-50 hover:bg-brand-100 active:bg-brand-200 border-2 border-brand-500/30 rounded-2xl p-6 transition min-h-[140px]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-brand-700" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-ink-900 text-lg mb-1">Online Başvuru</h2>
              <p className="text-sm text-ink-500 mb-3 leading-relaxed">
                Formu doldurun, paket önerimizi alın. 5 adım, 2 dakika.
              </p>
              <div className="inline-flex items-center gap-1.5 text-brand-700 font-bold text-sm group-hover:gap-2.5 transition-all">
                <span>Başvuruyu başlat</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Diğer iletişim bilgileri */}
      <div className="bg-ink-50 rounded-2xl p-6 sm:p-8 mb-8">
        <h2 className="font-bold text-ink-900 text-lg mb-5">Diğer İletişim Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wider mb-0.5">
                E-posta
              </p>
              <a
                href="mailto:info@internetbasvuru.com"
                className="text-sm text-ink-900 hover:text-brand-700 transition font-semibold break-all"
              >
                info@internetbasvuru.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wider mb-0.5">
                Adres
              </p>
              <p className="text-sm text-ink-900 font-semibold">Manavgat / Antalya</p>
              <p className="text-xs text-ink-500 mt-0.5">Göksoylar İletişim Ltd. Şti.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wider mb-0.5">
                Çalışma Saatleri
              </p>
              <p className="text-sm text-ink-900 font-semibold">Pzt–Cmt: 09:00 – 19:00</p>
              <p className="text-xs text-ink-500 mt-0.5">Pazar günleri kapalıyız</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-ink-500 uppercase tracking-wider mb-0.5">
                Bayi Kodu
              </p>
              <p className="text-sm text-ink-900 font-semibold">B9613</p>
              <p className="text-xs text-ink-500 mt-0.5">Türk Telekom Yetkili Bayi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-brand-50 border border-brand-100 rounded-2xl p-6">
        <p className="text-sm text-ink-700 leading-relaxed">
          <strong className="text-ink-900">KVKK ve Gizlilik:</strong> Bizimle paylaştığınız tüm
          bilgiler{' '}
          <Link href="/kvkk" className="text-brand-700 hover:text-brand-500 font-bold underline">
            KVKK Aydınlatma Metni
          </Link>{' '}
          kapsamında işlenir. Üçüncü taraflarla paylaşılmaz.
        </p>
      </div>
    </article>
  );
}
