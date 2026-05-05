# 🚀 internetbasvuru.com — TAM REPO YENİDEN YÜKLEME

## ⚠️ ÖNCE OKU — ZIP'i NASIL AÇACAKSIN

ZIP'i açarken **MUTLAKA** "Extract All" / "Tümünü Çıkart" yap.
ÇİFT TIKLAYIP içine girip dosya tek tek kopyalama, klasör yapısı bozulur!

### Windows İçin Adım Adım:

1. ZIP'e SAĞ TIK → "Tümünü Çıkart..." 
2. Hedef: Masaüstü
3. Çıkartınca bir klasör oluşacak (örn: "internetbasvuru-tam-repo")
4. O klasörü AÇARSA görmen gereken:
   📁 app/
   📁 components/
   📁 data/
   📁 public/
   📄 package.json
   📄 next.config.js
   📄 nixpacks.toml
   📄 railway.json
   📄 ... (diğer config dosyaları)

## 📋 KURULUM ADIMLARI

### Adım 1: Repo Klasörünü Tamamen Boşalt

GitHub Desktop → Repository → Show in Explorer

Repo klasöründe **HER ŞEYİ SİL** (sadece `.git/` klasörü kalsın):

```
❌ HEPSİNİ SİL:
   - app/, components/, data/, lib/, public/ (varsa)
   - node_modules/ (varsa)
   - .next/ (varsa)
   - package.json, package-lock.json
   - next.config.js, nixpacks.toml, railway.json
   - tsconfig.json, tailwind.config.ts, postcss.config.js
   - .env.example, .gitignore, .gitattributes
   - README.md
   - SILINECEK-DOSYALAR.md (önceki deneme)
   - README-INTEGRATION.md (önceki deneme)
   - ApplyModal.tsx, CompactPackageCard.tsx, PackageCard.tsx
     (kök klasördeki tüm artık dosyalar)
   - Yani GÖRDÜĞÜN HER ŞEY SİLİNECEK

✅ KORUNAN: SADECE .git/ klasörü (gizli, görünmez olabilir)
```

**.git/ klasörünü görmek için:**
- Windows: Görünüm → Gizli öğeler işaretle
- O zaman gri renkte ".git" görürsün, DOKUNMA

### Adım 2: ZIP'i Çıkart, İçeriğini Kopyala

1. ZIP'i Extract All yap (yukarıdaki yöntem)
2. Çıkan klasörü aç
3. **İÇİNDEKİ TÜM klasörleri ve dosyaları SEÇ** (Ctrl+A)
4. Ctrl+C kopyala
5. Boşalttığın repo klasörüne git
6. Ctrl+V yapıştır

Şu an repo klasöründe görmen gereken:
```
.git/                    (gizli, dokunulmadı)
app/
components/
data/
public/
package.json
next.config.js
nixpacks.toml
railway.json
postcss.config.js
tailwind.config.ts
tsconfig.json
package-lock.json
next-env.d.ts
.env.example
.gitignore
.gitattributes
README.md
DEPLOY-OKUMA.md          (bu dosya)
```

### Adım 3: GitHub Desktop'ta Değişiklikleri Gör

Sol panelde GitHub Desktop **çok sayıda** değişiklik gösterecek:
- ➕ Added: Yeni dosyalar (app/page.tsx, components/Hero.tsx, vs)
- 🗑️ Deleted: Eski dosyalar (eğer varsa)
- ✏️ Modified: package.json, vs

Bu normal — komple yenileme.

### Adım 4: Commit & Push

GitHub Desktop sol alt:

**Summary:**
```
Tam yenileme: TT cobrand + Wizard + sade rehber/iletisim
```

**Description (opsiyonel):**
```
- Yeni TT mavi tema (#009ADA)
- 81 il + akıllı kampanya (Manavgat/Alanya/Kepez/Muratpaşa bölgesel)
- 5 adımlı Wizard
- Hero + PackageGrid (3 popüler / 9 tümü)
- LeadModal
- /rehber ve /iletisim yenilendi
- WhatsAppFloat kaldırıldı, Header'a buton eklendi
- Sayfalar: /, /rehber, /iletisim (8 route)
```

