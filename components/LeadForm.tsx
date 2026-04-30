'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Check, Loader2, AlertCircle, MessageCircle, MapPin, Bell } from 'lucide-react';
import { buildWhatsAppLink, type MessageContext } from '@/lib/whatsapp';
import { ALL_CITIES, COVERED_CITIES, getDistricts, isCovered, findCityByName } from '@/data/turkey';

interface LeadFormProps {
  variant?: 'hero' | 'inline' | 'compact';
  whatsappContext?: MessageContext;
  packageId?: string;
  packageName?: string;
  sourceLabel?: string;
  defaultIl?: string;
  defaultIlce?: string;
  /** Cloudflare'dan algılanmış konum (server-side prefill için) */
  detectedCity?: string;
  detectedCountry?: string;
}

export default function LeadForm({
  variant = 'hero',
  whatsappContext = { type: 'home' },
  packageId,
  packageName,
  sourceLabel,
  defaultIl,
  defaultIlce,
  detectedCity,
  detectedCountry,
}: LeadFormProps) {
  const [step, setStep] = useState<'form' | 'success' | 'success-waiting' | 'extended'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leadToken, setLeadToken] = useState('');

  // IP geo'dan default il prefill
  const initialIl = (() => {
    if (defaultIl) return defaultIl;
    if (detectedCity) {
      const matched = findCityByName(detectedCity);
      if (matched) return matched.name;
    }
    return '';
  })();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    il: initialIl,
    ilce: defaultIlce || '',
    kvkk: false,
  });

  const [extendedData, setExtendedData] = useState({
    mahalle: '',
    callTime: '',
  });

  const isIlCovered = formData.il ? isCovered(formData.il) : null;
  const districts = formData.il ? getDistricts(formData.il) : [];

  // İl değişince ilçeyi sıfırla
  useEffect(() => {
    if (formData.il && !districts.includes(formData.ilce)) {
      setFormData(prev => ({ ...prev, ilce: '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.il]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!formData.kvkk) {
      setError('Lütfen KVKK Aydınlatma Metni\'ni onaylayın.');
      return;
    }
    if (formData.name.trim().length < 3) {
      setError('Lütfen ad soyadınızı girin.');
      return;
    }
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (phoneClean.length !== 10 && phoneClean.length !== 11) {
      setError('Lütfen geçerli bir telefon numarası girin.');
      return;
    }
    if (!formData.il) {
      setError('Lütfen ilinizi seçin.');
      return;
    }
    if (isIlCovered && !formData.ilce) {
      setError('Lütfen ilçenizi seçin.');
      return;
    }
    if (!isIlCovered && !formData.email.trim()) {
      setError('Bu il için kapsamımız henüz yok. Sizi haberdar etmek için e-posta adresiniz gerekli.');
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: phoneClean.startsWith('0') ? phoneClean : '0' + phoneClean,
        email: formData.email.trim() || null,
        message: formData.message.trim() || null,
        il: formData.il,
        ilce: formData.ilce || null,
        kvkk_consent: formData.kvkk,
        package_id: packageId || null,
        package_name: packageName || null,
        source: sourceLabel || 'website',
        landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
        utm_source: getUrlParam('utm_source'),
        utm_medium: getUrlParam('utm_medium'),
        utm_campaign: getUrlParam('utm_campaign'),
        detected_city: detectedCity || null,
        detected_country: detectedCountry || null,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('submit_failed');
      const data = await res.json();

      setLeadToken(data.token || '');
      setStep(isIlCovered ? 'success' : 'success-waiting');
    } catch (err) {
      setError('Başvurunuz gönderilemedi. Lütfen WhatsApp üzerinden iletişime geçin.');
    } finally {
      setLoading(false);
    }
  }

  async function handleExtended(e: FormEvent) {
    e.preventDefault();
    if (!leadToken) return;
    setLoading(true);
    try {
      await fetch('/api/lead/extend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: leadToken, ...extendedData }),
      });
      setStep('extended');
    } catch {
      setStep('extended');
    } finally {
      setLoading(false);
    }
  }

  // ============ EXTENDED SUCCESS ============
  if (step === 'extended') {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-6 md:p-8 shadow-sm animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink-900">Bilgileriniz Kaydedildi</h3>
            <p className="text-sm text-ink-600">Yetkili bayimiz en kısa sürede sizi arayacak.</p>
          </div>
        </div>
        <a
          href={buildWhatsAppLink(whatsappContext)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full !py-3.5 mt-4"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp ile Hemen Görüşmek İstiyorum
        </a>
      </div>
    );
  }

  // ============ SUCCESS — KAPSAMA İÇİ ============
  if (step === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-6 md:p-8 shadow-sm animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink-900">Başvurunuz Alındı</h3>
            <p className="text-sm text-ink-600">En geç 15 dakika içinde sizi arayacağız.</p>
          </div>
        </div>

        <div className="bg-brand-50 rounded-lg p-4 mb-5">
          <p className="text-sm text-brand-900 leading-relaxed">
            <strong>Kurulum sürecini hızlandırmak</strong> için aşağıdaki bilgileri de paylaşırsanız, aramamıza gerek kalmadan altyapı uygunluğunu kontrol edip size teklif hazırlayabiliriz.
          </p>
        </div>

        <form onSubmit={handleExtended} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-1.5">
              Mahalle / Site <span className="text-ink-400 font-normal">(opsiyonel)</span>
            </label>
            <input
              type="text"
              value={extendedData.mahalle}
              onChange={(e) => setExtendedData({ ...extendedData, mahalle: e.target.value })}
              className="input"
              placeholder="Örn. Side Mah. veya Akdeniz Sitesi"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-1.5">
              Uygun arama saati <span className="text-ink-400 font-normal">(opsiyonel)</span>
            </label>
            <select
              value={extendedData.callTime}
              onChange={(e) => setExtendedData({ ...extendedData, callTime: e.target.value })}
              className="select"
            >
              <option value="">Fark etmez</option>
              <option value="sabah">Sabah (09-12)</option>
              <option value="oglen">Öğlen (12-15)</option>
              <option value="ogleden-sonra">Öğleden sonra (15-18)</option>
              <option value="aksam">Akşam (18-20)</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              Bilgileri Kaydet
            </button>
            <a
              href={buildWhatsAppLink(whatsappContext)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp ile Konuş
            </a>
          </div>
        </form>
      </div>
    );
  }

  // ============ SUCCESS — KAPSAMA DIŞI (BEKLEME) ============
  if (step === 'success-waiting') {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-6 md:p-8 shadow-sm animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink-900">Kayıt Alındı</h3>
            <p className="text-sm text-ink-600">{formData.il} bekleme listesindesiniz.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Şu an {formData.il} ilinde Türk Telekom bayilik kapsamımız bulunmamaktadır.</strong> Ancak hızla genişliyoruz —
            bölgenize geldiğimizde <strong>e-posta ile ilk siz haberdar olacaksınız</strong>.
          </p>
        </div>

        <p className="text-sm text-ink-600 mb-5 leading-relaxed">
          Bu süreçte en hızlı çözüm için Türk Telekom resmi sitesinden veya 444 1 444 numarasından yetkili bayinize ulaşabilirsiniz.
        </p>

        <a
          href={buildWhatsAppLink({ type: 'home' })}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full !py-3.5"
        >
          <MessageCircle className="w-5 h-5" />
          Sorunuz Var mı? WhatsApp'tan Yazın
        </a>
      </div>
    );
  }

  // ============ FORM STATE ============
  const headingText = variant === 'hero'
    ? 'Dakikalar İçinde Başvuru'
    : packageName
      ? `${packageName} için Başvur`
      : 'Bizi Arayalım';

  const subText = variant === 'hero'
    ? 'Bilgilerinizi bırakın, yetkili bayimiz 15 dakika içinde sizi arasın.'
    : 'Formu doldurun, 15 dk içinde arayalım. Dilerseniz WhatsApp\'tan da yazabilirsiniz.';

  const showDetectedBadge = detectedCity && initialIl && initialIl === formData.il;

  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-5 md:p-7 shadow-lg shadow-brand-700/5">
      <div className="mb-5">
        <h3 className="text-xl md:text-2xl font-bold text-ink-900 mb-1.5">{headingText}</h3>
        <p className="text-sm text-ink-600">{subText}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-1.5">
            Ad Soyad <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            placeholder="Adınız ve soyadınız"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-1.5">
            Telefon <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input"
            placeholder="0532 123 45 67"
            autoComplete="tel"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-1.5">
              İl <span className="text-danger">*</span>
              {showDetectedBadge && (
                <span className="ml-2 text-[10px] font-medium text-accent-600 bg-accent-50 px-1.5 py-0.5 rounded">
                  <MapPin className="w-2.5 h-2.5 inline mr-0.5" />
                  Konumunuza göre
                </span>
              )}
            </label>
            <select
              required
              value={formData.il}
              onChange={(e) => setFormData({ ...formData, il: e.target.value })}
              className="select"
            >
              <option value="">İl seçin</option>
              <optgroup label="🟢 Hizmet Verdiğimiz İller">
                {COVERED_CITIES.map((c) => (
                  <option key={c.plate} value={c.name}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="Diğer İller (Bekleme Listesi)">
                {ALL_CITIES.filter(c => c.coverage === 'interest_only').map((c) => (
                  <option key={c.plate} value={c.name}>{c.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-1.5">
              {isIlCovered === false ? (
                <>İlçe <span className="text-ink-400 font-normal">(opsiyonel)</span></>
              ) : (
                <>İlçe <span className="text-danger">*</span></>
              )}
            </label>
            <select
              required={isIlCovered === true}
              disabled={!formData.il || isIlCovered === false}
              value={formData.ilce}
              onChange={(e) => setFormData({ ...formData, ilce: e.target.value })}
              className="select disabled:bg-ink-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {!formData.il ? 'Önce il seçin' :
                 isIlCovered === false ? 'Bu il için ilçe gerekmez' :
                 'İlçe seçin'}
              </option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {isIlCovered === false && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-sm text-amber-900">
            <div className="flex items-start gap-2">
              <Bell className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
              <div className="leading-relaxed">
                <strong>{formData.il}</strong> şu an kapsamımız dışında.
                E-posta bırakın, kapsama gelince size haber verelim.
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-1.5">
            E-posta {isIlCovered === false ? (
              <span className="text-danger">*</span>
            ) : (
              <span className="text-ink-400 font-normal">(opsiyonel)</span>
            )}
          </label>
          <input
            type="email"
            required={isIlCovered === false}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input"
            placeholder="ornek@email.com"
            autoComplete="email"
          />
        </div>

        {isIlCovered === false && (
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-1.5">
              Notunuz <span className="text-ink-400 font-normal">(opsiyonel)</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input min-h-[80px] resize-y"
              placeholder="Hangi paketle ilgileniyorsunuz?"
              rows={3}
            />
          </div>
        )}

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.kvkk}
            onChange={(e) => setFormData({ ...formData, kvkk: e.target.checked })}
            className="checkbox mt-0.5"
            required
          />
          <span className="text-xs text-ink-600 leading-relaxed">
            <a href="/kvkk-aydinlatma" target="_blank" className="text-brand-700 font-semibold hover:underline">
              KVKK Aydınlatma Metni
            </a>'ni okudum; bilgilerimin Türk Telekom abonelik başvurumun oluşturulması veya bilgilendirme amacıyla işlenmesine izin veriyorum.
          </span>
        </label>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-danger/10 border border-danger/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-accent w-full !py-4 text-base">
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...</>
          ) : isIlCovered === false ? (
            'Bekleme Listesine Kaydet'
          ) : (
            'Beni Arayın — Ücretsiz'
          )}
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ink-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-ink-500 uppercase tracking-wider">veya</span>
          </div>
        </div>

        <a
          href={buildWhatsAppLink(whatsappContext)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full !py-3.5"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp'tan Yazmak İstiyorum
        </a>

        <p className="text-[11px] text-center text-ink-500 leading-relaxed pt-1">
          Bilgileriniz Türkiye'deki sunucularda güvenli şekilde saklanır.
          Asla üçüncü taraflarla paylaşılmaz.
        </p>
      </form>
    </div>
  );
}

function getUrlParam(key: string): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}
