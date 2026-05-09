'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Check, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { ALL_CITIES, getDistricts, getCampaignZone } from '@/data/turkey';
import { calcPackagePrices, TV_EXTRA_FEE, MODEM_RENTAL_FEE, type Package } from '@/data/packages';

interface LeadModalProps {
  pkg: Package | null;
  initialOptions: { tv: boolean; modem: boolean };
  onClose: () => void;
}

// Aranma zamanı: kullanıcı önce "hemen" mi "belirli saatte" mi seçer.
// "Belirli saatte" ise hangi dilim sorulur.
type CallMode = 'hemen' | 'belirli';
type CallSlot = '' | 'sabah' | 'oglen' | 'ogleden_sonra' | 'aksam';

// Backend'e gönderilecek tüm olası değerler (preferred_call_time)
type CallTimeBackend = 'hemen' | 'sabah' | 'oglen' | 'ogleden_sonra' | 'aksam';

// Teşekkür sayfası için kısa "doğal" Türkçe ifadeler
const CALL_TIME_NATURAL: Record<CallTimeBackend, string> = {
  hemen: 'en kısa sürede',
  sabah: 'sabah saatlerinde',
  oglen: 'öğlen saatlerinde',
  ogleden_sonra: 'öğleden sonra',
  aksam: 'akşam saatlerinde',
};

