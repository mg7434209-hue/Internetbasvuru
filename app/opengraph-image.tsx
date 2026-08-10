import { ImageResponse } from 'next/og';

// Open Graph / sosyal paylaşım görseli — Turkcell Superonline / Superbox teması
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Turkcell Superbox Başvurusu — Yetkili Satış Noktası';

const HOLE = '#1E4489';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #1E4489 0%, #0C1B36 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginBottom: 48,
          }}
        >
          <svg width="110" height="110" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="#FFC900" />
            <g fill={HOLE}>
              <circle cx="41" cy="28" r="9" />
              <path d="M35,34 C27,46 17,58 4,68 C7,58 12,49 18,41 C23,34 28,30 33,27 Z" />
              <circle cx="66" cy="44" r="9" />
              <path d="M60,50 C50,64 34,78 15,88 C21,77 30,66 41,56 C47,51 53,47 59,44 Z" />
            </g>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: 1 }}>TURKCELL</div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 8,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              SUPERONLINE
            </div>
          </div>
        </div>

        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, maxWidth: 1000 }}>
          Superbox — Kablosuz Evde İnternet, 5G Hızında
        </div>
        <div style={{ fontSize: 30, marginTop: 28, color: 'rgba(255,255,255,0.75)' }}>
          12 ay sabit fiyat · Aşım derdi yok · internetbasvuru.com
        </div>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          Yetkili Satış Noktası · Antalya / Manavgat Bölgesi
        </div>
      </div>
    ),
    { ...size }
  );
}
