import Link from 'next/link';
import { Zap, MapPin, Shield, Clock, ChevronRight, Wifi, Headphones } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import PackageCard from '@/components/PackageCard';
import { featuredPackages, campaigns } from '@/data/packages';
import { regions } from '@/data/regions';
import { getDetectedLocation } from '@/lib/geo';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const antalyaRegions = regions.filter((r) => r.slug !== 'antalya').slice(0, 6);
  const detected = await getDetectedLocation();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-900 text-white mesh-brand">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="container-fluid relative py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Sol: Başlık + CTA */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-500/20 border border-accent-500/40 rounded-full text-xs font-semibold text-accent-200 mb-5">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
                Türk Telekom Yetkili Bayisi · 14 İl Hizmet
              </div>

              <h1 className="text-hero font-extrabold text-balance mb-5">
                Türk Telekom <span className="text-accent-400">Fiber İnternet</span> Başvurusu
              </h1>

              <p className="text-lg text-ink-200 leading-relaxed mb-8 max-w-xl">
                Antalya, İzmir, Bursa, Muğla, Aydın ve <strong className="text-white">14 ilde fiber internet</strong>. Ücretsiz kurulum, yetkili bayi desteği, 15 dakikada dönüş.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 max-w-lg">
                <div className="text-center bg-brand-800/50 backdrop-blur rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-400 mb-0.5">750₺</div>
                  <div className="text-[11px] md:text-xs text-ink-300 leading-tight">Bölgesel'den<br/>başlayan</div>
                </div>
                <div className="text-center bg-brand-800/50 backdrop-blur rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-400 mb-0.5">1000</div>
                  <div className="text-[11px] md:text-xs text-ink-300 leading-tight">Mbps'e kadar<br/>fiber hız</div>
                </div>
                <div className="text-center bg-brand-800/50 backdrop-blur rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-400 mb-0.5">15dk</div>
                  <div className="text-[11px] md:text-xs text-ink-300 leading-tight">Başvuruya<br/>dönüş</div>
                </div>
              </div>

              <div className="hidden lg:flex flex-wrap items-center gap-5 text-sm text-ink-200">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent-400" /> KVKK Uyumlu</div>
                <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-accent-400" /> Ücretsiz Kurulum</div>
                <div className="flex items-center gap-2"><Headphones className="w-4 h-4 text-accent-400" /> Yerel Destek</div>
              </div>
            </div>

            {/* Sağ: FORM */}
            <div className="lg:pl-8">
              <LeadForm
                variant="hero"
                sourceLabel="homepage-hero"
                detectedCity={detected.cityName}
                detectedCountry={detected.country}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PAKETLER ============ */}
      <section className="section">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
                Popüler Paketler
              </div>
              <h2 className="section-title">Öne Çıkan Fiber Paketleri</h2>
              <p className="section-subtitle mt-2">
                Bölgenize özel kampanyaları aşağıda inceleyebilir, dilediğiniz pakete tek tıkla başvurabilirsiniz.
              </p>
            </div>
            <Link href="/paketler" className="btn-outline shrink-0">
              Tüm Paketler <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredPackages.slice(0, 4).map((pkg) => {
              const campaign = campaigns.find((c) => c.slug === pkg.campaignCategory);
              return (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  campaignName={campaign?.shortName}
                  highlight={pkg.speedMbps === 100 || pkg.speedMbps === 300}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ KAMPANYALAR ============ */}
      <section className="section bg-ink-50 border-y border-ink-200">
        <div className="container-fluid">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
              Aktif Kampanyalar
            </div>
            <h2 className="section-title">Bölgenize Özel Fırsatlar</h2>
            <p className="section-subtitle mt-2 mx-auto">
              Bulunduğunuz ilçeye göre farklı Türk Telekom kampanyalarından yararlanabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {campaigns.map((c) => (
              <Link
                key={c.slug}
                href={`/kampanyalar/${c.slug}`}
                className="card group p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  {c.slug === 'tivibulu' ? (
                    <span className="badge-prime">TV + İnternet</span>
                  ) : c.slug === 'bolgesel-firsat' ? (
                    <span className="badge-accent">24 Ay Sabit</span>
                  ) : c.slug === 'bolgesel-avantaj' ? (
                    <span className="badge-accent">Bölgesel</span>
                  ) : (
                    <span className="badge-brand">Genel</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {c.shortName}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed flex-1 mb-4">
                  {c.description}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-ink-100">
                  <span className="text-ink-500">{c.commitmentMonths} ay taahhüt</span>
                  <span className="font-semibold text-brand-700 group-hover:text-accent-500 transition-colors">
                    Detay →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BÖLGELER ============ */}
      <section className="section">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
                Hizmet Bölgelerimiz
              </div>
              <h2 className="section-title">Antalya'da Hangi İlçedesiniz?</h2>
              <p className="section-subtitle mt-2">
                İlçeniz için geçerli kampanyayı ve paket fiyatlarını görüntüleyin.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {antalyaRegions.map((r) => (
              <Link
                key={r.slug}
                href={`/bolgeler/${r.slug}`}
                className="card group p-5 text-center hover:border-accent-500"
              >
                <MapPin className="w-5 h-5 text-accent-500 mx-auto mb-2" />
                <div className="font-bold text-ink-900 group-hover:text-brand-700 mb-1">
                  {r.ilce}
                </div>
                <div className="text-xs text-ink-500">{r.highlight}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-fluid relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-accent-400 uppercase tracking-widest mb-2">
              Süreç
            </div>
            <h2 className="text-display font-bold text-white mb-3">Başvuru Nasıl İşliyor?</h2>
            <p className="text-ink-200">
              Üç basit adımda aboneliğiniz aktif — hepsi yetkili bayi desteğiyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { num: '01', title: 'Form veya WhatsApp', desc: 'Bilgilerinizi bırakın ya da direkt WhatsApp\'tan yazın. 15 dakika içinde ararız.', icon: Clock },
              { num: '02', title: 'Paket & Altyapı Kontrolü', desc: 'Adresinize uygun altyapıyı ve size en çok fayda sağlayacak paketi birlikte belirleriz.', icon: Wifi },
              { num: '03', title: 'Kurulum Randevusu', desc: 'Başvurunuzu TT sistemine biz işleriz. Teknik ekip randevu günü evinize gelir.', icon: Zap },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative">
                  <div className="text-6xl font-extrabold text-brand-700/50 mb-3">{step.num}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-accent-400" />
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-ink-200 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ / TRUST ============ */}
      <section className="section">
        <div className="container-fluid">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
                Sık Sorulan Sorular
              </div>
              <h2 className="section-title mb-4">Başvurmadan Önce</h2>
              <p className="text-ink-600 mb-6">
                Merak ettiğiniz detayları aşağıda bulabilir veya WhatsApp üzerinden direkt sorabilirsiniz.
              </p>
              <Link href="/sss" className="btn-outline">
                Tüm Soruları Gör <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { q: 'Kurulum ücretli mi?', a: 'Hayır, kampanyalı tüm paketlerde kurulum ücretsizdir.' },
                { q: 'Taahhüt süresi ne kadar?', a: 'Kampanyaya göre 18 veya 24 ay olabilir. Muratpaşa için 24 ay tek fiyatla sabitlenir.' },
                { q: 'Adresime fiber gelir mi?', a: 'Başvurunuzu aldığımızda biz altyapı sorgusunu yaparız. Fiber olmayan adreslerde VDSL alternatifi sunulabilir.' },
                { q: 'Mevcut hattım varsa ne olur?', a: 'Mevcut hattınız varsa değişim veya hız yükseltme seçeneklerini telefonda birlikte değerlendiririz.' },
              ].map((item, i) => (
                <details key={i} className="card p-4 group">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-ink-900 text-sm">
                    {item.q}
                    <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
