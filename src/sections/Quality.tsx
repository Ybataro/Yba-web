import { useEffect, useRef, useState } from 'react';
import { Leaf, Soup, Home, Check } from 'lucide-react';

const qualities = [
  {
    icon: Leaf,
    title: '無添加香精',
    description: '100% 純杏仁豆研磨杏仁茶，不靠香精取代，只留下自然豆香與回甘。',
  },
  {
    icon: Soup,
    title: '手作芋頭',
    description: '每日現炊芋泥與芋圓，控制火候與時間，保留最原始的綿密口感。',
  },
  {
    icon: Home,
    title: '在地自家生產',
    description: '所有配料皆於自家廚房監製，小量多次製作，讓你每一口都安心放心。',
  },
];

const promises = [
  '純甘蔗汁製冰，非水冰',
  '每日現做、不隔夜',
  '原料產地可溯源',
  '無人工色素與防腐劑',
];

export default function Quality() {
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
    <section
      id="quality"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* 全寬背景圖 + 覆蓋內容 */}
      <div className="relative min-h-[600px] sm:min-h-[700px] flex items-center">
        {/* 背景圖 */}
        <img
          src="/images/嫩仙草鮮奶蔗片冰.JPG"
          alt="嫩仙草鮮奶蔗片冰"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[hsl(25,30%,14%)]/95 via-[hsl(25,30%,14%)]/75 to-[hsl(25,30%,14%)]/40" />

        {/* 內容 - 右對齊 */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="ml-auto max-w-xl">
            <span
              className={`inline-block text-[hsl(var(--camel-light))] text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Quality Promise
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              純粹保證
            </h2>
            <p
              className={`text-white/60 text-base sm:text-lg leading-relaxed mb-10 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              不追求花俏配料，只把每一樣原料做到最好。從甘蔗、杏仁到芋頭，每一步都看得見來源、吃得出用心。
            </p>

            {/* 保證項目 - 垂直列表 */}
            <div className="space-y-4 mb-10">
              {qualities.map((quality, index) => (
                <div
                  key={quality.title}
                  className={`flex items-start gap-4 p-5 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/12 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 120}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--camel))]/20 flex items-center justify-center flex-shrink-0">
                    <quality.icon className="w-6 h-6 text-[hsl(var(--camel-light))]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{quality.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{quality.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 承諾清單 */}
            <div
              className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {promises.map((promise) => (
                <div key={promise} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--camel-light))] flex-shrink-0" />
                  <span className="text-white/60 text-sm">{promise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
