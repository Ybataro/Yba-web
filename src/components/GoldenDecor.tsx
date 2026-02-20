/**
 * 金色流雲裝飾元件
 * 靈感：傳統中式祥雲紋 + 流金線條
 * 用法：<GoldenDecor variant="..." position="..." />
 */

interface GoldenDecorProps {
  variant: 'cloud-1' | 'cloud-2' | 'swirl-1' | 'swirl-2' | 'wave' | 'corner-tl' | 'corner-br' | 'flowing-lines';
  position?: string; // Tailwind position classes e.g. "top-0 left-0"
  className?: string;
  opacity?: number; // 0.03 ~ 0.15
  color?: 'gold' | 'gold-dark'; // gold = light sections, gold-dark = dark sections
}

export default function GoldenDecor({
  variant,
  position = '',
  className = '',
  opacity = 0.06,
  color = 'gold',
}: GoldenDecorProps) {
  const stroke = color === 'gold-dark' ? '#C9A84C' : '#B08420';

  const variants: Record<string, React.ReactNode> = {
    // 祥雲紋 1 — 大弧線流雲
    'cloud-1': (
      <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M-20 350 C80 300, 120 200, 200 220 C280 240, 260 140, 340 120 C420 100, 400 180, 480 160 C560 140, 540 60, 620 80"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M-20 380 C100 320, 140 230, 220 250 C300 270, 280 160, 360 140 C440 120, 420 200, 500 180 C580 160, 560 80, 640 100"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.7}
        />
        {/* 小渦旋裝飾 */}
        <circle cx="200" cy="220" r="8" stroke={stroke} strokeWidth="1" fill="none" opacity={opacity * 0.5} />
        <circle cx="340" cy="120" r="6" stroke={stroke} strokeWidth="1" fill="none" opacity={opacity * 0.5} />
      </svg>
    ),

    // 祥雲紋 2 — S 形流雲
    'cloud-2': (
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M480 -20 C440 60, 380 80, 320 60 C260 40, 240 100, 280 160 C320 220, 260 260, 200 240 C140 220, 120 280, 160 340 C200 400, 140 440, 80 420 C20 400, 0 460, -20 520"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M510 -10 C470 70, 410 90, 350 70 C290 50, 270 110, 310 170 C350 230, 290 270, 230 250 C170 230, 150 290, 190 350 C230 410, 170 450, 110 430 C50 410, 30 470, 10 530"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        {/* 點綴圓 */}
        <circle cx="280" cy="160" r="4" fill={stroke} opacity={opacity * 0.4} />
        <circle cx="160" cy="340" r="3" fill={stroke} opacity={opacity * 0.4} />
      </svg>
    ),

    // 漩渦紋 1 — 角落裝飾
    'swirl-1': (
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M20 280 C20 200, 60 160, 100 160 C140 160, 160 120, 140 80 C120 40, 160 10, 200 20 C240 30, 260 70, 240 100"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M0 260 C10 190, 50 150, 90 150 C130 150, 150 110, 130 70 C110 30, 150 0, 190 10 C230 20, 250 60, 230 90"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        {/* 渦心 */}
        <circle cx="240" cy="100" r="5" stroke={stroke} strokeWidth="1" fill="none" opacity={opacity * 0.5} />
        <circle cx="240" cy="100" r="2" fill={stroke} opacity={opacity * 0.4} />
      </svg>
    ),

    // 漩渦紋 2 — 反向
    'swirl-2': (
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M280 20 C280 100, 240 140, 200 140 C160 140, 140 180, 160 220 C180 260, 140 290, 100 280 C60 270, 40 230, 60 200"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M300 40 C290 110, 250 150, 210 150 C170 150, 150 190, 170 230 C190 270, 150 300, 110 290 C70 280, 50 240, 70 210"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        <circle cx="60" cy="200" r="5" stroke={stroke} strokeWidth="1" fill="none" opacity={opacity * 0.5} />
        <circle cx="60" cy="200" r="2" fill={stroke} opacity={opacity * 0.4} />
      </svg>
    ),

    // 波浪紋
    'wave': (
      <svg viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 80 C100 40, 200 100, 300 60 C400 20, 500 80, 600 40 C700 0, 800 60, 900 20"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M0 90 C100 50, 200 110, 300 70 C400 30, 500 90, 600 50 C700 10, 800 70, 900 30"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        <path
          d="M0 100 C100 60, 200 120, 300 80 C400 40, 500 100, 600 60 C700 20, 800 80, 900 40"
          stroke={stroke}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity={opacity * 0.4}
        />
      </svg>
    ),

    // 左上角花紋
    'corner-tl': (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M0 120 C30 100, 40 70, 30 40 C20 10, 50 -10, 80 10 C110 30, 100 60, 120 80"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M0 140 C40 115, 55 85, 45 55 C35 25, 65 5, 95 25 C125 45, 115 75, 135 95"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        {/* 小點綴 */}
        <circle cx="80" cy="10" r="3" fill={stroke} opacity={opacity * 0.4} />
        <path d="M115 75 L125 65 L135 80" stroke={stroke} strokeWidth="0.8" opacity={opacity * 0.4} />
      </svg>
    ),

    // 右下角花紋
    'corner-br': (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M200 80 C170 100, 160 130, 170 160 C180 190, 150 210, 120 190 C90 170, 100 140, 80 120"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M200 60 C160 85, 145 115, 155 145 C165 175, 135 195, 105 175 C75 155, 85 125, 65 105"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        <circle cx="120" cy="190" r="3" fill={stroke} opacity={opacity * 0.4} />
      </svg>
    ),

    // 連續流動線條
    'flowing-lines': (
      <svg viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M-50 150 C50 100, 150 200, 250 120 C350 40, 450 180, 550 100 C650 20, 750 200, 850 120 C950 40, 1050 180, 1150 100 C1250 20, 1300 120, 1300 120"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
        <path
          d="M-50 170 C60 115, 160 215, 260 135 C360 55, 460 195, 560 115 C660 35, 760 215, 860 135 C960 55, 1060 195, 1160 115 C1260 35, 1310 135, 1310 135"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.6}
        />
        <path
          d="M-50 190 C70 130, 170 230, 270 150 C370 70, 470 210, 570 130 C670 50, 770 230, 870 150 C970 70, 1070 210, 1170 130 C1270 50, 1320 150, 1320 150"
          stroke={stroke}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity={opacity * 0.4}
        />
        {/* 散點裝飾 */}
        <circle cx="250" cy="120" r="3" fill={stroke} opacity={opacity * 0.3} />
        <circle cx="550" cy="100" r="2.5" fill={stroke} opacity={opacity * 0.3} />
        <circle cx="850" cy="120" r="3" fill={stroke} opacity={opacity * 0.3} />
      </svg>
    ),
  };

  return (
    <div
      className={`absolute pointer-events-none select-none ${position} ${className}`}
      aria-hidden="true"
    >
      {variants[variant]}
    </div>
  );
}
