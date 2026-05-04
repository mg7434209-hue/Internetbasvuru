'use client';

import Link from 'next/link';
import TTLogo from './TTLogo';

export default function Header() {
  function scrollToWizard() {
    if (typeof window !== 'undefined') {
      document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Demo Banner - SADECE staging için, production'da kaldırılır */}
      {/* <div className="bg-yellow-300 text-ink-900 text-center py-2 px-3 text-xs font-semibold">
        Mockup ön izleme · Form gerçek gönderim yapmaz
      </div> */}

      {/* Dealer Strip */}
      <div className="bg-ink-900 text-white/85 text-xs px-[5%] py-2 flex justify-between items-center flex-wrap gap-2.5">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow shadow-[0_0_0_3px_rgba(56,185,78,0.25)]" />
          <TTLogo variant="mini" />
          <span className="ml-1">Yetkili Bayisi · Göksoylar İletişim Ltd. Şti.</span>
        </span>
        <a href="tel:+905349777000" className="text-white font-bold no-underline hover:text-brand-300 transition">
          📞 0534 977 70 00
        </a>
      </div>

      {/* Main Header */}
      <header className="bg-white/85 backdrop-blur-md px-[5%] py-4 flex justify-between items-center sticky top-0 z-[1000] border-b border-black/5">
        {/* Logo */}
        <Link href="/" className="text-[1.4rem] font-extrabold text-brand-500 no-underline flex items-baseline gap-2 -tracking-[0.5px]">
          <span>
            <span>internet</span>
            <span className="text-ink-900">başvuru</span>
          </span>
          {/* TT Cobrand */}
          <span className="hidden md:inline-flex items-center gap-2 self-center">
            <span className="w-px h-[22px] bg-ink-100 inline-block" />
            <TTLogo variant="cobrand" />
            <span className="text-[9px] font-bold text-ink-500 tracking-[0.08em] uppercase leading-none">
              YETKİLİ BAYİ
            </span>
          </span>
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-4">
          <a href="tel:05349777000" className="font-bold text-ink-900 text-base no-underline">
            0534 977 70 00
          </a>
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
