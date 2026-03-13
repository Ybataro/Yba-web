import { useEffect, useRef, useState } from 'react';
import { Snowflake, Circle, Droplets, Wheat } from 'lucide-react';
import WaveDivider from '@/components/WaveDivider';
import OrnamentalDivider from '@/components/OrnamentalDivider';
import { useCmsContent } from '@/hooks/useCmsContent';

const categoryIcons: Record<string, typeof Snowflake> = {
  'shaved-ice': Snowflake,
  'taro': Circle,
  'tofu': Droplets,
  'healthy': Wheat,
};

const signatureItemsDefault = [
  {
    title: '琥珀色蔗片冰',
    subtitle: '11 年靈魂招牌',
    description: '非傳統水冰，用整根甘蔗壓榨後製冰再削片，入口清甜、透心涼，是樂華夜市的必吃經典。',
    image: '/images/3Q芋泥蔗片冰_橫.JPG',
  },
  {
    title: '自家濃郁冰淇淋',
    subtitle: '400ml 杯裝',
    description: '花生、芝麻、草莓等口味皆為自家配方，紮實口感與蔗片冰一起入口，拍照打卡、口感都滿分。',
    image: '/images/taro-icecream.jpg',
  },
  {
    title: '自磨醇香雙漿',
    subtitle: '花生 x 黑芝麻',
    description: '濃郁黑芝麻與厚實花生醬，現磨現煮，淋在冰片上的瞬間，把香氣與食慾一起推到最高點。',
    image: '/images/芋泥花生蔗片冰_橫.JPG',
  },
];

const categoriesDefault = [
  {
    id: 'shaved-ice',
    name: '蔗片冰系列',
    description: '以 100% 天然甘蔗汁製成的琥珀色蔗片冰，是 11 年來的靈魂基底。',
    items: [
      { name: '招牌芋見泥蔗片冰', price: '145', desc: '芋泥球、芋圓、白玉湯圓' },
      { name: '芋泥相遇蔗片冰', price: '125', desc: '芋泥球、芋圓、白玉湯圓' },
      { name: '花生冰淇淋蔗片冰', price: '150', desc: '花生冰淇淋、芋圓、白玉湯圓' },
      { name: '3Q芋泥蔗片冰', price: '120', desc: '芋圓、白玉湯圓、芋泥漿' },
    ],
  },
  {
    id: 'taro',
    name: '芋圓系列',
    description: '每日手工現做，Q彈有嚼勁',
    items: [
      { name: '芋圓綜合湯', price: '70', desc: '芋圓、粉圓、小薏仁' },
      { name: '白玉綜合湯', price: '70', desc: '白玉湯圓、紅豆、小薏仁' },
      { name: '嫩仙草芋圓豆花', price: '70', desc: '嫩仙草、芋圓、豆花' },
      { name: '芋圓豆漿豆花', price: '75', desc: '芋圓、小薏仁、濃醇豆漿' },
    ],
  },
  {
    id: 'tofu',
    name: '豆花系列',
    description: '傳統手工豆花，香滑細嫩',
    items: [
      { name: '花生豆花', price: '55', desc: '花生、豆花' },
      { name: '粉圓豆花', price: '55', desc: '粉圓、豆花' },
      { name: '3Q豆花', price: '80', desc: '芋圓、白玉湯圓、粉圓' },
      { name: '私藏杏仁茶豆花', price: '105', desc: '杏仁茶、芋圓、白玉湯圓' },
    ],
  },
  {
    id: 'healthy',
    name: '養身系列',
    description: '健康養生，溫潤滋補',
    items: [
      { name: '養身銀耳湯', price: '60', desc: '紅棗冰糖銀耳' },
      { name: '嫩仙草銀耳湯', price: '75', desc: '嫩仙草、紅棗冰糖銀耳' },
      { name: '花生紅豆薏仁湯', price: '65', desc: '花生、紅豆、薏仁' },
      { name: '芋圓紅豆薏仁湯', price: '75', desc: '芋圓、紅豆、薏仁' },
    ],
  },
];

