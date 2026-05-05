# Internetbasvuru.com — Paketler Sayfası v12

**Tarih:** Mayıs 2026
**Hedef:** /paketler sayfasını sade ve dönüşüm odaklı yeniden yapmak

---

## 🎯 Bu Pakette Ne Var?

8 dosya (3 yeni component + 1 yeni sayfa + 1 helper + 2 güncellenmiş + 1 config):

```
data/
  packages.ts              ← GÜNCELLENDİ (campaigns legacy export eklendi)
                              + getBolgeselIndirimMesaji() yeni fonksiyon

components/
  PackageCard.tsx          ← YENİ (premium kart, popüler 3 paket)
  CompactPackageCard.tsx   ← YENİ (kompakt kart, tüm 9 hız)
  PackageGrid.tsx          ← YENİ (toggle + container, modal yönetimi)
  ApplyModal.tsx           ← YENİ (başvuru modalı, bölgesel indirim mantığı)

lib/
  api.ts                   ← YENİ (lead submission helper, /api/lead'e POST)

app/paketler/
  page.tsx                 ← TAMAMEN YENİDEN YAZILDI

tailwind.config.ts         ← GÜNCELLENDİ (TT brand renkleri eklendi)
```

---

## 🔥 En Önemli Özellik: Bölgesel İndirim Sürpriz Mesajı

### Nasıl Çalışıyor?

1. Müşteri site'ye gelir, **TT resmi fiyatlarını** görür (örn. 100 Mbps = 850₺/ay)
2. "Bu Paketi Seç" butonuna basar → modal açılır
3. **İl + İlçe** seçer (örn. Antalya + Manavgat)
4. **Sessizce** background'da `getCampaignZone(il, ilce)` çağrılır
5. Eğer Manavgat/Alanya/Kepez/Muratpaşa ise → modal'da yumuşak yeşil "🎉 Bölgenize özel indirim tanımlı!" mesajı belirir
6. **Fiyat söylenmez** — "Sizi aradığımızda detayları paylaşacağız" denir
7. Müşteri form'u doldurmaya devam eder
8. Lead backend'e gider, içinde `bolge_indirimi_active: true` ve `bolge_indirimi_zone: 'bolgesel-avantaj'` field'ları olur
9. Bayi telefon görüşmesinde bu bilgiyi görür, gerçek bölgesel fiyatı sunar (775₺ vb.)

### Hangi Bölgeler Tetiklenir?

`data/turkey.ts` içindeki `campaigns` map'inden geliyor:

| İl | İlçe | Zone |
|---|---|---|
| Antalya | Manavgat | bolgesel-avantaj |
| Antalya | Alanya | bolgesel-avantaj |
| Antalya | Kepez | bolgesel-avantaj |
| Antalya | Muratpaşa | bolgesel-firsat |
| Diğer 81 il/ilçe | — | standart (mesaj çıkmaz) |

İleride başka bölgeler eklenmek istenirse `data/turkey.ts`'de `campaigns` objesine ekleme yeterli.

---

## 🚀 Deploy Adımları

### 1. Dosyaları Repon'a Kopyala

ZIP'i aç, içerikleri repon klasör yapısına direkt kopyala. Mevcut dosyalar üzerine yazılır:

- `data/packages.ts` — eski versiyonun **üzerine yazılır** (mevcut `campaigns` import'u çalışmaya devam eder, build kırılmaz)
- `tailwind.config.ts` — eski versiyonun **üzerine yazılır**
- `components/` — 4 yeni dosya (mevcut PackageCard yoktu, ekleniyor)
- `lib/api.ts` — yeni dosya
- `app/paketler/page.tsx` — eski versiyonun **üzerine yazılır**

### 2. data/turkey.ts DEĞİŞMİYOR

Senin reponda zaten doğru versiyon var, dokunulmasın. Pakete dahil etmedim.

### 3. Build Test (Lokal)

```bash
npm install
npm run dev
# http://localhost:3000/paketler aç
```

### 4. Backend Uyumluluğu

Mevcut `app/api/lead/route.ts` ve `lead.php` zaten JSON bekliyor, ek değişiklik gerekmez. Yeni alanlar gönderiliyor:
- `bolge_indirimi_active` (boolean) — admin panelde kritik
- `bolge_indirimi_zone` (string) — 'standart' | 'bolgesel-avantaj' | 'bolgesel-firsat'

**Backend tarafında DB'ye eklenmeli mi?** İsteğe bağlı — şimdilik ekstra alanlar olarak gelir, backend ignore edebilir. İstersen migration yazarım.

### 5. Commit + Push

```bash
git add .
git commit -m "feat(paketler): v12 - sade UI + bölgesel indirim sürpriz mantığı"
git push origin main
```

Railway otomatik deploy alır.

---

## 🧪 Test Senaryoları

### Standart akış (hiç indirim yok)
- Hız seç → "Bu Paketi Seç" → İl: İstanbul, İlçe: Kadıköy
- ✓ Yeşil "indirim var" mesajı **çıkmamalı**
- ✓ Form çalışmalı, lead gönderilmeli
- Lead'de `bolge_indirimi_active: false`

### Bölgesel Avantaj akış
- 100 Mbps "Bu Paketi Seç" → İl: Antalya, İlçe: Manavgat
- ✓ Yeşil "🎉 Manavgat'ta bu pakete özel kampanya..." mesajı **çıkmalı**
- ✓ Fiyat **değişmemeli** (modal hala 850₺ gösterir)
- ✓ Submit edildiğinde lead'de `bolge_indirimi_zone: 'bolgesel-avantaj'`

### Bölgesel Fırsat akış (24 ay)
- 300 Mbps "Bu Paketi Seç" → İl: Antalya, İlçe: Muratpaşa
- ✓ Yeşil "🎉 Muratpaşa'ta bu pakete özel 24 ay sabit fiyat..." mesajı çıkmalı
- ✓ Fiyat değişmemeli (resmi 950₺)

### Form validation
- Boş submit → buton disabled olmalı
- 3 karakterden kısa ad → buton disabled
- 9 haneli telefon → buton disabled
- KVKK işaretsiz → buton disabled

---

## ⚠️ Bilinen Eksiklikler / İleride

1. **Logo eklenmedi** — DM onayı bekliyor, sonra eklenecek (mockup v11'deki TT logo entegrasyonu hazır)
2. **Header / Footer dokunulmadı** — Bu pakette sadece /paketler sayfası kapsamda
3. **Mevcut /paketler/[slug] dinamik sayfaları** — Bu pakette ele alınmadı, hâlâ çalışıyor olmalı (data/packages.ts'in `allPackages` export'u var, yine erişilebilir)
4. **/kvkk linki** — Modal'daki "KVKK aydınlatma metnini" linki `/kvkk` route'una gidiyor, o sayfanın var olduğunu varsayıyoruz

---

## 🎨 Tasarım Tokens (tailwind.config.ts)

| Token | Renk | Kullanım |
|---|---|---|
| `brand-500` | #009ADA | TT mavisi, primary butonlar, featured kart border |
| `brand-700` | #00547B | Koyu mavi, hover stateleri |
| `ink-800` | #0F172A | Ana metin, secondary buton |
| `ink-400` | #64748B | Secondary metin, label |
| `accent-500` | #FF6B00 | Turuncu CTA (gerekirse) |
| `success-500` | #059669 | Bölge indirim badge'i, KVKK check |

---

Sorularını, önerilerini, bug raporlarını WhatsApp'tan ilet.
İyi deploy'lar 🚀
