// Lead submission helper
// /api/lead route.ts'e POST atar, sonuçta backend lead.php'ye proxy eder

import type { CampaignZone } from '@/data/turkey';

export interface LeadPayload {
  // Müşteri bilgileri
  full_name: string;
  phone: string;
  email?: string;

  // Lokasyon
  il: string;
  ilce: string;
  mahalle?: string;

  // Paket seçimi
  selected_speed: number;
  selected_campaign: string; // package.id (örn: 'std-100')
  campaign_name?: string;    // Görsel kampanya adı
  tv_addon: boolean;
  modem_addon: boolean;

  // Bölgesel kampanya tetiklendi mi (admin için kritik)
  bolge_indirimi_active: boolean;
  bolge_indirimi_zone: CampaignZone;

  // Müşteri profili
  existing_line?: 'var' | 'yok';
  call_time?: string;

  // Yasal
  kvkk_consent: 1; // Hep 1 olarak gönderilir, false gelmesi mümkün değil

  // Kaynak izleme
  source_path: 'modal' | 'wizard' | 'legacy';
  source?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface LeadResponse {
  ok: boolean;
  token?: string;
  message?: string;
  coverage_status?: string;
  is_covered?: boolean;
  error?: string;
}

/**
 * Lead'i /api/lead endpoint'ine gönderir
 * Endpoint route.ts üzerinden lead.php backend'e proxy eder
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Backend'in beklediği alan adlarına çevir
        name: payload.full_name,
        full_name: payload.full_name,
        phone: payload.phone,
        email: payload.email || '',
        il: payload.il,
        ilce: payload.ilce,
        mahalle: payload.mahalle || '',
        selected_speed: payload.selected_speed,
        selected_campaign: payload.selected_campaign,
        package_id: payload.selected_campaign,
        package_name: payload.campaign_name || `${payload.selected_speed} Mbps`,
        tv_addon: payload.tv_addon ? 1 : 0,
        modem_addon: payload.modem_addon ? 1 : 0,
        existing_line: payload.existing_line || '',
        call_time: payload.call_time || '',
        kvkk_consent: 1,
        source_path: payload.source_path,
        source: payload.source || 'website',
        landing_page: payload.landing_page || (typeof window !== 'undefined' ? window.location.pathname : ''),
        utm_source: payload.utm_source || '',
        utm_medium: payload.utm_medium || '',
        utm_campaign: payload.utm_campaign || '',
        // Bölgesel kampanya bilgisi (admin paneli için)
        bolge_indirimi_active: payload.bolge_indirimi_active,
        bolge_indirimi_zone: payload.bolge_indirimi_zone,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: data?.error || 'submit_failed',
        message: data?.message || 'Bir hata oluştu, lütfen tekrar deneyin.',
      };
    }

    return {
      ok: true,
      token: data?.token,
      message: data?.message || 'Başvurunuz alındı, sizi 15 dakika içinde arayacağız.',
      coverage_status: data?.coverage_status,
      is_covered: data?.is_covered,
    };
  } catch (err) {
    console.error('Lead submission error:', err);
    return {
      ok: false,
      error: 'network_error',
      message: 'Bağlantı sorunu. Lütfen tekrar deneyin.',
    };
  }
}

/**
 * Telefonu format eder: 5XX XXX XX XX
 */
export function formatPhone(raw: string): string {
  const v = raw.replace(/\D/g, '').replace(/^90/, '').replace(/^0/, '').slice(0, 10);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)} ${v.slice(3)}`;
  if (v.length <= 8) return `${v.slice(0, 3)} ${v.slice(3, 6)} ${v.slice(6)}`;
  return `${v.slice(0, 3)} ${v.slice(3, 6)} ${v.slice(6, 8)} ${v.slice(8)}`;
}

/**
 * Telefon temiz numara döndürür (10 haneli)
 */
export function cleanPhone(formatted: string): string {
  return formatted.replace(/\D/g, '').replace(/^90/, '').replace(/^0/, '').slice(0, 10);
}