→ **Commit to main** → **Push origin**

### Adım 5: Railway Otomatik Deploy

2-3 dakika bekle. Railway dashboard'da build logs:

```
✓ Compiled successfully
✓ Generating static pages (8/8)
✓ Server started
```

### Adım 6: Test

```
https://www.internetbasvuru.com → Ctrl+Shift+R (hard refresh)
```

Görmen gerekenler:
- ✅ Üst dealer-strip (siyah, TT mavi yeşil dot)
- ✅ Header: "internetbaşvuru" + TT logosu + WhatsApp yeşil buton
- ✅ Hero: "Türk Telekom Fiber Hızını Keşfetmeye Hazır Mısın?"
- ✅ 3 popüler paket / 9 tümü toggle
- ✅ "Bu Paketi Seç" → modal
- ✅ Aşağı: Akıllı Yönlendirme wizard (siyah arka plan)
- ✅ Footer: TT logosu + sade linkler

### Adım 7: Form Testi

#### Wizard Testi:
1. Antalya / Manavgat seç → "✨ Bölgesel Avantaj" mesajı
2. Devam → orta kullanım → sadece internet
3. 300 Mbps gör (~950₺) → seç
4. Bilgileri doldur (test verileriyle)
5. Gönder → "Başvurunuz alındı"

#### Modal Testi:
1. Ana sayfada "Bu Paketi Seç" → modal aç
2. İl/ilçe seç (ör: İzmir/Konak)
3. Bilgileri doldur, gönder
4. ✅

#### Admin Testi:
1. https://admin.internetbasvuru.com
2. Login → başvurular göründü mü?

## 🆘 SORUN OLURSA

### Build hata verdi:
- Railway dashboard → Deployments → Build Logs oku
- Hata satırını bana yapıştır

### Eski tasarım çıkıyor:
- Hard refresh: Ctrl+Shift+R
- Gizli sekme aç → orada test et
- Hala eskiyse: Railway logs'da deploy başarılı mı?

### Form 502 / Çalışmıyor:
- Railway → Variables sekmesi:
  - `BACKEND_API_URL` = `https://api.internetbasvuru.com/lead.php` ✅
  - `BACKEND_API_KEY` = (32+ karakter) ✅
  - `NODE_TLS_REJECT_UNAUTHORIZED` = `0` ✅

### TT logosu görünmüyor:
- Otomatik fallback: "TÜRK TELEKOM" yazısı görünür (sorun değil)
- Tam kapatmak için: components/TTLogo.tsx → `BRAND_ASSETS_ENABLED = false`

## 📁 YAPI ÖZETİ

```
internetbasvuru/
├── app/
│   ├── api/
│   │   ├── lead/route.ts           (form backend)
│   │   └── lead/extend/route.ts
│   ├── iletisim/page.tsx           (sade tasarım)
│   ├── rehber/page.tsx             (6 makale + CTA)
│   ├── globals.css                 (TT mavi tema)
│   ├── layout.tsx                  (no WhatsAppFloat)
│   ├── page.tsx                    (Hero+Grid+Wizard+Modal)
│   ├── robots.ts
│   └── sitemap.ts                  (3 sayfa)
├── components/
│   ├── Footer.tsx                  (TT block)
│   ├── Header.tsx                  (TT cobrand + WhatsApp)
│   ├── Hero.tsx
│   ├── LeadModal.tsx
│   ├── PackageGrid.tsx
│   ├── TTLogo.tsx
│   └── Wizard.tsx
├── data/
│   ├── packages.ts                 (akıllı kampanya)
│   └── turkey.ts                   (81 il)
├── public/
│   └── robots.txt
├── package.json                    (Next 15.5 + React 18)
├── next.config.js                  (standalone output)
├── nixpacks.toml                   (Railway build)
├── railway.json                    (deploy config)
├── tailwind.config.ts              (TT mavi paleti)
├── tsconfig.json
├── postcss.config.js
└── .env.example, .gitignore, vs.
```

## 🎯 İmza

Bu temiz başlangıç sonrası:
- ✅ 0 artık dosya
- ✅ 0 build hatası riski
- ✅ Sadece kullanılan kod
- ✅ Doğru klasör yapısı
