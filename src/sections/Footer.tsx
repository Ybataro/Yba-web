import { Phone, MapPin, Instagram, Facebook, Award } from 'lucide-react';
import OrnamentalDivider from '@/components/OrnamentalDivider';
import { useCmsContent } from '@/hooks/useCmsContent';

const footerDefaults = {
  brandName: '阿爸的芋圓',
  brandNameEn: 'YBA Taro Balls',
  badge: '2025 新北市必比登推薦 · 永和樂華夜市',
  description: '以 100% 純甘蔗汁製成琥珀色蔗片冰，搭配每日手作芋圓、芋泥與雙漿。\n從樂華夜市出發的 11 年職人冰品，每一口都吃得到用心與在地味。',
  phone: '02-29247461',
  mainStoreAddress: '樂華總店：新北市永和區保平路18巷1號',
  branchAddress: '興南店：新北市中和區信義街7號（14:30-22:00）',
  hours: '營業時間：每日 15:30 - 23:00',
  facebookUrl: 'https://www.facebook.com/YBATARO',
  instagramUrl: 'https://www.instagram.com/yba_taro',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: cms } = useCmsContent('footer', footerDefaults);

  return (
    <footer className="relative w-full overflow-hidden">
      {/* 頂部裝飾分隔線 */}
      <div className="pt-6">
        <OrnamentalDivider />
      </div>

      {/* 主要內容 */}
      <div className="relative bg-section-dark py-16 sm:py-20 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* 品牌資訊 */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{cms.brandName}</h3>
              <p className="text-[hsl(var(--camel))] text-sm mb-4 tracking-wider">{cms.brandNameEn}</p>
              {/* 必比登榮譽 */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--camel))]/15 border border-[hsl(var(--camel))]/30 rounded-lg mb-4">
                <Award className="w-4 h-4 text-[hsl(var(--camel))]" />
                <span className="text-[hsl(var(--camel))] text-xs font-medium">
                  {cms.badge}
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
                {cms.description}
              </p>
            </div>

            {/* 聯絡資訊 */}
            <div>
              <h4 className="text-white font-semibold mb-4">聯絡我們</h4>
              <div className="space-y-3">
                <a
                  href={`tel:${cms.phone}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[hsl(var(--camel))] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{cms.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <div className="text-sm">
                    <p>{cms.mainStoreAddress}</p>
                    <p className="mt-1">{cms.branchAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 社群連結 */}
            <div>
              <h4 className="text-white font-semibold mb-4">追蹤我們</h4>
              <div className="flex gap-4">
                <a
                  href={cms.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[hsl(var(--camel))] hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={cms.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[hsl(var(--camel))] hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-4 text-white/30 text-sm">
                {cms.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 版權資訊 */}
      <div className="bg-[hsl(25,30%,12%)] py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              &copy; {currentYear} 阿爸的芋圓 YBA Taro Balls. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-[hsl(var(--camel))] text-sm transition-colors duration-300">
                隱私政策
              </a>
              <a href="#" className="text-white/30 hover:text-[hsl(var(--camel))] text-sm transition-colors duration-300">
                使用條款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
