'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Cookie, Settings2, ShieldCheck } from 'lucide-react';
import {
  getStoredConsent,
  saveConsent,
} from '@/lib/analytics';

/**
 * KVKK uyumlu Çerez Onay Banner'ı
 *
 * Mobil iyileştirmeleri:
 * - Min touch target 44px
 * - iOS safe area insets desteği (env(safe-area-inset-bottom))
 * - Sticky bottom: tarayıcı navbar'ı üstüne çıkmaz
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setShowBanner(true);
    } else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }
  }, []);

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true });
    setAnalytics(true);
    setMarketing(true);
    closeAll();
  }

  function rejectAll() {
    saveConsent({ analytics: false, marketing: false });
    setAnalytics(false);
    setMarketing(false);
    closeAll();
  }

  function savePreferences() {
    saveConsent({ analytics, marketing });
    closeAll();
  }

  function closeAll() {
    setShowBanner(false);
    setShowSettings(false);
  }

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* ============ MAIN BANNER ============ */}
      {showBanner && !showSettings && (
        <div
          role="dialog"
          aria-label="Çerez tercihleri"
          className="fixed inset-x-0 bottom-0 z-[2000] px-4 sm:px-6 animate-fade-in-up"
          style={{
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
        >
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-ink-100 overflow-hidden">
            <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-brand-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink-900 mb-1 text-base">
                    Çerezler Hakkında
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    Sitemizde, deneyiminizi geliştirmek ve site trafiğini analiz etmek
                    için çerezler kullanmaktayız. KVKK kapsamında onayınızı talep
                    ediyoruz. Detaylı bilgi için{' '}
                    <Link
                      href="/cerez-politikasi"
                      className="text-brand-700 hover:text-brand-500 font-semibold underline underline-offset-2"
                    >
                      Çerez Politikası
                    </Link>{' '}
                    ve{' '}
                    <Link
                      href="/kvkk"
                      className="text-brand-700 hover:text-brand-500 font-semibold underline underline-offset-2"
                    >
                      Aydınlatma Metni
                    </Link>
                    'ni inceleyebilirsiniz.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 md:flex-shrink-0">
                <button
                  onClick={rejectAll}
                  className="min-h-[44px] px-4 py-2.5 rounded-full border border-ink-200 text-ink-700 font-semibold text-sm hover:bg-ink-50 active:bg-ink-100 transition whitespace-nowrap"
                >
                  Reddet
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="min-h-[44px] px-4 py-2.5 rounded-full border border-ink-200 text-ink-700 font-semibold text-sm hover:bg-ink-50 active:bg-ink-100 transition whitespace-nowrap inline-flex items-center justify-center gap-1.5"
                >
                  <Settings2 className="w-4 h-4" />
                  Tercihler
                </button>
                <button
                  onClick={acceptAll}
                  className="min-h-[44px] px-5 py-2.5 rounded-full bg-ink-900 hover:bg-brand-500 active:bg-brand-600 text-white font-bold text-sm transition whitespace-nowrap shadow-sm"
                >
                  Tümünü Kabul Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ SETTINGS MODAL ============ */}
      {showSettings && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-[2100] flex items-end sm:items-center justify-center bg-ink-900/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in"
        >
          <div className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-ink-100 flex items-center justify-between">
              <h2
                id="cookie-settings-title"
                className="font-bold text-ink-900 text-lg inline-flex items-center gap-2"
              >
                <Cookie className="w-5 h-5 text-brand-700" />
                Çerez Tercihleri
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Kapat"
                className="w-10 h-10 rounded-full hover:bg-ink-50 active:bg-ink-100 flex items-center justify-center transition"
              >
                <X className="w-5 h-5 text-ink-500" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <p className="text-sm text-ink-500 leading-relaxed">
                Aşağıdaki tercihleri yöneterek hangi çerezlerin kullanılacağına karar
                verebilirsiniz. KVKK 5. madde 2-c uyarınca zorunlu çerezler için onay
                gerekmemektedir.
              </p>

              <div className="border border-ink-100 rounded-xl p-4 bg-ink-50/50">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-ink-900 text-sm">Zorunlu Çerezler</h3>
                      <p className="text-xs text-ink-500 mt-0.5">Her zaman aktif</p>
                    </div>
                  </div>
                  <div className="bg-success/15 text-success px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    Aktif
                  </div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed mt-2">
                  Sitenin temel işlevi (form gönderimi, KVKK onayı, oturum yönetimi)
                  için zorunludur. Bu çerezler olmadan site çalışmaz.
                </p>
              </div>

              <div className="border border-ink-100 rounded-xl p-4">
                <label className="flex items-start justify-between gap-3 cursor-pointer">
                  <div className="flex-1">
                    <h3 className="font-bold text-ink-900 text-sm">Analitik Çerezler</h3>
                    <p className="text-xs text-ink-500 mt-0.5">
                      Google Analytics 4 — site kullanım verisi
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-ink-200 peer-checked:bg-brand-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
                  </div>
                </label>
                <p className="text-xs text-ink-500 leading-relaxed mt-3">
                  Sayfa görüntülenme, ziyaretçi sayısı, hangi sayfalardan geldiğiniz
                  gibi anonim site kullanım verileri toplanır. IP adresi anonimleştirilir.
                </p>
              </div>

              <div className="border border-ink-100 rounded-xl p-4">
                <label className="flex items-start justify-between gap-3 cursor-pointer">
                  <div className="flex-1">
                    <h3 className="font-bold text-ink-900 text-sm">Pazarlama Çerezleri</h3>
                    <p className="text-xs text-ink-500 mt-0.5">
                      Google Ads — reklam dönüşüm ölçümü
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-ink-200 peer-checked:bg-brand-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
                  </div>
                </label>
                <p className="text-xs text-ink-500 leading-relaxed mt-3">
                  Reklam kampanyalarımızın performansını ölçmek için kullanılır.
                  Onayınız olmadan reklam takibi yapılmaz.
                </p>
              </div>

              <div className="text-xs text-ink-500 pt-2">
                Detaylı bilgi:{' '}
                <Link
                  href="/cerez-politikasi"
                  className="text-brand-700 hover:text-brand-500 font-semibold underline"
                >
                  Çerez Politikası
                </Link>{' '}
                ·{' '}
                <Link
                  href="/kvkk"
                  className="text-brand-700 hover:text-brand-500 font-semibold underline"
                >
                  Aydınlatma Metni
                </Link>
              </div>
            </div>

            <div
              className="sticky bottom-0 bg-white border-t border-ink-100 px-6 py-4 flex flex-col sm:flex-row gap-2 sm:gap-3"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <button
                onClick={rejectAll}
                className="flex-1 min-h-[48px] px-4 py-3 rounded-full border border-ink-200 text-ink-700 font-semibold text-sm hover:bg-ink-50 active:bg-ink-100 transition"
              >
                Reddet
              </button>
              <button
                onClick={savePreferences}
                className="flex-1 min-h-[48px] px-4 py-3 rounded-full bg-ink-900 hover:bg-brand-500 active:bg-brand-600 text-white font-bold text-sm transition shadow-sm"
              >
                Tercihleri Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
