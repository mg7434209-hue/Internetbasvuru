import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { regions } from '@/data/regions';

export const metadata: Metadata = {
  title: 'Antalya Bölgeleri | Türk Telekom Fiber İnternet',
  description: 'Manavgat, Alanya, Muratpaşa, Kepez, Side, Serik - Antalya\'nın tüm ilçelerinde geçerli Türk Telekom fiber internet kampanyaları.',
  alternates: { canonical: 'https://internetbasvuru.com/bolgeler' },
};

export default function BolgelerPage() {
  const ilcelerOnly = regions.filter((r) => r.slug !== 'antalya');

  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container-fluid">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Hizmet Bölgelerimiz
          </div>
          <h1 className="section-title mb-3">Antalya Bölgeleri</h1>
          <p className="section-subtitle">
            Her ilçenin kendine özgü kampanya ve fiyatları var. İlçenizi seçin, size uygun paketleri görün.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {ilcelerOnly.map((r) => (
            <Link
              key={r.slug}
              href={`/bolgeler/${r.slug}`}
              className="card group p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-brand-100 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                  <MapPin className="w-5 h-5 text-brand-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-ink-500 font-semibold">{r.il}</div>
                  <h3 className="text-xl font-extrabold text-ink-900 group-hover:text-brand-700 transition-colors">
                    {r.ilce}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed flex-1 mb-4">
                {r.intro.slice(0, 140)}...
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-ink-100">
                <span className="text-xs font-semibold text-accent-500">
                  {r.highlight}
                </span>
                <span className="text-sm font-semibold text-brand-700 group-hover:text-accent-500 transition-colors flex items-center gap-1">
                  İncele <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
