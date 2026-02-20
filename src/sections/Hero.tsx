import { useEffect, useState } from 'react';
import { Award, ChevronRight } from 'lucide-react';

const heroImages = [
  { src: '/images/嫩仙草鮮奶蔗片冰.JPG', alt: '嫩仙草鮮奶蔗片冰', title: '嫩仙草鮮奶蔗片冰' },
  { src: '/images/handmade-taro.jpg', alt: '手工芋圓', title: '手工芋圓' },
  { src: '/images/3Q芋泥蔗片冰_橫.JPG', alt: '3Q芋泥蔗片冰', title: '3Q芋泥蔗片冰' },
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--cream))]">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full pt-24 pb-16 lg:pt-0 lg:pb-0">

          {/* 左側文字區 */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* 必比登標籤 */}
            <div
              className={`mb-6 transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--camel))]/10 border border-[hsl(var(--camel))]/25 rounded-full">
                <Award className="w-4 h-4 text-[hsl(var(--camel))]" />
                <span className="text-[hsl(var(--camel-dark))] text-xs sm:text-sm font-semibold tracking-wide">
                  2025 新北市必比登推薦
                </span>
              </div>
            </div>

            {/* 主標題 */}
            <h1
              className={`transition-all duration-800 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(var(--dark-brown))] mb-3 leading-tight">
                永和樂華夜市
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(var(--camel))] leading-tight">
                11 年職人冰品
              </span>
            </h1>

            {/* 品牌標語 */}
            <p
              className={`mt-6 text-[hsl(var(--camel-dark))] text-sm tracking-[0.2em] uppercase font-medium transition-all duration-800 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              100% 純甘蔗汁 · 手作無添加
            </p>

            {/* 副標題 */}
            <p
              className={`mt-5 text-lg sm:text-xl text-[hsl(var(--dark-brown))]/65 max-w-lg mx-auto lg:mx-0 leading-relaxed transition-all duration-800 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              獨創以 100% 純甘蔗汁製成的琥珀色「蔗片冰」，堅持自產、手作、無添加。在樂華夜市，一碗從夏夜吃到冬天的職人冰品。
            </p>

            {/* CTA 按鈕 */}
            <div
              className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-800 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#stores"
                className="group px-8 py-4 bg-[hsl(var(--camel))] text-white font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                立即導航至樂華店
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#shaved-ice-menu"
                className="px-8 py-4 border-2 border-[hsl(var(--camel))] text-[hsl(var(--camel))] font-bold rounded-full hover:bg-[hsl(var(--camel))] hover:text-white transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
              >
                完整菜單預覽
              </a>
            </div>

            {/* 當前展示品名 */}
            <div
              className={`mt-8 transition-all duration-800 delay-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-sm text-[hsl(var(--dark-brown))]/40">
                目前展示：<span className="text-[hsl(var(--camel))] font-medium">{heroImages[currentImageIndex].title}</span>
              </p>
            </div>
          </div>

          {/* 右側圖片區 */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
            }`}
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-w-lg mx-auto">
              {/* 裝飾背景 */}
              <div className="absolute -inset-4 bg-[hsl(var(--camel))]/8 rounded-3xl -rotate-3" />
              <div className="absolute -inset-2 bg-[hsl(var(--camel))]/5 rounded-3xl rotate-2" />


              {/* 圖片輪播 */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${
                      index === currentImageIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105'
                    }`}
                  />
                ))}
              </div>

              {/* 圖片指示器 */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentImageIndex
                        ? 'w-8 h-2.5 bg-[hsl(var(--camel))]'
                        : 'w-2.5 h-2.5 bg-[hsl(var(--camel))]/25 hover:bg-[hsl(var(--camel))]/50'
                    }`}
                    aria-label={`查看 ${heroImages[index].title}`}
                  />
                ))}
              </div>

              {/* 浮動標籤 */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                <span className="text-xs font-bold text-[hsl(var(--camel-dark))]">必比登推薦</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 底部波浪過渡 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full relative z-10">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 50V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
