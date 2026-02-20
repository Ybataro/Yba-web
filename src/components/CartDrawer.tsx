import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useFrozenCartStore } from '@/stores/frozenCartStore';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useFrozenCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  const SHIPPING_FEE = 150;
  const FREE_SHIPPING_THRESHOLD = 1600;
  const total = totalPrice();
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const remainForFree = FREE_SHIPPING_THRESHOLD - total;

  if (!isCartOpen) return null;

  return (
    <>
      {/* 遮罩 */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={() => { setCartOpen(false); setShowCheckout(false); }}
      />

      {/* 側邊面板 */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-[hsl(var(--camel))]/10 z-[70] flex flex-col shadow-2xl">
        {/* 標題 */}
        <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--camel))]/10">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-[hsl(var(--camel))]" />
            <h2 className="text-lg font-bold text-[hsl(var(--dark-brown))]">
              {showCheckout ? '填寫訂購資訊' : `購物車 (${totalItems()})`}
            </h2>
          </div>
          <button
            onClick={() => { setCartOpen(false); setShowCheckout(false); }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[hsl(var(--camel))]/10 text-[hsl(var(--dark-brown))]/50 hover:text-[hsl(var(--dark-brown))] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showCheckout ? (
          <CheckoutForm
            onBack={() => setShowCheckout(false)}
            onComplete={() => {
              clearCart();
              setShowCheckout(false);
              setCartOpen(false);
            }}
          />
        ) : (
          <>
            {/* 免運提示 */}
            {items.length > 0 && (
              <div className="px-5 py-3 bg-[hsl(var(--camel))]/5 border-b border-[hsl(var(--camel))]/8">
                {isFreeShipping ? (
                  <p className="text-sm text-[hsl(var(--camel-dark))] font-medium">
                    已達免運門檻！
                  </p>
                ) : (
                  <p className="text-sm text-[hsl(var(--dark-brown))]/60">
                    再加 <span className="text-[hsl(var(--camel))] font-bold">NT${remainForFree}</span> 即享免運
                  </p>
                )}
                {/* 進度條 */}
                <div className="mt-2 h-1.5 bg-[hsl(var(--camel))]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(var(--camel))] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* 商品列表 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-[hsl(var(--dark-brown))]/15 mb-4" />
                  <p className="text-[hsl(var(--dark-brown))]/40 text-lg mb-2">購物車是空的</p>
                  <p className="text-[hsl(var(--dark-brown))]/25 text-sm">選擇喜歡的商品開始購物吧！</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-xl bg-[hsl(var(--cream))] border border-[hsl(var(--camel))]/8"
                  >
                    {/* 圖片 */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    {/* 資訊 */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[hsl(var(--dark-brown))] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[hsl(var(--dark-brown))]/40 mt-0.5">
                        {item.product.spec}
                      </p>
                      <p className="text-[hsl(var(--camel))] font-bold mt-1">
                        NT${item.product.price}
                      </p>
                      {/* 數量控制 */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-[hsl(var(--camel))]/25 text-[hsl(var(--camel))] hover:bg-[hsl(var(--camel))]/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-[hsl(var(--dark-brown))] w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-[hsl(var(--camel))]/25 text-[hsl(var(--camel))] hover:bg-[hsl(var(--camel))]/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-xs text-[hsl(var(--dark-brown))]/35 ml-2">
                          小計 NT${item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto text-red-400/50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 底部結帳 */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[hsl(var(--camel))]/10 space-y-3">
                <div className="flex justify-between text-sm text-[hsl(var(--dark-brown))]/60">
                  <span>商品小計</span>
                  <span>NT${total}</span>
                </div>
                <div className="flex justify-between text-sm text-[hsl(var(--dark-brown))]/60">
                  <span>運費</span>
                  <span className={isFreeShipping ? 'text-[hsl(var(--camel))] line-through' : ''}>
                    NT${SHIPPING_FEE}
                  </span>
                </div>
                {isFreeShipping && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--camel))]">免運優惠</span>
                    <span className="text-[hsl(var(--camel))]">-NT${SHIPPING_FEE}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[hsl(var(--dark-brown))] pt-2 border-t border-[hsl(var(--camel))]/8">
                  <span>合計</span>
                  <span className="text-[hsl(var(--camel))]">
                    NT${isFreeShipping ? total : total + SHIPPING_FEE}
                  </span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3.5 bg-[hsl(var(--camel))] text-white font-bold rounded-full hover:bg-[hsl(var(--camel-dark))] transition-all duration-300 hover:shadow-lg"
                >
                  前往結帳
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
