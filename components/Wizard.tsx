'use client';

import { useState, useMemo } from 'react';
import { Check, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { ALL_CITIES, getDistricts } from '@/data/turkey';
import {
  recommendPackage,
  type Package,
  type Network,
} from '@/data/packages';

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type Usage = 'hafif' | 'orta' | 'yogun';
type Coverage = 'var' | 'yok' | 'bilmiyorum';
type LineStatus = 'yok' | 'var';

export default function Wizard() {
  const [step, setStep] = useState<Step>(1);
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [usage, setUsage] = useState<Usage | ''>('');
  const [coverage, setCoverage] = useState<Coverage | ''>('');
  const [pkg, setPkg] = useState<Package | null>(null);
  const [ad, setAd] = useState('');
  const [tel, setTel] = useState('');
  const [line, setLine] = useState<LineStatus | ''>('');
  const [kvkk, setKvkk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const districts = useMemo(() => (il ? getDistricts(il) : []), [il]);

  // 5G kapsaması yoksa 4.5G önerilir; "bilmiyorum" için 5G önerilir (teyit aramada)
  const network: Network = coverage === 'yok' ? '4.5G' : '5G';

  const recommendedPackage = useMemo(() => {
    if (!usage || !coverage) return null;
    return recommendPackage(usage, network);
  }, [usage, coverage, network]);

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

  const canProceed = () => {
    if (step === 1) return !!il && !!ilce;
    if (step === 2) return !!usage;
    if (step === 3) return !!coverage;
    if (step === 4) return pkg !== null;
    if (step === 5) return ad.trim().length >= 3 && tel.trim().replace(/\D/g, '').length >= 10 && !!line && kvkk;
    return true;
  };

  // =============================================
  // SUBMIT — silent failure düzeltildi
  // =============================================
  // response.ok kontrolü + hata gösterimi + retry imkanı.
  async function handleSubmit() {
    if (!canProceed() || !pkg || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const phoneClean = tel.replace(/\D/g, '');
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ad.trim(),
          phone: phoneClean.startsWith('0') ? phoneClean : '0' + phoneClean,
          il, ilce,
          kvkk_consent: kvkk,
          package_id: pkg.id,
          package_name: `${pkg.name} (${pkg.quota})`,
          message: `Wizard başvurusu - ${usage} kullanım, 5G kapsama: ${coverage}, mevcut hat: ${line}`,
          source: 'wizard',
          source_path: 'wizard',
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        success?: boolean;
        error?: string;
      };

      const ok = data.ok || data.success;
      if (!res.ok || !ok) {
        console.error('Wizard lead submit failed:', res.status, data);
        setError(
          'Başvurunuz alınamadı. Lütfen birkaç dakika sonra tekrar deneyin.'
        );
        setSubmitting(false);
        return;
      }

      // Başarılı
      setSubmitting(false);
      setStep(6);
    } catch (err) {
      console.error('Wizard lead submit error:', err);
      setError('Bağlantı hatası. İnternet bağlantınızı kontrol edip tekrar deneyin.');
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1); setIl(''); setIlce(''); setUsage(''); setCoverage('');
    setPkg(null); setAd(''); setTel(''); setLine(''); setKvkk(false);
    setError(null);
  }

  function handleNext() {
    if (!canProceed()) return;
    if (step === 5) { handleSubmit(); return; }
    setError(null); // Önceki hatayı temizle
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
        background: `radial-gradient(circle at 20% 0%, rgba(255,201,0,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(40,86,165,0.35) 0%, transparent 50%), #12294F`,
      }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/15 text-accent-500 text-[13px] font-bold mb-5 tracking-wide border border-accent-500/30">
          🧭 Akıllı Yönlendirme
        </div>
        <h2 className="text-display font-extrabold mb-4 leading-tight text-white">
          Size En Uygun Superbox Paketini Bulalım
        </h2>
        <p className="opacity-70 text-base max-w-[540px] mx-auto">
          Birkaç kısa soruyla kullanım profilinize ve adresinize göre en uygun Superbox paketini önerelim.
        </p>

        <div className="bg-white/5 p-6 sm:p-9 rounded-2xl border border-white/10 mt-8 backdrop-blur-md text-left">
          <div className="flex items-center mb-7 gap-1.5">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="flex items-center gap-1.5 flex-1 last:flex-none">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  n < step && step <= 5 ? 'bg-success border border-success text-white'
                  : n === step ? 'bg-accent-500 border border-accent-500 text-tc-navy shadow-[0_0_20px_rgba(255,201,0,0.45)]'
                  : 'bg-white/10 border border-white/20 text-white/50'
                }`}>{n}</div>
                {n < 5 && <div className={`flex-1 h-px transition ${n < step ? 'bg-success' : 'bg-white/15'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Konumunuz</h3>
              <p className="text-white/60 text-sm mb-5">Hangi şehirde Superbox kullanmak istiyorsunuz?</p>
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">İl</label>
              <select value={il} onChange={e => { setIl(e.target.value); setIlce(''); }}
                className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold focus:outline-none focus:border-accent-500 transition mb-3">
                <option value="" className="bg-tc-navy">İl seçin</option>
                {ALL_CITIES.map(c => <option key={c.plate} value={c.name} className="bg-tc-navy">{c.name}</option>)}
              </select>
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 mt-1.5">İlçe</label>
              <select value={ilce} onChange={e => setIlce(e.target.value)} disabled={!il}
                className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold focus:outline-none focus:border-accent-500 transition disabled:opacity-50">
                <option value="" className="bg-tc-navy">{il ? 'İlçe seçin' : 'Önce il seçin'}</option>
                {districts.map(d => <option key={d} value={d} className="bg-tc-navy">{d}</option>)}
              </select>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Kullanım profili</h3>
              <p className="text-white/60 text-sm mb-5">Doğru kotayı önerelim.</p>
              {(['hafif', 'orta', 'yogun'] as Usage[]).map(u => (
                <button key={u} onClick={() => setUsage(u)}
                  className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${usage === u ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                  <div className="font-bold text-[15px] mb-0.5">{u === 'hafif' ? 'Hafif kullanım' : u === 'orta' ? 'Orta kullanım' : 'Yoğun kullanım'}</div>
                  <div className="text-xs text-white/60 font-medium">
                    {u === 'hafif' && '1-3 kişi · sosyal medya, video · 500 GB / 150 GB yeterli'}
                    {u === 'orta' && '3-5 kişi · 4K, oyun, video konferans · 1 TB / 350 GB'}
                    {u === 'yogun' && 'Kalabalık ev / ev ofis · 2 TB / 1 TB'}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Adresinizde 5G var mı?</h3>
              <p className="text-white/60 text-sm mb-5">5G kapsamasına göre 5G Hazır veya 4.5G paketi önerilir.</p>
              <button onClick={() => setCoverage('var')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${coverage === 'var' ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">Evet, 5G var</div>
                <div className="text-xs text-white/60 font-medium">Superbox 5G Hazır paketleri — 5G hızında</div>
              </button>
              <button onClick={() => setCoverage('yok')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${coverage === 'yok' ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">Hayır, 5G yok</div>
                <div className="text-xs text-white/60 font-medium">Superbox 4.5G paketleri — ekonomik seçenekler</div>
              </button>
              <button onClick={() => setCoverage('bilmiyorum')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${coverage === 'bilmiyorum' ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">Bilmiyorum</div>
                <div className="text-xs text-white/60 font-medium">5G Hazır önerilir; kapsama telefonda teyit edilir</div>
              </button>
            </div>
          )}

          {step === 4 && recommendedPackage && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Sizin için seçilen paket</h3>
              <p className="text-white/60 text-sm mb-5">{il} / {ilce} · {network} şebekesi</p>
              {[recommendedPackage].map(p => {
                const isSelected = pkg?.id === p.id;
                return (
                  <div key={p.id} onClick={() => setPkg(p)}
                    className={`rounded-xl border p-4 mb-2.5 cursor-pointer transition min-h-[60px] ${isSelected ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <div className="text-2xl font-extrabold tracking-tight">{p.quota}<span className="text-sm text-accent-500 font-bold ml-2">{p.network}</span></div>
                      <div className="text-xs text-white/60 font-semibold">{p.name}</div>
                    </div>
                    <div className="flex gap-4 bg-black/25 px-3 py-2 rounded-xl mb-2">
                      <div><div className="text-[10px] text-white/50 font-semibold">Aylık ücret</div><div className="text-[15px] font-bold">{fmt(p.priceMonthly)} TL/ay</div></div>
                      <div><div className="text-[10px] text-white/50 font-semibold">Taahhüt</div><div className="text-[15px] font-bold">{p.commitmentMonths} Ay</div></div>
                    </div>
                    <div className="text-[11px] text-prime-100/95 flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" strokeWidth={3} />
                      12 ay sabit fiyat · aşım derdi yok · tek priz yeterli
                    </div>
                  </div>
                );
              })}
              {coverage === 'bilmiyorum' && (
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Adresinizde 5G çıkmazsa çağrı merkezimiz 4.5G muadili paketi önerecektir.
                </p>
              )}
            </div>
          )}

          {step === 5 && pkg && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Bilgileriniz</h3>
              <p className="text-white/60 text-sm mb-5">15 dakika içinde sizi arıyoruz.</p>
              <div className="bg-accent-500/10 border border-accent-500/30 p-3.5 rounded-xl mb-3.5 space-y-1">
                <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Bölge</span><span className="font-bold">{il} / {ilce}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Paket</span><span className="font-bold">{pkg.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Kota</span><span className="font-bold">{pkg.quota}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Aylık ücret</span><span className="font-bold">{fmt(pkg.priceMonthly)} TL/ay · {pkg.commitmentMonths} ay taahhüt</span></div>
              </div>
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Ad Soyad</label>
              <input
                type="text"
                value={ad}
                onChange={e => setAd(e.target.value)}
                placeholder="Adınız Soyadınız"
                autoComplete="name"
                autoCapitalize="words"
                className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold mb-3 focus:outline-none focus:border-accent-500 transition placeholder-white/40"
              />
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Telefon</label>
              <input
                type="tel"
                inputMode="tel"
                value={tel}
                onChange={e => setTel(formatPhone(e.target.value))}
                placeholder="5XX XXX XX XX"
                autoComplete="tel"
                className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold mb-3 focus:outline-none focus:border-accent-500 transition placeholder-white/40"
              />
              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Mevcut Turkcell hattınız?</label>
              <div className="flex gap-2.5 mb-3">
                {(['yok', 'var'] as LineStatus[]).map(l => (
                  <button key={l} onClick={() => setLine(l)}
                    className={`flex-1 rounded-xl border p-3 text-center text-sm font-bold transition min-h-[48px] ${line === l ? 'border-2 border-accent-500 bg-accent-500/15 px-[11px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                    {l === 'yok' ? 'Yok' : 'Var'}
                  </button>
                ))}
              </div>
              <label className="flex gap-2.5 items-start mt-3.5 mb-1 text-white/70 text-xs leading-relaxed cursor-pointer">
                <input type="checkbox" checked={kvkk} onChange={e => setKvkk(e.target.checked)} className="mt-0.5 flex-shrink-0 accent-accent-500 w-4 h-4" />
                <span><a href="/kvkk" target="_blank" className="text-accent-500 font-semibold">KVKK aydınlatma metnini</a> okudum, bilgilerimin Turkcell Superbox abonelik başvurum için işlenmesine izin veriyorum.</span>
              </label>

              {/* Hata mesajı — silent failure düzeltmesi */}
              {error && (
                <div className="bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-semibold p-3 rounded-xl mt-3 flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-success/20 mx-auto mb-5 flex items-center justify-center">
                <Check className="w-8 h-8 text-success" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Başvurunuz alındı</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-[400px] mx-auto mb-6">
                15 dakika içinde yetkili satış noktamız sizi arayacak.
              </p>
              <button onClick={reset} className="bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 px-6 py-2.5 rounded-full font-bold transition min-h-[44px]">
                Yeni başvuru
              </button>
            </div>
          )}

          {step !== 6 && (
            <div className="flex gap-2.5 mt-5">
              <button onClick={() => step > 1 && setStep((step - 1) as Step)}
                className={`flex-1 min-h-[48px] py-3.5 px-5 rounded-full font-bold text-[15px] border border-white/15 bg-white/5 hover:bg-white/10 active:bg-white/15 transition ${step === 1 ? 'invisible' : ''}`}>
                ← Geri
              </button>
              <button onClick={handleNext} disabled={!canProceed() || submitting}
                className={`flex-1 min-h-[48px] py-3.5 px-5 rounded-full font-bold text-[15px] border transition flex items-center justify-center gap-2 ${canProceed() && !submitting ? 'bg-accent-500 border-accent-500 text-tc-navy hover:bg-accent-400 active:bg-accent-600' : 'bg-accent-500/30 border-accent-500/30 text-white/60 cursor-not-allowed'}`}>
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor</> : step === 5 ? 'Başvuruyu gönder' : <>Devam Et <ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
