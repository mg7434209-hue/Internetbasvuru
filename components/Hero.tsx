import { Check, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-[5%] pt-16 pb-12 text-center max-w-[1200px] mx-auto">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-tc-navy text-[13px] font-bold mb-5 tracking-wide">
        <Zap className="w-3.5 h-3.5" />
        Antalya · Manavgat · Turkcell yetkili satış noktası
      </div>

      {/* Heading */}
      <h1 className="text-hero font-extrabold mb-5 text-balance">
        Turkcell Superbox ile
        <br />
        <span className="text-brand-500">Kablosuz Evde İnternet Özgürlüğü</span>
      </h1>

      {/* Sub */}
      <p className="text-ink-500 text-lg max-w-[640px] mx-auto mb-8 leading-relaxed">
        Altyapı ve kablo beklemeden, tek prizle çalışan Superbox: 5G hızında
        sabit evde internet veya taşınabilir 4.5G ile evde ve yanınızda.
        12 ay sabit fiyat, aşım derdi yok — bugün başvurun.
      </p>

      {/* Trust badges */}
      <div className="flex justify-center gap-7 flex-wrap text-sm text-ink-500 font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          KVKK uyumlu
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          Tek priz yeterli · altyapı derdi yok
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          15 dk içinde dönüş
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          Yetkili satış noktası
        </span>
      </div>
    </section>
  );
}
