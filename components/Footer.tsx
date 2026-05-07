import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, MapPin, Award } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-[5%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand + Bayi badge */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/tt-logo.png"
                alt="Türk Telekom"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <p className="font-extrabold text-base">internetbasvuru.com</p>
                <p className="text-xs text-white/60">Türk Telekom Yetkili Bayi</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-brand-500" />
              <span className="text-[11px] font-bold tracking-wide text-white/80">
                Bayi Kodu: B9613
              </span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Göksoylar İletişim Ltd. Şti. — Türk Telekom yetkili bayisi olarak
              Türkiye geneli fiber internet başvurularını alıyoruz.
            </p>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/905349777000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-white/80 hover:text-brand-500 active:text-brand-700 transition min-h-[40px]"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp ile iletişim</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@internetbasvuru.com"
                  className="inline-flex items-center gap-2.5 text-sm text-white/80 hover:text-brand-500 active:text-brand-700 transition min-h-[40px] break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@internetbasvuru.com</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2.5 text-sm text-white/80">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Manavgat / Antalya</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Yasal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kvkk"
                  className="block text-sm text-white/80 hover:text-brand-500 active:text-brand-700 transition py-1.5 min-h-[40px] flex items-center"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link
                  href="/cerez-politikasi"
                  className="block text-sm text-white/80 hover:text-brand-500 active:text-brand-700 transition py-1.5 min-h-[40px] flex items-center"
                >
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="block text-sm text-white/80 hover:text-brand-500 active:text-brand-700 transition py-1.5 min-h-[40px] flex items-center"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-white/40">
            © {year} Göksoylar İletişim Ltd. Şti. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-white/40 leading-relaxed">
            Türk Telekom logosu ve marka adı, Türk Telekom A.Ş.&apos;ye aittir. Yetkili
            bayi sıfatıyla hizmet vermekteyiz.
          </p>
        </div>
      </div>
    </footer>
  );
}
