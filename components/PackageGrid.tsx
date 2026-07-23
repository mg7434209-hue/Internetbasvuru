'use client';

import { Wifi, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  packages5G,
  packages45G,
  type Package,
} from '@/data/packages';

interface PackageGridProps {
  onSelectPackage: (pkg: Package) => void;
}

const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

function PackageCard({
  pkg,
  onSelect,
}: {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}) {
  const is5G = pkg.network === '5G';

  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-medium ${
        pkg.isPopular
          ? 'border-2 border-accent-500 shadow-strong'
          : is5G
            ? 'border border-brand-200'
            : 'border border-emerald-200'
      }`}
    >
      {/* En Popüler şeridi */}
      {pkg.isPopular && pkg.badge && (
        <div className="bg-accent-500 text-tc-navy text-center text-[13px] font-extrabold py-2 tracking-wide">
          {pkg.badge}
        </div>
      )}

      {/* Renkli başlık bloğu — 5G: parlament mavisi, 4.5G: yeşil */}
      <div
        className="text-white text-center px-6 pt-7 pb-10"
        style={{
          background: is5G
            ? 'linear-gradient(135deg, #2F62B5 0%, #1E4489 100%)'
            : 'linear-gradient(135deg, #00A876 0%, #007D58 100%)',
        }}
      >
        <Wifi className="w-8 h-8 mx-auto mb-3 opacity-95" strokeWidth={2.2} />
        <h3 className="text-xl font-extrabold leading-snug mb-1 text-white">{pkg.name}</h3>
        <p className="text-sm text-white/75 font-semibold">{pkg.network} Hızında</p>
      </div>

      {/* Kota rozeti — başlık bloğunun üzerine biner */}
      <div className="flex justify-center -mt-6">
        <span
          className="text-white text-2xl font-extrabold px-8 py-2.5 rounded-full shadow-lg tracking-tight"
          style={{
            background: is5G
              ? 'linear-gradient(135deg, #24509C 0%, #17356C 100%)'
              : 'linear-gradient(135deg, #00905F 0%, #006B4B 100%)',
          }}
        >
          {pkg.quota}
        </span>
      </div>

      {/* Özellikler */}
      <ul className="px-8 pt-6 pb-2 space-y-3">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-[15px] text-ink-700 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-sb-green-500 flex-shrink-0" strokeWidth={2.2} />
            {f}
          </li>
        ))}
      </ul>

      {/* Fiyat */}
      <div className="text-center border-t border-ink-100 mx-8 mt-4 pt-5 pb-1">
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[2.6rem] font-extrabold text-brand-600 leading-none tracking-tight">
            {fmt(pkg.priceMonthly)}
          </span>
          <span className="text-base font-bold text-ink-500">TL/ay</span>
        </div>
        <p className="text-xs text-ink-400 font-semibold mt-1.5">
          {pkg.commitmentMonths} Ay Taahhüt
        </p>
      </div>

      {/* CTA */}
      <div className="px-6 pt-4 pb-6 mt-auto">
        <button
          onClick={() => onSelect(pkg)}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-[15px] bg-accent-500 hover:bg-accent-400 text-tc-navy transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Hemen Başvur
          <ArrowRight className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}

export default function PackageGrid({ onSelectPackage }: PackageGridProps) {
  return (
    <section id="paketler" className="px-[5%] pt-8 md:pt-4 pb-16 max-w-[1300px] mx-auto">
      {/* ============ SUPERBOX 5G HAZIR ============ */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="bg-brand-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            5G Hazır
          </span>
          <span className="text-xs text-ink-500 font-semibold">5G Hızında · Kota aşım derdi yok</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
          Superbox 5G Hazır paketler
        </h2>
        <p className="text-sm text-ink-500 mt-1">
          Tüm fiyatlar 12 ay taahhüt süresince sabittir; taahhüt boyunca zam yapılmaz.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch mb-14">
        {packages5G.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelectPackage} />
        ))}
      </div>

      {/* ============ SUPERBOX 4.5G ============ */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="bg-sb-green-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            4.5G
          </span>
          <span className="text-xs text-ink-500 font-semibold">Ekonomik · 5G kapsaması olmayan adresler için</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
          Superbox 4.5G paketler
        </h2>
        <p className="text-sm text-ink-500 mt-1">
          100 GB ve 300 GB paketlerinde +50 GB hediye internet, kartlarda gösterilen toplam kotaya dahildir.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {packages45G.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelectPackage} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-white border border-ink-100 rounded-2xl px-6 py-5 mt-10 text-xs text-ink-500 leading-relaxed">
        <strong className="text-ink-900">Fiyatlandırma şeffaflığı:</strong>{' '}
        Tüm fiyatlar 12 ay taahhütlüdür ve taahhüt süresince sabittir; KDV ve ÖİV dahildir.{' '}
        <strong className="text-ink-900">Aşım derdi yok:</strong> aylık kota tamamlandığında ek ücret
        yansıtılmaz. <strong className="text-ink-900">Alt yapı derdi yok:</strong> Superbox kablosuz
        çalışır; cihazı prize takmanız yeterlidir, kablo çekimi ve altyapı randevusu gerekmez.
        5G paketleri 5G kapsama alanındaki adreslerde geçerlidir; kapsama durumu telefon
        görüşmesinde teyit edilir. 4.5G 100 GB ve 300 GB paketlerindeki +50 GB hediye internet
        kampanya koşullarına tabidir.
      </div>
    </section>
  );
}
