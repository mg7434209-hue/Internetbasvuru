'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

// Footer ziyaretçi rozeti — /api/visitors'tan gerçek sayıyı okur.
// Sayfa açılışında bir kez çağrılır; API aynı ziyaretçiyi (çerezle) günde 1 kez
// sayar. Yanıt gelene kadar hiçbir şey çizilmez (yer kaplamaz, zıplama olmaz).
export default function VisitorCounter() {
  const [data, setData] = useState<{ total: number; online: number } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/visitors', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (alive && d && typeof d.total === 'number') setData(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!data) return null;

  return (
    <p className="text-xs text-white/40 flex items-center gap-1.5 whitespace-nowrap">
      <Users className="w-3.5 h-3.5" aria-hidden="true" />
      <span>
        <b className="font-semibold text-white/60">
          {new Intl.NumberFormat('tr-TR').format(data.total)}
        </b>{' '}
        ziyaretçi
      </span>
      {data.online > 0 && (
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true">·</span>
          <span
            className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] motion-safe:animate-pulse"
            aria-hidden="true"
          />
          <span>{data.online} kişi şu an sitede</span>
        </span>
      )}
    </p>
  );
}
