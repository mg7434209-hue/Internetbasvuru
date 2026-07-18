'use client';

// Superbox GB'li (kotalı) paketler bölümü.
// Dosya/tip adları geriye dönük uyumluluk için "TurboBox" olarak korunmuştur;
// arayüzde her yerde "Superbox GB'li Paket" olarak görünür.

import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  turboBoxPackages,
  TURBOBOX_MODEM_FEE,
  calcTurboBoxPrice,
  type TurboBoxPackage,
  type TurboBoxOptions,
} from '@/data/packages';
import TurkcellLogo from './TurkcellLogo';

interface TurboBoxGridProps {
  onSelectPackage: (pkg: TurboBoxPackage, options: TurboBoxOptions) => void;
}

type PartialSelection = {
  modem: 'have' | 'rent' | null;
  signal5g: 'yes' | 'no' | 'unsure' | null;
};

export default function TurboBoxGrid({ onSelectPackage }: TurboBoxGridProps) {
  const [selections, setSelections] = useState<Record<string, PartialSelection>>(
    Object.fromEntries(
      turboBoxPackages.map(p => [p.id, { modem: null, signal5g: null }])
    )
  );

  const setModem = (pkgId: string, choice: 'have' | 'rent') => {
    setSelections(prev => ({ ...prev, [pkgId]: { ...prev[pkgId], modem: choice } }));
  };

  const setSignal = (pkgId: string, signal: 'yes' | 'no' | 'unsure') => {
    setSelections(prev => ({ ...prev, [pkgId]: { ...prev[pkgId], signal5g: signal } }));
  };

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

  const handleSelect = (pkg: TurboBoxPackage) => {
    const sel = selections[pkg.id];
    if (!sel.modem || !sel.signal5g) return;
    onSelectPackage(pkg, { modemChoice: sel.modem, signal5g: sel.signal5g });
  };

  return (
    <section className="px-[5%] py-4 pb-16 max-w-[1300px] mx-auto">
      {/* Section header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="bg-accent-500 text-tc-navy text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Superbox GB&apos;li
            </span>
            <span className="text-xs text-ink-500 font-semibold">Ekonomik · Kotalı Paketler</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
            Daha ekonomik: Superbox GB&apos;li paketler
          </h2>
          <p className="text-sm text-ink-500 mt-1">
            Tak-çalıştır kablosuz internet · Kurulum gerektirmez · Superbox cihazınız varsa kiralamadan kullanabilirsiniz
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {turboBoxPackages.map(pkg => {
          const sel = selections[pkg.id];
          const isFeatured = pkg.isPopular;
          const unitLabel = pkg.unit === 'Limitsiz' ? '' : pkg.unit;
          const total = calcTurboBoxPrice(pkg, {
            modemChoice: sel.modem ?? 'rent',
            signal5g: sel.signal5g ?? 'yes',
          });
          const bothSelected = sel.modem && sel.signal5g;

          let ctaText: string;
          if (!sel.modem && !sel.signal5g) ctaText = 'Önce seçimleri tamamlayın';
          else if (!sel.modem) ctaText = 'Önce cihaz durumunu seçin';
          else if (!sel.signal5g) ctaText = 'Önce 5G durumunu seçin';
          else ctaText = 'Bu Paketi Seç';

          return (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl p-9 border transition-all duration-300 hover:-translate-y-2 hover:shadow-medium hover:border-accent-500 flex flex-col ${
                isFeatured
                  ? 'border-2 border-accent-500 shadow-strong'
                  : 'border-ink-100'
              }`}
              style={
                isFeatured
                  ? { background: 'linear-gradient(180deg, #fff 0%, #FFF9E5 100%)' }
                  : undefined
              }
            >
              {/* Popular tag */}
              {isFeatured && pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-500 text-tc-navy px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}

              {/* Superbox 5G badge */}
              {isFeatured && (
                <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 bg-accent-500/15 border border-accent-500/30 px-2 py-1 rounded-full text-[9px] font-extrabold text-tc-navy uppercase tracking-wider">
                  <TurkcellLogo variant="featured" />
                  Superbox 5G
                </div>
              )}

              {/* Data figure */}
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-[3.25rem] font-extrabold text-ink-900 leading-none tracking-tight">
                  {pkg.data}
                </h3>
                {unitLabel && (
                  <span className="font-bold text-brand-500 text-lg">{unitLabel}</span>
                )}
              </div>
              <div className="text-ink-500 font-semibold text-sm mb-6">
                {pkg.campaignName}
              </div>

              {/* Pricing block — 3 farklı state */}
              <div className="bg-ink-50 rounded-xl p-4 mb-3">
                {sel.modem === null && (
                  <>
                    <div className="flex justify-between items-baseline py-1.5">
                      <span className="text-[13px] text-ink-500 font-semibold flex items-center gap-1.5">
                        Veri ücreti
                        <span className="bg-prime-100 text-success text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Sabit Tarife
                        </span>
                      </span>
                      <span className="text-[1.85rem] font-extrabold text-ink-900 tracking-tight">
                        {fmt(pkg.dataPrice)}
                        <span className="text-base font-bold">₺</span>
                        <span className="text-xs text-ink-500 ml-0.5 font-semibold">/ay</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2.5 mt-1 border-t border-dashed border-ink-100/60 text-[11px] text-amber-700">
                      <span className="font-semibold">⚠ Cihaz durumu seçilmedi</span>
                      <span>Fiyat değişebilir</span>
                    </div>
                  </>
                )}

                {sel.modem === 'have' && (
                  <>
                    <div className="flex justify-between items-baseline py-1.5">
                      <span className="text-[13px] text-ink-500 font-semibold flex items-center gap-1.5">
                        Aylık ücret
                        <span className="bg-prime-100 text-success text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Cihazım Var
                        </span>
                      </span>
                      <span className="text-[1.85rem] font-extrabold text-ink-900 tracking-tight">
                        {fmt(pkg.dataPrice)}
                        <span className="text-base font-bold">₺</span>
                        <span className="text-xs text-ink-500 ml-0.5 font-semibold">/ay</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2.5 mt-1 border-t border-dashed border-ink-100/60 text-[11px] text-success">
                      <span className="font-semibold">✓ {fmt(TURBOBOX_MODEM_FEE)}₺ tasarruf edersiniz</span>
                      <span className="font-semibold">Cihaz uyumluluğu doğrulanacak</span>
                    </div>
                  </>
                )}

                {sel.modem === 'rent' && (
                  <>
                    <div className="flex justify-between items-baseline py-1.5">
                      <span className="text-[13px] text-ink-500 font-semibold flex items-center gap-1.5">
                        Aylık ücret
                        <span className="bg-accent-500/20 text-tc-navy text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Cihaz Dahil
                        </span>
                      </span>
                      <span className="text-[1.85rem] font-extrabold text-ink-900 tracking-tight">
                        {fmt(total)}
                        <span className="text-base font-bold">₺</span>
                        <span className="text-xs text-ink-500 ml-0.5 font-semibold">/ay</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2.5 mt-1 border-t border-dashed border-ink-100/60 text-[11px] text-ink-400">
                      <span>Veri {fmt(pkg.dataPrice)}₺ + Cihaz {fmt(TURBOBOX_MODEM_FEE)}₺</span>
                      <span className="font-semibold text-brand-700">Eklendi</span>
                    </div>
                  </>
                )}
              </div>

              {/* Stable promise */}
              <div className="bg-prime-100 text-success px-3 py-2 rounded-xl text-xs font-bold text-center mb-4 flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                18 ay sabit fiyat · enflasyon zammı yok
              </div>

              {/* Features */}
              <ul className="border-t border-ink-100 pt-4 mb-5 space-y-2.5">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-ink-900 font-semibold">
                    <Check className="w-4 h-4 text-brand-500 flex-shrink-0" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Cihaz durumu (zorunlu) */}
              <div className="border-t border-ink-100 pt-3.5 mb-3">
                <div className="text-[11px] text-ink-500 font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Superbox cihaz durumu</span>
                  <span className="text-amber-700 text-[9px] normal-case">* Seçim zorunlu</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setModem(pkg.id, 'have')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-[10px] border-[1.5px] text-xs font-bold transition-all ${
                      sel.modem === 'have'
                        ? 'bg-success border-success text-white'
                        : 'bg-white border-ink-100 text-ink-500 hover:border-accent-500 hover:text-ink-900'
                    }`}
                  >
                    <span>✓</span>
                    <span>Cihazım var</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModem(pkg.id, 'rent')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-[10px] border-[1.5px] text-xs font-bold transition-all ${
                      sel.modem === 'rent'
                        ? 'bg-brand-500 border-brand-500 text-white'
                        : 'bg-white border-ink-100 text-ink-500 hover:border-accent-500 hover:text-ink-900'
                    }`}
                  >
                    <span>+</span>
                    <span>Kirala (+{TURBOBOX_MODEM_FEE}₺)</span>
                  </button>
                </div>
              </div>

              {/* 5G durumu (zorunlu) */}
              <div className="border-t border-ink-100 pt-3.5 mb-3">
                <div className="text-[11px] text-ink-500 font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Adresinizde 5G şebekesi</span>
                  <span className="text-amber-700 text-[9px] normal-case">* Seçim zorunlu</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSignal(pkg.id, 'yes')}
                    className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-[10px] border-[1.5px] text-xs font-bold transition-all ${
                      sel.signal5g === 'yes'
                        ? 'bg-success border-success text-white'
                        : 'bg-white border-ink-100 text-ink-500 hover:border-accent-500 hover:text-ink-900'
                    }`}
                  >
                    <span>✓</span><span>Var</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignal(pkg.id, 'no')}
                    className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-[10px] border-[1.5px] text-xs font-bold transition-all ${
                      sel.signal5g === 'no'
                        ? 'bg-amber-500 border-amber-500 text-white'
                        : 'bg-white border-ink-100 text-ink-500 hover:border-accent-500 hover:text-ink-900'
                    }`}
                  >
                    <span>✗</span><span>Yok</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignal(pkg.id, 'unsure')}
                    className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-[10px] border-[1.5px] text-xs font-bold transition-all ${
                      sel.signal5g === 'unsure'
                        ? 'bg-ink-500 border-ink-500 text-white'
                        : 'bg-white border-ink-100 text-ink-500 hover:border-accent-500 hover:text-ink-900'
                    }`}
                  >
                    <span>?</span><span>Bilmiyorum</span>
                  </button>
                </div>
              </div>

              {/* Conditional uyarı (5G yok / bilmiyorum) */}
              {(sel.signal5g === 'no' || sel.signal5g === 'unsure') && (
                <div className="bg-amber-50 border border-amber-100 text-amber-700 rounded-xl px-3 py-2.5 text-[11px] font-semibold leading-snug mb-4">
                  <strong>Bilgi:</strong> 5G yoksa Superbox 4.5G muadili paket önerilir.{' '}
                  {pkg.total45gDataPrice !== null ? (
                    <>
                      Veri ücreti tahmini: <strong>{fmt(pkg.total45gDataPrice)}₺/ay</strong> ({pkg.data45gLabel}). Çağrı merkezi sizi arayacak.
                    </>
                  ) : (
                    <>
                      4.5G&apos;de Limitsiz paket yoktur; en yakın seçenek {pkg.data45gLabel}. Çağrı merkezi sizi arayacak.
                    </>
                  )}
                </div>
              )}

              {/* CTA */}
              <button
                type="button"
                onClick={() => handleSelect(pkg)}
                disabled={!bothSelected}
                className={`mt-auto py-4 rounded-xl font-bold text-base transition-all ${
                  bothSelected
                    ? isFeatured
                      ? 'bg-accent-500 hover:bg-accent-600 text-tc-navy hover:-translate-y-0.5 hover:shadow-lg'
                      : 'bg-tc-navy hover:bg-brand-600 text-white hover:-translate-y-0.5 hover:shadow-lg'
                    : isFeatured
                      ? 'bg-accent-500 text-tc-navy opacity-45 cursor-not-allowed'
                      : 'bg-tc-navy text-white opacity-45 cursor-not-allowed'
                }`}
              >
                {ctaText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="bg-white border border-ink-100 rounded-2xl px-6 py-5 mt-8 text-xs text-ink-500 leading-relaxed">
        <strong className="text-ink-900">GB&apos;li paket şeffaflığı:</strong>{' '}
        Veri ücreti, taahhütlü tarifedeki aylık veri ücretiyle birebir eşittir.{' '}
        <strong className="text-ink-900">Superbox cihazı kiralama isteğe bağlıdır:</strong>{' '}
        Kendi uyumlu 5G/4.5G cihazınız varsa kiralamadan kullanabilir, aylık {TURBOBOX_MODEM_FEE}₺ tasarruf edersiniz —
        çağrı merkezimiz cihaz uyumluluğunu doğrulayacaktır.
        Adresinizde 5G yoksa 4.5G muadili paket önerilir, fiyat ve kapasite farklılık gösterebilir.
        18 ay sözleşmede fiyat sabittir, enflasyon zammı uygulanmaz. KDV ve ÖİV dahildir.
      </div>
    </section>
  );
}
