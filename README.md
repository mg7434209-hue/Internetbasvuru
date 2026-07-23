# internetbasvuru.com — Turkcell Superbox Başvuru Sitesi

**Son köklü değişiklik:** 18 Temmuz 2026 — Türk Telekom sürümünden **Turkcell
Superbox** sürümüne tam dönüşüm. Eski sürümün birebir yedeği:
[`yedek/turk-telekom-v1/`](yedek/turk-telekom-v1/) (bkz. içindeki `YEDEK-OKUMA.md`).

## Ne var?

Turkcell Superbox (kablosuz 4.5G/5G evde internet) başvuru sitesi.
Yetkili satış noktası sitesi olarak çalışır.

- **Superbox 5G Hazır** — 500 GB (900 TL/ay) · 1 TB (1.200 TL/ay) · 2 TB (1.500 TL/ay), 12 ay taahhüt
- **Superbox 4.5G** — 100 GB→150 GB (790 TL/ay) · 300 GB→350 GB (1.000 TL/ay) · 1 TB (1.500 TL/ay)
  (+50 GB hediye internet gösterilen kotaya dahil)
- Ortak vaatler: Alt yapı derdi yok · Tek priz yeterli · 12 ay sabit fiyat · Aşım derdi yok
- Her kartta **Hemen Başvur** (online form) + **Akıllı Yönlendirme sihirbazı**
  (il/ilçe + kullanım profili + 5G kapsama → paket önerisi)
- Mobilde ilk açılışta tarifeler görünür; tanıtım metni (Hero) alta iner
- **Başvuru akışı** — LeadModal (2 adımlı) + Wizard, `/api/lead` üzerinden backend'e proxy
- KVKK uyumlu çerez onayı, GA4/Ads altyapısı, JSON-LD (LocalBusiness + WebSite + FAQPage), PWA manifest

## Marka / tasarım

- Turkcell renkleri: **Parlament Mavisi `#2856A5`** (header, fiyatlar, 5G kartları),
  **Sarı `#FFC900`** (CTA — üzerinde koyu lacivert metin), **Yeşil `#00A876`** (4.5G kartları)
  (`tailwind.config.ts` → `brand`, `accent`, `sb-green`, `tc-navy`)
- Logo ve tüm ikonlar kod ile üretilir (dış görsel yok):
  `components/TurkcellLogo.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`

## Teknik

Next.js 15 (App Router, `output: standalone`) + Tailwind CSS + TypeScript.

```bash
npm install
npm run dev     # geliştirme (http://localhost:3000)
npm run build   # üretim derlemesi (standalone)
npm start       # üretim sunucusu
```

Railway'de `railway.json`/`nixpacks.toml` ile yayınlanır. Ortam değişkenleri
için `.env.example` dosyasına bakın (hiçbiri yokken site sorunsuz çalışır).

> Paket verisi tek dosyada: `data/packages.ts` — fiyat/kota güncellemeleri
> yalnızca orada yapılır.
