import { NextRequest, NextResponse } from 'next/server';
import { notifyTelegram, formatExtendMessage } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.token) {
      return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 400 });
    }

    const backendUrl = (process.env.BACKEND_API_URL || 'https://api.internetbasvuru.com/lead.php').replace('lead.php', 'lead-extend.php');
    const secretKey = process.env.BACKEND_API_KEY || '';

    const upstream = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': secretKey,
      },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    // Ek bilgiler için de Telegram bildirimi (env tanımlıysa; akışı bloklamaz)
    notifyTelegram(formatExtendMessage(body));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
