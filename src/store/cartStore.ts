import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => i.id === newItem.id);
    if (existing) {
      return {
        items: state.items.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i)
      };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),
  clearCart: () => set({ items: [] }),
  totalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0)
}));
