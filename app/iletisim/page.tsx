import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock, MessageCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Türk Telekom yetkili bayi Göksoylar İletişim ile iletişim. Manavgat / Antalya - 0534 977 70 00. 7/24 ulaşım, 15 dakika içinde dönüş.',
  alternates: { canonical: 'https://internetbasvuru.com/iletisim' },
};

const WHATSAPP_URL =
  'https://wa.me/905349777000?text=' +
  encodeURIComponent('Merhaba, Türk Telekom fiber internet başvurusu hakkında bilgi almak istiyorum.');

export default function IletisimPage() {
  return (
    <div className="bg-ink-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-[5%]">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-[13px] font-bold mb-4 tracking-wide">
            <Phone className="w-3.5 h-3.5" />
            7/24 ulaşılabilir
          </div>
          <h1 className="text-display font-extrabold mb-3 text-balance">
            <span className="text-brand-500">Bize Ulaşın</span>
          </h1>
          <p className="text-ink-500 max-w-xl mx-auto leading-relaxed">
            Türk Telekom fiber internet başvurusu, fiyat bilgisi veya teknik destek için
            yetkili bayimiz size yardımcı olmaktan mutluluk duyar.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {/* Telefon */}
          <a
            href="tel:+905349777000"
            className="block bg-white rounded-2xl p-7 border border-ink-100 hover:border-brand-500 hover:shadow-medium transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition">
              <Phone className="w-6 h-6 text-brand-500 group-hover:text-white transition" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-ink-900">Telefonla Ara</h3>
            <p className="text-2xl font-extrabold text-brand-500 mb-1.5 tracking-tight">
              0534 977 70 00
            </p>
            <p className="text-sm text-ink-500 leading-relaxed">
              7/24 ulaşılabilir<br />
              15 dakika içinde dönüş garantisi
            </p>
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl p-7 border border-ink-100 hover:border-wa-500 hover:shadow-medium transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-wa-500 transition">
              <MessageCircle className="w-6 h-6 text-wa-500 group-hover:text-white transition" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-ink-900">WhatsApp Yaz</h3>
            <span className="inline-flex items-center gap-2 bg-wa-500 hover:bg-wa-600 text-white px-4 py-2 rounded-full font-bold text-sm transition mb-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp&apos;tan Yaz
            </span>
            <p className="text-sm text-ink-500 leading-relaxed mt-2">
              Hızlı yanıt, yazılı kayıt<br />
              Anlık iletişim
            </p>
          </a>

          {/* Adres */}
          <div className="bg-white rounded-2xl p-7 border border-ink-100">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-ink-900">Adresimiz</h3>
            <p className="font-semibold text-ink-900 mb-1">Göksoylar İletişim Ltd. Şti.</p>
            <p className="text-ink-500 text-sm leading-relaxed">
              Türk Telekom Yetkili Bayisi<br />
              Manavgat / Antalya
            </p>
          </div>

          {/* Saatler */}
          <div className="bg-white rounded-2xl p-7 border border-ink-100">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-ink-900">Çalışma Saatleri</h3>
            <p className="text-ink-500 text-sm leading-relaxed">
              <strong className="text-ink-900">Ofis:</strong> Pzt-Cmt 09:00-19:00
              <br />
              <strong className="text-ink-900">Telefon &amp; WhatsApp:</strong> 7/24 aktif
              <br />
              <span className="text-xs text-ink-400">Pazar günleri sadece WhatsApp</span>
            </p>
          </div>
        </div>

        {/* Hizmet Bölgeleri */}
        <div className="bg-white rounded-2xl p-7 border border-ink-100 mb-10">
          <h3 className="text-lg font-bold mb-3 text-ink-900">Hizmet Verdiğimiz Bölgeler</h3>
          <p className="text-ink-500 text-sm mb-4 leading-relaxed">
            Türk Telekom fiber internet başvuruları için <strong>Türkiye geneli</strong> hizmet veriyoruz.
            Antalya bölgesinde özel bölgesel kampanyalarımız mevcuttur:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-brand-50 px-3 py-2 rounded-lg">
              <strong className="text-brand-700 text-xs uppercase tracking-wider">Bölgesel Avantaj</strong>
              <p className="text-ink-700 text-sm mt-0.5">Manavgat · Alanya · Kepez</p>
            </div>
            <div className="bg-brand-50 px-3 py-2 rounded-lg">
              <strong className="text-brand-700 text-xs uppercase tracking-wider">Bölgesel Fırsat</strong>
              <p className="text-ink-700 text-sm mt-0.5">Muratpaşa (24 ay tek fiyat)</p>
            </div>
            <div className="bg-ink-50 px-3 py-2 rounded-lg">
              <strong className="text-ink-700 text-xs uppercase tracking-wider">Standart</strong>
              <p className="text-ink-700 text-sm mt-0.5">Diğer 80 il (Fiber Gücü Yaşa)</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-ink-500 mb-4">Hemen başvurmak ister misiniz?</p>
          <Link
            href="/#wizard"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Online Başvuru Yap
          </Link>
        </div>

        {/* KVKK Notu */}
        <div className="mt-10 bg-white rounded-xl p-5 border border-ink-100 text-xs text-ink-500 leading-relaxed">
          <strong className="text-ink-900 inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            E-posta:
          </strong>{' '}
          info@internetbasvuru.com{' '}
          <span className="text-ink-300">·</span>{' '}
          <strong className="text-ink-900">Veri Sorumlusu:</strong> Göksoylar İletişim Ltd. Şti.{' '}
          (KVKK uyarınca kişisel verileriniz güvenle saklanır.)
        </div>
      </div>
    </div>
  );
}
