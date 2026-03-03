import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation } from 'lucide-react';
import OrnamentalDivider from '@/components/OrnamentalDivider';

const stores = [
  {
    name: '樂華總店',
    address: '新北市永和區保平路18巷1號',
    phone: '02-29247461',
    hours: '15:30 - 23:00',
    note: '永和樂華夜市商圈',
    isMain: true,
    image: '/images/store-logo.jpg',
    mapUrl: 'https://maps.app.goo.gl/YBA_lehua',
  },
  {
    name: '興南店',
    address: '新北市中和區信義街7號',
    phone: '02-29410128',
    hours: '14:30 - 22:00',
    note: '中和興南夜市商圈',
    isMain: false,
    image: '/images/store-sign.jpg',
    mapUrl: 'https://maps.app.goo.gl/YBA_xingnan',
  },
];

export default function Stores() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStore, setActiveStore] = useState(0);
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

  const store = stores[activeStore];

  return (
    <section
      id="stores"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[hsl(var(--cream))] py-24 sm:py-32"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 上方：標題 + 門市切換 */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <span
              className={`inline-block text-[hsl(var(--camel))] text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Find Us
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--dark-brown))] transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              門市資訊
            </h2>
            <OrnamentalDivider className="justify-start mt-3" />
          </div>

          {/* 門市切換按鈕 */}
          <div
            className={`mt-4 sm:mt-0 flex gap-2 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {stores.map((s, index) => (
              <button
                key={s.name}
                onClick={() => setActiveStore(index)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeStore === index
                    ? 'bg-[hsl(var(--camel))] text-white shadow-md'
                    : 'bg-[hsl(var(--dark-brown))]/5 text-[hsl(var(--dark-brown))]/60 hover:bg-[hsl(var(--dark-brown))]/10'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* 主要內容 - 大圖 + 資訊側欄 */}
        <div
          className={`grid lg:grid-cols-5 gap-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* 左側大圖 */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src={store.image}
              alt={store.name}
              className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {store.isMain && (
              <div className="absolute top-5 left-5 px-4 py-1.5 bg-[hsl(var(--camel))] text-white text-sm font-bold rounded-full shadow-lg">
                總店
              </div>
            )}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg mb-2">{store.name}</h3>
              <p className="text-white/70 text-sm">{store.note}</p>
            </div>
          </div>

          {/* 右側資訊 */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 地址 */}
            <div className="p-6 rounded-2xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--camel))]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[hsl(var(--camel))]" />
                </div>
                <div>
                  <h4 className="text-[hsl(var(--dark-brown))] font-bold mb-1">地址</h4>
                  <p className="text-[hsl(var(--dark-brown))]/65 text-sm">{store.address}</p>
                </div>
              </div>
            </div>

            {/* 營業時間 */}
            <div className="p-6 rounded-2xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--camel))]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[hsl(var(--camel))]" />
                </div>
                <div>
                  <h4 className="text-[hsl(var(--dark-brown))] font-bold mb-1">營業時間</h4>
                  <p className="text-[hsl(var(--dark-brown))]/65 text-sm">{store.hours}</p>
                  <p className="text-[hsl(var(--camel))] text-xs mt-1 font-medium">20:00–22:00 為尖峰時段</p>
                </div>
              </div>
            </div>

            {/* 電話 */}
            <div className="p-6 rounded-2xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--camel))]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[hsl(var(--camel))]" />
                </div>
                <div>
                  <h4 className="text-[hsl(var(--dark-brown))] font-bold mb-1">電話</h4>
                  <a
                    href={`tel:${store.phone}`}
                    className="text-[hsl(var(--dark-brown))]/65 text-sm hover:text-[hsl(var(--camel))] transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* 導航按鈕 */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-[hsl(var(--camel))] text-white font-bold rounded-2xl hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <Navigation className="w-5 h-5" />
              Google Maps 導航
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
