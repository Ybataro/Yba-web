import { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    source: 'Google 評論',
    content: '蔗片冰的口感超特別，清甜不膩，必比登實至名歸！',
    name: '在地老客人',
    rating: 5,
  },
  {
    source: 'IG 美食部落客',
    content: '芋頭控必朝聖，黑芝麻漿濃郁到不行，配上蔗片冰完全停不下來。',
    name: '@taipei_foodie',
    rating: 5,
  },
  {
    source: '夜市遊客',
    content: '本來只是路過排隊，吃完之後每次來樂華都一定繞過來一碗。',
    name: '週末逛夜市情侶',
    rating: 5,
  },
];

export default function Testimonials() {
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
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 sm:py-32 w-full overflow-hidden bg-[hsl(var(--cream))]"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 左右佈局：標題在左，評論在右 */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* 左欄 - 標題 */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <span
              className={`inline-block text-[hsl(var(--camel))] text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Reviews
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--dark-brown))] mb-6 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              大家的
              <br />
              <span className="text-[hsl(var(--camel))]">五星好評</span>
            </h2>
            <p
              className={`text-[hsl(var(--dark-brown))]/50 leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              不是我們自己說好吃，是吃過的客人、評論與部落客，一起替阿爸的芋圓背書。
            </p>

            {/* 總評分 */}
            <div
              className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[hsl(var(--camel))]/10 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="text-4xl font-bold text-[hsl(var(--camel))]">5.0</div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-[hsl(var(--camel))] fill-[hsl(var(--camel))]" />
                  ))}
                </div>
                <p className="text-[hsl(var(--dark-brown))]/40 text-xs">Google 評論平均</p>
              </div>
            </div>
          </div>

          {/* 右欄 - 評論卡片（堆疊式） */}
          <div className="lg:col-span-3 space-y-6">
            {testimonials.map((item, index) => (
              <div
                key={item.source}
                className={`relative p-8 rounded-3xl bg-white shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-[hsl(var(--camel))]/8 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:border-[hsl(var(--camel))]/20 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* 引號裝飾 */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[hsl(var(--camel))]/10" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[hsl(var(--camel))] fill-[hsl(var(--camel))]" />
                  ))}
                </div>

                <p className="text-[hsl(var(--dark-brown))] text-lg leading-relaxed mb-6 font-medium">
                  「{item.content}」
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[hsl(var(--dark-brown))] font-semibold text-sm">{item.name}</p>
                    <p className="text-[hsl(var(--dark-brown))]/35 text-xs mt-0.5">{item.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
