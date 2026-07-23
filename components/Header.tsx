import Link from 'next/link';
import TurkcellLogo from './TurkcellLogo';

export default function Header() {
  return (
    <header className="bg-brand-500 px-[5%] py-3.5 flex justify-between items-center sticky top-0 z-[1000] border-b border-white/10 shadow-md">
      {/* SOL: Logo + satış noktası bilgisi entegre */}
      <Link
        href="/"
        className="flex items-center gap-4 no-underline group"
        aria-label="Turkcell Superbox Yetkili Satış Noktası · Anasayfa"
      >
        <TurkcellLogo
          variant="cobrand"
          className="transition-transform group-hover:scale-105"
        />
        {/* Satış noktası bilgisi — desktop'ta göster, mobile'da gizle */}
        <span className="hidden md:flex flex-col leading-tight border-l border-white/20 pl-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white/60 tracking-[0.14em] uppercase">
            <span className="relative inline-flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-75" />
              <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-accent-500" />
            </span>
            Yetkili Satış Noktası
          </span>
          <span className="text-sm font-bold text-white mt-0.5 tracking-tight">
            internetbasvuru.com
          </span>
        </span>
      </Link>

      {/* SAĞ: Nav + başvuru butonu */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-white/85">
        <Link href="/" className="hover:text-accent-500 transition">
          Anasayfa
        </Link>
        <Link href="/rehber" className="hover:text-accent-500 transition">
          Rehber
        </Link>
        <Link href="/iletisim" className="hover:text-accent-500 transition">
          İletişim
        </Link>
        <Link
          href="/#paketler"
          className="bg-accent-500 hover:bg-accent-400 text-tc-navy px-5 py-2 rounded-full font-bold transition"
        >
          Hemen Başvur
        </Link>
      </nav>
    </header>
  );
}
