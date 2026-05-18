'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import PackageGrid from '@/components/PackageGrid';
import TurboBoxGrid from '@/components/TurboBoxGrid';
import Wizard from '@/components/Wizard';
import LeadModal from '@/components/LeadModal';
import {
  type Package,
  type TurboBoxPackage,
  type TurboBoxOptions,
} from '@/data/packages';

type FiberOptions = { tv: boolean; modem: boolean };

export default function HomePage() {
  // Fiber state (mevcut)
  const [selectedFiberPkg, setSelectedFiberPkg] = useState<Package | null>(null);
  const [selectedFiberOptions, setSelectedFiberOptions] = useState<FiberOptions>({
    tv: false,
    modem: false,
  });

  // TurboBox state (yeni)
  const [selectedTurboBoxPkg, setSelectedTurboBoxPkg] = useState<TurboBoxPackage | null>(null);
  const [selectedTurboBoxOptions, setSelectedTurboBoxOptions] = useState<TurboBoxOptions | null>(null);

  function handleSelectFiberPackage(pkg: Package, options: FiberOptions) {
    setSelectedFiberPkg(pkg);
    setSelectedFiberOptions(options);
  }

  function handleSelectTurboBoxPackage(pkg: TurboBoxPackage, options: TurboBoxOptions) {
    setSelectedTurboBoxPkg(pkg);
    setSelectedTurboBoxOptions(options);

    // GEÇİCİ: LeadModal TurboBox entegrasyonu sonraki adımda yapılacak.
    // Şimdilik seçimi konsola yaz + kullanıcıya bilgi ver.
    const total = pkg.dataPrice + (options.modemChoice === 'rent' ? 240 : 0);
    console.log('TurboBox seçildi:', { pkg, options, total });
    alert(
      `TurboBox seçildiniz:\n\n` +
      `Paket: ${pkg.campaignName} (${pkg.data}${pkg.unit === 'Limitsiz' ? '' : ' ' + pkg.unit})\n` +
      `Modem: ${options.modemChoice === 'have' ? 'Müşterinin modemi var' : 'Kiralanacak (+240₺)'}\n` +
      `5G durumu: ${options.signal5g}\n` +
      `Toplam: ${total}₺/ay\n\n` +
      `(Form entegrasyonu sonraki adımda yapılacak)`
    );
  }

  return (
    <>
      <Hero />
      <PackageGrid onSelectPackage={handleSelectFiberPackage} />
      <TurboBoxGrid onSelectPackage={handleSelectTurboBoxPackage} />
      <Wizard />

      {selectedFiberPkg && (
        <LeadModal
          pkg={selectedFiberPkg}
          initialOptions={selectedFiberOptions}
          onClose={() => setSelectedFiberPkg(null)}
        />
      )}

      {/*
        TurboBox LeadModal entegrasyonu burada yapılacak.
        LeadModal.tsx'i TurboBox'ı kabul edecek şekilde genişlettiğimizde aktif edilecek.
      */}
    </>
  );
}
