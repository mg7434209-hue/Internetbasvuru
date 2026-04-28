import { Metadata } from 'next';
import PackageCard from '@/components/PackageCard';
import { campaigns } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Türk Telekom Fiber İnternet Paketleri | Tüm Hız Seçenekleri',
  description: '16 Mbps\'den 1000 Mbps\'e kadar Türk Telekom fiber internet paketleri. Bölgesel kampanyalar, tivibulu TV paketleri ve fiber gücü yaşa kampanyası.',
  alternates: { canonical: 'https://internetbasvuru.com/paketler' },
};

export default function PaketlerPage() {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container-fluid">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Tüm Paketler
          </div>
          <h1 className="section-title mb-3">Türk Telekom Fiber İnternet Paketleri</h1>
          <p className="section-subtitle">
            4 farklı kampanya kategorisinde 16-1000 Mbps arası hız seçenekleri. Bölgenize uygun olanı aşağıdan inceleyin.
          </p>
        </div>

        {campaigns.map((c) => (
          <section key={c.slug} className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 pb-4 border-b-2 border-brand-700">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {c.slug === 'tivibulu' ? (
                    <span className="badge-prime">TV + İnternet</span>
                  ) : c.slug === 'bolgesel-firsat' ? (
                    <span className="badge-accent">24 Ay Sabit</span>
                  ) : c.slug === 'bolgesel-avantaj' ? (
                    <span className="badge-accent">Bölgesel</span>
                  ) : (
                    <span className="badge-brand">Ana Kampanya</span>
                  )}
                  <span className="text-xs text-ink-500">· {c.commitmentMonths} ay taahhüt</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">{c.name}</h2>
                <p className="text-sm text-ink-600 mt-1">{c.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-ink-500 uppercase tracking-wider">Geçerli bölge</div>
                <div className="font-bold text-brand-700">
                  {c.applicableRegions.join(', ')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {c.packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  campaignName={c.shortName}
                  highlight={pkg.isFeatured}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
