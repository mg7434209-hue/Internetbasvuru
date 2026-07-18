# 📦 internetbasvuru.com — Mega Paket

**Tarih:** 06 Mayıs 2026
**Kapsam:** Paket 2 (KVKK + Analytics) + Paket 3 (Mobil) + Paket 4 (SEO)
**Total dosya:** 14 dosya (10 yeni/güncel + 4 yardımcı)

---

## 🎯 Bu Pakette Neler Var?

### 📊 Paket 2: KVKK + Analitik
- ✅ KVKK uyumlu çerez onay banner'ı (Google Consent Mode v2)
- ✅ KVKK Aydınlatma Metni sayfası (`/kvkk`)
- ✅ Çerez Politikası sayfası (`/cerez-politikasi`)
- ✅ Google Analytics 4 + Google Ads conversion tracking altyapısı
- ✅ Footer + İletişim sayfası (telefon kaldırıldı, WhatsApp + form)

### 📱 Paket 3: Mobil İyileştirme
- ✅ Tüm tıklanabilir öğelerde min 44px touch hedef
- ✅ iOS Safari tap highlight kaldırıldı
- ✅ iOS auto-zoom önleme (input font-size 16px+)
- ✅ Safe-area-inset desteği (iPhone X+ notch alanı)
- ✅ Viewport `interactive-widget=resizes-content` (klavye fix)
- ✅ Toast bildirim sistemi (kullanıcı feedback'i)
- ✅ Wizard.tsx silent failure düzeltildi
- ✅ `prefers-reduced-motion` desteği (WCAG)

### 🔍 Paket 4: SEO Sıkılaştırma
- ✅ robots.txt (Googlebot + ClaudeBot + GPTBot allow, scraper'lar block)
- ✅ JSON-LD genişletildi: LocalBusiness + WebSite + FAQPage
- ✅ openingHoursSpecification + areaServed
- ✅ Apple touch + iOS web app meta'ları
- ✅ Open Graph + Twitter Card
- ✅ Sitemap güncellemesi (KVKK + Çerez sayfaları)
- ✅ Geo coordinates (Manavgat/Antalya)

---

## 📂 Dosya Listesi

### 🆕 Yeni Dosyalar (8)

| Dosya | Amaç |
|-------|------|
| `lib/analytics.ts` | GA4 + Ads tracking helpers + consent yönetimi |
| `components/Analytics.tsx` | GA4/Ads script loader + consent mode v2 |
| `components/CookieConsent.tsx` | KVKK çerez banner (mobil dostu) |
| `components/Toast.tsx` | Kullanıcı bildirim sistemi |
| `app/kvkk/page.tsx` | KVKK Aydınlatma Metni |
| `app/cerez-politikasi/page.tsx` | Çerez Politikası sayfası |
| `app/iletisim/page.tsx` | İletişim sayfası (telefonsuz) |
| `public/robots.txt` | SEO crawler kuralları |

### 🔄 Güncellenen Dosyalar (5)

| Dosya | Değişiklik |
|-------|-----------|
| `app/layout.tsx` | Analytics + JSON-LD + viewport fix + iOS meta |
| `app/globals.css` | Touch hedefleri + iOS düzeltmeleri + reduce-motion |
| `app/sitemap.ts` | KVKK + Çerez sayfaları eklendi |
| `components/Footer.tsx` | Telefon kaldırıldı, KVKK/Çerez linkleri eklendi |
| `components/Wizard.tsx` | Silent failure düzeltildi + mobil iyileştirme |

### 📋 Yardımcı Dosyalar

| Dosya | Amaç |
|-------|------|
| `.env.example` | Tüm env var'ların dokümantasyonu |
| `components/LeadModal.tsx` | Mevcut çalışan LeadModal (referans için) |

---

## 🚀 Deploy Adımları

### 1. GitHub'a Yükle (web UI ile)

Tek tek aşağıdaki dosyaları hedef konumlarına yükle/üzerine yaz:

```
mega-paket/lib/analytics.ts          → lib/analytics.ts
mega-paket/components/Analytics.tsx  → components/Analytics.tsx
mega-paket/components/CookieConsent.tsx → components/CookieConsent.tsx
mega-paket/components/Toast.tsx      → components/Toast.tsx
mega-paket/components/Footer.tsx     → components/Footer.tsx
mega-paket/components/Wizard.tsx     → components/Wizard.tsx
mega-paket/components/LeadModal.tsx  → components/LeadModal.tsx (zaten elinde olan)
mega-paket/app/layout.tsx            → app/layout.tsx
mega-paket/app/globals.css           → app/globals.css
mega-paket/app/sitemap.ts            → app/sitemap.ts
mega-paket/app/kvkk/page.tsx         → app/kvkk/page.tsx
mega-paket/app/cerez-politikasi/page.tsx → app/cerez-politikasi/page.tsx
mega-paket/app/iletisim/page.tsx     → app/iletisim/page.tsx (üzerine yaz)
mega-paket/public/robots.txt         → public/robots.txt
mega-paket/.env.example              → .env.example (üzerine yaz)
```

**Önerilen sıralama:** `lib/` → `components/` → `app/` → `public/`

**Commit mesajı:**
```
feat: paket 2-3-4 entegrasyon - KVKK + mobil + SEO sıkılaştırma
```

### 2. Railway Deploy (otomatik)

GitHub'a push ettikten ~2 dakika sonra Railway otomatik deploy yapar.

### 3. Env Variables (opsiyonel)

Railway dashboard → Settings → Variables:

```bash
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX        # GA4'ten al
NEXT_PUBLIC_GADS_CONVERSION_ID=AW-XXX  # Google Ads'ten al
NEXT_PUBLIC_GADS_LEAD_LABEL=abc123     # Conversion action'dan al
NEXT_PUBLIC_GOOGLE_VERIFICATION=...    # Search Console'dan al
```

⚠️ **Hiçbiri yokken site sorunsuz çalışır** — analytics devre dışı, banner yine görünür.

---

## 🧪 Test Senaryoları

### Cookie Banner

| Test | Beklenen |
|------|----------|
| Site ilk açıldı | Banner alttan slide-in ile gelir |
| "Reddet" tıklandı | Banner kapanır, GA hiç çalışmaz |
| "Tümünü Kabul Et" | Banner kapanır, GA + Ads aktif olur |
| "Tercihler" → analitik aç | Sadece GA aktif, Ads kapalı |
| 6 ay sonra tekrar gir | Banner tekrar gelir (TTL) |

### Wizard.tsx Silent Failure

| Test | Beklenen |
|------|----------|
| Backend 200 OK döner | Step 6 success ekranı |
| Backend 500 döner | Kırmızı hata kutusu, kullanıcı tekrar deneyebilir |
| Network kesik | "Bağlantı hatası" mesajı |

### Mobile (iPhone)

| Test | Beklenen |
|------|----------|
| Form input'a tıkla | Sayfa zoom olmaz (16px font) |
| Modal açıkken klavye geldi | Buton görünür kalır (interactive-widget) |
| Cookie banner | Safe-area altında kalmaz, üstündedir |
| Tüm butonlar | Min 44px yükseklik |

### SEO

| Test | Beklenen |
|------|----------|
| `/robots.txt` aç | Crawler kuralları görünür |
| `/sitemap.xml` aç | 4 URL listelenir |
| Sayfa kaynağı view | 3 JSON-LD script görünür (Organization, WebSite, FAQPage) |
| Google Rich Results Test | FAQPage ve LocalBusiness valid çıkar |

**Rich Results Test:** https://search.google.com/test/rich-results?url=https%3A%2F%2Finternetbasvuru.com

---

## 📝 Sonraki Adımlar

1. **Test (sen)**:
   - iPhone'da gerçek test (cookie banner, modal, wizard)
   - Lighthouse mobile score (>90 hedef)
   - Rich Results Test

2. **Env Vars (sen, Google'da hazırlayınca)**:
   - GA4 hesap oluştur → ID al → Railway'e ekle
   - Google Ads → Conversion oluştur → ID + Label al
   - Search Console → site doğrula → meta kodu al

3. **Sonraki Geliştirmeler** (gelecekte):
   - 0850 hat alındığında Header + Footer + JSON-LD'ye phone ekle
   - `formatDetection.telephone: true` yap
   - OG image üret (`/opengraph-image.png` route ile dinamik)
   - Mobile navigation drawer (hamburger menü)
