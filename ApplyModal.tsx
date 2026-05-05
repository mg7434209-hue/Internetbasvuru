'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Check, Sparkles, Loader2 } from 'lucide-react';
import type { Package } from '@/data/packages';
import {
  calcPackagePrices,
  TV_EXTRA_FEE,
  MODEM_RENTAL_FEE,
  getBolgeselIndirimMesaji,
} from '@/data/packages';
import {
  ALL_CITIES,
  getDistricts,
  getCampaignZone,
  type CampaignZone,
} from '@/data/turkey';
import { submitLead, formatPhone, cleanPhone } from '@/lib/api';

interface ApplyModalProps {
  pkg: Package | null;
  initialOptions?: { tv: boolean; modem: boolean };
  onClose: () => void;
}

const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));

export default function ApplyModal({ pkg, initialOptions, onClose }: ApplyModalProps) {
  // Form state
  const [tv, setTv] = useState(initialOptions?.tv ?? false);
  const [modem, setModem] = useState(initialOptions?.modem ?? false);
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [name, setName] = useState('');
  const [phoneFmt, setPhoneFmt] = useState('');
  const [existingLine, setExistingLine] = useState<'var' | 'yok' | ''>('');
  const [kvkk, setKvkk] = useState(false);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Bölge indirim state — il+ilçe seçilince sessizce hesaplanır
  const bolgeIndirimi = useMemo(() => {
    if (!il || !ilce) return null;
    const zone: CampaignZone = getCampaignZone(il, ilce);
    if (zone === 'standart') return null;
    return {
      zone,
      message: getBolgeselIndirimMesaji(zone, ilce),
    };
  }, [il, ilce]);

  // İlçe listesi
  const districts = useMemo(() => (il ? getDistricts(il) : []), [il]);

  // Modal açıldığında initialOptions değişirse state güncelle
  useEffect(() => {
    if (initialOptions) {
      setTv(initialOptions.tv);
      setModem(initialOptions.modem);
    }
  }, [initialOptions]);

  // İl değişince ilçeyi resetle
  useEffect(() => {
    setIlce('');
  }, [il]);

  // Modal kapama (escape tuşu)
  useEffect(() => {
    if (!pkg) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pkg, onClose]);

  // Modal scroll lock
  useEffect(() => {
    if (pkg) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [pkg]);

  if (!pkg) return null;

  const prices = calcPackagePrices(pkg, { tv, modem });
  const phoneClean = cleanPhone(phoneFmt);
  const formValid =
    name.trim().length >= 3 &&
    phoneClean.length === 10 &&
    il &&
    ilce &&
    existingLine &&
    kvkk;

  const handleSubmit = async () => {
    if (!formValid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    const result = await submitLead({
      full_name: name.trim(),
      phone: phoneClean,
      il,
      ilce,
      selected_speed: pkg.speedMbps,
      selected_campaign: pkg.id,
      campaign_name: pkg.campaignName,
      tv_addon: tv,
      modem_addon: modem,
      existing_line: existingLine as 'var' | 'yok',
      kvkk_consent: 1,
      source_path: 'modal',
      bolge_indirimi_active: !!bolgeIndirimi,
      bolge_indirimi_zone: bolgeIndirimi?.zone || 'standart',
    });

    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setErrorMsg(result.message || 'Başvuru gönderilemedi, lütfen tekrar deneyin.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-modal-in">
        {/* SUCCESS GÖRÜNÜMÜ */}
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success-500" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-extrabold text-ink-800 mb-2">Başvurunuz alındı!</h3>
            <p className="text-ink-500 text-sm mb-6 leading-relaxed">
              15 dakika içinde <strong className="text-ink-800">0534 977 70 00</strong> numarasından
              sizi arıyoruz. Adresinizde altyapı kontrolü yapıp en uygun teklifi sunarız.
              {bolgeIndirimi && (
                <>
                  <br />
                  <span className="text-success-600 font-semibold">
                    Bölgenize özel kampanyamızı görüşmede paylaşacağız.
                  </span>
                </>
              )}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              Tamam
            </button>
          </div>
        ) : (
          <div className="p-7">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-lg font-extrabold text-ink-800">Bu paketle başvur</h3>
              <button
                type="button"
                onClick={onClose}
                className="bg-ink-50 hover:bg-ink-100 text-ink-400 hover:text-ink-700 p-1.5 rounded-full transition-colors"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Paket özeti */}
            <div className="bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-200/50 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-2xl font-extrabold text-ink-800 tracking-tight">
                  {pkg.speedMbps} <span className="text-sm font-bold text-brand-500">Mbps</span>
                </span>
                <span className="text-xs font-semibold text-ink-400">
                  {pkg.campaignName || 'Fiber Gücü Yaşa'}
                </span>
              </div>

              {(tv || modem) && (
                <div className="text-xs text-ink-700 mb-2 space-y-0.5">
                  {tv && (
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3 h-3 text-success-500" strokeWidth={3} />
                      <span>Tivibu TV (+{fmt(TV_EXTRA_FEE)}₺/ay)</span>
                    </div>
                  )}
                  {modem && (
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3 h-3 text-success-500" strokeWidth={3} />
                      <span>Modem kirala (+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-white/70 rounded-lg px-3.5 py-2.5 mt-2.5">
                <div className="flex justify-between items-baseline py-1">
                  <span className="text-xs font-semibold text-ink-400">İlk 9 ay (Hoş Geldin)</span>
                  <span className="text-base font-extrabold text-ink-800 tracking-tight">
                    {fmt(prices.firstPeriod)}₺/ay
                  </span>
                </div>
                <div className="flex justify-between items-baseline py-1 pt-1.5 border-t border-dashed border-ink-200">
                  <span className="text-xs font-semibold text-ink-400">10-18. ay</span>
                  <span className="text-sm font-bold text-ink-400">
                    {fmt(prices.secondPeriod)}₺/ay
                  </span>
                </div>
              </div>
            </div>

            {/* Ek seçenekler */}
            <div className="bg-ink-50 rounded-xl p-3.5 mb-4">
              <div className="text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-2.5">
                Ek seçenekler
              </div>
              <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tv}
                  onChange={(e) => setTv(e.target.checked)}
                  className="w-4 h-4 accent-brand-500 cursor-pointer"
                />
                <span className="text-sm font-semibold text-ink-700">
                  Tivibu TV ekle <span className="text-ink-400 font-medium">(+{fmt(TV_EXTRA_FEE)}₺/ay)</span>
                </span>
              </label>
              <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modem}
                  onChange={(e) => setModem(e.target.checked)}
                  className="w-4 h-4 accent-brand-500 cursor-pointer"
                />
                <span className="text-sm font-semibold text-ink-700">
                  Modem kirala <span className="text-ink-400 font-medium">(+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span>
                </span>
              </label>
            </div>

            {/* İl + İlçe */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="block text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-1.5">
                  İl
                </label>
                <select
                  value={il}
                  onChange={(e) => setIl(e.target.value)}
                  className="w-full px-3.5 py-3 border-2 border-ink-100 rounded-xl text-sm font-semibold text-ink-700 bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition-all"
                >
                  <option value="">İl seçin</option>
                  {ALL_CITIES.map((c) => (
                    <option key={c.plate} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-1.5">
                  İlçe
                </label>
                <select
                  value={ilce}
                  onChange={(e) => setIlce(e.target.value)}
                  disabled={!il}
                  className="w-full px-3.5 py-3 border-2 border-ink-100 rounded-xl text-sm font-semibold text-ink-700 bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition-all disabled:bg-ink-50 disabled:text-ink-300"
                >
                  <option value="">{il ? 'İlçe seçin' : 'Önce il seçin'}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* BÖLGESEL İNDİRİM SÜRPRİZ MESAJI — il+ilçe seçilince animasyonlu görünür */}
            {bolgeIndirimi && bolgeIndirimi.message && (
              <div className="bg-gradient-to-r from-success-50 to-emerald-50 border-2 border-success-500/30 rounded-xl p-3.5 mb-3 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <div className="bg-success-500 text-white rounded-full p-1.5 flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-success-600 text-sm mb-0.5">
                      🎉 Bölgenize özel indirim tanımlı!
                    </div>
                    <p className="text-xs text-ink-700 leading-relaxed font-medium">
                      {bolgeIndirimi.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ad Soyad */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-1.5">
                Ad Soyad
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                autoComplete="name"
                className="w-full px-3.5 py-3 border-2 border-ink-100 rounded-xl text-sm font-semibold text-ink-700 placeholder:text-ink-300 placeholder:font-medium focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition-all"
              />
            </div>

            {/* Telefon */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                value={phoneFmt}
                onChange={(e) => setPhoneFmt(formatPhone(e.target.value))}
                placeholder="5XX XXX XX XX"
                autoComplete="tel"
                inputMode="numeric"
                className="w-full px-3.5 py-3 border-2 border-ink-100 rounded-xl text-sm font-semibold text-ink-700 placeholder:text-ink-300 placeholder:font-medium focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition-all"
              />
            </div>

            {/* Mevcut TT hattı */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-ink-400 uppercase tracking-wider mb-1.5">
                Mevcut TT hattınız?
              </label>
              <div className="flex gap-2">
                {(['yok', 'var'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setExistingLine(opt)}
                    className={`
                      flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                      ${existingLine === opt
                        ? 'bg-brand-50 border-2 border-brand-500 text-brand-700'
                        : 'bg-white border-2 border-ink-100 text-ink-700 hover:border-ink-300'
                      }
                    `}
                  >
                    {opt === 'yok' ? 'Yok' : 'Var'}
                  </button>
                ))}
              </div>
            </div>

            {/* KVKK */}
            <label className="flex items-start gap-2.5 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={kvkk}
                onChange={(e) => setKvkk(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-brand-500 flex-shrink-0 cursor-pointer"
              />
              <span className="text-xs text-ink-500 leading-relaxed">
                <a href="/kvkk" className="text-brand-500 font-semibold hover:underline">
                  KVKK aydınlatma metnini
                </a>{' '}
                okudum, izin veriyorum.
              </span>
            </label>

            {/* Hata mesajı */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl px-3 py-2.5 mb-3">
                {errorMsg}
              </div>
            )}

            {/* Aksiyon butonları */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 border-2 border-ink-100 hover:bg-ink-50 text-ink-700 font-bold text-sm rounded-xl transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formValid || submitting}
                className={`
                  flex-[1.5] py-3.5 rounded-xl font-bold text-sm transition-all
                  ${formValid && !submitting
                    ? 'bg-brand-500 hover:bg-brand-600 text-white hover:-translate-y-0.5 hover:shadow-lg'
                    : 'bg-ink-200 text-ink-400 cursor-not-allowed'
                  }
                `}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gönderiliyor...
                  </span>
                ) : (
                  'Başvuruyu gönder'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
