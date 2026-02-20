import { useState } from 'react';
import { ArrowLeft, Copy, Check, Phone, MessageCircle } from 'lucide-react';
import { useFrozenCartStore } from '@/stores/frozenCartStore';

interface CheckoutFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const SHIPPING_FEE = 150;
const FREE_SHIPPING_THRESHOLD = 1600;

export default function CheckoutForm({ onBack, onComplete }: CheckoutFormProps) {
  const { items, totalPrice } = useFrozenCartStore();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'atm' as 'atm' | 'pickup',
    note: '',
  });

  const total = totalPrice();
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const finalTotal = isFreeShipping ? total : total + SHIPPING_FEE;

  const generateOrderText = () => {
    const lines = [
      `【阿爸的芋圓 - 冷凍宅配訂單】`,
      ``,
      `姓名：${form.name}`,
      `電話：${form.phone}`,
      form.payment === 'atm' ? `地址：${form.address}` : `取貨門市：樂華總店`,
      `付款方式：${form.payment === 'atm' ? 'ATM 轉帳' : '門市自取付款'}`,
      ``,
      `--- 訂購商品 ---`,
      ...items.map(
        (i) => `${i.product.name} (${i.product.spec}) x${i.quantity} = NT$${i.product.price * i.quantity}`
      ),
      ``,
      `商品小計：NT$${total}`,
      `運費：${isFreeShipping ? '免運' : `NT$${SHIPPING_FEE}`}`,
      `應付總計：NT$${finalTotal}`,
      form.note ? `\n備註：${form.note}` : '',
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleCopy = async () => {
    const text = generateOrderText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineOrder = () => {
    const text = encodeURIComponent(generateOrderText());
    window.open(`https://line.me/R/oaMessage/@ybataro/?${text}`, '_blank');
  };

  const handlePhoneOrder = () => {
    window.open('tel:0920248012', '_self');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 步驟指示器 */}
      <div className="px-5 py-4 border-b border-[hsl(var(--camel))]/8">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= s
                    ? 'bg-[hsl(var(--camel))] text-white'
                    : 'bg-[hsl(var(--dark-brown))]/8 text-[hsl(var(--dark-brown))]/30'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-8 h-0.5 rounded transition-colors duration-300 ${
                    step > s ? 'bg-[hsl(var(--camel))]' : 'bg-[hsl(var(--dark-brown))]/8'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <span className={`text-xs ${step >= 1 ? 'text-[hsl(var(--camel))]' : 'text-[hsl(var(--dark-brown))]/30'}`}>
            付款方式
          </span>
          <span className={`text-xs ${step >= 2 ? 'text-[hsl(var(--camel))]' : 'text-[hsl(var(--dark-brown))]/30'}`}>
            收件資訊
          </span>
          <span className={`text-xs ${step >= 3 ? 'text-[hsl(var(--camel))]' : 'text-[hsl(var(--dark-brown))]/30'}`}>
            確認訂單
          </span>
        </div>
      </div>

      {/* 步驟內容 */}
      <div className="flex-1 overflow-y-auto p-5">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-[hsl(var(--dark-brown))] font-bold mb-4">選擇付款方式</h3>
            {[
              { value: 'atm', label: 'ATM 轉帳', desc: '下單後提供匯款帳號，確認入帳後出貨' },
              { value: 'pickup', label: '門市自取付款', desc: '至樂華總店現場取貨付款（免運費）' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setForm({ ...form, payment: opt.value as 'atm' | 'pickup' })}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  form.payment === opt.value
                    ? 'border-[hsl(var(--camel))] bg-[hsl(var(--camel))]/5'
                    : 'border-[hsl(var(--dark-brown))]/8 hover:border-[hsl(var(--camel))]/30'
                }`}
              >
                <p className="font-bold text-[hsl(var(--dark-brown))]">{opt.label}</p>
                <p className="text-sm text-[hsl(var(--dark-brown))]/45 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-[hsl(var(--dark-brown))] font-bold mb-4">
              {form.payment === 'pickup' ? '填寫取貨人資訊' : '填寫收件人資訊'}
            </h3>
            <div>
              <label className="block text-sm text-[hsl(var(--dark-brown))]/60 mb-1.5">姓名 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="請輸入姓名"
                className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/15 text-[hsl(var(--dark-brown))] placeholder:text-[hsl(var(--dark-brown))]/25 focus:outline-none focus:border-[hsl(var(--camel))] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[hsl(var(--dark-brown))]/60 mb-1.5">電話 *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="09xx-xxx-xxx"
                className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/15 text-[hsl(var(--dark-brown))] placeholder:text-[hsl(var(--dark-brown))]/25 focus:outline-none focus:border-[hsl(var(--camel))] transition-colors"
              />
            </div>
            {form.payment === 'atm' && (
              <div>
                <label className="block text-sm text-[hsl(var(--dark-brown))]/60 mb-1.5">收件地址 *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="請輸入完整地址"
                  className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/15 text-[hsl(var(--dark-brown))] placeholder:text-[hsl(var(--dark-brown))]/25 focus:outline-none focus:border-[hsl(var(--camel))] transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-[hsl(var(--dark-brown))]/60 mb-1.5">備註（選填）</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="特殊需求或指定到貨時間..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/15 text-[hsl(var(--dark-brown))] placeholder:text-[hsl(var(--dark-brown))]/25 focus:outline-none focus:border-[hsl(var(--camel))] transition-colors resize-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-[hsl(var(--dark-brown))] font-bold mb-4">確認訂單</h3>

            {/* 訂單摘要 */}
            <div className="p-4 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/10 space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-[hsl(var(--dark-brown))]/70">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-[hsl(var(--dark-brown))]">
                    NT${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-[hsl(var(--camel))]/8 pt-2 mt-2">
                <div className="flex justify-between text-sm text-[hsl(var(--dark-brown))]/50">
                  <span>運費</span>
                  <span>{isFreeShipping || form.payment === 'pickup' ? '免運' : `NT$${SHIPPING_FEE}`}</span>
                </div>
                <div className="flex justify-between font-bold text-[hsl(var(--camel))] mt-1">
                  <span>合計</span>
                  <span>NT${form.payment === 'pickup' ? total : finalTotal}</span>
                </div>
              </div>
            </div>

            {/* 收件資訊 */}
            <div className="p-4 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/10 space-y-1 text-sm">
              <p className="text-[hsl(var(--dark-brown))]/70">姓名：{form.name}</p>
              <p className="text-[hsl(var(--dark-brown))]/70">電話：{form.phone}</p>
              {form.payment === 'atm' && (
                <p className="text-[hsl(var(--dark-brown))]/70">地址：{form.address}</p>
              )}
              <p className="text-[hsl(var(--dark-brown))]/70">
                付款：{form.payment === 'atm' ? 'ATM 轉帳' : '門市自取付款'}
              </p>
              {form.note && <p className="text-[hsl(var(--dark-brown))]/50">備註：{form.note}</p>}
            </div>

            {/* 送出方式 */}
            <div className="space-y-3">
              <p className="text-sm text-[hsl(var(--dark-brown))]/40 text-center">
                請選擇以下方式將訂單傳送給我們：
              </p>
              <button
                onClick={handleCopy}
                className="w-full py-3.5 bg-[hsl(var(--camel))] text-white font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? '已複製訂單！' : '複製訂單內容'}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleLineOrder}
                  className="py-3 border-2 border-[#06C755] text-[#06C755] font-bold rounded-full hover:bg-[#06C755]/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  LINE 傳送
                </button>
                <button
                  onClick={handlePhoneOrder}
                  className="py-3 border-2 border-[hsl(var(--camel))] text-[hsl(var(--camel))] font-bold rounded-full hover:bg-[hsl(var(--camel))]/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  電話訂購
                </button>
              </div>
              <button
                onClick={onComplete}
                className="w-full py-3 text-[hsl(var(--dark-brown))]/40 hover:text-[hsl(var(--dark-brown))] text-sm transition-colors"
              >
                完成，關閉購物車
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 底部按鈕 */}
      {step < 3 && (
        <div className="p-5 border-t border-[hsl(var(--camel))]/10 flex gap-3">
          <button
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="flex items-center gap-1 px-5 py-3 border border-[hsl(var(--camel))]/25 text-[hsl(var(--dark-brown))]/60 rounded-full hover:bg-[hsl(var(--camel))]/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <button
            onClick={() => {
              if (step === 2) {
                if (!form.name || !form.phone) {
                  alert('請填寫姓名和電話');
                  return;
                }
                if (form.payment === 'atm' && !form.address) {
                  alert('請填寫收件地址');
                  return;
                }
              }
              setStep(step + 1);
            }}
            className="flex-1 py-3 bg-[hsl(var(--camel))] text-white font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300"
          >
            {step === 2 ? '確認訂單' : '下一步'}
          </button>
        </div>
      )}
    </div>
  );
}
