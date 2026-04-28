import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Settings } from 'lucide-react';
import { campaigns } from '@/data/packages';
import PackageCard from '@/components/PackageCard';
import LeadForm from '@/components/LeadForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = campaigns.find((x) => x.slug === slug);
  if (!c) return {};

  return {
    title: `${c.name} | Türk Telekom ${c.commitmentMonths} Ay Kampanya`,
    description: `${c.description} Geçerli bölge: ${c.applicableRegions.join(', ')}. ${c.packages.length} farklı hız seçeneği.`,
    alternates: { canonical: `https://internetbasvuru.com/kampanyalar/${slug}` },
  };
}

export default async function CampaignDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = campaigns.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <section className="bg-brand-900 text-white mesh-brand relative overflow-hidden py-10 md:py-16">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-fluid relative">
          <nav className="flex items-center gap-2 text-xs text-ink-300 mb-4">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/kampanyalar" className="hover:text-white">Kampanyalar</Link>
            <span>/</span>
            <span className="text-white font-medium">{c.shortName}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {c.slug === 'tivibulu' ? (
                  <span className="badge-prime">TV + İnternet</span>
                ) : c.slug === 'bolgesel-firsat' ? (
                  <span className="badge-accent">24 Ay Sabit Fiyat</span>
                ) : c.slug === 'bolgesel-avantaj' ? (
                  <span className="badge-accent">Bölgesel Özel</span>
                ) : (
                  <span className="badge-brand">Ana Kampanya</span>
                )}
              </div>

              <h1 className="text-hero font-extrabold text-balance mb-5">{c.name}</h1>
              <p className="text-lg text-ink-200 leading-relaxed mb-6">{c.description}</p>

              <div className="flex flex-wrap gap-6 text-sm text-ink-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-400" />
                  <div>
                    <div className="text-xs text-ink-400 uppercase">Taahhüt</div>
                    <div className="font-bold text-white">{c.commitmentMonths} ay</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <div>
                    <div className="text-xs text-ink-400 uppercase">Bölge</div>
                    <div className="font-bold text-white">{c.applicableRegions.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent-400" />
                  <div>
                    <div className="text-xs text-ink-400 uppercase">Modem Ücreti</div>
                    <div className="font-bold text-white">+{c.modemFee}₺/ay</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <LeadForm
                variant="hero"
                sourceLabel={`campaign-${c.slug}`}
                whatsappContext={{ type: 'campaign', campaignName: c.shortName }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-fluid">
          <h2 className="section-title mb-2">Kampanya Paketleri</h2>
          <p className="section-subtitle mb-8">
            {c.packages.length} farklı hız seçeneği — 16 Mbps'den 1000 Mbps'e kadar.
          </p>

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
        </div>
      </section>
    </>
  );
}
