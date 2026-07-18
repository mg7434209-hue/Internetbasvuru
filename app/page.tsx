'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import PackageGrid from '@/components/PackageGrid';
import Wizard from '@/components/Wizard';
import LeadModal from '@/components/LeadModal';
import { type Package } from '@/data/packages';

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  return (
    <>
      <Hero />
      <PackageGrid onSelectPackage={setSelectedPkg} />
      <Wizard />

      {selectedPkg && (
        <LeadModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
      )}
    </>
  );
}
