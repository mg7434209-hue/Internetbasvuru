import Link from 'next/link';
import TTLogo from './TTLogo';

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md px-[5%] py-4 flex justify-between items-center sticky top-0 z-[1000] border-b border-black/5">
      {/* SOL: Logo + dealer info entegre */}
      <Link
        href="/"
        className="flex items-center gap-4 no-underline group"
        aria-label="Türk Telekom Yetkili Bayi · Göksoylar İletişim · Anasayfa"
      >
        <TTLogo
          variant="cobrand"
          className="transition-transform group-hover:scale-105"
        />
        {/* Dealer info — desktop'ta göster, mobile'da gizle */}
        <span className="hidden md:flex flex-col leading-tight border-l border-ink-100 pl-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-ink-500 tracking-[0.14em] uppercase">
            <span className="relative inline-flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
              <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            </span>
            Yetkili Bayi
          </span>
          <span className="text-sm font-bold text-ink-900 mt-0.5 tracking-tight">
            Göksoylar İletişim Ltd. Şti.
          </span>
        </span>
      </Link>

      {/* SAĞ: Sadece nav */}
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
    </header>
  );
}
