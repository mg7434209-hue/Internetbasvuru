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
  // Fiber state
  const [selectedFiberPkg, setSelectedFiberPkg] = useState<Package | null>(null);
  const [selectedFiberOptions, setSelectedFiberOptions] = useState<FiberOptions>({
    tv: false,
    modem: false,
  });

  // TurboBox state
  const [selectedTurboBoxPkg, setSelectedTurboBoxPkg] = useState<TurboBoxPackage | null>(null);
  const [selectedTurboBoxOptions, setSelectedTurboBoxOptions] = useState<TurboBoxOptions | null>(null);

  function handleSelectFiberPackage(pkg: Package, options: FiberOptions) {
    setSelectedFiberPkg(pkg);
    setSelectedFiberOptions(options);
  }

  function handleSelectTurboBoxPackage(pkg: TurboBoxPackage, options: TurboBoxOptions) {
    setSelectedTurboBoxPkg(pkg);
    setSelectedTurboBoxOptions(options);
  }

  return (
    <>
      <Hero />
      <PackageGrid onSelectPackage={handleSelectFiberPackage} />
      <TurboBoxGrid onSelectPackage={handleSelectTurboBoxPackage} />
      <Wizard />

      {/* Fiber LeadModal — mevcut akış, dokunulmadı */}
      {selectedFiberPkg && (
        <LeadModal
          pkg={selectedFiberPkg}
          initialOptions={selectedFiberOptions}
          onClose={() => setSelectedFiberPkg(null)}
        />
      )}

      {/* TurboBox LeadModal — aynı modal, turboBoxPkg prop'u ile */}
      {selectedTurboBoxPkg && selectedTurboBoxOptions && (
        <LeadModal
          pkg={null}
          initialOptions={{ tv: false, modem: false }}
          turboBoxPkg={selectedTurboBoxPkg}
          turboBoxOptions={selectedTurboBoxOptions}
          onClose={() => {
            setSelectedTurboBoxPkg(null);
            setSelectedTurboBoxOptions(null);
          }}
        />
      )}
    </>
  );
}
