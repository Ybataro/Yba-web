import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Store, Award, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: Store,
    title: '完整店面規劃',
    description: '30坪夜市商圈店型，專業空間設計',
  },
  {
    icon: Users,
    title: '一個月教育訓練',
    description: '總店實戰培訓，完整技術轉移',
  },
  {
    icon: TrendingUp,
    title: '穩定獲利模式',
    description: '月營業額180萬，盈餘32萬',
  },
  {
    icon: Award,
    title: '品牌知名度',
    description: '樂華夜市人氣名店，口碑保證',
  },
];

const costs = [
  { item: '加盟金', amount: '50萬' },
  { item: '店面裝潢', amount: '150萬' },
  { item: '設備費用', amount: '120萬' },
  { item: '保證金', amount: '10萬' },
];

export default function Franchise() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="franchise"
      ref={sectionRef}
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/30 to-transparent" />

      {/* 裝飾背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-[hsl(var(--gold))]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-[hsl(var(--gold))]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題 */}
        <div className="text-center mb-12 sm:mb-16">
          <span
            className={`inline-block text-[hsl(var(--gold))] text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Franchise
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            加盟合作
          </h2>
          <div
            className={`flex items-center justify-center gap-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-px w-12 bg-[hsl(var(--gold))]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[hsl(var(--gold))]" />
            <div className="h-px w-12 bg-[hsl(var(--gold))]" />
          </div>
          <p
            className={`mt-6 text-white/60 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            與阿爸的芋圓一起，將這份天然美味帶給更多顧客
          </p>
        </div>

        {/* 加盟優勢 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[hsl(var(--gold))]/50 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--gold))]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--gold))]/20 transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-[hsl(var(--gold))]" />
              </div>
              <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
              <p className="text-white/50 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* 投資費用與收益 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 投資費用 */}
          <div
            className={`p-8 rounded-2xl bg-white/5 border border-white/10 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-6">投資費用</h3>
            <div className="space-y-4">
              {costs.map((cost) => (
                <div
                  key={cost.item}
                  className="flex justify-between items-center py-3 border-b border-white/10"
                >
                  <span className="text-white/70">{cost.item}</span>
                  <span className="text-[hsl(var(--gold))] font-semibold">{cost.amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <span className="text-white font-semibold">總投資額</span>
                <span className="text-2xl font-bold text-[hsl(var(--gold))]">330萬</span>
              </div>
            </div>
          </div>

          {/* 預估收益 */}
          <div
            className={`p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--gold))]/20 to-[hsl(var(--gold))]/5 border border-[hsl(var(--gold))]/50 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-6">預估收益（月）</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">營業額</span>
                <span className="text-white font-semibold">180萬</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">食材成本</span>
                <span className="text-white/60">80萬</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">人事成本（4正職/6兼職）</span>
                <span className="text-white/60">30萬</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">房租/水電/雜費</span>
                <span className="text-white/60">24萬</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-white font-semibold">預估月盈餘</span>
                <span className="text-3xl font-bold text-[hsl(var(--gold))]">32萬</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="tel:02-29247461"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[hsl(var(--gold))] text-black font-semibold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <span>立即洽詢加盟</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-white/40 text-sm">
            歡迎來電洽詢詳細加盟資訊
          </p>
        </div>
      </div>
    </section>
  );
}
