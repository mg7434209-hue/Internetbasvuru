// =============================================
// ANALYTICS HELPERS
// =============================================
// Bu dosya, Google Analytics 4 (GA4) ve Google Ads conversion tracking
// için tip-güvenli wrapper'lar sağlar. Cookie consent yoksa hiçbir
// event tetiklenmez.

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'consent' | 'set' | 'js',
      ...args: any[]
    ) => void;
    dataLayer?: any[];
  }
}

// =============================================
// CONSENT
// =============================================
export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const CONSENT_KEY = 'cookie_consent_v1';
const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 180; // 6 ay

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as ConsentState;
    if (Date.now() - data.timestamp > CONSENT_TTL_MS) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function saveConsent(state: Omit<ConsentState, 'timestamp' | 'necessary'>) {
  const fullState: ConsentState = {
    necessary: true,
    analytics: state.analytics,
    marketing: state.marketing,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(fullState));
  updateGoogleConsent(fullState);
  return fullState;
}

export function clearConsent() {
  localStorage.removeItem(CONSENT_KEY);
}

export function updateGoogleConsent(state: ConsentState | null) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    ad_storage: state?.marketing ? 'granted' : 'denied',
    ad_user_data: state?.marketing ? 'granted' : 'denied',
    ad_personalization: state?.marketing ? 'granted' : 'denied',
    analytics_storage: state?.analytics ? 'granted' : 'denied',
  });
}

// =============================================
// EVENTS
// =============================================
export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const consent = getStoredConsent();
  if (!consent?.analytics) return;
  window.gtag('event', name, params);
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!gaId) return;
  window.gtag('config', gaId, {
    page_path: path,
  });
}

// =============================================
// LEAD CONVERSION (Google Ads + GA4)
// =============================================
export type LeadConversionParams = {
  leadId?: string | number;
  pkg?: string;
  isCovered?: boolean;
  source?: string;
};

export function trackLeadConversion(params: LeadConversionParams = {}) {
  const consent = getStoredConsent();
  if (typeof window === 'undefined' || !window.gtag) return;

  const adsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
  const adsLabel = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;

  if (consent?.analytics) {
    window.gtag('event', 'generate_lead', {
      currency: 'TRY',
      value: params.isCovered ? 100 : 30,
      lead_id: params.leadId,
      package: params.pkg,
      coverage: params.isCovered ? 'covered' : 'interest_only',
      source: params.source ?? 'unknown',
    });
  }

  if (consent?.marketing && adsId && adsLabel) {
    window.gtag('event', 'conversion', {
      send_to: `${adsId}/${adsLabel}`,
      value: params.isCovered ? 100 : 30,
      currency: 'TRY',
      transaction_id: String(params.leadId ?? ''),
    });
  }
}
