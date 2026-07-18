import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rehber',
  description:
    'Turkcell Superbox, 5G evde internet, kotalı/limitsiz paket seçimi, cihaz kurulumu, TV+ ve daha fazlası hakkında detaylı rehber yazıları.',
  alternates: { canonical: 'https://internetbasvuru.com/rehber' },
};

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const articles: Article[] = [
  {
    slug: 'superbox-nedir',
    title: 'Turkcell Superbox Nedir, Nasıl Çalışır?',
    excerpt:
      'Kablosuz evde internetin çalışma mantığı, kimler için uygun olduğu ve kablolu internete göre avantajları.',
    category: 'Teknoloji',
    readTime: '4 dk',
    date: '2026-07-01',
  },
  {
    slug: 'superbox-kapsama-sorgulama',
    title: 'Superbox Kapsama Alanı Sorgulama Nasıl Yapılır?',
    excerpt:
      'Adresinizde 5G veya 4.5G Superbox kapsaması olup olmadığını öğrenmenin yolları ve zayıf sinyal durumunda seçenekler.',
    category: 'Başvuru',
    readTime: '3 dk',
    date: '2026-06-28',
  },
  {
    slug: 'taahhut-suresi-rehberi',
    title: 'İnternet Taahhüt Süresi: 12, 18, 24 Ay?',
    excerpt:
      'Hangi taahhüt süresi size daha avantajlı? Kampanya fiyatlarıyla ömür boyu maliyet hesabı.',
    category: 'Fiyatlandırma',
    readTime: '5 dk',
    date: '2026-06-25',
  },
  {
    slug: 'superbox-cihaz-kiralama-vs-satin-alma',
    title: 'Superbox Cihazı Kiralama mı, Kendi Cihazın mı?',
    excerpt:
      'Aylık cihaz kiralama ücreti ile kendi uyumlu 5G/4.5G cihazınızı kullanmanın avantaj ve dezavantajları.',
    category: 'Teknoloji',
    readTime: '4 dk',
    date: '2026-06-20',
  },
  {
    slug: 'tv-plus-nedir',
    title: 'TV+ ile İnternet: TV + İnternet Birlikte',
    excerpt:
      'Turkcell TV+ platformu, kanal paketleri, cihaz gereksinimleri ve gerçek kullanıcı deneyimi.',
    category: 'TV Paketleri',
    readTime: '6 dk',
    date: '2026-06-15',
  },
  {
    slug: 'gb-mi-limitsiz-mi',
    title: 'GB\'li Paket mi, Limitsiz mi? Hangi Superbox Paketi Yeterli?',
    excerpt:
      'Hane halkı sayısı, kullanım alışkanlıkları ve cihaz sayısına göre kotalı mı limitsiz mi; 50 mi 200 mü 1000 Mbps mi?',
    category: 'Teknoloji',
    readTime: '5 dk',
    date: '2026-06-10',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Teknoloji: 'bg-brand-50 text-brand-700',
  Başvuru: 'bg-prime-100 text-success',
  Fiyatlandırma: 'bg-accent-100 text-accent-800',
  'TV Paketleri': 'bg-purple-50 text-purple-700',
};

export default function RehberPage() {
  return (
    <div className="bg-ink-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-[5%]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-tc-navy text-[13px] font-bold mb-4 tracking-wide">
            <BookOpen className="w-3.5 h-3.5" />
            Bilgi Rehberi
          </div>
          <h1 className="text-display font-extrabold mb-3 text-balance">
            Turkcell Superbox <span className="text-brand-500">Rehberleri</span>
          </h1>
          <p className="text-ink-500 max-w-xl mx-auto leading-relaxed">
            Kablosuz evde internet, taahhüt süreleri, cihaz seçimi ve TV+ paketleri
            hakkında yetkili satış noktasından detaylı bilgi yazıları.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-accent-500 hover:shadow-medium transition-all group flex flex-col"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    CATEGORY_COLORS[article.category] || 'bg-ink-50 text-ink-700'
                  }`}
                >
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-ink-400 font-semibold">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-ink-900 mb-2.5 leading-snug group-hover:text-brand-500 transition">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-ink-500 leading-relaxed mb-4 flex-1">
                {article.excerpt}
              </p>

              {/* Read More */}
              <div className="inline-flex items-center gap-1.5 text-brand-500 font-bold text-sm group-hover:gap-2.5 transition-all">
                Devamını Oku
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-2xl p-6 border border-ink-100 text-center mb-10">
          <p className="text-sm text-ink-500 leading-relaxed">
            <strong className="text-ink-900">📚 Daha fazla rehber yolda!</strong>
            <br />
            Yeni içerikler için zaman zaman sayfayı kontrol edebilirsiniz.
          </p>
        </div>

        {/* CTA Box */}
        <div
          className="rounded-2xl p-8 text-center text-white"
          style={{
            background: `radial-gradient(circle at 20% 0%, rgba(255,201,0,0.25) 0%, transparent 50%), #0A2540`,
          }}
        >
          <h3 className="text-2xl font-extrabold mb-2 leading-tight">
            Hâlâ Karar Veremediniz mi?
          </h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto leading-relaxed">
            Yetkili satış noktamızı arayın, ihtiyacınıza uygun Superbox paketi
            konusunda ücretsiz danışmanlık alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+905349777000"
              className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-tc-navy px-6 py-3 rounded-full font-bold transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              0534 977 70 00
            </a>
            <Link
              href="/#wizard"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-full font-bold transition"
            >
              Online Başvur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
