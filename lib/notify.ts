// Telegram bildirimi — yeni başvuru düştüğünde bayi telefonuna anlık bildirim.
//
// Kurulum (bir kere):
//   1. Telegram'da @BotFather'a "/newbot" yazıp bot oluşturun → TOKEN verir.
//   2. Oluşan botunuza Telegram'dan herhangi bir mesaj atın (ör. "merhaba").
//   3. Tarayıcıda şu adresi açın: https://api.telegram.org/bot<TOKEN>/getUpdates
//      → "chat":{"id":123456789} içindeki sayı CHAT_ID'nizdir.
//   4. Railway → Variables:
//        TELEGRAM_BOT_TOKEN = 123456:ABC-DEF...
//        TELEGRAM_CHAT_ID   = 123456789
//
// Değişkenler tanımlı değilse hiçbir şey yapılmaz; site davranışı değişmez.
// Bildirim gönderimi başvuru akışını asla bloklamaz/bozamaz (fire-and-forget).

const TELEGRAM_TIMEOUT_MS = 5000;

export function notifyTelegram(text: string): void {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
    signal: controller.signal,
  })
    .then(res => {
      if (!res.ok) console.error('Telegram notify failed:', res.status);
    })
    .catch(err => console.error('Telegram notify error:', err?.name || err))
    .finally(() => clearTimeout(timer));
}

/** Yeni başvuru bildirimi metni */
export function formatLeadMessage(body: Record<string, unknown>): string {
  const lines = [
    '🔔 YENİ SUPERBOX BAŞVURUSU',
    '',
    `👤 Ad Soyad: ${body.name ?? '-'}`,
    `📞 Telefon: ${body.phone ?? '-'}`,
    `📍 Konum: ${body.il ?? '-'} / ${body.ilce ?? '-'}`,
    `📦 Paket: ${body.package_name ?? '-'}`,
  ];
  if (body.monthly_price) lines.push(`💰 Aylık: ${body.monthly_price} TL`);
  lines.push(`🧭 Kaynak: ${body.source ?? '-'}`);
  if (body.message) lines.push(`📝 Not: ${body.message}`);
  return lines.join('\n');
}

/** 2. adım (ek bilgiler) bildirimi metni */
export function formatExtendMessage(body: Record<string, unknown>): string {
  const CALL_TIME: Record<string, string> = {
    hemen: 'En kısa sürede',
    sabah: 'Sabah (09-12)',
    oglen: 'Öğlen (12-15)',
    ogleden_sonra: 'Öğleden sonra (15-18)',
    aksam: 'Akşam (18-21)',
  };
  const lines = ['📋 BAŞVURUYA EK BİLGİ GELDİ', ''];
  if (body.address) lines.push(`🏠 Adres: ${body.address}`);
  if (body.tc_number) lines.push('🪪 TC kimlik no girildi');
  if (body.birth_date) lines.push(`🎂 Doğum tarihi: ${body.birth_date}`);
  const ct = typeof body.preferred_call_time === 'string' ? body.preferred_call_time : '';
  if (ct) lines.push(`⏰ Aranma tercihi: ${CALL_TIME[ct] ?? ct}`);
  lines.push(`🔑 Başvuru kodu: ${String(body.token ?? '').slice(0, 12)}…`);
  return lines.join('\n');
}
