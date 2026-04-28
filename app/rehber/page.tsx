import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rehber | Türk Telekom Fiber İnternet Rehberleri',
  description: 'Fiber internet, VDSL, taahhüt süreleri, modem seçimi ve daha fazlası hakkında rehber yazıları.',
  alternates: { canonical: 'https://internetbasvuru.com/rehber' },
};

const articles = [
  {
    slug: 'fiber-vdsl-farki',
    title: 'Fiber ile VDSL Arasındaki Fark Nedir?',
    excerpt: 'Fiber optik ve VDSL teknolojilerinin teknik farkları, hız performansı ve hangi adrese hangisinin uygun olduğunu karşılaştırdık.',
    category: 'Teknoloji',
    readTime: '4 dk',
    date: '2026-04-20',
  },
  {
    slug: 'turk-telekom-altyapi-sorgulama',
    title: 'Türk Telekom Altyapı Sorgulama Nasıl Yapılır?',
    excerpt: 'Adresinizde fiber internet olup olmadığını öğrenmenin yolları, altyapı türleri ve yetersiz altyapı durumunda seçenekler.',
    category: 'Başvuru',
    readTime: '3 dk',
    date: '2026-04-18',
  },
  {
    slug: 'taahhut-suresi-rehberi',
    title: 'İnternet Taahhüt Süresi: 12, 18, 24 Ay?',
    excerpt: 'Hangi taahhüt süresi size daha avantajlı? Kampanya fiyatlarıyla ömür boyu maliyet hesabı.',
    category: 'Fiyatlandırma',
    readTime: '5 dk',
    date: '2026-04-15',
  },
  {
    slug: 'modem-kiralama-vs-satin-alma',
    title: 'Modem Kiralama mı Yoksa Satın Alma mı?',
    excerpt: 'Aylık modem kiralama ücreti ile kendi modeminizi almanın avantaj ve dezavantajları.',
    category: 'Teknoloji',
    readTime: '4 dk',
    date: '2026-04-12',
  },
  {
    slug: 'tivibulu-nedir',
    title: 'Tivibu\'lu İnternet: TV + İnternet Birlikte',
    excerpt: 'Tivibu platformu, kanal paketleri, IPTV modem gereksinimi ve gerçek kullanıcı deneyimi.',
    category: 'TV Paketleri',
    readTime: '6 dk',
    date: '2026-04-10',
  },
  {
    slug: 'manavgat-internet-altyapisi',
    title: 'Manavgat\'ta İnternet Altyapısı',
    excerpt: 'Manavgat\'ın hangi mahallelerinde fiber var, hangi bölgelerde VDSL sınırlı kalıyor.',
    category: 'Bölgesel',
    readTime: '5 dk',
    date: '2026-04-08',
  },
];

export default function RehberPage() {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container-fluid max-w-6xl">
        <div className="mb-10">
          <div className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-2">
            Rehber
          </div>
          <h1 className="section-title mb-3">İnternet Rehberleri</h1>
          <p className="section-subtitle">
            Başvuru öncesi bilmeniz gerekenler, teknolojik karşılaştırmalar, bölgesel analizler — hepsi bir arada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/rehber/${article.slug}`}
              className="card group p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-brand">{article.category}</span>
                <span className="flex items-center gap-1 text-[11px] text-ink-500">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>
              <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors mb-2 leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-ink-600 leading-relaxed flex-1 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-ink-100">
                <span className="text-ink-500">{new Date(article.date).toLocaleDateString('tr-TR')}</span>
                <span className="font-semibold text-brand-700 group-hover:text-accent-500 transition-colors">
                  Oku →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-ink-50 rounded-xl p-6 md:p-8 text-center">
          <BookOpen className="w-10 h-10 text-brand-700 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-ink-900 mb-2">Rehber içerikleri güncelleniyor</h2>
          <p className="text-ink-600 text-sm max-w-xl mx-auto">
            Yeni makaleler düzenli olarak yayınlanıyor. Belirli bir konu hakkında bilgi arıyorsanız WhatsApp'tan bize iletebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
