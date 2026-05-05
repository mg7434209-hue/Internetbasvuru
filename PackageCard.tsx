'use client';

import { useState } from 'react';
import { Check, Wifi, Tv } from 'lucide-react';
import type { Package } from '@/data/packages';
import { calcPackagePrices, TV_EXTRA_FEE, MODEM_RENTAL_FEE } from '@/data/packages';

interface PackageCardProps {
  pkg: Package;
  onApply: (pkg: Package, options: { tv: boolean; modem: boolean }) => void;
}

const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

export default function PackageCard({ pkg, onApply }: PackageCardProps) {
  const [tv, setTv] = useState(false);
  const [modem, setModem] = useState(false);

  const prices = calcPackagePrices(pkg, { tv, modem });
  const isFeatured = pkg.isFeatured;

  return (
    <div
      className={`
        relative flex flex-col bg-white rounded-2xl p-8 transition-all duration-300
        ${isFeatured
          ? 'border-2 border-brand-500 shadow-brand bg-gradient-to-b from-white to-brand-50'
          : 'border border-ink-100 hover:border-brand-500 hover:shadow-card hover:-translate-y-2'
        }
      `}
    >
      {/* Featured badge — üst orta */}
      {isFeatured && pkg.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap shadow-lg shadow-brand-500/30">
          {pkg.badge}
        </div>
      )}

      {/* Hız */}
      <div className="flex items-baseline gap-2 mb-1">
        <h2 className="text-5xl font-extrabold text-ink-800 leading-none tracking-tight">
          {pkg.speedMbps}
        </h2>
        <span className="text-lg font-bold text-brand-500">Mbps</span>
      </div>

      {/* Kampanya adı */}
      <p className="text-sm font-semibold text-ink-400 mb-6">
        {pkg.campaignName || 'Fiber Ev İnterneti'}
      </p>

      {/* Fiyat bloğu */}
      <div className="bg-ink-50 rounded-xl p-4 mb-3">
        <div className="flex justify-between items-baseline py-1.5">
          <span className="text-xs font-semibold text-ink-400 flex items-center gap-1.5">
            İlk 9 ay
            <span className="bg-success-50 text-success-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Hoş Geldin
            </span>
          </span>
          <span className="text-3xl font-extrabold text-ink-800 tracking-tight">
            {fmt(prices.firstPeriod)}
            <span className="text-base font-bold">₺</span>
            <span className="text-xs text-ink-400 font-semibold ml-0.5">/ay</span>
          </span>
        </div>
        <div className="flex justify-between items-baseline py-2 pt-3 border-t border-dashed border-ink-200">
          <span className="text-xs font-semibold text-ink-400">10–18. ay</span>
          <span className="text-lg font-bold text-ink-400">
            {fmt(prices.secondPeriod)}
            <span className="text-sm font-bold">₺</span>
            <span className="text-[11px] text-ink-300 font-semibold ml-0.5">/ay</span>
          </span>
        </div>
      </div>

      {/* Sabit fiyat vaadi */}
      <div className="bg-success-50 text-success-600 rounded-xl px-3 py-2 mb-4 text-xs font-bold flex items-center justify-center gap-1.5">
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
        18 ay sözleşmede sabit · enflasyon zammı yok
      </div>

      {/* Özellikler */}
      {pkg.features && pkg.features.length > 0 && (
        <ul className="border-t border-ink-100 pt-4 mb-5 space-y-2.5">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-ink-700">
              <Check className="w-4 h-4 text-brand-500 flex-shrink-0" strokeWidth={3} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Ek seçenekler */}
      <div className="border-t border-ink-100 pt-3.5 mb-4">
        <div className="text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-2">
          Ek seçenekler
        </div>
        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer hover:text-brand-500 transition-colors">
          <input
            type="checkbox"
            checked={tv}
            onChange={(e) => setTv(e.target.checked)}
            className="w-4 h-4 accent-brand-500 cursor-pointer"
          />
          <span className="text-sm font-semibold text-ink-700 flex-1">
            Tivibu TV ekle{' '}
            <span className="text-ink-400 font-medium">(+{fmt(TV_EXTRA_FEE)}₺/ay)</span>
          </span>
        </label>
        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer hover:text-brand-500 transition-colors">
          <input
            type="checkbox"
            checked={modem}
            onChange={(e) => setModem(e.target.checked)}
            className="w-4 h-4 accent-brand-500 cursor-pointer"
          />
          <span className="text-sm font-semibold text-ink-700 flex-1">
            Modem kirala{' '}
            <span className="text-ink-400 font-medium">(+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span>
          </span>
        </label>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => onApply(pkg, { tv, modem })}
        className={`
          mt-auto py-4 rounded-xl font-bold text-base transition-all
          hover:-translate-y-0.5 hover:shadow-lg
          ${isFeatured
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'bg-ink-800 text-white hover:bg-brand-500'
          }
        `}
      >
        Bu Paketi Seç
      </button>
    </div>
  );
}
