import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Package, Truck, Phone, Plus, Check, ArrowRight } from 'lucide-react';

import { frozenProducts } from '@/data/frozenProducts';
import { useFrozenCartStore } from '@/stores/frozenCartStore';

export default function FrozenProducts() {
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

  const featuredProduct = frozenProducts.find(p => p.featured) || frozenProducts[0];
  const otherProducts = filteredProducts.filter(p => p.id !== featuredProduct.id);

  const handleAddToCart = (product: (typeof frozenProducts)[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="frozen-products"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* ===== 主打商品 - 全寬英雄區 ===== */}
      <div className="relative bg-[hsl(var(--cream))] py-24 sm:py-32 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題區 */}
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--camel))]/10 border border-[hsl(var(--camel))]/20 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Package className="w-4 h-4 text-[hsl(var(--camel))]" />
              <span className="text-[hsl(var(--camel-dark))] text-sm font-bold">冷凍宅配到府</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--dark-brown))] mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              阿爸の味道
              <span className="text-[hsl(var(--camel))] block sm:inline sm:ml-3">宅配到府</span>
            </h2>

            <p
              className={`max-w-2xl mx-auto text-[hsl(var(--dark-brown))]/55 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              精選冷凍產品，在家也能享受必比登推薦的美味
            </p>
          </div>

          {/* 主打商品 - 大橫幅 */}
          <div
            className={`group grid lg:grid-cols-2 rounded-3xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative h-72 lg:h-96 overflow-hidden">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                人氣熱銷
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="text-[hsl(var(--camel))] text-xs tracking-[0.25em] uppercase font-bold mb-2">
                Featured Product
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--dark-brown))] mb-2">
                {featuredProduct.name}
              </h3>
              <p className="text-[hsl(var(--camel))] font-medium mb-4">{featuredProduct.spec}</p>
              <p className="text-[hsl(var(--dark-brown))]/55 leading-relaxed mb-6">
                {featuredProduct.description}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[hsl(var(--camel))]">NT${featuredProduct.price}</span>
                  {featuredProduct.originalPrice && (
                    <span className="text-[hsl(var(--dark-brown))]/30 line-through">NT${featuredProduct.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(featuredProduct)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                    addedId === featuredProduct.id
                      ? 'bg-green-600 text-white scale-105'
                      : 'bg-[hsl(var(--camel))] text-white hover:bg-[hsl(var(--camel-dark))] hover:scale-105 shadow-md'
                  }`}
                >
                  {addedId === featuredProduct.id ? (
                    <><Check className="w-5 h-5" /> 已加入</>
                  ) : (
                    <><Plus className="w-5 h-5" /> 加入購物車</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 分類標籤 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[hsl(var(--camel))] text-white shadow-md'
                    : 'bg-[hsl(var(--dark-brown))]/5 text-[hsl(var(--dark-brown))]/60 hover:bg-[hsl(var(--dark-brown))]/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 產品網格 - 3 欄 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(selectedCategory === '全部' ? otherProducts : filteredProducts.filter(p => p.id !== featuredProduct.id || selectedCategory !== '全部')).map((product, index) => (
              <div
                key={product.id}
                className={`group relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 80}ms` }}
              >
                <div className="relative h-full bg-white rounded-2xl border border-[hsl(var(--camel))]/10 overflow-hidden hover:border-[hsl(var(--camel))]/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  {/* 圖片 */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {product.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        熱銷
                      </div>
                    )}
                  </div>

                  {/* 內容 */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[hsl(var(--dark-brown))] mb-1">{product.name}</h3>
                    <p className="text-sm text-[hsl(var(--camel))] mb-2">{product.spec}</p>
                    <p className="text-sm text-[hsl(var(--dark-brown))]/45 mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[hsl(var(--camel))]">NT${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-[hsl(var(--dark-brown))]/30 line-through">NT${product.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                          addedId === product.id
                            ? 'bg-green-600 text-white scale-105'
                            : 'bg-[hsl(var(--camel))] text-white hover:bg-[hsl(var(--camel-dark))] hover:scale-105'
                        }`}
                      >
                        {addedId === product.id ? (
                          <><Check className="w-4 h-4" /> 已加入</>
                        ) : (
                          <><Plus className="w-4 h-4" /> 選購</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 訂購資訊 - 深色橫幅 ===== */}
      <div className="relative bg-[hsl(25,30%,14%)] py-16 sm:py-20 overflow-hidden">

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--camel))]/15 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-[hsl(var(--camel-light))]" />
              </div>
              <h4 className="font-bold text-white mb-2">運費說明</h4>
              <p className="text-white/50 text-sm">
                運費 NT$150<br />
                <span className="text-[hsl(var(--camel-light))] font-medium">滿 NT$1,600 免運</span>
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--camel))]/15 flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7 text-[hsl(var(--camel-light))]" />
              </div>
              <h4 className="font-bold text-white mb-2">出貨時間</h4>
              <p className="text-white/50 text-sm">
                接單後 3-5 個工作天<br />
                冷凍宅配到府
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--camel))]/15 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-7 h-7 text-[hsl(var(--camel-light))]" />
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
                className="group px-8 py-4 bg-[hsl(var(--camel))] text-white font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(176,132,32,0.3)] flex items-center justify-center gap-2"
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
                className="group px-8 py-4 bg-[hsl(var(--camel))] text-white font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(176,132,32,0.3)] flex items-center justify-center gap-2"
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
