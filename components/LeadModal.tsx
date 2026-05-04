'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { ALL_CITIES, getDistricts, getCampaignZone } from '@/data/turkey';
import { calcPackagePrices, TV_EXTRA_FEE, MODEM_RENTAL_FEE, type Package } from '@/data/packages';

interface LeadModalProps {
  pkg: Package | null;
  initialOptions: { tv: boolean; modem: boolean };
  onClose: () => void;
}

export default function LeadModal({ pkg, initialOptions, onClose }: LeadModalProps) {
  const [tv, setTv] = useState(initialOptions.tv);
  const [modem, setModem] = useState(initialOptions.modem);
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [ad, setAd] = useState('');
  const [tel, setTel] = useState('');
  const [line, setLine] = useState<'yok' | 'var' | ''>('');
  const [kvkk, setKvkk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const districts = useMemo(() => (il ? getDistricts(il) : []), [il]);
  const zone = useMemo(() => getCampaignZone(il, ilce), [il, ilce]);

  useEffect(() => {
    setTv(initialOptions.tv);
    setModem(initialOptions.modem);
  }, [initialOptions]);

  useEffect(() => {
    if (pkg) {
      const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [pkg, onClose]);

  if (!pkg) return null;

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));
  const prices = calcPackagePrices(pkg, { tv, modem });

  const canSubmit = !!il && !!ilce && ad.trim().length >= 3 && tel.replace(/\D/g, '').length >= 10 && !!line && kvkk;

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

  async function handleSubmit() {
    if (!canSubmit || !pkg) return;
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
          package_name: `${pkg.speedMbps} Mbps${tv ? ' + TV' : ''}${modem ? ' + Modem' : ''}`,
          message: `Modal başvuru. Mevcut TT hattı: ${line}. Bölge: ${zone}.`,
          source: 'package-modal',
        }),
      });
    } catch {}
    setSubmitting(false);
    setDone(true);
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[2000] bg-ink-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-[480px] w-full p-7 max-h-[90vh] overflow-y-auto shadow-modal animate-modal-in">
        <div className="flex justify-between items-start mb-5">
          <h3 className="text-xl font-extrabold text-ink-900">{done ? 'Başvurunuz Alındı' : 'Bu paketle başvur'}</h3>
          <button onClick={onClose} className="bg-ink-50 hover:bg-ink-100 text-ink-500 hover:text-ink-900 p-1.5 rounded-full transition">
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {done ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-prime-100 mx-auto mb-4 flex items-center justify-center">
              <Check className="w-8 h-8 text-success" strokeWidth={3} />
            </div>
            <p className="text-ink-700 mb-5 leading-relaxed">15 dakika içinde sizi arıyoruz.</p>
            <button onClick={onClose} className="btn-primary w-full">Tamam</button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-500/20 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-2xl font-extrabold text-ink-900 tracking-tight">{pkg.speedMbps} <span className="text-sm text-brand-500 font-bold">Mbps</span></span>
                <span className="text-xs text-ink-500 font-semibold">{pkg.campaignName || 'Fiber Gücü Yaşa'}</span>
              </div>
              {(tv || modem) && (
                <div className="text-xs text-ink-900 mb-2 leading-relaxed space-y-1">
                  {tv && <div className="flex gap-1.5 items-center font-semibold"><Check className="w-3.5 h-3.5 text-success flex-shrink-0" strokeWidth={3} /><span>Tivibu TV (+{fmt(TV_EXTRA_FEE)}₺/ay)</span></div>}
                  {modem && <div className="flex gap-1.5 items-center font-semibold"><Check className="w-3.5 h-3.5 text-success flex-shrink-0" strokeWidth={3} /><span>Modem kirala (+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span></div>}
                </div>
              )}
              <div className="bg-white/70 rounded-lg px-3.5 py-2.5 mt-2.5">
                <div className="flex justify-between items-baseline py-1.5">
                  <span className="text-xs text-ink-500 font-semibold">İlk 9 ay (Hoş Geldin)</span>
                  <span className="text-base font-extrabold text-ink-900 tracking-tight">{fmt(prices.firstPeriod)}₺/ay</span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-dashed border-ink-100/50">
                  <span className="text-xs text-ink-500 font-semibold">{prices.isFlat ? '24 ay' : '10-18. ay'}</span>
                  <span className="text-sm font-bold text-ink-500">{fmt(prices.secondPeriod)}₺/ay</span>
                </div>
              </div>
            </div>

            <div className="bg-ink-50 rounded-xl p-3.5 mb-4">
              <div className="text-[11px] text-ink-500 font-bold uppercase tracking-wider mb-2.5">Ek seçenekler</div>
              <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input type="checkbox" checked={tv} onChange={e => setTv(e.target.checked)} className="checkbox" />
                <span className="text-sm font-semibold text-ink-900">Tivibu TV ekle <span className="text-ink-500 font-medium">(+{fmt(TV_EXTRA_FEE)}₺/ay)</span></span>
              </label>
              <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input type="checkbox" checked={modem} onChange={e => setModem(e.target.checked)} className="checkbox" />
                <span className="text-sm font-semibold text-ink-900">Modem kirala <span className="text-ink-500 font-medium">(+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span></span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="field-label">İl</label>
                <select value={il} onChange={e => { setIl(e.target.value); setIlce(''); }} className="select">
                  <option value="">İl seçin</option>
                  {ALL_CITIES.map(c => <option key={c.plate} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">İlçe</label>
                <select value={ilce} onChange={e => setIlce(e.target.value)} disabled={!il} className="select">
                  <option value="">{il ? 'İlçe seçin' : 'Önce il seçin'}</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {(zone === 'bolgesel-avantaj' || zone === 'bolgesel-firsat') && (
              <div className="bg-prime-100 border border-success/30 text-success text-xs font-semibold p-2.5 rounded-lg mb-3">
                ✨ {zone === 'bolgesel-avantaj' ? 'Bölgesel Avantaj kampanyası uygulanacak' : 'Bölgesel Fırsat (24 ay tek fiyat) kampanyası uygulanacak'}
              </div>
            )}

            <div className="mb-3">
              <label className="field-label">Ad Soyad</label>
              <input type="text" value={ad} onChange={e => setAd(e.target.value)} placeholder="Mustafa Göksoy" className="input" />
            </div>
            <div className="mb-3">
              <label className="field-label">Telefon</label>
              <input type="tel" value={tel} onChange={e => setTel(formatPhone(e.target.value))} placeholder="5XX XXX XX XX" className="input" />
            </div>

            <div className="mb-3">
              <label className="field-label">Mevcut TT hattınız?</label>
              <div className="flex gap-2">
                {(['yok', 'var'] as const).map(l => (
                  <button key={l} onClick={() => setLine(l)}
                    className={`flex-1 rounded-xl border-[1.5px] p-2.5 text-center text-sm font-bold transition ${line === l ? 'border-2 border-brand-500 bg-brand-50 text-brand-700 p-[9px]' : 'border-ink-100 bg-white text-ink-900 hover:border-ink-400'}`}>
                    {l === 'yok' ? 'Yok' : 'Var'}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex gap-2.5 items-start text-xs text-ink-500 mt-3.5 mb-1 leading-relaxed cursor-pointer">
              <input type="checkbox" checked={kvkk} onChange={e => setKvkk(e.target.checked)} className="checkbox mt-0.5 flex-shrink-0" />
              <span><a href="/kvkk-aydinlatma" target="_blank" className="text-brand-500 font-semibold">KVKK aydınlatma metnini</a> okudum, izin veriyorum.</span>
            </label>

            <div className="flex gap-2 mt-4">
              <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-base border-[1.5px] border-ink-100 bg-white text-ink-900 hover:bg-ink-50 transition">Vazgeç</button>
              <button onClick={handleSubmit} disabled={!canSubmit || submitting}
                className={`flex-1 py-3.5 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 ${canSubmit && !submitting ? 'bg-brand-500 hover:bg-brand-600 text-white' : 'bg-ink-300 text-white cursor-not-allowed'}`}>
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor</> : 'Başvuruyu gönder'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
