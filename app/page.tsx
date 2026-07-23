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
      {/* Mobilde tarifeler ilk açılışta görünür; açıklama (Hero) alta iner.
          Desktop'ta klasik sıra: önce Hero, sonra paketler. */}
      <div className="flex flex-col">
        <div className="order-1 md:order-2">
          <PackageGrid onSelectPackage={setSelectedPkg} />
        </div>
        <div className="order-2 md:order-1">
          <Hero />
        </div>
      </div>
      <Wizard />

      {selectedPkg && (
        <LeadModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
      )}
    </>
  );
}
