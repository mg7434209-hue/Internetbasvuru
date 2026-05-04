'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  standartPackages,
  TV_EXTRA_FEE,
  MODEM_RENTAL_FEE,
  calcPackagePrices,
  type Package,
} from '@/data/packages';
import TTLogo from './TTLogo';

interface PackageGridProps {
  onSelectPackage: (pkg: Package, options: { tv: boolean; modem: boolean }) => void;
}

export default function PackageGrid({ onSelectPackage }: PackageGridProps) {
  const [view, setView] = useState<'popular' | 'all'>('popular');
  const [options, setOptions] = useState<Record<string, { tv: boolean; modem: boolean }>>(
    Object.fromEntries(standartPackages.map(p => [p.id, { tv: false, modem: false }]))
  );

  const toggleOption = (pkgId: string, opt: 'tv' | 'modem') => {
    setOptions(prev => ({
      ...prev,
      [pkgId]: { ...prev[pkgId], [opt]: !prev[pkgId][opt] },
    }));
  };

  const popularPackages = standartPackages.filter(p => p.isPopular);
  const displayedPackages = view === 'popular' ? popularPackages : standartPackages;

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

  return (
    <section className="px-[5%] py-4 pb-16 max-w-[1300px] mx-auto">
      {/* Section header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
            Öne çıkan paketler
          </h2>
          <p className="text-sm text-ink-500 mt-1">
            Tüm fiyatlar 18 ay sözleşmede sabittir, enflasyon zammı yoktur.
          </p>
        </div>

        {/* View toggle */}
        <div className="inline-flex gap-1 bg-white border border-ink-100 rounded-full p-1 shadow-soft">
          <button
            onClick={() => setView('popular')}
            className={`px-4 py-2 text-[13px] font-bold rounded-full transition-all ${
              view === 'popular'
                ? 'bg-ink-900 text-white'
                : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            3 popüler hız
          </button>
          <button
            onClick={() => setView('all')}
            className={`px-4 py-2 text-[13px] font-bold rounded-full transition-all ${
              view === 'all'
                ? 'bg-ink-900 text-white'
                : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            Tüm hızlar (9)
          </button>
        </div>
      </div>

      {/* Grid */}
      {view === 'popular' ? (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {popularPackages.map(pkg => {
            const opts = options[pkg.id];
            const prices = calcPackagePrices(pkg, opts);
            const isFeatured = pkg.speedMbps === 300;

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-9 border transition-all duration-300 hover:-translate-y-2 hover:shadow-medium hover:border-brand-500 flex flex-col ${
                  isFeatured
                    ? 'border-2 border-brand-500 shadow-strong'
                    : 'border-ink-100'
                }`}
                style={isFeatured ? { background: 'linear-gradient(180deg, #fff 0%, #F0F9FF 100%)' } : undefined}
              >
                {/* Popular tag */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                {/* TT badge (sadece featured paket için) */}
                {isFeatured && (
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 bg-brand-500/10 border border-brand-500/20 px-2 py-1 rounded-full text-[9px] font-extrabold text-brand-700 uppercase tracking-wider">
                    <TTLogo variant="featured" />
                    Resmi Kampanya
                  </div>
                )}

                {/* Speed */}
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-[3.25rem] font-extrabold text-ink-900 leading-none tracking-tight">
                    {pkg.speedMbps}
                  </h3>
                  <span className="font-bold text-brand-500 text-lg">Mbps</span>
                </div>
                <div className="text-ink-500 font-semibold text-sm mb-6">
                  {pkg.campaignName || 'Fiber Ev İnterneti'}
                </div>

                {/* Pricing block */}
                <div className="bg-ink-50 rounded-xl p-4 mb-3">
                  <div className="flex justify-between items-baseline py-1.5">
                    <span className="text-[13px] text-ink-500 font-semibold flex items-center gap-1.5">
                      İlk 9 ay
                      <span className="bg-prime-100 text-success text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Hoş Geldin
                      </span>
                    </span>
                    <span className="text-[1.85rem] font-extrabold text-ink-900 tracking-tight">
                      {fmt(prices.firstPeriod)}
                      <span className="text-base font-bold">₺</span>
                      <span className="text-xs text-ink-500 ml-0.5 font-semibold">/ay</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2.5 mt-1 border-t border-dashed border-ink-100/60">
                    <span className="text-[13px] text-ink-500 font-semibold">10–18. ay</span>
                    <span className="text-lg font-bold text-ink-500">
                      {fmt(prices.secondPeriod)}
                      <span className="text-sm">₺</span>
                      <span className="text-xs text-ink-400 ml-0.5 font-semibold">/ay</span>
                    </span>
                  </div>
                </div>

                {/* Stable promise */}
                <div className="bg-prime-100 text-success px-3 py-2 rounded-xl text-xs font-bold text-center mb-4 flex items-center justify-center gap-1.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  18 ay sözleşmede sabit · enflasyon zammı yok
                </div>

                {/* Features */}
                <ul className="border-t border-ink-100 pt-4 mb-6 space-y-2.5">
                  {(pkg.features || []).map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-ink-900 font-semibold">
                      <Check className="w-4 h-4 text-brand-500 flex-shrink-0" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Options */}
                <div className="border-t border-ink-100 pt-3.5 mb-4">
                  <div className="text-[11px] text-ink-500 font-bold uppercase tracking-wider mb-2">
                    Ek seçenekler
                  </div>
                  <label className="flex items-center gap-2.5 py-1.5 cursor-pointer hover:text-brand-500 transition">
                    <input
                      type="checkbox"
                      checked={opts.tv}
                      onChange={() => toggleOption(pkg.id, 'tv')}
                      className="checkbox"
                    />
                    <span className="text-sm font-semibold text-ink-900">
                      Tivibu TV ekle <span className="text-ink-500 font-medium">(+{fmt(TV_EXTRA_FEE)}₺/ay)</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 py-1.5 cursor-pointer hover:text-brand-500 transition">
                    <input
                      type="checkbox"
                      checked={opts.modem}
                      onChange={() => toggleOption(pkg.id, 'modem')}
                      className="checkbox"
                    />
                    <span className="text-sm font-semibold text-ink-900">
                      Modem kirala <span className="text-ink-500 font-medium">(+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span>
                    </span>
                  </label>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onSelectPackage(pkg, opts)}
                  className={`mt-auto py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    isFeatured
                      ? 'bg-brand-500 hover:bg-brand-600 text-white'
                      : 'bg-ink-900 hover:bg-brand-500 text-white'
                  }`}
                >
                  Bu Paketi Seç
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {standartPackages.map(pkg => {
            const prices = calcPackagePrices(pkg, { tv: false, modem: false });
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-xl p-4 border transition-all duration-200 hover:-translate-y-1 hover:shadow-soft hover:border-brand-500 flex flex-col ${
                  pkg.isPopular ? 'border-2 border-brand-500' : 'border-ink-100'
                }`}
              >
                {pkg.isPopular && pkg.badge && (
                  <div className="absolute -top-2 right-3 bg-brand-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-[1.85rem] font-extrabold text-ink-900 leading-none tracking-tight">
                    {pkg.speedMbps}
                  </span>
                  <span className="text-sm text-brand-500 font-bold">Mbps</span>
                </div>

                <div className="bg-ink-50 rounded-xl px-3 py-2.5 mb-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-500 font-semibold">İlk 9 ay</span>
                    <span className="font-bold text-ink-900">{fmt(prices.firstPeriod)}₺/ay</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-500 font-semibold">10–18. ay</span>
                    <span className="font-semibold text-ink-500">{fmt(prices.secondPeriod)}₺/ay</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg, { tv: false, modem: false })}
                  className={`mt-auto py-2.5 rounded-xl text-sm font-bold transition-all ${
                    pkg.isPopular
                      ? 'bg-brand-500 hover:bg-brand-600 text-white'
                      : 'bg-ink-900 hover:bg-brand-500 text-white'
                  }`}
                >
                  Başvur
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-white border border-ink-100 rounded-2xl px-6 py-5 mt-8 text-xs text-ink-500 leading-relaxed">
        <strong className="text-ink-900">Fiyatlandırma şeffaflığı:</strong>{' '}
        İlk 9 ay TT Hoş Geldin İndirimi uygulanır, 10-18. ay TT standart fiyatı geçerlidir.
        Her iki dönemde de fiyat sözleşmede sabittir; 18 ay boyunca enflasyon zammı uygulanmaz.
        KDV ve ÖİV dahildir. Kurulum ücretsizdir.{' '}
        <strong className="text-ink-900">Modem kiralama isteğe bağlıdır</strong> (+90₺/ay) — kendi modemini bağlamak isteyenler için ücretsizdir.
        FTTH altyapı 100 Mbps üstü hızlarda kullanılır. 300 ve 750 Mbps paketleri yalnızca telefonla görüşmede önerilir.
        Adresinizde altyapı uygunluğu telefon görüşmesinde kontrol edilir.
      </div>
    </section>
  );
}
