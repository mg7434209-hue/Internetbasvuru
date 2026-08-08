import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Ziyaretçi sayacı — footer rozeti (components/VisitorCounter.tsx) buradan okur.
// Gerçek ziyaretleri sayar: çerezi olmayan her tarayıcı günde 1 kez sayılır,
// bilinen botlar sayılmaz. Gösterilen toplam = BASE + sunucu sayacı.
// Sayaç DATA_DIR/visitors.json dosyasında kalıcıdır (Railway'de Volume bağlanıp
// DATA_DIR verilirse dağıtımlar arası korunur; yoksa dağıtımda sıfırlanabilir —
// o durumda BASE son görülen toplama çekilerek taşınır, sayaç geriye düşmez).

const BASE = Number(process.env.VISITORS_BASE) || 1000; // taban: yayına alınana kadarki tahmini ziyaret
const COOKIE = 'ib_v';
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // son 5 dk içinde istek atan = "şu an sitede"
const BOT_RE =
  /bot|crawl|spider|slurp|preview|scan|monitor|probe|fetch|curl|wget|python|node-fetch|axios|headless|lighthouse|pingdom|facebookexternal|whatsapp|telegram/i;

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), '.data');
const FILE = path.join(DATA_DIR, 'visitors.json');

// Modül düzeyi durum — standalone tek süreçte yaşar; dosya sadece kalıcılık için
let total = -1; // -1 = dosyadan henüz okunmadı
let saveTimer: NodeJS.Timeout | null = null;
const online = new Map<string, number>(); // ip → son istek zamanı

function load(): void {
  if (total >= 0) return;
  try {
    total = Number(JSON.parse(fs.readFileSync(FILE, 'utf8')).total) || 0;
  } catch {
    total = 0;
  }
}

function save(): void {
  if (saveTimer) return; // yazımlar 2 sn'de bire toplanır
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(FILE, JSON.stringify({ total, saved: new Date().toISOString() }));
    } catch {
      /* disk yazılamazsa sayaç bellekte devam eder */
    }
  }, 2000);
}

function onlineCount(): number {
  const now = Date.now();
  for (const [ip, t] of online) if (now - t > ONLINE_WINDOW_MS) online.delete(ip);
  return online.size;
}

export async function GET(req: NextRequest) {
  load();

  const ua = req.headers.get('user-agent') || '';
  const isBot = !ua || BOT_RE.test(ua);
  if (!isBot) {
    const ip =
      req.headers.get('cf-connecting-ip') ||
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'unknown';
    online.set(ip, Date.now());
  }

  const counted = req.cookies.get(COOKIE)?.value === '1';
  const shouldCount = !isBot && !counted;
  if (shouldCount) {
    total++;
    save();
  }

  const res = NextResponse.json(
    { total: BASE + total, online: onlineCount() },
    { headers: { 'Cache-Control': 'no-store' } }
  );
  if (shouldCount) {
    res.cookies.set(COOKIE, '1', { maxAge: 86400, path: '/', sameSite: 'lax' });
  }
  return res;
}
