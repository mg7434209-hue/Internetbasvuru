'use client';

import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import TTLogo from './TTLogo';

const WHATSAPP_URL =
  'https://wa.me/905349777000?text=' +
  encodeURIComponent('Merhaba, Türk Telekom fiber internet başvurusu hakkında bilgi almak istiyorum.');

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
          <Phone className="w-3 h-3" />
          0534 977 70 00
        </a>
      </div>

      {/* Main Header */}
      <header className="bg-white/85 backdrop-blur-md px-[5%] py-4 flex justify-between items-center sticky top-0 z-[1000] border-b border-black/5">
        {/* Logo */}
        <Link
          href="/"
          className="text-[1.4rem] font-extrabold text-brand-500 no-underline flex items-baseline gap-2 -tracking-[0.5px]"
        >
          <span>
            <span>internet</span>
            <span className="text-ink-900">başvuru</span>
          </span>
          {/* TT Cobrand - desktop */}
          <span className="hidden md:inline-flex items-center gap-2 self-center">
            <span className="w-px h-[22px] bg-ink-100 inline-block" />
            <TTLogo variant="cobrand" />
            <span className="text-[9px] font-bold text-ink-500 tracking-[0.08em] uppercase leading-none">
              YETKİLİ BAYİ
            </span>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Nav links - desktop */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-ink-700">
            <Link href="/rehber" className="hover:text-brand-500 transition">
              Rehber
            </Link>
            <Link href="/iletisim" className="hover:text-brand-500 transition">
              İletişim
            </Link>
          </nav>

          {/* WhatsApp button (mockup'taki yeşil yüzen butonun yerine) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile iletişim"
            className="inline-flex items-center justify-center gap-1.5 bg-wa-500 hover:bg-wa-600 text-white px-3 md:px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

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
