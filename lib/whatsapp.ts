// WhatsApp yönlendirme sistemi
// Tüm conversion bu utility üzerinden yapılır

import type { Package } from '@/data/packages';

// Bayi WhatsApp numarası (sabit)
export const BAYI_PHONE = '905349777000';
export const BAYI_PHONE_DISPLAY = '0534 977 70 00';

export type MessageContext =
  | { type: 'home' }
  | { type: 'package'; pkg: Package; region?: string }
  | { type: 'campaign'; campaignName: string; region?: string }
  | { type: 'region'; regionName: string }
  | { type: 'blog'; articleTitle?: string }
  | { type: 'contact' };

/**
 * Context'e göre pre-filled WhatsApp mesajı üretir.
 * Pre-filled mesajlar AntalyAsistan tarafından parse edilebilmesi için
 * standart yapıda tutulmuştur.
 */
export function buildMessage(ctx: MessageContext): string {
  switch (ctx.type) {
    case 'home':
      return 'Merhaba, Türk Telekom fiber internet başvurusu için bilgi almak istiyorum.';

    case 'package': {
      const { pkg, region } = ctx;
      const price = pkg.priceMonthly
        ? `${pkg.priceMonthly}₺/ay`
        : `${pkg.priceFirstPeriod}₺ (ilk ${pkg.firstPeriodMonths} ay)`;

      const regionText = region ? ` ${region} için` : '';

      return `Merhaba,${regionText} Türk Telekom ${pkg.speedMbps} Mbps Fiber paketi (${price}) için başvurmak istiyorum. Bilgi alabilir miyim?`;
    }

    case 'campaign':
      return `Merhaba, "${ctx.campaignName}" kampanyası${ctx.region ? ` (${ctx.region} bölgesi)` : ''} hakkında bilgi almak istiyorum.`;

    case 'region':
      return `Merhaba, ${ctx.regionName} için Türk Telekom fiber internet paketleri hakkında bilgi almak istiyorum.`;

    case 'blog':
      return ctx.articleTitle
        ? `Merhaba, "${ctx.articleTitle}" yazısını okudum. Türk Telekom fiber internet hakkında bilgi almak istiyorum.`
        : 'Merhaba, Türk Telekom fiber internet başvurusu için bilgi almak istiyorum.';

    case 'contact':
      return 'Merhaba, internetbasvuru.com üzerinden size ulaşıyorum.';

    default:
      return 'Merhaba, Türk Telekom fiber internet başvurusu için bilgi almak istiyorum.';
  }
}

/**
 * wa.me link'i oluşturur - mobilde WhatsApp app açar, desktop'ta web.whatsapp.com
 */
export function buildWhatsAppLink(ctx: MessageContext): string {
  const message = buildMessage(ctx);
  return `https://wa.me/${BAYI_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Telefon araması için tel: link
 */
export function buildPhoneLink(): string {
  return `tel:+${BAYI_PHONE}`;
}
