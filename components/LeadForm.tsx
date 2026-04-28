'use client';

import { useState, FormEvent } from 'react';
import { Check, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, type MessageContext } from '@/lib/whatsapp';

interface LeadFormProps {
  variant?: 'hero' | 'inline' | 'compact';
  whatsappContext?: MessageContext;
  packageId?: string;
  packageName?: string;
  sourceLabel?: string;
  defaultIlce?: string;
}

const ANTALYA_ILCELER = [
  'Manavgat', 'Alanya', 'Muratpaşa', 'Kepez', 'Konyaaltı',
  'Döşemealtı', 'Aksu', 'Side', 'Serik', 'Kemer', 'Gazipaşa',
  'Finike', 'Kumluca', 'Elmalı', 'Korkuteli', 'Akseki', 'Gündoğmuş',
  'İbradı', 'Demre', 'Kaş', 'Diğer',
];

export default function LeadForm({
  variant = 'hero',
  whatsappContext = { type: 'home' },
  packageId,
  packageName,
  sourceLabel,
  defaultIlce,
}: LeadFormProps) {
  const [step, setStep] = useState<'form' | 'success' | 'extended'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leadToken, setLeadToken] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ilce: defaultIlce || '',
    kvkk: false,
  });

  const [extendedData, setExtendedData] = useState({
    mahalle: '',
    email: '',
    callTime: '',
  });

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

    if (!formData.ilce) {
      setError('Lütfen ilçenizi seçin.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: phoneClean.startsWith('0') ? phoneClean : '0' + phoneClean,
        ilce: formData.ilce,
        kvkk_consent: formData.kvkk,
        package_id: packageId || null,
        package_name: packageName || null,
        source: sourceLabel || 'website',
        landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
        utm_source: getUrlParam('utm_source'),
        utm_medium: getUrlParam('utm_medium'),
        utm_campaign: getUrlParam('utm_campaign'),
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('submit_failed');
      const data = await res.json();

      setLeadToken(data.token || '');
      setStep('success');
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
      setStep('success');
    } catch {
      // sessizce geç, ana lead zaten kaydedildi
    } finally {
      setLoading(false);
    }
  }

  // ============ SUCCESS STATE ============
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                E-posta <span className="text-ink-400 font-normal">(opsiyonel)</span>
              </label>
              <input
                type="email"
                value={extendedData.email}
                onChange={(e) => setExtendedData({ ...extendedData, email: e.target.value })}
                className="input"
                placeholder="ornek@email.com"
              />
            </div>
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

  // ============ FORM STATE ============
  const headingText = variant === 'hero'
    ? 'Dakikalar İçinde Başvuru'
    : packageName
      ? `${packageName} için Başvur`
      : 'Bizi Arayalım';

  const subText = variant === 'hero'
    ? 'Bilgilerinizi bırakın, yetkili bayimiz 15 dakika içinde sizi arasın.'
    : 'Formu doldurun, 15 dk içinde arayalım. Dilerseniz WhatsApp\'tan da yazabilirsiniz.';

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

        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-1.5">
            İlçeniz <span className="text-danger">*</span>
          </label>
          <select
            required
            value={formData.ilce}
            onChange={(e) => setFormData({ ...formData, ilce: e.target.value })}
            className="select"
          >
            <option value="">İlçe seçin</option>
            {ANTALYA_ILCELER.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

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
            </a>'ni okudum; bilgilerimin Türk Telekom adına abonelik başvurumun oluşturulması amacıyla işlenmesine izin veriyorum.
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
