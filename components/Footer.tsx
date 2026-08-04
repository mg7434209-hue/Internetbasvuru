import Link from 'next/link';
import { Award } from 'lucide-react';
import TurkcellLogo from './TurkcellLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-tc-navy text-white mt-12">
      <div className="max-w-7xl mx-auto px-[5%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Brand + satış noktası badge */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <TurkcellLogo variant="footer" />
              <div className="border-l border-white/15 pl-3 min-w-0">
                <p className="font-extrabold text-base break-words">internetbasvuru.com</p>
                <p className="text-xs text-white/60">Turkcell Superbox Yetkili Satış Noktası</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-accent-500" />
              <span className="text-[11px] font-bold tracking-wide text-white/80">
                Yetkili Satış Noktası
              </span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Turkcell Superbox yetkili satış noktası olarak Türkiye geneli
              kablosuz evde internet başvurularını alıyoruz.
            </p>
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
                  className="block text-sm text-white/80 hover:text-accent-500 active:text-accent-600 transition py-1.5 min-h-[40px] flex items-center"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link
                  href="/cerez-politikasi"
                  className="block text-sm text-white/80 hover:text-accent-500 active:text-accent-600 transition py-1.5 min-h-[40px] flex items-center"
                >
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="block text-sm text-white/80 hover:text-accent-500 active:text-accent-600 transition py-1.5 min-h-[40px] flex items-center"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-white/40">
            © {year} internetbasvuru.com — Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-white/40 leading-relaxed">
            Turkcell, Turkcell Superonline, Superbox ve TV+ marka adları, Turkcell
            İletişim Hizmetleri A.Ş. ve Turkcell Superonline İletişim Hizmetleri
            A.Ş.&apos;ye aittir. Yetkili satış noktası sıfatıyla hizmet vermekteyiz.
          </p>
        </div>
      </div>
    </footer>
  );
}
