'use client';

import type { Package } from '@/data/packages';
import { calcPackagePrices } from '@/data/packages';

interface CompactPackageCardProps {
  pkg: Package;
  onApply: (pkg: Package, options: { tv: boolean; modem: boolean }) => void;
}

const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

export default function CompactPackageCard({ pkg, onApply }: CompactPackageCardProps) {
  const prices = calcPackagePrices(pkg, { tv: false, modem: false });

  return (
    <div
      className={`
        relative flex flex-col bg-white rounded-xl p-4 transition-all duration-200
        ${pkg.isPopular
          ? 'border-2 border-brand-500'
          : 'border border-ink-100 hover:border-brand-500 hover:shadow-soft hover:-translate-y-1'
        }
      `}
    >
      {pkg.isPopular && pkg.badge && (
        <div className="absolute -top-2 right-3 bg-brand-500 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider whitespace-nowrap">
          {pkg.badge}
        </div>
      )}

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl font-extrabold text-ink-800 leading-none tracking-tight">
          {pkg.speedMbps}
        </span>
        <span className="text-sm font-bold text-brand-500">Mbps</span>
      </div>

      <div className="bg-ink-50 rounded-lg px-3 py-2.5 mb-3 space-y-1">
        <div className="flex justify-between text-[12px] font-semibold">
          <span className="text-ink-400">İlk 9 ay</span>
          <span className="text-ink-800">{fmt(prices.firstPeriod)}₺/ay</span>
        </div>
        <div className="flex justify-between text-[12px] font-semibold">
          <span className="text-ink-400">10–18. ay</span>
          <span className="text-ink-400">{fmt(prices.secondPeriod)}₺/ay</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onApply(pkg, { tv: false, modem: false })}
        className={`
          mt-auto py-2.5 rounded-lg font-bold text-sm transition-colors
          ${pkg.isPopular
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'bg-ink-800 text-white hover:bg-brand-500'
          }
        `}
      >
        Başvur
      </button>
    </div>
  );
}
