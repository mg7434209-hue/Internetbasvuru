import { Check, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-[5%] pt-16 pb-12 text-center max-w-[1200px] mx-auto">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-[13px] font-bold mb-5 tracking-wide">
        <Zap className="w-3.5 h-3.5" />
        Türkiye geneli · Yetkili bayi desteği
      </div>

      {/* Heading */}
      <h1 className="text-hero font-extrabold mb-5 text-balance">
        Türk Telekom Fiber Hızını
        <br />
        <span className="text-brand-500">Keşfetmeye Hazır Mısın?</span>
      </h1>

      {/* Sub */}
      <p className="text-ink-500 text-lg max-w-[640px] mx-auto mb-8 leading-relaxed">
        Göksoylar İletişim güvencesiyle 18 ay sözleşmede sabit fiyat,
        ücretsiz kurulum ve enflasyon koruması — internetinizi bugün yükseltin.
      </p>

      {/* Trust badges */}
      <div className="flex justify-center gap-7 flex-wrap text-sm text-ink-500 font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          KVKK uyumlu
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          Ücretsiz kurulum
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          15 dk içinde dönüş
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-success" strokeWidth={3} />
          Yetkili bayi
        </span>
      </div>
    </section>
  );
}
