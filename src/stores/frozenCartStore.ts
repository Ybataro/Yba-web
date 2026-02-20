import { create } from 'zustand';
import type { FrozenProduct } from '@/data/frozenProducts';

export interface CartItem {
  product: FrozenProduct;
  quantity: number;
}

interface FrozenCartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: FrozenProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useFrozenCartStore = create<FrozenCartState>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.product.id === product.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { product, quantity: 1 }] });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((i) => i.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
  setCartOpen: (open) => set({ isCartOpen: open }),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

  totalItems: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
