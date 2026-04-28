import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Check } from 'lucide-react';
import { regions } from '@/data/regions';
import { campaigns, type CampaignCategory } from '@/data/packages';
import PackageCard from '@/components/PackageCard';
import LeadForm from '@/components/LeadForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = regions.find((r) => r.slug === slug);
  if (!region) return {};

  return {
    title: region.seoTitle,
    description: region.seoDescription,
    alternates: { canonical: `https://internetbasvuru.com/bolgeler/${slug}` },
    openGraph: {
      title: region.seoTitle,
      description: region.seoDescription,
      url: `https://internetbasvuru.com/bolgeler/${slug}`,
    },
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = regions.find((r) => r.slug === slug);
  if (!region) notFound();

  const activeCampaigns = campaigns.filter((c) =>
    region.applicableCampaigns.includes(c.slug as CampaignCategory)
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 text-white mesh-brand relative overflow-hidden py-10 md:py-16">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-fluid relative">
          <nav className="flex items-center gap-2 text-xs text-ink-300 mb-4">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/bolgeler" className="hover:text-white">Bölgeler</Link>
            <span>/</span>
            <span className="text-white font-medium">{region.ilce}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-500/20 border border-accent-500/40 rounded-full text-xs font-semibold text-accent-200 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {region.il} · {region.ilce}
              </div>
              <h1 className="text-hero font-extrabold text-balance mb-5">
                {region.h1}
              </h1>
              <p className="text-lg text-ink-200 leading-relaxed max-w-2xl">
                {region.intro}
              </p>
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <LeadForm
                variant="hero"
                defaultIlce={region.ilce}
                sourceLabel={`region-${region.slug}`}
                whatsappContext={{ type: 'region', regionName: region.ilce }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Geçerli kampanyalar */}
      {activeCampaigns.map((c) => (
        <section key={c.slug} className="section border-b border-ink-100">
          <div className="container-fluid">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                {c.slug === 'tivibulu' ? (
                  <span className="badge-prime">TV + İnternet</span>
                ) : c.slug === 'bolgesel-firsat' ? (
                  <span className="badge-accent">24 Ay Sabit</span>
                ) : c.slug === 'bolgesel-avantaj' ? (
                  <span className="badge-accent">Bölgesel Özel</span>
                ) : (
                  <span className="badge-brand">Ana Kampanya</span>
                )}
                <span className="text-xs text-ink-500">· {c.commitmentMonths} ay taahhüt</span>
              </div>
              <h2 className="section-title">{c.name}</h2>
              <p className="section-subtitle mt-2">{c.description}</p>
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
          </div>
        </section>
      ))}

      {/* Neden bizimle? */}
      <section className="section bg-ink-50">
        <div className="container-fluid">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="section-title">Neden {region.ilce} İçin internetbaşvuru?</h2>
            <p className="section-subtitle mt-2 mx-auto">
              {region.ilce} bölgesinde yetkili bayi olarak hızlı ve güvenilir hizmet sunuyoruz.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { title: 'Bölgenize Özel Fiyat', desc: `${region.ilce} için geçerli Türk Telekom kampanyalarını birebir uyguluyoruz.` },
              { title: 'Yerel Yetkili Bayi', desc: 'Göksoylar İletişim Ltd. Şti. — Antalya merkezli, yerinde destek.' },
              { title: '15 Dakika Dönüş', desc: 'Başvurunuzu aldığımız andan itibaren maksimum 15 dakika içinde geri dönüyoruz.' },
            ].map((item, i) => (
              <div key={i} className="card p-5 text-center">
                <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Check className="w-5 h-5 text-accent-500" />
                </div>
                <h3 className="font-bold text-ink-900 mb-2">{item.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
