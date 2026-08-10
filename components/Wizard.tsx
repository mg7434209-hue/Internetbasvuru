'use client';

import { useState, useMemo } from 'react';
import { Check, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import {
  recommendPackage,
  SERVICE_REGION,
  type Package,
  type Network,
} from '@/data/packages';
import TurkcellLogo from './TurkcellLogo';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Usage = 'hafif' | 'orta' | 'yogun';
type UsePlace = 'sabit' | 'tasinir';
type LineStatus = 'yok' | 'var';
type RegionAnswer = 'icinde' | 'disinda';
type CallMode = 'hemen' | 'belirli';
type CallSlot = '' | 'sabah' | 'oglen' | 'ogleden_sonra' | 'aksam';
type CallTimeBackend = 'hemen' | 'sabah' | 'oglen' | 'ogleden_sonra' | 'aksam';

const CALL_TIME_NATURAL: Record<CallTimeBackend, string> = {
  hemen: 'en kısa sürede',
  sabah: 'sabah saatlerinde',
  oglen: 'öğlen saatlerinde',
  ogleden_sonra: 'öğleden sonra',
  aksam: 'akşam saatlerinde',
};

export default function Wizard() {
  const [step, setStep] = useState<Step>(1);
  const [region, setRegion] = useState<RegionAnswer | ''>('');
  const [usage, setUsage] = useState<Usage | ''>('');
  const [usePlace, setUsePlace] = useState<UsePlace | ''>('');
  const [pkg, setPkg] = useState<Package | null>(null);
  const [ad, setAd] = useState('');
  const [tel, setTel] = useState('');
  const [line, setLine] = useState<LineStatus | ''>('');
  const [kvkk, setKvkk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ----- 6. adım (opsiyonel ek bilgiler) state'leri — LeadModal 2. adımıyla aynı akış -----
  const [token, setToken] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [tcNumber, setTcNumber] = useState('');
  const [birthDateInput, setBirthDateInput] = useState('');
  const [birthDateIso, setBirthDateIso] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [callMode, setCallMode] = useState<CallMode>('hemen');
  const [callSlot, setCallSlot] = useState<CallSlot>('');

  const finalCallTime: CallTimeBackend =
    callMode === 'belirli' && callSlot ? callSlot : 'hemen';

  // Sabit evde kullanım = 5G Hazır · Taşınabilir kullanım = 4.5G
  const network: Network = usePlace === 'tasinir' ? '4.5G' : '5G';

  const recommendedPackage = useMemo(() => {
    if (!usage || !usePlace) return null;
    return recommendPackage(usage, network);
  }, [usage, usePlace, network]);

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

  const canProceed = () => {
    if (step === 1) return region === 'icinde';
    if (step === 2) return !!usage;
    if (step === 3) return !!usePlace;
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
          il: SERVICE_REGION.il,
          ilce: SERVICE_REGION.ilce,
          kvkk_consent: kvkk,
          package_id: pkg.id,
          package_name: `${pkg.name} (${pkg.quota})`,
          message: `Wizard başvurusu - ${usage} kullanım, kullanım şekli: ${usePlace === 'tasinir' ? 'taşınabilir (4.5G)' : 'sabit evde (5G)'}, mevcut hat: ${line}`,
          source: 'wizard',
          source_path: 'wizard',
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        success?: boolean;
        token?: string;
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

      // Başarılı: token varsa opsiyonel 2. adım (ek bilgiler), yoksa teşekkür
      setSubmitting(false);
      if (data.token) {
        setToken(data.token);
        setStep(6);
      } else {
        setStep(7);
      }
    } catch (err) {
      console.error('Wizard lead submit error:', err);
      setError('Bağlantı hatası. İnternet bağlantınızı kontrol edip tekrar deneyin.');
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1); setRegion(''); setUsage(''); setUsePlace('');
    setPkg(null); setAd(''); setTel(''); setLine(''); setKvkk(false);
    setError(null); setToken(null); setAddress(''); setTcNumber('');
    setBirthDateInput(''); setBirthDateIso(''); setBirthDateError('');
    setCallMode('hemen'); setCallSlot('');
  }

  function handleTcInput(value: string) {
    setTcNumber(value.replace(/\D/g, '').slice(0, 11));
  }

  function handleBirthDateChange(value: string) {
    const cleaned = value.replace(/\D/g, '').slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    }
    setBirthDateInput(formatted);

    if (cleaned.length < 8) {
      setBirthDateIso('');
      setBirthDateError('');
      return;
    }
    const day = parseInt(cleaned.slice(0, 2), 10);
    const month = parseInt(cleaned.slice(2, 4), 10);
    const year = parseInt(cleaned.slice(4, 8), 10);
    const currentYear = new Date().getFullYear();
    if (month < 1 || month > 12) { setBirthDateIso(''); setBirthDateError('Geçersiz ay (01-12 arası)'); return; }
    if (day < 1 || day > 31) { setBirthDateIso(''); setBirthDateError('Geçersiz gün (01-31 arası)'); return; }
    if (year < currentYear - 100 || year > currentYear - 18) { setBirthDateIso(''); setBirthDateError('Yaş 18 ile 100 arasında olmalı'); return; }
    const testDate = new Date(year, month - 1, day);
    if (testDate.getFullYear() !== year || testDate.getMonth() !== month - 1 || testDate.getDate() !== day) {
      setBirthDateIso(''); setBirthDateError('Bu tarih takvimde yok'); return;
    }
    setBirthDateIso(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    setBirthDateError('');
  }

  // 6. adım: opsiyonel ek bilgileri /api/lead/extend'e gönder (LeadModal ile aynı uç)
  async function handleExtendSubmit() {
    if (submitting || !token) return;
    if (tcNumber && (tcNumber.length !== 11 || tcNumber[0] === '0')) {
      setError('TC kimlik numarası 11 haneli olmalı ve 0 ile başlamamalıdır.');
      return;
    }
    if (birthDateInput && !birthDateIso) {
      setError('Doğum tarihini geçerli formatta girin (örn. 15.06.1985).');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await fetch('/api/lead/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          address: address.trim() || undefined,
          tc_number: tcNumber || undefined,
          birth_date: birthDateIso || undefined,
          preferred_call_time: finalCallTime,
        }),
      });
    } catch (err) {
      console.error('Wizard extend error:', err);
    }
    setSubmitting(false);
    setStep(7);
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
        <div className="flex justify-center mb-5">
          <TurkcellLogo variant="mini" />
        </div>
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
          {step <= 5 && (
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
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Hizmet Bölgesi</h3>
              <p className="text-white/60 text-sm mb-5">
                Yetkili satış noktamız yalnızca kendi bölgesinden başvuru alabilir.
              </p>

              {/* Kilitli bölge kartı */}
              <div className="flex items-center justify-between rounded-xl border border-accent-500/30 bg-accent-500/10 p-4 mb-4">
                <div>
                  <div className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">İl / İlçe</div>
                  <div className="font-bold text-[17px] text-white">📍 {SERVICE_REGION.label}</div>
                </div>
                <span className="text-[10px] font-extrabold bg-accent-500 text-tc-navy px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Hizmet Bölgesi
                </span>
              </div>

              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-2">
                Kurulum adresiniz bu bölgede mi?
              </label>
              <button onClick={() => setRegion('icinde')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${region === 'icinde' ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">✓ Evet, adresim Manavgat / Antalya bölgesinde</div>
                <div className="text-xs text-white/60 font-medium">Başvuruya devam edebilirsiniz</div>
              </button>
              <button onClick={() => setRegion('disinda')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${region === 'disinda' ? 'border-2 border-white/40 bg-white/10 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">✗ Hayır, başka bir bölgedeyim</div>
                <div className="text-xs text-white/60 font-medium">Bölge dışına satış yapamıyoruz</div>
              </button>

              {region === 'disinda' && (
                <div className="bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-semibold p-3.5 rounded-xl mt-3 leading-relaxed">
                  Üzgünüz — yetkili satış noktası kuralları gereği yalnızca{' '}
                  <strong>{SERVICE_REGION.label}</strong> bölgesindeki adreslere başvuru alabiliyoruz.
                  Bölge dışı başvurular için turkcell.com.tr üzerinden işlem yapabilirsiniz.
                </div>
              )}
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
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">İnterneti nasıl kullanacaksınız?</h3>
              <p className="text-white/60 text-sm mb-5">Sabit evde kullanım için 5G Hazır, yanınızda taşımak için 4.5G önerilir.</p>
              <button onClick={() => setUsePlace('sabit')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${usePlace === 'sabit' ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">🏠 Evde, sabit adreste</div>
                <div className="text-xs text-white/60 font-medium">Superbox 5G Hazır — evinize tanımlı sabit internet, 5G hızında</div>
              </button>
              <button onClick={() => setUsePlace('tasinir')}
                className={`block w-full text-left rounded-xl border p-4 mb-2.5 transition min-h-[60px] ${usePlace === 'tasinir' ? 'border-2 border-accent-500 bg-accent-500/15 px-[15px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08] active:bg-white/[.12]'}`}>
                <div className="font-bold text-[15px] mb-0.5">🧳 Evde ve yanımda, taşınabilir</div>
                <div className="text-xs text-white/60 font-medium">Superbox 4.5G — cihazı yanınıza alın, dilediğiniz adreste kullanın</div>
              </button>
            </div>
          )}

          {step === 4 && recommendedPackage && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Sizin için seçilen paket</h3>
              <p className="text-white/60 text-sm mb-5">{SERVICE_REGION.label} · {network === '5G' ? 'Sabit Evde İnternet (5G)' : 'Taşınabilir İnternet (4.5G)'}</p>
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
              {usePlace === 'sabit' && (
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Adresinizdeki 5G kapsaması telefon görüşmesinde teyit edilir; kapsama yoksa taşınabilir 4.5G seçeneği önerilir.
                </p>
              )}
            </div>
          )}

          {step === 5 && pkg && (
            <div className="animate-fade-in">
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Bilgileriniz</h3>
              <p className="text-white/60 text-sm mb-5">15 dakika içinde sizi arıyoruz.</p>
              <div className="bg-accent-500/10 border border-accent-500/30 p-3.5 rounded-xl mb-3.5 space-y-1">
                <div className="flex justify-between text-sm"><span className="text-white/60 font-semibold">Bölge</span><span className="font-bold">{SERVICE_REGION.label}</span></div>
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
            <div className="animate-fade-in">
              <div className="bg-success/15 border border-success/40 text-prime-100 text-xs font-semibold p-3 rounded-xl mb-4 flex gap-2 items-start">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={3} />
                <span>Başvurunuz kayıt altına alındı. Aşağıdaki bilgiler süreci hızlandırır — opsiyoneldir.</span>
              </div>
              <h3 className="text-[1.4rem] font-bold mb-1.5 -tracking-[0.5px] text-white">Süreci hızlandıralım</h3>
              <p className="text-white/60 text-sm mb-5">2. adım — dilerseniz atlayabilirsiniz.</p>

              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Açık Adres</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Mahalle, sokak, bina no, daire no"
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold mb-1 focus:outline-none focus:border-accent-500 transition placeholder-white/40 resize-none"
              />
              <p className="text-[11px] text-white/40 mb-3">Turkcell şebeke kapsama sorgusu için kullanılır.</p>

              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">TC Kimlik No</label>
              <input
                type="text"
                inputMode="numeric"
                value={tcNumber}
                onChange={e => handleTcInput(e.target.value)}
                placeholder="11 haneli"
                maxLength={11}
                autoComplete="off"
                className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold mb-3 focus:outline-none focus:border-accent-500 transition placeholder-white/40"
              />

              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Doğum Tarihi</label>
              <input
                type="text"
                inputMode="numeric"
                value={birthDateInput}
                onChange={e => handleBirthDateChange(e.target.value)}
                placeholder="GG.AA.YYYY"
                maxLength={10}
                autoComplete="bday"
                className={`w-full min-h-[48px] px-4 py-3.5 rounded-xl border bg-white/[.07] text-white text-[15px] font-semibold mb-1 focus:outline-none transition placeholder-white/40 ${birthDateError ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-accent-500'}`}
              />
              {birthDateError ? (
                <p className="text-[11px] text-red-300 mb-3 font-semibold">{birthDateError}</p>
              ) : (
                <p className="text-[11px] text-white/40 mb-3">Örnek: 15.06.1985 — sadece rakamla yazın</p>
              )}

              <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Sizi ne zaman arayalım?</label>
              <div className="flex flex-col gap-1.5 mb-3">
                <button type="button" onClick={() => { setCallMode('hemen'); setCallSlot(''); }}
                  className={`block w-full text-left rounded-xl border p-3.5 transition min-h-[48px] text-sm font-semibold ${callMode === 'hemen' ? 'border-2 border-accent-500 bg-accent-500/15 px-[13px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                  En kısa zamanda arayın
                </button>
                <button type="button" onClick={() => setCallMode('belirli')}
                  className={`block w-full text-left rounded-xl border p-3.5 transition min-h-[48px] text-sm font-semibold ${callMode === 'belirli' ? 'border-2 border-accent-500 bg-accent-500/15 px-[13px]' : 'border-white/15 bg-white/5 hover:bg-white/[.08]'}`}>
                  Belirli bir saatte
                </button>
                {callMode === 'belirli' && (
                  <select value={callSlot} onChange={e => setCallSlot(e.target.value as CallSlot)}
                    className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-white/15 bg-white/[.07] text-white text-[15px] font-semibold focus:outline-none focus:border-accent-500 transition">
                    <option value="" className="bg-tc-navy">Müsait saatinizi seçin...</option>
                    <option value="sabah" className="bg-tc-navy">Sabah (09:00 - 12:00)</option>
                    <option value="oglen" className="bg-tc-navy">Öğlen (12:00 - 15:00)</option>
                    <option value="ogleden_sonra" className="bg-tc-navy">Öğleden sonra (15:00 - 18:00)</option>
                    <option value="aksam" className="bg-tc-navy">Akşam (18:00 - 21:00)</option>
                  </select>
                )}
              </div>

              {error && (
                <div className="bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-semibold p-3 rounded-xl mb-3 flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-2.5 mt-4">
                <button onClick={() => setStep(7)} disabled={submitting}
                  className="flex-1 min-h-[48px] py-3.5 px-5 rounded-full font-bold text-[15px] border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-50">
                  Daha Sonra
                </button>
                <button onClick={handleExtendSubmit} disabled={submitting}
                  className={`flex-[1.4] min-h-[48px] py-3.5 px-5 rounded-full font-bold text-[15px] border transition flex items-center justify-center gap-2 ${!submitting ? 'bg-accent-500 border-accent-500 text-tc-navy hover:bg-accent-400' : 'bg-accent-500/30 border-accent-500/30 text-white/60 cursor-not-allowed'}`}>
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor</> : 'Başvuruyu Tamamla'}
                </button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-success/20 mx-auto mb-5 flex items-center justify-center">
                <Check className="w-8 h-8 text-success" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Başvurunuz alındı</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-[400px] mx-auto mb-6">
                {finalCallTime === 'hemen'
                  ? '15 dakika içinde yetkili satış noktamız sizi arayacak.'
                  : `Sizi ${CALL_TIME_NATURAL[finalCallTime]} arıyoruz.`}
              </p>
              <button onClick={reset} className="bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 px-6 py-2.5 rounded-full font-bold transition min-h-[44px]">
                Yeni başvuru
              </button>
            </div>
          )}

          {step <= 5 && (
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
