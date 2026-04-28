import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Zap, Wifi, Tv, Calendar, Settings } from 'lucide-react';
import { allPackages, campaigns, getEffectivePrice, getPackageSlug, type Package } from '@/data/packages';
import LeadForm from '@/components/LeadForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPackages.map((pkg) => ({ slug: getPackageSlug(pkg) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = allPackages.find((p) => getPackageSlug(p) === slug);
  if (!pkg) return {};

  const campaign = campaigns.find((c) => c.slug === pkg.campaignCategory);
  const price = getEffectivePrice(pkg);

  return {
    title: `${pkg.speedMbps} Mbps Türk Telekom Fiber ${pkg.hasTv ? '+ Tivibu ' : ''}- ${price.display}`,
    description: `${pkg.speedMbps} Mbps Türk Telekom fiber internet paketi. ${price.display} ${price.note.toLowerCase()}, ${pkg.commitmentMonths} ay taahhüt. ${campaign?.shortName} kampanyası. Anında başvuru.`,
    alternates: { canonical: `https://internetbasvuru.com/paketler/${slug}` },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = allPackages.find((p) => getPackageSlug(p) === slug);
  if (!pkg) notFound();

  const campaign = campaigns.find((c) => c.slug === pkg.campaignCategory)!;
  const price = getEffectivePrice(pkg);

  return (
    <div className="bg-ink-50 py-10 md:py-16">
      <div className="container-fluid max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-500 mb-5">
          <a href="/" className="hover:text-brand-700">Ana Sayfa</a>
          <span>/</span>
          <a href="/paketler" className="hover:text-brand-700">Paketler</a>
          <span>/</span>
          <span className="text-ink-700 font-medium">{pkg.speedMbps} Mbps {pkg.hasTv && 'Tivibu'}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Sol: Paket detayları */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-ink-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                {pkg.hasTv && <span className="badge-prime"><Tv className="w-3 h-3" /> Tivibu TV Dahil</span>}
                <span className="badge-brand">{campaign.shortName}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-2">
                {pkg.speedMbps} Mbps Fiber İnternet
              </h1>
              <p className="text-ink-600 mb-6">
                Türk Telekom {campaign.name} — {pkg.commitmentMonths} ay taahhütlü limitsiz fiber paket
              </p>

              {/* Fiyat kutusu */}
              <div className="bg-accent-500/5 border-2 border-accent-500/30 rounded-xl p-5 mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-extrabold text-accent-500">{price.display}</span>
                  <span className="text-lg text-ink-600 font-medium">/ay</span>
                </div>
                <p className="text-sm text-ink-600">{price.note}</p>
                {pkg.priceLastPeriod && pkg.priceFirstPeriod && (
                  <p className="text-xs text-ink-500 mt-2">
                    Kalan dönem: <strong>{pkg.priceLastPeriod}₺/ay</strong>
                    <span className="ml-2 px-2 py-0.5 bg-ink-100 rounded text-[10px]">
                      Toplam taahhüt: {pkg.commitmentMonths} ay
                    </span>
                  </p>
                )}
                {pkg.priceMonthly && (
                  <p className="text-xs text-success font-semibold mt-2">
                    ✓ {pkg.commitmentMonths} ay boyunca artış yok, tek fiyat
                  </p>
                )}
              </div>

              {/* Özellikler */}
              <h2 className="text-lg font-bold text-ink-900 mb-3">Paket Özellikleri</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Zap, label: 'Hız', value: `${pkg.speedMbps} Mbps Fiber` },
                  { icon: Wifi, label: 'Kota', value: 'Limitsiz — Adil kullanım yok' },
                  { icon: Calendar, label: 'Taahhüt', value: `${pkg.commitmentMonths} ay` },
                  { icon: Settings, label: 'Modem', value: `Aylık +${pkg.modemFee}₺` },
                  ...(pkg.extraFee ? [{ icon: Tv, label: 'IPTV modemi', value: `Aylık +${pkg.extraFee}₺` }] : []),
                  ...(pkg.hasTv ? [{ icon: Tv, label: 'TV', value: 'Tivibu (sinema + spor)' }] : []),
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 bg-ink-50 rounded-lg">
                      <Icon className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-ink-500 font-semibold uppercase">{f.label}</div>
                        <div className="text-sm font-bold text-ink-900">{f.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Neler dahil */}
              <h2 className="text-lg font-bold text-ink-900 mb-3">Neler Dahil?</h2>
              <ul className="space-y-2 mb-6">
                {[
                  'Ücretsiz kurulum ve aktivasyon',
                  'Modem cihazı (kiralık)',
                  'Limitsiz aylık internet kullanımı',
                  `${pkg.speedMbps} Mbps'e kadar garantili hız (fiber altyapı olan adreslerde)`,
                  'Yetkili bayi teknik desteği',
                  ...(pkg.hasTv ? ['Tivibu platformu (canlı TV + içerik kütüphanesi)'] : []),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Kampanya bilgisi */}
              <div className="border-t border-ink-200 pt-5">
                <h2 className="text-lg font-bold text-ink-900 mb-2">Kampanya: {campaign.name}</h2>
                <p className="text-sm text-ink-600 leading-relaxed mb-2">{campaign.description}</p>
                <p className="text-xs text-ink-500">
                  <strong>Geçerli bölge:</strong> {campaign.applicableRegions.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Sağ: Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <LeadForm
                variant="inline"
                packageId={pkg.id}
                packageName={`${pkg.speedMbps} Mbps ${pkg.hasTv ? 'Tivibu' : 'Fiber'}`}
                sourceLabel={`package-${pkg.id}`}
                whatsappContext={{ type: 'package', pkg }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
