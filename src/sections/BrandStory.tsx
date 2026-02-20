import { useEffect, useRef, useState } from 'react';
import { Leaf, Heart, Shield, Award } from 'lucide-react';

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

export default function BrandStory() {
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
      {/* ===== 第一段：全寬電影感大圖 + 文字疊加 ===== */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        <img
          src="/images/brand-story-main.png"
          alt="阿爸的芋圓招牌冰品與天然食材"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* 文字內容 - 左對齊 */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl">
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                <Award className="w-4 h-4 text-[hsl(var(--camel-light))]" />
                <span className="text-white/90 text-sm font-medium">
                  2025 新北市必比登推薦
                </span>
              </div>
            </div>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              用阿爸的堅持
              <br />
              <span className="text-[hsl(var(--camel-light))]">做好每一碗冰</span>
            </h2>

            <p
              className={`text-white/70 text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              「我們不賣自己不吃的東西。」在樂華夜市的第 11 個年頭，我們從未忘記初心。
            </p>

            {/* 統計數字 - 橫排 */}
            <div
              className={`flex gap-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-bold text-[hsl(var(--camel-light))]">
                    {isVisible && <CountUp end={stat.number} suffix={stat.suffix} />}
                  </div>
                  <div className="text-white/50 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== 第二段：交錯圖文 ===== */}
      <div className="relative bg-white py-20 sm:py-28 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 第一組：左圖右文 */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-20 sm:mb-28">
            <div
              className={`lg:col-span-3 relative transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/handmade-taro.jpg"
                  alt="師傅手工製作芋圓"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[hsl(var(--camel-light))]" />
                  <span className="text-white font-medium text-sm drop-shadow-lg">每日手工現做</span>
                </div>
              </div>
              {/* 浮動小圖 */}
              <div className="absolute -bottom-6 -right-4 w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/images/shaved-ice-detail.jpg"
                  alt="天然甘蔗汁片狀冰"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              className={`lg:col-span-2 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <span className="text-[hsl(var(--camel))] text-sm tracking-[0.3em] uppercase font-medium">
                Our Story
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--dark-brown))] mt-3 mb-6 leading-tight">
                從甘蔗田到夜市攤
                <br />
                每一步都親手把關
              </h3>
              <div className="space-y-4 text-[hsl(var(--dark-brown))]/65 leading-relaxed">
                <p>
                  為了這一碗甜點，我們堅持每天清晨親自研磨杏仁、慢火熬煮甘蔗汁，選用天然芋頭與本地食材，把最單純的味道留在碗裡。
                </p>
                <p className="text-[hsl(var(--camel-dark))] font-semibold">
                  榮獲必比登推薦，是對這份「在地精神」最好的肯定，也是邀請你今天來一碗的最好理由。
                </p>
              </div>
            </div>
          </div>

          {/* 特色卡片 - 橫向大卡片 */}
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl bg-[hsl(var(--cream))] p-8 hover:bg-[hsl(var(--camel))] transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--camel))]/12 group-hover:bg-white/20 flex items-center justify-center mb-5 transition-colors duration-500">
                  <feature.icon className="w-7 h-7 text-[hsl(var(--camel))] group-hover:text-white transition-colors duration-500" />
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
        </div>
      </div>
    </section>
  );
}
