import { ImageResponse } from 'next/og';

// Apple touch icon — Turkcell Superbox teması (kod ile üretilir)
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFC900',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48">
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
    ),
    { ...size }
  );
}
