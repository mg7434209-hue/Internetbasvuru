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

    // Cloudflare geo header'larını oku
    const cfCountry = req.headers.get('cf-ipcountry') || '';
    const cfCity = req.headers.get('cf-ipcity') || '';
    const cfIp = req.headers.get('cf-connecting-ip') || '';

    // Forward to Turhost
    const upstream = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': secretKey,
        // Browser-like User-Agent — Cloudflare bot detection'ı bypass etmek için
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://internetbasvuru.com',
        // Cloudflare header'larını backend'e ilet
        ...(cfCountry && { 'CF-IPCountry': cfCountry }),
        ...(cfCity && { 'CF-IPCity': cfCity }),
        ...(cfIp && { 'CF-Connecting-IP': cfIp }),
      },
      body: JSON.stringify({
        ...body,
        // Body'de de gönder (header'a güvenmek için iki yedek)
        detected_country: body.detected_country || cfCountry || null,
        detected_city: body.detected_city || cfCity || null,
        ip: cfIp || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
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
    return NextResponse.json({
      ok: true,
      token: data.token,
      coverage_status: data.coverage_status,
      is_covered: data.is_covered,
      message: data.message,
    });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
