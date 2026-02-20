import { useEffect, useRef, useState } from 'react';
import { Quote, Star, ShieldCheck, Leaf, Award } from 'lucide-react';

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

const promises = [
  { icon: Leaf, text: '100% 天然食材' },
  { icon: ShieldCheck, text: '無人工添加物' },
  { icon: Award, text: '必比登認證品質' },
];

export default function SocialProof() {
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
      id="social-proof"
      ref={sectionRef}
      className="relative py-14 sm:py-20 w-full overflow-hidden bg-[hsl(var(--cream))]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左側：Gemini 特寫大圖 */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/Gemini_Generated_Image_2608v62608v62608.png"
                alt="芋泥冰淇淋特寫"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Google 評分浮動徽章 */}
              <div className="absolute bottom-6 left-6 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[hsl(25,10%,92%)]/95 backdrop-blur-sm shadow-xl">
                <div className="text-3xl font-bold text-[hsl(var(--amber))]">5.0</div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 text-[hsl(var(--amber))] fill-[hsl(var(--amber))]" />
                    ))}
                  </div>
                  <p className="text-[hsl(var(--dark-brown))]/40 text-xs">Google 評論平均</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：評論卡片 + 品質承諾 */}
          <div>
            <span
              className={`inline-block text-[hsl(var(--amber))] text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Reviews
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-bold text-[hsl(var(--dark-brown))] mb-8 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              大家的<span className="text-[hsl(var(--amber))]">五星好評</span>
            </h2>

            {/* 評論卡片 */}
            <div className="space-y-5 mb-10">
              {testimonials.map((item, index) => (
                <div
                  key={item.source}
                  className={`relative p-6 rounded-2xl bg-[hsl(25,10%,92%)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[hsl(var(--amber))]/8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[hsl(var(--amber))]/20 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[hsl(var(--amber))]/10" />

                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[hsl(var(--amber))] fill-[hsl(var(--amber))]" />
                    ))}
                  </div>

                  <p className="text-[hsl(var(--dark-brown))] leading-relaxed mb-4 font-medium">
                    「{item.content}」
                  </p>

                  <div>
                    <p className="text-[hsl(var(--dark-brown))] font-semibold text-sm">{item.name}</p>
                    <p className="text-[hsl(var(--dark-brown))]/35 text-xs mt-0.5">{item.source}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 品質承諾 */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {promises.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--amber))]/8 border border-[hsl(var(--amber))]/15"
                >
                  <item.icon className="w-4 h-4 text-[hsl(var(--amber))]" />
                  <span className="text-sm font-medium text-[hsl(var(--dark-brown))]/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
