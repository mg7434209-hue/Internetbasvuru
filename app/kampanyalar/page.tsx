import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calendar, MapPin } from 'lucide-react';
import { campaigns } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Türk Telekom Kampanyaları | Aktif İnternet Kampanyaları',
  description: 'Bölgesel avantaj, bölgesel fırsat, fiber gücü yaşa ve tivibulu kampanyaları. Türk Telekom fiber internet kampanya fiyatları.',
  alternates: { canonical: 'https://internetbasvuru.com/kampanyalar' },
};

export default function KampanyalarPage() {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container-fluid">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Aktif Kampanyalar
          </div>
          <h1 className="section-title mb-3">Türk Telekom Fiber Kampanyaları</h1>
          <p className="section-subtitle">
            Bulunduğunuz bölgeye göre farklı kampanyalardan yararlanabilirsiniz. Her kampanyanın kendine özgü fiyat yapısı ve taahhüt süresi vardır.
          </p>
        </div>

        <div className="space-y-5">
          {campaigns.map((c) => (
            <Link
              key={c.slug}
              href={`/kampanyalar/${c.slug}`}
              className="card group p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {c.slug === 'tivibulu' ? (
                    <span className="badge-prime">TV + İnternet</span>
                  ) : c.slug === 'bolgesel-firsat' ? (
                    <span className="badge-accent">24 Ay Sabit</span>
                  ) : c.slug === 'bolgesel-avantaj' ? (
                    <span className="badge-accent">Bölgesel</span>
                  ) : (
                    <span className="badge-brand">Ana Kampanya</span>
                  )}
                  {c.highlight && (
                    <span className="text-xs font-semibold text-success">{c.highlight}</span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900 group-hover:text-brand-700 transition-colors mb-2">
                  {c.name}
                </h2>
                <p className="text-sm md:text-base text-ink-600 leading-relaxed mb-4">
                  {c.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-ink-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {c.commitmentMonths} ay taahhüt
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {c.applicableRegions.join(', ')}
                  </div>
                  <div>
                    Modem: +{c.modemFee}₺/ay
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-ink-500 uppercase tracking-wider">Paket sayısı</div>
                  <div className="text-3xl font-extrabold text-brand-700">{c.packages.length}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-500 group-hover:translate-x-1 transition-transform">
                  Detaylar <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
