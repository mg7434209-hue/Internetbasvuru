import Link from 'next/link';
import { Zap, Wifi, Tv } from 'lucide-react';
import type { Package } from '@/data/packages';
import { getEffectivePrice, getPackageSlug } from '@/data/packages';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: Package;
  campaignName?: string;
  highlight?: boolean;
}

export default function PackageCard({ pkg, campaignName, highlight }: PackageCardProps) {
  const price = getEffectivePrice(pkg);
  const isTivibu = pkg.hasTv;
  const speedTier = pkg.speedMbps >= 500 ? 'high' : pkg.speedMbps >= 100 ? 'mid' : 'low';

  return (
    <div className={cn(
      'card relative overflow-hidden p-5 md:p-6 flex flex-col',
      highlight && 'ring-2 ring-accent-500 shadow-xl shadow-accent-500/10'
    )}>
      {highlight && (
        <div className="absolute -top-px right-4 badge-accent !rounded-t-none !rounded-b-lg">
          ★ Popüler
        </div>
      )}

      {isTivibu && (
        <div className="absolute top-4 left-4 badge-prime">
          <Tv className="w-3 h-3" />
          TV Dahil
        </div>
      )}

      {/* Hız */}
      <div className={cn(
        'flex items-baseline gap-1.5 mb-1',
        isTivibu && 'mt-6'
      )}>
        <span className="text-4xl md:text-5xl font-extrabold text-ink-900 tracking-tight leading-none">
          {pkg.speedMbps}
        </span>
        <span className="text-base font-semibold text-ink-500">Mbps</span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-ink-500 mb-4">
        {speedTier === 'high' && <Zap className="w-3.5 h-3.5 text-accent-500" />}
        <Wifi className="w-3.5 h-3.5" />
        <span className="font-medium">Limitsiz Fiber</span>
      </div>

      {/* Fiyat */}
      <div className="border-t border-ink-200 pt-4 mb-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-accent-500 leading-none">
            {price.display}
          </span>
          <span className="text-sm text-ink-500 font-medium">/ay</span>
        </div>
        <p className="text-xs text-ink-500 mt-1">{price.note}</p>

        {pkg.priceLastPeriod && pkg.priceFirstPeriod && (
          <p className="text-[11px] text-ink-400 mt-1">
            Son dönem: {pkg.priceLastPeriod}₺/ay
          </p>
        )}
      </div>

      {/* Detaylar */}
      <div className="space-y-1.5 text-xs text-ink-600 mb-5 flex-1">
        <div className="flex items-center justify-between">
          <span>Taahhüt süresi</span>
          <span className="font-semibold text-ink-800">{pkg.commitmentMonths} ay</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Modem ücreti</span>
          <span className="font-semibold text-ink-800">+{pkg.modemFee}₺/ay</span>
        </div>
        {campaignName && (
          <div className="flex items-center justify-between">
            <span>Kampanya</span>
            <span className="font-semibold text-brand-700 text-right">{campaignName}</span>
          </div>
        )}
      </div>

      <Link
        href={`/paketler/${getPackageSlug(pkg)}`}
        className="btn-primary w-full !py-3 text-sm justify-center"
      >
        Detay ve Başvur
      </Link>
    </div>
  );
}
