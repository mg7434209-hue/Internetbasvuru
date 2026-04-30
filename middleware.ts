import { NextResponse, type NextRequest } from 'next/server';

// Cloudflare otomatik şu header'ları ekler:
// - cf-ipcountry: TR
// - cf-ipcity: Antalya
//
// Bu middleware request'e ek olarak custom header'lar ekleyerek
// frontend'in bu bilgilere erişebilmesini sağlar.

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const cfCountry = request.headers.get('cf-ipcountry') || '';
  const cfCity = request.headers.get('cf-ipcity') || '';
  const cfRegion = request.headers.get('cf-region') || '';

  // Custom header'lara forward et (server components okuyabilsin)
  if (cfCountry) response.headers.set('x-detected-country', cfCountry);
  if (cfCity) response.headers.set('x-detected-city', cfCity);
  if (cfRegion) response.headers.set('x-detected-region', cfRegion);

  return response;
}

export const config = {
  matcher: [
    // Sadece sayfa request'lerinde çalış, _next ve public dosyaları hariç
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
