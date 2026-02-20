import { useEffect, useRef, useState } from 'react';
import { Leaf, Heart, Shield, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: '天然食材',
    description: '100% 天然甘蔗汁製成冰品，不添加任何人工色素與防腐劑',
  },
  {
    icon: Heart,
    title: '手工製作',
    description: '每日新鮮現做，傳承阿爸的手藝與堅持',
  },
  {
    icon: Shield,
    title: '安心品質',
    description: '嚴選優質原料，讓您吃得安心、放心',
  },
];

const stats = [
  { number: 11, suffix: '年', label: '樂華夜市在地經營' },
  { number: 100, suffix: '%', label: '純甘蔗汁製冰' },
  { number: 1, suffix: '次', label: '必比登推薦' },
];

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeProgress));

      if (progress >= 1) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return <span>{count}{suffix}</span>;
}

export default function IngredientShowcase() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="brand-story" ref={sectionRef} className="relative w-full overflow-hidden">
      {/* ===== 上半：深色底 — 食材大圖 + 品牌故事 ===== */}
      <div className="relative bg-[hsl(var(--dark-brown))] pt-14 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
        {/* 裝飾光暈 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--amber))]/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左側：食材爆炸大圖 */}
            <div
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/Gemini_Generated_Image_tr3imxtr3imxtr3i.png"
                  alt="食材爆炸分解圖 — 天然芋頭、甘蔗、配料"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              {/* 浮動氣氛小圖 */}
              <div className="absolute -bottom-6 -right-4 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-[hsl(var(--dark-brown))]">
                <img
                  src="/images/Gemini_Generated_Image_o2pv9o2pv9o2pv9o.png"
                  alt="金色側光湯匙舀冰"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 右側：品牌故事文字 + 統計 */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <span className="text-[hsl(var(--amber))] text-sm tracking-[0.3em] uppercase font-medium">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
                用阿爸的堅持
                <br />
                <span className="text-[hsl(var(--amber-light))]">做好每一碗冰</span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed text-lg">
                <p>
                  「我們不賣自己不吃的東西。」在樂華夜市的第 11 個年頭，我們從未忘記初心。
                </p>
                <p>
                  為了這一碗甜點，我們堅持每天清晨親自研磨杏仁、慢火熬煮甘蔗汁，選用天然芋頭與本地食材，把最單純的味道留在碗裡。
                </p>
              </div>

              {/* 統計數字 */}
              <div className="flex gap-8 mt-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl sm:text-4xl font-bold text-[hsl(var(--amber))]">
                      {isVisible && <CountUp end={stat.number} suffix={stat.suffix} />}
                    </div>
                    <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 下半：白色底 — 特色卡片 + 導購 CTA ===== */}
      <div className="relative bg-[hsl(var(--cream))] pt-14 pb-10 sm:pt-20 sm:pb-14 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 特色卡片 */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl bg-[hsl(25,10%,93%)] border border-[hsl(25,10%,80%)] p-8 hover:bg-[hsl(var(--amber))] hover:border-[hsl(var(--amber))] transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--amber))]/12 group-hover:bg-white/20 flex items-center justify-center mb-5 transition-colors duration-500">
                  <feature.icon className="w-7 h-7 text-[hsl(var(--amber))] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-[hsl(var(--dark-brown))] group-hover:text-white font-bold text-lg mb-3 transition-colors duration-500">
                  {feature.title}
                </h4>
                <p className="text-[hsl(var(--dark-brown))]/55 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* 導購 CTA */}
          <div className="text-center">
            <p
              className={`text-[hsl(var(--dark-brown))]/50 mb-6 text-lg transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              榮獲必比登推薦，是對這份「在地精神」最好的肯定
            </p>
            <a
              href="#frozen-shop"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#frozen-shop')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group inline-flex items-center gap-2 px-8 py-4 bg-[hsl(var(--amber))] text-white font-bold rounded-full hover:bg-[hsl(var(--amber-dark))] transition-all duration-300 hover:scale-105 shadow-md glow-amber ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              在家也能享受 — 冷凍宅配選購
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