export default function LeadModal({ pkg, initialOptions, onClose }: LeadModalProps) {
  // ----- Step 1 state -----
  const [tv, setTv] = useState(initialOptions.tv);
  const [modem, setModem] = useState(initialOptions.modem);
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [ad, setAd] = useState('');
  const [tel, setTel] = useState('');
  const [line, setLine] = useState<'yok' | 'var' | ''>('');
  const [kvkk, setKvkk] = useState(false);

  // ----- Step 2 state -----
  const [address, setAddress] = useState('');
  const [tcNumber, setTcNumber] = useState('');
  // Doğum tarihi: kullanıcı GG.AA.YYYY formatında elle yazar.
  const [birthDateInput, setBirthDateInput] = useState('');
  const [birthDateIso, setBirthDateIso] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  // Aranma zamanı: 2 ana mod, ikincisi seçilirse dropdown açılır
  const [callMode, setCallMode] = useState<CallMode>('hemen');
  const [callSlot, setCallSlot] = useState<CallSlot>('');

  // ----- Flow state -----
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

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

  const canSubmitStep1 =
    !!il &&
    !!ilce &&
    ad.trim().length >= 3 &&
    tel.replace(/\D/g, '').length >= 10 &&
    !!line &&
    kvkk;

  // Backend'e gönderilecek final aranma zamanı değeri
  const finalCallTime: CallTimeBackend =
    callMode === 'belirli' && callSlot ? callSlot : 'hemen';

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

  function handleTcInput(value: string) {
    const v = value.replace(/\D/g, '').slice(0, 11);
    setTcNumber(v);
  }

  // =============================================
  // DOĞUM TARİHİ — MANUEL RAKAM GİRİŞİ
  // =============================================
  // Kullanıcı sayıları yazdıkça otomatik nokta eklenir:
  //   "1"        → "1"
  //   "15"       → "15"
  //   "1506"     → "15.06"
  //   "15061985" → "15.06.1985"
  // 8 rakam girilince validate edilir, geçerliyse backend için
  // ISO formatına (1985-06-15) çevrilir.
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
    const minYear = currentYear - 100;
    const maxYear = currentYear - 18;

    if (month < 1 || month > 12) {
      setBirthDateIso('');
      setBirthDateError('Geçersiz ay (01-12 arası)');
      return;
    }
    if (day < 1 || day > 31) {
      setBirthDateIso('');
      setBirthDateError('Geçersiz gün (01-31 arası)');
      return;
    }
    if (year < minYear || year > maxYear) {
      setBirthDateIso('');
      setBirthDateError(`Yaş 18 ile 100 arasında olmalı`);
      return;
    }
    const testDate = new Date(year, month - 1, day);
    if (
      testDate.getFullYear() !== year ||
      testDate.getMonth() !== month - 1 ||
      testDate.getDate() !== day
    ) {
      setBirthDateIso('');
      setBirthDateError('Bu tarih takvimde yok');
      return;
    }

    const iso = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setBirthDateIso(iso);
    setBirthDateError('');
  }

  // ----- Submit handlers -----
  async function handleStep1Submit() {
    if (!canSubmitStep1 || !pkg || submitting) return;
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
          il,
          ilce,
          kvkk_consent: kvkk,
          package_id: pkg.id,
          package_name: `${pkg.speedMbps} Mbps${tv ? ' + TV' : ''}${modem ? ' + Modem' : ''}`,
          message: `Modal başvuru. Mevcut TT hattı: ${line}. Bölge: ${zone}.`,
          source: 'package-modal',
          source_path: 'modal',
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
        console.error('Lead step 1 failed:', res.status, data);
        setSubmitting(false);
        setError(
          'Başvurunuz alınamadı. Lütfen birkaç dakika sonra tekrar deneyin veya 0534 977 70 00 numarasından arayın.'
        );
        return;
      }

      if (!data.token) {
        setSubmitting(false);
        setStep(3);
        return;
      }

      setToken(data.token);
      setStep(2);
    } catch (err) {
      console.error('Lead step 1 error:', err);
      setError('Bağlantı hatası. İnternet bağlantınızı kontrol edip tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStep2Submit() {
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
      console.error('Lead extend error:', err);
    }
    setSubmitting(false);
    setStep(3);
  }

  function handleSkipStep2() {
    setStep(3);
  }

  // Step 3 mesajı — kullanıcının seçimine göre özelleşir
  const thankYouMessage =
    finalCallTime === 'hemen'
      ? 'En kısa sürede yetkili bayimiz sizi arayacak.'
      : `Sizi ${CALL_TIME_NATURAL[finalCallTime]} arıyoruz.`;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[2000] bg-ink-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="bg-white rounded-2xl max-w-[480px] w-full p-7 max-h-[90vh] overflow-y-auto shadow-modal animate-modal-in">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-extrabold text-ink-900">
              {step === 1 ? 'Bu paketle başvur' : step === 2 ? 'Süreci hızlandıralım' : 'Başvurunuz Alındı'}
            </h3>
            {step === 2 && (
              <p className="text-xs text-ink-500 font-semibold mt-1">2. adım — opsiyonel</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-ink-50 hover:bg-ink-100 text-ink-500 hover:text-ink-900 p-1.5 rounded-full transition"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* ============ STEP 3: Thank You ============ */}
        {step === 3 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-prime-100 mx-auto mb-4 flex items-center justify-center">
              <Check className="w-8 h-8 text-success" strokeWidth={3} />
            </div>
            <p className="text-ink-700 mb-5 leading-relaxed">{thankYouMessage}</p>
            <button onClick={onClose} className="btn-primary w-full">
              Tamam
            </button>
          </div>
        )}

        {/* ============ STEP 2: Additional details ============ */}
        {step === 2 && (
          <>
            <div className="bg-prime-100 border border-success/30 text-success text-xs font-semibold p-3 rounded-xl mb-4 flex gap-2 items-start">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={3} />
              <span>
                Başvurunuz kayıt altına alındı. Aşağıdaki bilgiler altyapı sorgusunu hızlandırır — opsiyoneldir.
              </span>
            </div>

            <div className="mb-3">
              <label className="field-label">Açık Adres</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Mahalle, sokak, bina no, daire no"
                rows={3}
                maxLength={500}
                className="input min-h-[72px] resize-none"
              />
              <p className="text-[11px] text-ink-500 mt-1">
                TT altyapı uygunluk sorgusu için kullanılır.
              </p>
            </div>

            <div className="mb-3">
              <label className="field-label">TC Kimlik No</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={tcNumber}
                onChange={(e) => handleTcInput(e.target.value)}
                placeholder="11 haneli"
                maxLength={11}
                autoComplete="off"
                className="input"
              />
            </div>

            {/* Doğum Tarihi — manuel rakam girişi (mobil dostu) */}
            <div className="mb-4">
              <label className="field-label">Doğum Tarihi</label>
              <input
                type="text"
                inputMode="numeric"
                value={birthDateInput}
                onChange={(e) => handleBirthDateChange(e.target.value)}
                placeholder="GG.AA.YYYY"
                maxLength={10}
                autoComplete="bday"
                aria-invalid={!!birthDateError}
                aria-describedby={birthDateError ? 'birth-date-error' : 'birth-date-hint'}
                className={`input ${birthDateError ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {birthDateError ? (
                <p
                  id="birth-date-error"
                  className="text-[11px] text-red-600 mt-1 font-semibold"
                >
                  {birthDateError}
                </p>
              ) : (
                <p id="birth-date-hint" className="text-[11px] text-ink-500 mt-1">
                  Örnek: 15.06.1985 — sadece rakamla yazın, noktalar otomatik eklenir
                </p>
              )}
            </div>

            {/* Aranma zamanı — 2 ana seçenek + conditional dropdown */}
            <div className="mb-4">
              <label className="field-label">Sizi ne zaman arayalım?</label>
              <div className="flex flex-col gap-1.5">
                {/* Hemen */}
                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-[1.5px] cursor-pointer transition ${
                    callMode === 'hemen'
                      ? 'border-2 border-brand-500 bg-brand-50 p-[11px]'
                      : 'border-ink-100 bg-white hover:border-ink-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="callMode"
                    checked={callMode === 'hemen'}
                    onChange={() => {
                      setCallMode('hemen');
                      setCallSlot('');
                    }}
                    className="w-4 h-4 accent-brand-500 flex-shrink-0"
                  />
                  <span className="text-sm font-semibold text-ink-900">
                    En kısa zamanda arayın
                  </span>
                </label>

                {/* Belirli saatte — seçilirse dropdown açılır */}
                <label
                  className={`block rounded-xl border-[1.5px] cursor-pointer transition ${
                    callMode === 'belirli'
                      ? 'border-2 border-brand-500 bg-brand-50'
                      : 'border-ink-100 bg-white hover:border-ink-400'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2.5 ${
                      callMode === 'belirli' ? 'p-[11px]' : 'p-3'
                    }`}
                  >
                    <input
                      type="radio"
                      name="callMode"
                      checked={callMode === 'belirli'}
                      onChange={() => setCallMode('belirli')}
                      className="w-4 h-4 accent-brand-500 flex-shrink-0"
                    />
                    <span className="text-sm font-semibold text-ink-900">
                      Belirli bir saatte
                    </span>
                  </div>

                  {callMode === 'belirli' && (
                    <div className="px-[11px] pb-[11px]">
                      <select
                        value={callSlot}
                        onChange={(e) => setCallSlot(e.target.value as CallSlot)}
                        className="select w-full"
                        aria-label="Müsait saat aralığı"
                      >
                        <option value="">Müsait saatinizi seçin...</option>
                        <option value="sabah">Sabah (09:00 - 12:00)</option>
                        <option value="oglen">Öğlen (12:00 - 15:00)</option>
                        <option value="ogleden_sonra">Öğleden sonra (15:00 - 18:00)</option>
                        <option value="aksam">Akşam (18:00 - 21:00)</option>
                      </select>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl mb-3 flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSkipStep2}
                disabled={submitting}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm border-[1.5px] border-ink-100 bg-white text-ink-700 hover:bg-ink-50 transition disabled:opacity-50"
              >
                Daha Sonra
              </button>
              <button
                onClick={handleStep2Submit}
                disabled={submitting}
                className={`flex-[1.4] py-3.5 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 ${
                  !submitting
                    ? 'bg-brand-500 hover:bg-brand-600 text-white'
                    : 'bg-ink-300 text-white cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor
                  </>
                ) : (
                  'Başvuruyu Tamamla'
                )}
              </button>
            </div>
          </>
        )}

        {/* ============ STEP 1: Initial form ============ */}
        {step === 1 && (
          <>
            <div className="bg-gradient-to-br from-brand-50 to-blue-50 border border-brand-500/20 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-2xl font-extrabold text-ink-900 tracking-tight">
                  {pkg.speedMbps} <span className="text-sm text-brand-500 font-bold">Mbps</span>
                </span>
                <span className="text-xs text-ink-500 font-semibold">
                  {pkg.campaignName || 'Fiber Gücü Yaşa'}
                </span>
              </div>
              {(tv || modem) && (
                <div className="text-xs text-ink-900 mb-2 leading-relaxed space-y-1">
                  {tv && (
                    <div className="flex gap-1.5 items-center font-semibold">
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0" strokeWidth={3} />
                      <span>Tivibu TV (+{fmt(TV_EXTRA_FEE)}₺/ay)</span>
                    </div>
                  )}
                  {modem && (
                    <div className="flex gap-1.5 items-center font-semibold">
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0" strokeWidth={3} />
                      <span>Modem kirala (+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span>
                    </div>
                  )}
                </div>
              )}
              <div className="bg-white/70 rounded-lg px-3.5 py-2.5 mt-2.5">
                <div className="flex justify-between items-baseline py-1.5">
                  <span className="text-xs text-ink-500 font-semibold">İlk 9 ay (Hoş Geldin)</span>
                  <span className="text-base font-extrabold text-ink-900 tracking-tight">
                    {fmt(prices.firstPeriod)}₺/ay
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-dashed border-ink-100/50">
                  <span className="text-xs text-ink-500 font-semibold">
                    {prices.isFlat ? '24 ay' : '10-18. ay'}
                  </span>
                  <span className="text-sm font-bold text-ink-500">{fmt(prices.secondPeriod)}₺/ay</span>
                </div>
              </div>
            </div>

            <div className="bg-ink-50 rounded-xl p-3.5 mb-4">
              <div className="text-[11px] text-ink-500 font-bold uppercase tracking-wider mb-2.5">
                Ek seçenekler
              </div>
              <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tv}
                  onChange={(e) => setTv(e.target.checked)}
                  className="checkbox"
                />
                <span className="text-sm font-semibold text-ink-900">
                  Tivibu TV ekle{' '}
                  <span className="text-ink-500 font-medium">(+{fmt(TV_EXTRA_FEE)}₺/ay)</span>
                </span>
              </label>
              <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modem}
                  onChange={(e) => setModem(e.target.checked)}
                  className="checkbox"
                />
                <span className="text-sm font-semibold text-ink-900">
                  Modem kirala{' '}
                  <span className="text-ink-500 font-medium">(+{fmt(MODEM_RENTAL_FEE)}₺/ay)</span>
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="field-label">İl</label>
                <select
                  value={il}
                  onChange={(e) => {
                    setIl(e.target.value);
                    setIlce('');
                  }}
                  className="select"
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
                <label className="field-label">İlçe</label>
                <select
                  value={ilce}
                  onChange={(e) => setIlce(e.target.value)}
                  disabled={!il}
                  className="select"
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

            {(zone === 'bolgesel-avantaj' || zone === 'bolgesel-firsat') && (
              <div className="bg-prime-100 border border-success/30 text-success text-xs font-semibold p-2.5 rounded-lg mb-3">
                ✨{' '}
                {zone === 'bolgesel-avantaj'
                  ? 'Bölgesel Avantaj kampanyası uygulanacak'
                  : 'Bölgesel Fırsat (24 ay tek fiyat) kampanyası uygulanacak'}
              </div>
            )}

            <div className="mb-3">
              <label className="field-label">Ad Soyad</label>
              <input
                type="text"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                placeholder="İsim Soyisim"
                className="input"
              />
            </div>
            <div className="mb-3">
              <label className="field-label">Telefon</label>
              <input
                type="tel"
                value={tel}
                onChange={(e) => setTel(formatPhone(e.target.value))}
                placeholder="5XX XXX XX XX"
                className="input"
              />
            </div>

            <div className="mb-3">
              <label className="field-label">Mevcut TT hattınız?</label>
              <div className="flex gap-2">
                {(['yok', 'var'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLine(l)}
                    className={`flex-1 rounded-xl border-[1.5px] p-2.5 text-center text-sm font-bold transition ${
                      line === l
                        ? 'border-2 border-brand-500 bg-brand-50 text-brand-700 p-[9px]'
                        : 'border-ink-100 bg-white text-ink-900 hover:border-ink-400'
                    }`}
                  >
                    {l === 'yok' ? 'Yok' : 'Var'}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex gap-2.5 items-start text-xs text-ink-500 mt-3.5 mb-1 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={kvkk}
                onChange={(e) => setKvkk(e.target.checked)}
                className="checkbox mt-0.5 flex-shrink-0"
              />
              <span>
                <a href="/kvkk-aydinlatma" target="_blank" className="text-brand-500 font-semibold">
                  KVKK aydınlatma metnini
                </a>{' '}
                okudum, izin veriyorum.
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl mt-3 flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl font-bold text-base border-[1.5px] border-ink-100 bg-white text-ink-900 hover:bg-ink-50 transition"
              >
                Vazgeç
              </button>
              <button
                onClick={handleStep1Submit}
                disabled={!canSubmitStep1 || submitting}
                className={`flex-[1.4] py-3.5 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 ${
                  canSubmitStep1 && !submitting
                    ? 'bg-brand-500 hover:bg-brand-600 text-white'
                    : 'bg-ink-300 text-white cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor
                  </>
                ) : (
                  <>
                    Başvuruya Devam Et <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
