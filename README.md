# internetbasvuru.com — Turkcell Superbox Başvuru Sitesi

**Son köklü değişiklik:** 18 Temmuz 2026 — Türk Telekom sürümünden **Turkcell
Superbox** sürümüne tam dönüşüm. Eski sürümün birebir yedeği:
[`yedek/turk-telekom-v1/`](yedek/turk-telekom-v1/) (bkz. içindeki `YEDEK-OKUMA.md`).

## Ne var?

Turkcell Superbox (kablosuz 4.5G/5G evde internet) başvuru sitesi.
Göksoylar İletişim Ltd. Şti. yetkili satış noktası sitesi olarak çalışır.

- **Superbox Limitsiz paketler** — hız bazlı 9 kademe (16 Mbps – 5G 1000 Mbps),
  ilk 9 ay Hoş Geldin indirimi + 10-18. ay fiyatı, bölgesel kampanya desteği
  (Bölgesel Avantaj: Manavgat/Alanya/Kepez · Bölgesel Fırsat: Muratpaşa, 24 ay tek fiyat)
- **Superbox GB'li paketler** — ekonomik kotalı seçenekler (250 GB / 500 GB / Limitsiz),
  cihaz kiralama ve 5G kapsama seçimli
- **Akıllı Yönlendirme sihirbazı** — il/ilçe + kullanım profili + TV+ tercihine göre paket önerisi
- **Başvuru akışı** — LeadModal (2 adımlı) + Wizard, `/api/lead` üzerinden backend'e proxy
- KVKK uyumlu çerez onayı, GA4/Ads altyapısı, JSON-LD (LocalBusiness + WebSite + FAQPage), PWA manifest

## Marka / tasarım

- Turkcell renkleri: **Sarı `#FFC900`** (CTA — üzerinde koyu lacivert metin),
  **Lacivert `#0A2540`**, **Mavi `#005FB8`** (`tailwind.config.ts` → `accent`, `tc-navy`, `brand`)
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

> Dahili not: kodda `fiber` / `turbobox` tip anahtarları geriye dönük uyumluluk
> için korunmuştur (backend lead kayıtları bu alanları kullanır); arayüzde
> her yerde Superbox terminolojisi görünür.
