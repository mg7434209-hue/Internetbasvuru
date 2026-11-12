// Gespa OS başvuru defteri — yeni başvurunun KİŞİSEL VERİSİ AYIKLANMIŞ özeti.
//
// Başvurunun kendisi (ad, telefon, adres, TC) Turhost'taki panele ve Telegram
// bildirimine gider; buradan Gespa OS'e YALNIZ sayılabilir alanlar gönderilir:
// il, ilçe, paket, aylık tutar, kaynak, kapsama durumu. Böylece Gespa OS
// "bugün kaç başvuru geldi, nereden, hangi paket" sorusunu yanıtlayabilir.
//
// Railway → Variables (ikisi de yoksa hiçbir şey yapılmaz):
//   OS_INGEST_URL   = Gespa OS adresi (ör. https://os.gespaenerji.com)
//   OS_INGEST_TOKEN = Gespa OS'teki ORDER_INGEST_TOKEN ile AYNI (≥32 karakter)
//
// Gönderim başvuru akışını asla bloklamaz/bozamaz (fire-and-forget, bir kez
// yeniden dener — Gespa OS uyuyorsa ilk istek zaman aşımına düşebilir).

const TIMEOUT_MS = 20000;

const str = (v: unknown, max: number): string | null =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

/** Gespa OS'e giden kayıt — ad, telefon, adres, not, IP BURAYA EKLENMEZ. */
export function applicationRecord(body: Record<string, unknown>, result: Record<string, unknown>) {
  const price = Number(body.monthly_price);
  const token = str(result.token, 200);
  return {
    // Başvuru kodunun ilk 12 hanesi (Telegram bildirimindekiyle aynı kısaltma)
    ref: token ? token.slice(0, 12) : `ib-${Date.now()}`,
    createdAt: new Date().toISOString(),
    city: str(body.il, 60),
    district: str(body.ilce, 60),
    package: str(body.package_name, 120),
    monthlyTL: Number.isFinite(price) && price > 0 ? price : null,
    source: str(body.source, 60),
    coverage: str(result.coverage_status, 40),
    covered: typeof result.is_covered === 'boolean' ? result.is_covered : null,
  };
}

async function post(url: string, token: string, payload: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Ingest-Token': token },
      body: payload,
      signal: controller.signal,
    });
    if (!res.ok) console.error('Gespa OS defteri:', res.status);
    return res.ok;
  } catch (err) {
    console.error('Gespa OS defteri hata:', (err as Error)?.name || err);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export function notifyOs(body: Record<string, unknown>, result: Record<string, unknown>): void {
  const base = (process.env.OS_INGEST_URL || '').trim().replace(/\/+$/, '');
  const token = (process.env.OS_INGEST_TOKEN || '').trim();
  if (!base || token.length < 32) return;
  try {
    const payload = JSON.stringify({ site: 'internetbasvuru', applications: [applicationRecord(body, result)] });
    const url = `${base}/api/ingest/applications`;
    void post(url, token, payload).then(ok => (ok ? true : post(url, token, payload)));
  } catch {
    /* defter başvuruyu asla bozmaz */
  }
}
