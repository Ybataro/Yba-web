import { useEffect, useState } from 'react';
import { Award, ChevronRight, Sprout } from 'lucide-react';
import WaveDivider from '@/components/WaveDivider';
import OrnamentalDivider from '@/components/OrnamentalDivider';

export default function HeroDramatic() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* 全螢幕背景圖 */}
      <img
        src="/images/Gemini_Generated_Image_pzb5nrpzb5nrpzb5.png"
        alt="阿爸的芋圓 — 碗裝冰品與天然食材"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 由下往上暖灰漸層遮罩（用橡木灰代替純黑） */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25,10%,28%)]/90 via-[hsl(25,10%,30%)]/40 to-[hsl(25,10%,30%)]/15" />
      {/* 補強左側漸層（文字可讀性） */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(25,10%,25%)]/50 to-transparent" />

      {/* 內容 */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20 sm:pb-28 lg:pb-32">
        <div className="max-w-2xl">
          {/* 必比登徽章 */}
          <div
            className={`mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Award className="w-4 h-4 text-[hsl(var(--amber))]" />
              <span className="text-white/90 text-sm font-semibold tracking-wide">
                2025 新北市必比登推薦
              </span>
            </div>
          </div>

          {/* 主標題 */}
          <h1
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              阿爸的芋圓
            </span>
          </h1>

          {/* 復古裝飾線 */}
          <OrnamentalDivider light className={`justify-start mt-4 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* 副標語 */}
          <p
            className={`mt-4 text-[hsl(var(--amber-light))] text-sm sm:text-base tracking-[0.2em] uppercase font-medium transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            永和樂華夜市 · 11 年職人冰品 · 100% 純甘蔗汁
          </p>

          {/* 描述 */}
          <p
            className={`mt-5 text-lg sm:text-xl text-white/70 max-w-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            獨創琥珀色蔗片冰，堅持自產、手作、無添加。<br className="hidden sm:block" />
            從夏夜吃到冬天的必比登美味。
          </p>

          {/* CTA */}
          <div
            className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#frozen-shop"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#frozen-shop')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 bg-[hsl(var(--amber))] text-white font-bold rounded-full hover:bg-[hsl(var(--amber-dark))] transition-all duration-300 hover:scale-105 shadow-lg glow-amber inline-flex items-center justify-center gap-2"
            >
              <Sprout className="w-4 h-4" />
              立即選購
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
            >
              招牌菜單
            </a>
          </div>
        </div>
      </div>

      {/* 底部波浪過渡（無縫接 IngredientShowcase） */}
      <WaveDivider color="hsl(var(--dark-brown))" />
    </section>
  );
}
