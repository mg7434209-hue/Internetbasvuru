import { ImageResponse } from 'next/og';

// Apple touch icon — parlament mavisi zemin üzerinde stilize sarı Turkcell amblemi
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const HOLE = '#2856A5';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: HOLE,
        }}
      >
        <svg width="132" height="132" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="#FFC900" />
          <g fill={HOLE}>
            <circle cx="41" cy="28" r="9" />
            <path d="M35,34 C27,46 17,58 4,68 C7,58 12,49 18,41 C23,34 28,30 33,27 Z" />
            <circle cx="66" cy="44" r="9" />
            <path d="M60,50 C50,64 34,78 15,88 C21,77 30,66 41,56 C47,51 53,47 59,44 Z" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
