import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, CartItem, Product, Notification } from '../types';
import { Language } from '../i18n/translations';

interface Store {
  user: User | null;
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  notifications: Notification[];
  recentlyViewed: Product[];
  theme: 'light' | 'dark';
  language: Language;
  discount: number;
  setUser: (user: User | null) => void;
  setDiscount: (discount: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  addNotification: (type: Notification['type'], message: string) => void;
  removeNotification: (id: string) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  updateProductStock: (productId: string, stock: number) => void;
  logout: () => void;
}

export const useStore = create<Store>()(persist((set, get) => ({
  user: null,
  cart: [],
  wishlist: [],
  compareList: [],
  notifications: [],
  recentlyViewed: [],
  theme: 'dark',
  language: 'en' as Language,
  discount: 0,
  setUser: (user) => set({ user }),
  addToCart: (product) => {
    const state = get();
    if (!state.recentlyViewed.find(p => p.id === product.id)) {
      set({ recentlyViewed: [product, ...state.recentlyViewed.slice(0, 11)] });
    }
    set((state) => {
    const existing = state.cart.find(item => item.productId === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return { cart: [...state.cart, { productId: product.id, quantity: 1, price: product.price, product }] };
    });
  },
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.productId !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.find(p => p.id === product.id);
    if (exists) {
      return { wishlist: state.wishlist.filter(p => p.id !== product.id) };
    }
    get().addNotification('success', 'Adicionado aos favoritos!');
    return { wishlist: [...state.wishlist, product] };
  }),
  removeFromWishlist: (id) => set((state) => ({ wishlist: state.wishlist.filter(p => p.id !== id) })),
  addToCompare: (product) => set((state) => {
    if (state.compareList.length >= 4) {
      get().addNotification('error', 'Máximo 4 produtos para comparar');
      return state;
    }
    if (state.compareList.find(p => p.id === product.id)) return state;
    return { compareList: [...state.compareList, product] };
  }),
  removeFromCompare: (id) => set((state) => ({ compareList: state.compareList.filter(p => p.id !== id) })),
  clearCompare: () => set({ compareList: [] }),
  addNotification: (type, message) => {
    const id = Date.now().toString();
    set((state) => ({ notifications: [...state.notifications, { id, type, message }] }));
    setTimeout(() => get().removeNotification(id), 3000);
  },
  removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter(n => n.id !== id) })),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    return { theme: newTheme };
  }),
  setLanguage: (lang) => set({ language: lang }),
  setDiscount: (discount: number) => set({ discount }),
  updateProductStock: (productId: string, stock: number) => set((state) => ({
    recentlyViewed: state.recentlyViewed.map(p => p.id === productId ? { ...p, stock } : p),
    wishlist: state.wishlist.map(p => p.id === productId ? { ...p, stock } : p)
  })),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, cart: [], wishlist: [], compareList: [] });
  }
}), { name: 'ecommerce-store' }));
