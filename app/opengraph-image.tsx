import { ImageResponse } from 'next/og';

// Open Graph / sosyal paylaşım görseli — Turkcell Superbox teması (kod ile üretilir)
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Turkcell Superbox Başvurusu — Yetkili Satış Noktası';

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
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: '#FFC900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 48 48">
              <path
                d="M14 30a10 10 0 0 1 20 0"
                fill="none"
                stroke="#0A2540"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <path
                d="M9 30a15 15 0 0 1 30 0"
                fill="none"
                stroke="#0A2540"
                strokeWidth="3.6"
                strokeLinecap="round"
                opacity="0.45"
              />
              <circle cx="24" cy="34" r="4.2" fill="#0A2540" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 56, fontWeight: 800 }}>turkcell</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 10,
                color: '#FFC900',
              }}
            >
              SUPERBOX
            </div>
          </div>
        </div>

        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15, maxWidth: 980 }}>
          Kablosuz Evde İnternet — 5G Hızında
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
          Yetkili Satış Noktası · Türkiye Geneli Online Başvuru
        </div>
      </div>
    ),
    { ...size }
  );
}
