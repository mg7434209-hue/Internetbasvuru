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
      {/* Dealer Strip */}
      <div className="bg-ink-900 text-white/85 text-xs px-[5%] py-2 flex justify-between items-center flex-wrap gap-2.5">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow shadow-[0_0_0_3px_rgba(56,185,78,0.25)]" />
          <TTLogo variant="mini" />
          <span className="ml-1">Yetkili Bayisi · Göksoylar İletişim Ltd. Şti.</span>
        </span>
        <a
          href="tel:+905349777000"
          className="text-white font-bold no-underline hover:text-brand-300 transition inline-flex items-center gap-1.5"
        >
          0534 977 70 00
        </a>
      </div>

      {/* Main Header */}
      <header className="bg-white/85 backdrop-blur-md px-[5%] py-4 flex justify-between items-center sticky top-0 z-[1000] border-b border-black/5">
        {/* Logo: sol başta TT logosu öne çıkıyor */}
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline"
          aria-label="Türk Telekom Yetkili Bayi · Anasayfa"
        >
          <TTLogo variant="cobrand" />
          <span className="hidden md:inline-flex flex-col leading-none border-l border-ink-100 pl-2.5">
            <span className="text-[10px] font-bold text-ink-500 tracking-[0.1em] uppercase">
              Yetkili Bayi
            </span>
            <span className="text-[11px] font-semibold text-ink-700 mt-0.5">
              internetbaşvuru
            </span>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Nav links - desktop */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-ink-700">
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

          {/* Phone link */}
          <a
            href="tel:05349777000"
            className="hidden sm:inline-flex font-bold text-ink-900 text-sm md:text-base no-underline hover:text-brand-500 transition"
          >
            0534 977 70 00
          </a>

          {/* CTA */}
          <button
            onClick={scrollToWizard}
            className="hidden md:inline-flex bg-ink-900 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
          >
            Hemen Başvur
          </button>
        </div>
      </header>
    </>
  );
}
