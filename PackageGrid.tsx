'use client';

import { useState } from 'react';
import PackageCard from './PackageCard';
import CompactPackageCard from './CompactPackageCard';
import ApplyModal from './ApplyModal';
import { featuredPackages, allStandartPackages, type Package } from '@/data/packages';

type ViewMode = 'popular' | 'all';

export default function PackageGrid() {
  const [view, setView] = useState<ViewMode>('popular');
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [selectedOpts, setSelectedOpts] = useState<{ tv: boolean; modem: boolean }>({
    tv: false,
    modem: false,
  });

  const handleApply = (pkg: Package, options: { tv: boolean; modem: boolean }) => {
    setSelectedPkg(pkg);
    setSelectedOpts(options);
  };

  const handleCloseModal = () => {
    setSelectedPkg(null);
  };

  const packages = view === 'popular' ? featuredPackages : allStandartPackages;

  return (
    <>
      {/* Toggle */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-ink-800 tracking-tight">
            Öne çıkan paketler
          </h2>
          <p className="text-sm text-ink-400 mt-1 font-medium">
            Tüm fiyatlar 18 ay sözleşmede sabittir, enflasyon zammı yoktur.
          </p>
        </div>
        <div className="inline-flex gap-1 bg-white border border-ink-100 rounded-full p-1 shadow-soft self-start md:self-auto">
          <button
            type="button"
            onClick={() => setView('popular')}
            className={`px-4 py-2 text-sm font-bold rounded-full transition-all ${
              view === 'popular'
                ? 'bg-ink-800 text-white'
                : 'text-ink-400 hover:text-ink-700'
            }`}
          >
            3 popüler hız
          </button>
          <button
            type="button"
            onClick={() => setView('all')}
            className={`px-4 py-2 text-sm font-bold rounded-full transition-all ${
              view === 'all'
                ? 'bg-ink-800 text-white'
                : 'text-ink-400 hover:text-ink-700'
            }`}
          >
            Tüm hızlar (9)
          </button>
        </div>
      </div>

      {/* Grid */}
      {view === 'popular' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onApply={handleApply} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {packages.map((pkg) => (
            <CompactPackageCard key={pkg.id} pkg={pkg} onApply={handleApply} />
          ))}
        </div>
      )}

      {/* Modal */}
      <ApplyModal
        pkg={selectedPkg}
        initialOptions={selectedOpts}
        onClose={handleCloseModal}
      />
    </>
  );
}
