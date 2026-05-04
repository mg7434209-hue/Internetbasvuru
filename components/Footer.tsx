import Link from 'next/link';
import TTLogo from './TTLogo';

export default function Footer() {
  return (
    <footer className="px-[5%] py-12 text-center text-ink-500 text-sm bg-white">
      {/* TT Block */}
      <div className="flex flex-col items-center gap-3.5 mt-8 mb-6 pb-6 border-b border-ink-100 max-w-[640px] mx-auto">
        <TTLogo variant="footer" />
        <p className="text-[15px] text-ink-500 font-semibold">
          <strong className="text-ink-900">Göksoylar İletişim Ltd. Şti.</strong> · Türk Telekom A.Ş. Yetkili Bayisi
        </p>
      </div>

      <p className="mb-1.5">
        <strong className="text-ink-900">Göksoylar İletişim Ltd. Şti.</strong> · Türk Telekom Yetkili Bayisi (AVES Telekom Dağıtım Merkezi)
      </p>
      <p className="mb-1.5">Manavgat / Antalya · 0534 977 70 00</p>

      {/* Disclaimer */}
      <div className="bg-ink-50 px-6 py-4 rounded-2xl mt-6 max-w-[720px] mx-auto leading-relaxed text-xs">
        <strong className="text-ink-900">Önemli bilgilendirme:</strong>{' '}
        internetbasvuru.com, Göksoylar İletişim Ltd. Şti. tarafından işletilen bir Türk Telekom Yetkili Bayi sitesidir.
        Türk Telekom A.Ş.'nin resmi web sitesi <strong className="text-ink-900">değildir</strong>.
        Kampanya fiyatları Türk Telekom tarafından belirlenir ve değişiklik gösterebilir.
        Adresinizde altyapı uygunluğu telefon görüşmesinde teyit edilir.
      </div>

      {/* Links */}
      <div className="mt-5 flex justify-center gap-1 flex-wrap text-[15px]">
        <Link href="/kvkk-aydinlatma" className="text-ink-500 hover:text-brand-500 px-2 border-r border-ink-100">KVKK</Link>
        <Link href="/cerez-politikasi" className="text-ink-500 hover:text-brand-500 px-2 border-r border-ink-100">Çerez Politikası</Link>
        <Link href="/gizlilik-politikasi" className="text-ink-500 hover:text-brand-500 px-2 border-r border-ink-100">Gizlilik</Link>
        <Link href="/kullanim-sartlari" className="text-ink-500 hover:text-brand-500 px-2 border-r border-ink-100">Kullanım Şartları</Link>
        <Link href="/hakkimizda" className="text-ink-500 hover:text-brand-500 px-2">Hakkımızda</Link>
      </div>

      <p className="mt-6 text-[11px] text-ink-400">
        © 2026 Göksoylar İletişim Ltd. Şti. · Türk Telekom, TTNET, Tivibu markaları Türk Telekom A.Ş.'ye aittir.
      </p>
    </footer>
  );
}
