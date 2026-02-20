import Navigation from './sections/Navigation';
import HeroDramatic from './sections/HeroDramatic';
import IngredientShowcase from './sections/IngredientShowcase';
import Products from './sections/Products';
import FrozenShop from './sections/FrozenShop';
import SocialProof from './sections/SocialProof';
import Stores from './sections/Stores';
import Footer from './sections/Footer';
import CartDrawer from './components/CartDrawer';
import { ShoppingCart } from 'lucide-react';
import { useFrozenCartStore } from './stores/frozenCartStore';

function App() {
  const { totalItems, setCartOpen, isCartOpen } = useFrozenCartStore();
  const count = totalItems();

  return (
    <div className="min-h-screen bg-[hsl(var(--cream))]">
      <Navigation />
      <main>
        <HeroDramatic />
        <IngredientShowcase />
        <Products />
        <FrozenShop />
        <SocialProof />
        <Stores />
      </main>
      <Footer />

      {/* 購物車側邊面板 */}
      <CartDrawer />

      {/* 浮動購物車按鈕 */}
      {count > 0 && !isCartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(var(--amber))] text-white rounded-full shadow-lg hover:bg-[hsl(var(--amber-dark))] hover:scale-110 transition-all duration-300 flex items-center justify-center glow-amber"
          aria-label="購物車"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {count}
          </span>
        </button>
      )}
    </div>
  );
}

export default App;
