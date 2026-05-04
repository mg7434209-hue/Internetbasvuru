'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import PackageGrid from '@/components/PackageGrid';
import Wizard from '@/components/Wizard';
import LeadModal from '@/components/LeadModal';
import { type Package } from '@/data/packages';

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [selectedOptions, setSelectedOptions] = useState({ tv: false, modem: false });

  function handleSelectPackage(pkg: Package, options: { tv: boolean; modem: boolean }) {
    setSelectedPkg(pkg);
    setSelectedOptions(options);
  }

  return (
    <>
      <Hero />
      <PackageGrid onSelectPackage={handleSelectPackage} />
      <Wizard />
      {selectedPkg && (
        <LeadModal
          pkg={selectedPkg}
          initialOptions={selectedOptions}
          onClose={() => setSelectedPkg(null)}
        />
      )}
    </>
  );
}
