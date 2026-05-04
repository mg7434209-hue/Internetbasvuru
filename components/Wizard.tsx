'use client';

import { useState, useMemo } from 'react';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import { ALL_CITIES, getDistricts, getCampaignZone } from '@/data/turkey';
import {
  getPackagesForLocation,
  recommendSpeed,
  calcPackagePrices,
  TV_EXTRA_FEE,
  type Package,
} from '@/data/packages';

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type Usage = 'hafif' | 'orta' | 'yogun';
type LineStatus = 'yok' | 'var';

export default function Wizard() {
  const [step, setStep] = useState<Step>(1);
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [usage, setUsage] = useState<Usage | ''>('');
  const [wantsTv, setWantsTv] = useState<boolean | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [ad, setAd] = useState('');
  const [tel, setTel] = useState('');
  const [line, setLine] = useState<LineStatus | ''>('');
  const [kvkk, setKvkk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const districts = useMemo(() => (il ? getDistricts(il) : []), [il]);
  const zone = useMemo(() => getCampaignZone(il, ilce), [il, ilce]);

  const recommendedPackages = useMemo(() => {
    if (!usage) return [];
    const targetSpeed = recommendSpeed(usage);
    return getPackagesForLocation(zone).filter(p => p.speedMbps === targetSpeed);
  }, [usage, zone]);

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

  const canProceed = () => {
    if (step === 1) return !!il && !!ilce;
    if (step === 2) return !!usage;
    if (step === 3) return wantsTv !== null;
    if (step === 4) return pkg !== null;
    if (step === 5) return ad.trim().length >= 3 && tel.trim().replace(/\D/g, '').length >= 10 && !!line && kvkk;
    return true;
  };

  async function handleSubmit() {
    if (!canProceed() || !pkg) return;
    setSubmitting(true);
    try {
      const phoneClean = tel.replace(/\D/g, '');
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ad.trim(),
          phone: phoneClean.startsWith('0') ? phoneClean : '0' + phoneClean,
          il, ilce,
          kvkk_consent: kvkk,
          package_id: pkg.id,
          package_name: `${pkg.speedMbps} Mbps ${pkg.campaignName || ''} ${wantsTv ? '+ TV' : ''}`.trim(),
          message: `Wizard başvurusu - ${usage} kullanım, mevcut hat: ${line}`,
          source: 'wizard',
        }),
      });
    } catch {}
    setSubmitting(false);
    setStep(6);
  }

  function reset() {
    setStep(1); setIl(''); setIlce(''); setUsage(''); setWantsTv(null);
    setPkg(null); setAd(''); setTel(''); setLine(''); setKvkk(false);
  }

  function handleNext() {
    if (!canProceed()) return;
    if (step === 5) { handleSubmit(); return; }
    setStep((step + 1) as Step);
  }

  function formatPhone(value: string) {
    let v = value.replace(/\D/g, '');
    if (v.startsWith('90')) v = v.slice(2);
    if (v.startsWith('0')) v = v.slice(1);
    if (v.length > 10) v = v.slice(0, 10);
    let f = v;
    if (v.length > 3) f = v.slice(0, 3) + ' ' + v.slice(3);
    if (v.length > 6) f = v.slice(0, 3) + ' ' + v.slice(3, 6) + ' ' + v.slice(6);
    if (v.length > 8) f = v.slice(0, 3) + ' ' + v.slice(3, 6) + ' ' + v.slice(6, 8) + ' ' + v.slice(8);
    return f;
  }

  return (
    <section
      id="wizard"
      className="px-[5%] py-20 text-white mt-8 rounded-t-[60px]"
      style={{
        background: `radial-gradient(circle at 20% 0%, rgba(0,154,218,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(0,123,176,0.1) 0%, transparent 50%), #0F172A`,
      }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 text-brand-500 text-[13px] font-bold mb-5 tracking-wide border border-brand-500/30">
          🧭 Akıllı Yönlendirme
        </div>
        <h2 className="text-display font-extrabold mb-4 leading-tight">
          Size En Uygun Paketi Bulalım
        </h2>
        <p className="opacity-70 text-base max-w-[540px] mx-auto">
          Birkaç kısa soruyla kullanım profilinize ve bütçenize göre en uygun fiber paketini önerelim.
        </p>

        <div className="bg-white/5 p-6 sm:p-9 rounded-2xl border border-white/10 mt-8 backdrop-blur-md text-left">
          <div className="flex items-center mb-7 gap-1.5">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="flex items-center gap-1.5 flex-1 last:flex-none">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  n < step && step <= 5 ? 'bg-success border border-success text-white'
                  : n === step ? 'bg-brand-500 border border-brand-500 text-white shadow-[0_0_20px_rgba(0,154,218,0.5)]'
                  : 'bg-white/10 border border-white/20 text-white/50'
                }`}>{n}</div>
                {n < 5 && <div className={`flex-1 h-px transition ${n < step ? 'bg-success' : 'bg-white/15'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px]">Konumunuz</h3>
              <p className="text-white/60 text-sm mb-5">Hangi şehirde fiber internet kullanmak istiyorsunuz?</p>
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">İl</label>
              <select value={il} onChange={e => { setIl(e.target.value); setIlce(''); }}
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold focus:outline-none focus:border-brand-500 transition mb-3">
                <option value="" className="bg-ink-900">İl seçin</option>
                {ALL_CITIES.map(c => <option key={c.plate} value={c.name} className="bg-ink-900">{c.name}</option>)}
              </select>
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 mt-1.5">İlçe</label>
              <select value={ilce} onChange={e => setIlce(e.target.value)} disabled={!il}
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold focus:outline-none focus:border-brand-500 transition disabled:opacity-50">
                <option value="" className="bg-ink-900">{il ? 'İlçe seçin' : 'Önce il seçin'}</option>
                {districts.map(d => <option key={d} value={d} className="bg-ink-900">{d}</option>)}
              </select>
              {zone === 'bolgesel-avantaj' && (
                <p className="text-[12px] text-brand-500 mt-3 font-semibold">✨ Bu bölge için <strong>Bölgesel Avantaj</strong> kampanyası uygulanır.</p>
              )}
              {zone === 'bolgesel-firsat' && (
                <p className="text-[12px] text-brand-500 mt-3 font-semibold">✨ Bu bölge için <strong>Bölgesel Fırsat</strong> (24 ay tek fiyat) kampanyası uygulanır.</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px]">Kullanım profili</h3>
              <p className="text-white/60 text-sm mb-5">Doğru hızı önerelim.</p>
              {(['hafif', 'orta', 'yogun'] as Usage[]).map(u => (
                <button key={u} onClick={() => setUsage(u)}
                  className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition ${usage === u ? 'border-2 border-brand-500 bg-brand-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                  <div className="font-bold text-[15px] mb-0.5">{u === 'hafif' ? 'Hafif kullanım' : u === 'orta' ? 'Orta kullanım' : 'Yoğun kullanım'}</div>
                  <div className="text-xs text-white/60 font-medium">
                    {u === 'hafif' && '1-3 kişi · sosyal medya, video · 100 Mbps yeterli'}
                    {u === 'orta' && '3-5 kişi · 4K, oyun, video konferans · 300 Mbps'}
                    {u === 'yogun' && 'Kalabalık ev / ev ofis · 1000 Mbps'}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px]">TV de ister misiniz?</h3>
              <p className="text-white/60 text-sm mb-5">Tivibu opsiyonu.</p>
              <button onClick={() => setWantsTv(false)}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition ${wantsTv === false ? 'border-2 border-brand-500 bg-brand-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                <div className="font-bold text-[15px] mb-0.5">Sadece internet</div>
                <div className="text-xs text-white/60 font-medium">Standart Fiber Gücü Yaşa kampanyası</div>
              </button>
              <button onClick={() => setWantsTv(true)}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition ${wantsTv === true ? 'border-2 border-brand-500 bg-brand-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                <div className="font-bold text-[15px] mb-0.5">TV + İnternet</div>
                <div className="text-xs text-white/60 font-medium">Tivibu paketi (+{fmt(TV_EXTRA_FEE)}₺/ay)</div>
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px]">Sizin için seçilen paket</h3>
              <p className="text-white/60 text-sm mb-5">{il} / {ilce} · {wantsTv ? 'TV dahil' : 'sadece internet'}</p>
              {recommendedPackages.map(p => {
                const prices = calcPackagePrices(p, { tv: !!wantsTv, modem: false });
                const isSelected = pkg?.id === p.id;
                return (
                  <div key={p.id} onClick={() => setPkg(p)}
                    className={`rounded-xl border p-4 mb-2.5 cursor-pointer transition ${isSelected ? 'border-2 border-brand-500 bg-brand-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <div className="text-2xl font-extrabold tracking-tight">{p.speedMbps}<span className="text-sm text-brand-500 font-bold ml-1">Mbps</span></div>
                      <div className="text-xs text-white/60 font-semibold">{p.campaignName || 'Fiber Gücü Yaşa'}</div>
                    </div>
                    <div className="flex gap-4 bg-black/25 px-3 py-2 rounded-xl mb-2">
                      <div><div className="text-[10px] text-white/50 font-semibold">İlk 9 ay</div><div className="text-[15px] font-bold">{fmt(prices.firstPeriod)}₺/ay</div></div>
                      <div><div className="text-[10px] text-white/50 font-semibold">{prices.isFlat ? '24 ay' : '10-18. ay'}</div><div className="text-[15px] font-bold">{fmt(prices.secondPeriod)}₺/ay</div></div>
                    </div>
                    <div className="text-[11px] text-prime-100/95 flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" strokeWidth={3} />
                      {prices.isFlat ? '24 ay TEK fiyat' : '18 ay sözleşmede sabit'} · enflasyon zammı yok
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 5 && pkg && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px]">Bilgileriniz</h3>
              <p className="text-white/60 text-sm mb-5">15 dakika içinde sizi arıyoruz.</p>
              <div className="bg-brand-500/10 border border-brand-500/30 p-3.5 rounded-xl mb-3.5 space-y-1">
                {(() => {
                  const prices = calcPackagePrices(pkg, { tv: !!wantsTv, modem: false });
                  return (
                    <>
                      <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Bölge</span><span className="font-bold">{il} / {ilce}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Paket</span><span className="font-bold">{pkg.speedMbps} Mbps {wantsTv ? '+ TV' : ''}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">İlk 9 ay</span><span className="font-bold">{fmt(prices.firstPeriod)}₺/ay</span></div>
                      <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">{prices.isFlat ? '24 ay' : '10-18. ay'}</span><span className="font-bold">{fmt(prices.secondPeriod)}₺/ay</span></div>
                    </>
                  );
                })()}
              </div>
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Ad Soyad</label>
              <input type="text" value={ad} onChange={e => setAd(e.target.value)} placeholder="Mustafa Göksoy"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold mb-3 focus:outline-none focus:border-brand-500 transition placeholder-white/40" />
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Telefon</label>
              <input type="tel" value={tel} onChange={e => setTel(formatPhone(e.target.value))} placeholder="5XX XXX XX XX"
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold mb-3 focus:outline-none focus:border-brand-500 transition placeholder-white/40" />
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Mevcut TT hattınız?</label>
              <div className="flex gap-2.5 mb-3">
                {(['yok', 'var'] as LineStatus[]).map(l => (
                  <button key={l} onClick={() => setLine(l)}
                    className={`flex-1 rounded-xl border p-3 text-center text-sm font-bold transition ${line === l ? 'border-2 border-brand-500 bg-brand-500/15 px-[11px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                    {l === 'yok' ? 'Yok' : 'Var'}
                  </button>
                ))}
              </div>
              <label className="flex gap-2.5 items-start mt-3.5 mb-1 text-white/70 text-xs leading-relaxed cursor-pointer">
                <input type="checkbox" checked={kvkk} onChange={e => setKvkk(e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-500" />
                <span><a href="/kvkk-aydinlatma" target="_blank" className="text-brand-500 font-semibold">KVKK aydınlatma metnini</a> okudum, bilgilerimin Türk Telekom abonelik başvurum için işlenmesine izin veriyorum.</span>
              </label>
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-success/20 mx-auto mb-5 flex items-center justify-center">
                <Check className="w-8 h-8 text-success" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold mb-2">Başvurunuz alındı</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-[400px] mx-auto mb-6">
                15 dakika içinde <strong>0534 977 70 00</strong> numarasından sizi arıyoruz.
              </p>
              <button onClick={reset} className="bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-2.5 rounded-full font-bold transition">
                Yeni başvuru
              </button>
            </div>
          )}

          {step !== 6 && (
            <div className="flex gap-2.5 mt-5">
              <button onClick={() => step > 1 && setStep((step - 1) as Step)}
                className={`flex-1 py-3.5 px-5 rounded-full font-bold text-[15px] border border-white/15 bg-white/5 hover:bg-white/10 transition ${step === 1 ? 'invisible' : ''}`}>
                ← Geri
              </button>
              <button onClick={handleNext} disabled={!canProceed() || submitting}
                className={`flex-1 py-3.5 px-5 rounded-full font-bold text-[15px] border transition flex items-center justify-center gap-2 ${canProceed() && !submitting ? 'bg-brand-500 border-brand-500 hover:bg-brand-600' : 'bg-brand-500/30 border-brand-500/30 cursor-not-allowed'}`}>
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor</> : step === 5 ? 'Başvuruyu gönder' : <>Devam Et <ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
