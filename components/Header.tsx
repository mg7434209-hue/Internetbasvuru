'use client';

import Link from 'next/link';
import TTLogo from './TTLogo';

export default function Header() {
  function scrollToWizard() {
    if (typeof window !== 'undefined') {
      const wiz = document.getElementById('wizard');
      if (wiz) {
        wiz.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#wizard';
      }
    }
  }

  return (
    <>
      {/* Dealer Strip — telefon yok, ortalı, sade kurumsal */}
      <div className="bg-ink-900 text-white/90 text-xs px-[5%] py-2.5 flex justify-center items-center flex-wrap gap-2.5">
        <span className="inline-flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow shadow-[0_0_0_3px_rgba(56,185,78,0.25)]" />
          <TTLogo variant="mini" />
          <span className="font-medium">Yetkili Bayisi · Göksoylar İletişim Ltd. Şti.</span>
        </span>
      </div>

      {/* Main Header — kurumsal sade, telefon yok */}
      <header className="bg-white/85 backdrop-blur-md px-[5%] py-3.5 flex justify-between items-center sticky top-0 z-[1000] border-b border-black/5">
        {/* Logo: koyu rozet kutu (cobrand) + ince ayrıcı + site adı */}
        <Link
          href="/"
          className="flex items-center gap-3.5 no-underline group"
          aria-label="Türk Telekom Yetkili Bayi · Anasayfa"
        >
          <TTLogo variant="cobrand" className="transition-transform group-hover:scale-105" />
          <span className="hidden md:inline-flex flex-col leading-tight">
            <span className="text-[10px] font-bold text-ink-500 tracking-[0.14em] uppercase">
              Yetkili Bayi
            </span>
            <span className="text-base font-extrabold text-ink-900 mt-0.5 tracking-tight">
              internetbaşvuru
            </span>
          </span>
        </Link>

        {/* Right: Nav + CTA */}
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-ink-700">
            <Link href="/" className="hover:text-brand-500 transition">
              Anasayfa
            </Link>
            <Link href="/rehber" className="hover:text-brand-500 transition">
              Rehber
            </Link>
            <Link href="/iletisim" className="hover:text-brand-500 transition">
              İletişim
            </Link>
          </nav>

          <button
            onClick={scrollToWizard}
            className="bg-ink-900 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 shadow-sm"
          >
            Hemen Başvur
          </button>
        </div>
      </header>
    </>
  );
}
