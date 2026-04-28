import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.name || !body.phone || !body.kvkk_consent) {
      return NextResponse.json(
        { ok: false, error: 'missing_fields' },
        { status: 400 }
      );
    }

    // Turhost PHP backend'e proxy
    const backendUrl = process.env.BACKEND_API_URL || 'https://api.internetbasvuru.com/lead.php';
    const secretKey = process.env.BACKEND_API_KEY || '';

    // Forward to Turhost
    const upstream = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': secretKey,
      },
      body: JSON.stringify({
        ...body,
        // İstemci IP (KVKK için hash'lenecek backend tarafında)
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
        user_agent: req.headers.get('user-agent') || '',
        referer: req.headers.get('referer') || '',
      }),
    });

    if (!upstream.ok) {
      console.error('Backend error:', upstream.status);
      return NextResponse.json(
        { ok: false, error: 'backend_failed' },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    return NextResponse.json({ ok: true, token: data.token });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
