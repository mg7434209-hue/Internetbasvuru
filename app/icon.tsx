import { ImageResponse } from 'next/og';

// Turkcell Superbox favicon — sarı zemin, lacivert sinyal amblemi (kod ile üretilir)
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFC900',
          borderRadius: 14,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path
            d="M14 30a10 10 0 0 1 20 0"
            fill="none"
            stroke="#17356C"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path
            d="M9 30a15 15 0 0 1 30 0"
            fill="none"
            stroke="#17356C"
            strokeWidth="3.6"
            strokeLinecap="round"
            opacity="0.45"
          />
          <circle cx="24" cy="34" r="4.2" fill="#17356C" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
