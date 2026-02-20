import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Package, Truck, Phone, Plus, Check, ArrowRight } from 'lucide-react';

import { frozenProducts } from '@/data/frozenProducts';
import { useFrozenCartStore } from '@/stores/frozenCartStore';

export default function FrozenShop() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { addItem, totalItems, setCartOpen } = useFrozenCartStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['全部', '芋圓系列', '冰淇淋系列', '杏仁茶系列'];

  const filteredProducts = selectedCategory === '全部'
    ? frozenProducts
    : frozenProducts.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: (typeof frozenProducts)[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="frozen-shop"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* ===== 白色區：產品網格 ===== */}
      <div className="relative bg-[hsl(var(--cream))] pt-14 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題區 */}
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--amber))]/10 border border-[hsl(var(--amber))]/20 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Package className="w-4 h-4 text-[hsl(var(--amber))]" />
              <span className="text-[hsl(var(--amber-dark))] text-sm font-bold">冷凍宅配到府</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--dark-brown))] mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              線上選購
            </h2>

            <p
              className={`max-w-2xl mx-auto text-[hsl(var(--dark-brown))]/55 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              精選冷凍產品，在家也能享受必比登推薦的美味
            </p>
          </div>

          {/* 分類標籤 */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[hsl(var(--amber))] text-white shadow-md'
                    : 'bg-[hsl(var(--dark-brown))]/5 text-[hsl(var(--dark-brown))]/60 hover:bg-[hsl(var(--dark-brown))]/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 產品列表 — 緊湊橫向卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + index * 60}ms` }}
              >
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[hsl(25,10%,92%)] border border-[hsl(var(--border))] hover:border-[hsl(var(--amber))]/30 transition-all duration-300 hover:shadow-md">
                  {/* 小圓角縮圖 */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.featured && (
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>

                  {/* 品名 + 規格 + 價格 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[hsl(var(--dark-brown))] truncate">{product.name}</h3>
                    <p className="text-xs text-[hsl(var(--dark-brown))]/40 mt-0.5">{product.spec}</p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-base font-bold text-[hsl(var(--amber))]">NT${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-[hsl(var(--dark-brown))]/30 line-through">NT${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* 加入按鈕 */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      addedId === product.id
                        ? 'bg-green-600 text-white scale-110'
                        : 'bg-[hsl(var(--amber))] text-white hover:bg-[hsl(var(--amber-dark))] hover:scale-110'
                    }`}
                  >
                    {addedId === product.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 深色區：運費/出貨/付款 + CTA ===== */}
      <div className="relative bg-[hsl(var(--dark-brown))] py-12 sm:py-16 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--amber))]/15 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-[hsl(var(--amber-light))]" />
              </div>
              <h4 className="font-bold text-white mb-2">運費說明</h4>
              <p className="text-white/50 text-sm">
                運費 NT$150<br />
                <span className="text-[hsl(var(--amber-light))] font-medium">滿 NT$1,600 免運</span>
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--amber))]/15 flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7 text-[hsl(var(--amber-light))]" />
              </div>
              <h4 className="font-bold text-white mb-2">出貨時間</h4>
              <p className="text-white/50 text-sm">
                接單後 3-5 個工作天<br />
                冷凍宅配到府
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--amber))]/15 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-7 h-7 text-[hsl(var(--amber-light))]" />
              </div>
              <h4 className="font-bold text-white mb-2">付款方式</h4>
              <p className="text-white/50 text-sm">
                ATM 轉帳<br />
                門市付款自取
              </p>
            </div>
          </div>

          {/* CTA 按鈕 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {totalItems() > 0 ? (
              <button
                onClick={() => setCartOpen(true)}
                className="group px-8 py-4 bg-[hsl(var(--amber))] text-white font-bold rounded-full hover:bg-[hsl(var(--amber-dark))] transition-all duration-300 hover:scale-105 glow-amber flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                查看購物車 ({totalItems()})
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <a
                href="https://www.facebook.com/YBATARO"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-[hsl(var(--amber))] text-white font-bold rounded-full hover:bg-[hsl(var(--amber-dark))] transition-all duration-300 hover:scale-105 glow-amber flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                FB 私訊訂購
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            <a
              href="tel:0920248012"
              className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              電話訂購：0920-248-012
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
