import { useEffect, useRef, useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/嫩仙草鮮奶蔗片冰.JPG',
    alt: '嫩仙草鮮奶蔗片冰',
    title: '嫩仙草鮮奶蔗片冰',
    desc: '嫩仙草與鮮奶的完美結合',
    span: 'large',
  },
  {
    src: '/images/product-taro-bags.jpg',
    alt: '就是芋圓包裝',
    title: '就是芋圓',
    desc: '手工芋圓帶回家',
    span: 'normal',
  },
  {
    src: '/images/taro-icecream.jpg',
    alt: '芋泥冰淇淋配白玉圓',
    title: '芋泥冰淇淋',
    desc: '綿密芋泥搭配Q彈白玉圓',
    span: 'normal',
  },
  {
    src: '/images/icecream-cup.png',
    alt: '芝麻蔗片冰',
    title: '芝麻蔗片冰',
    desc: '芝麻漿與蔗片冰的碰撞',
    span: 'normal',
  },
  {
    src: '/images/product-almond-tea.jpg',
    alt: '厚杏仁茶',
    title: '厚杏仁茶',
    desc: '香濃杏仁茶飲品',
    span: 'normal',
  },
  {
    src: '/images/3Q芋泥蔗片冰_橫.JPG',
    alt: '3Q芋泥蔗片冰',
    title: '3Q芋泥蔗片冰',
    desc: 'QQQ三種口感的芋泥蔗片冰',
    span: 'large',
  },
];

export default function ProductGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 sm:py-32 w-full overflow-hidden bg-white"
    >
      {/* 背景 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--camel))]/15 to-transparent" />
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-[hsl(var(--camel))]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[hsl(var(--camel))]/4 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題 */}
        <div className="text-center mb-12 sm:mb-16">
          <span
            className={`inline-block text-[hsl(var(--camel))] text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Camera className="w-4 h-4 inline-block mr-2" />
            Gallery
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(var(--dark-brown))] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            美味瞬間
          </h2>
          <div
            className={`flex items-center justify-center gap-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-px w-12 bg-[hsl(var(--camel))]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[hsl(var(--camel))]" />
            <div className="h-px w-12 bg-[hsl(var(--camel))]" />
          </div>
          <p
            className={`mt-6 text-[hsl(var(--dark-brown))]/50 max-w-xl mx-auto transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            每一碗冰品，都是阿爸用心製作的美味藝術
          </p>
        </div>

        {/* Masonry 風格圖片網格 - 2x3 大圖排版 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`group relative cursor-pointer transition-all duration-700 ${
                image.span === 'large' ? 'sm:col-span-2 lg:col-span-2' : ''
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onClick={() => setSelectedImage(index)}
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                image.span === 'large' ? 'aspect-[16/9]' : 'aspect-[3/4]'
              }`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 常駐底部漸層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* 懸停加深 */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* 文字 - 常駐顯示 */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h4 className="text-white font-bold text-lg sm:text-xl mb-1 drop-shadow-lg">
                    {image.title}
                  </h4>
                  <p className="text-white/75 text-sm drop-shadow-md">{image.desc}</p>
                </div>
                {/* 點擊提示 */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 燈箱 */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* 上一張 */}
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 下一張 */}
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white font-bold text-xl">{galleryImages[selectedImage].title}</h4>
              <p className="text-white/60 text-sm mt-1">{galleryImages[selectedImage].desc}</p>
              <p className="text-white/30 text-xs mt-3">{selectedImage + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