const productsDefaults = {
  signatureItems: signatureItemsDefault,
  categories: categoriesDefault,
};

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('shaved-ice');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: cms } = useCmsContent('products', productsDefaults);
  const signatureItems = cms.signatureItems || signatureItemsDefault;
  const categories = (cms.categories || categoriesDefault).map((c) => ({
    ...c,
    icon: categoryIcons[c.id] || Snowflake,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <section id="products" ref={sectionRef} className="relative w-full overflow-hidden">
      {/* ===== 上半：必點特色 - 大圖卡片橫排 ===== */}
      <div className="relative bg-[hsl(var(--cream))] pt-14 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題 - 左對齊 */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16">
            <div>
              <span
                className={`inline-block text-[hsl(var(--camel))] text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Signature
              </span>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--dark-brown))] transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                必點特色
              </h2>
            </div>
            <p
              className={`mt-4 sm:mt-0 text-[hsl(var(--dark-brown))]/50 max-w-md transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              來阿爸的芋圓，這三樣不能錯過
            </p>
          </div>

          {/* 必點特色卡片 - 圖文並排大卡片 */}
          <div className="space-y-6">
            {signatureItems.map((item, index) => (
              <div
                key={item.title}
                className={`group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-[hsl(25,10%,92%)] shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-all duration-700 ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* 圖片 */}
                <div className={`relative h-64 lg:h-80 overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-none" />
                </div>
                {/* 文字 */}
                <div className={`flex flex-col justify-center p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-[hsl(var(--camel))] text-xs tracking-[0.25em] uppercase font-bold mb-2">
                    Signature {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--dark-brown))] mb-2 group-hover:text-[hsl(var(--camel))] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[hsl(var(--camel))] font-medium mb-4">{item.subtitle}</p>
                  <p className="text-[hsl(var(--dark-brown))]/55 leading-relaxed">{item.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-[hsl(var(--amber))] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    <span>想在家享受？往下看冷凍宅配 →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 下半：完整菜單 - 深色背景區分 ===== */}
      <div id="shaved-ice-menu" className="relative bg-[hsl(var(--dark-brown))] pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <WaveDivider flip color="hsl(var(--cream))" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題 */}
          <div className="text-center mb-12">
            <span
              className={`inline-block text-[hsl(var(--camel-light))] text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Full Menu
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              &#10022; 完整菜單 &#10022;
            </h2>
            <OrnamentalDivider light className="mb-4" />
            <p className="text-white/40 max-w-lg mx-auto">
              四大系列，超過 15 種選擇，總有一碗屬於你
            </p>
          </div>

          {/* 分類選擇 */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[hsl(var(--camel))] border-[hsl(var(--camel))] text-white shadow-[0_0_20px_rgba(176,132,32,0.3)]'
                    : 'border-white/15 text-white/50 hover:border-[hsl(var(--camel))]/50 hover:text-white/80'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* 分類描述 */}
          {activeCategoryData && (
            <p className="text-center text-white/40 text-lg mb-10">{activeCategoryData.description}</p>
          )}

          {/* 產品列表 - 2 列橫排 */}
          <div className="grid sm:grid-cols-2 gap-4">
            {activeCategoryData?.items.map((item, index) => {
              const isSignature = item.name.includes('招牌') || item.name.includes('嫩仙草');

              return (
                <div
                  key={item.name}
                  className={`group relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                    isSignature
                      ? 'bg-[hsl(var(--camel))]/10 border-[hsl(var(--camel))]/30 hover:bg-[hsl(var(--camel))]/15'
                      : 'bg-white/5 border-white/8 hover:bg-white/8'
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {isSignature && (
                        <span className="px-2 py-0.5 bg-[hsl(var(--brick))] text-white text-[10px] font-bold rounded-full">
                          招牌
                        </span>
                      )}
                      <h4 className="text-white font-semibold text-lg group-hover:text-[hsl(var(--camel))] transition-colors duration-300">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-white/35 text-sm">{item.desc}</p>
                  </div>
                  <div className="ml-4 text-right flex-shrink-0">
                    <span className="text-[hsl(var(--camel))] font-bold text-2xl">${item.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-white/25 text-sm">
            還有更多美味選擇，歡迎至門市品嚐
          </p>
        </div>
      </div>
    </section>
  );
}
