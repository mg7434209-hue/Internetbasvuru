import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { buildPhoneLink, BAYI_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-ink-200 mt-20">
      <div className="container-fluid py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo + açıklama */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-brand-700" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12h3M8 12h3M13 12h3M18 12h3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-white text-base">internetbaşvuru</span>
                <span className="text-[10px] text-accent-400 font-semibold tracking-wider">.com.tr</span>
              </div>
            </Link>
            <p className="text-sm text-ink-300 leading-relaxed mb-4">
              Türk Telekom Yetkili Bayisi olarak Antalya ve Türkiye genelinde fiber internet başvurularınızı hızlıca sonuçlandırıyoruz.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={buildPhoneLink()} className="flex items-center gap-2 text-ink-200 hover:text-accent-400 transition-colors">
                <Phone className="w-4 h-4" />
                {BAYI_PHONE_DISPLAY}
              </a>
              <div className="flex items-center gap-2 text-ink-200">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Manavgat / Antalya</span>
              </div>
            </div>
          </div>

          {/* Hızlı erişim */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Hızlı Erişim</h3>
            <ul className="space-y-2.5">
              <li><Link href="/paketler" className="text-sm text-ink-300 hover:text-white transition-colors">Paketler</Link></li>
              <li><Link href="/kampanyalar" className="text-sm text-ink-300 hover:text-white transition-colors">Kampanyalar</Link></li>
              <li><Link href="/bolgeler" className="text-sm text-ink-300 hover:text-white transition-colors">Bölgeler</Link></li>
              <li><Link href="/rehber" className="text-sm text-ink-300 hover:text-white transition-colors">Rehber</Link></li>
              <li><Link href="/sss" className="text-sm text-ink-300 hover:text-white transition-colors">S.S.S.</Link></li>
            </ul>
          </div>

          {/* Popüler bölgeler */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Popüler Bölgeler</h3>
            <ul className="space-y-2.5">
              <li><Link href="/bolgeler/manavgat" className="text-sm text-ink-300 hover:text-white transition-colors">Manavgat</Link></li>
              <li><Link href="/bolgeler/alanya" className="text-sm text-ink-300 hover:text-white transition-colors">Alanya</Link></li>
              <li><Link href="/bolgeler/muratpasa" className="text-sm text-ink-300 hover:text-white transition-colors">Muratpaşa</Link></li>
              <li><Link href="/bolgeler/kepez" className="text-sm text-ink-300 hover:text-white transition-colors">Kepez</Link></li>
              <li><Link href="/bolgeler/side" className="text-sm text-ink-300 hover:text-white transition-colors">Side</Link></li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Yasal</h3>
            <ul className="space-y-2.5">
              <li><Link href="/kvkk-aydinlatma" className="text-sm text-ink-300 hover:text-white transition-colors">KVKK Aydınlatma Metni</Link></li>
              <li><Link href="/cerez-politikasi" className="text-sm text-ink-300 hover:text-white transition-colors">Çerez Politikası</Link></li>
              <li><Link href="/gizlilik-politikasi" className="text-sm text-ink-300 hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-sartlari" className="text-sm text-ink-300 hover:text-white transition-colors">Kullanım Şartları</Link></li>
              <li><Link href="/hakkimizda" className="text-sm text-ink-300 hover:text-white transition-colors">Hakkımızda</Link></li>
            </ul>
          </div>
        </div>

        {/* Bayi bilgileri */}
        <div className="mt-12 pt-8 border-t border-brand-700/50">
          <div className="bg-brand-800/50 rounded-lg p-4 md:p-5 mb-6">
            <h4 className="text-sm font-bold text-white mb-2">Şirket Bilgileri</h4>
            <div className="text-xs text-ink-300 leading-relaxed space-y-1">
              <p><strong className="text-ink-100">Unvan:</strong> Göksoylar İletişim Ltd. Şti.</p>
              <p><strong className="text-ink-100">Adres:</strong> Manavgat / Antalya</p>
              <p><strong className="text-ink-100">Yetki:</strong> Türk Telekom Yetkili Bayisi (AVES Telekom Dağıtım Merkezi)</p>
            </div>
          </div>

          <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-4 md:p-5">
            <p className="text-xs md:text-sm text-ink-200 leading-relaxed">
              <strong className="text-white">Önemli Bilgilendirme:</strong> internetbasvuru.com, Göksoylar İletişim Ltd. Şti. tarafından işletilen bir <strong className="text-white">Türk Telekom Yetkili Bayi</strong> sitesidir. Türk Telekom A.Ş.'nin resmi web sitesi <strong className="text-white">değildir</strong>. Kampanya fiyatları Türk Telekom tarafından belirlenir ve değişiklik gösterebilir.
              Resmi işlemler için <a href="https://www.turktelekom.com.tr" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">turktelekom.com.tr</a> adresini ziyaret edebilirsiniz.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-brand-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Göksoylar İletişim Ltd. Şti. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-ink-400">
            Türk Telekom, TTNET, Tivibu markaları Türk Telekom A.Ş.'ye aittir.
          </p>
        </div>
      </div>
    </footer>
  );
}
