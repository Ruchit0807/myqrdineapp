import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '../types/menu';

interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateNotes: (itemId: string, notes: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: MenuItem, quantity: number = 1, notes?: string) => {
        set((state) => {
          const existingItem = state.items.find(cartItem => cartItem.item.id === item.id);
          
          if (existingItem) {
            // Update existing item
            return {
              items: state.items.map(cartItem =>
                cartItem.item.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem
              ),
            };
          } else {
            // Add new item
            return {
              items: [...state.items, { item, quantity, notes }],
            };
          }
        });
      },
      
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter(cartItem => cartItem.item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(cartItem =>
            cartItem.item.id === itemId
              ? { ...cartItem, quantity }
              : cartItem
          ),
        }));
      },
      
      updateNotes: (itemId: string, notes: string) => {
        set((state) => ({
          items: state.items.map(cartItem =>
            cartItem.item.id === itemId
              ? { ...cartItem, notes }
              : cartItem
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, cartItem) => total + cartItem.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, cartItem) => 
          total + (cartItem.item.price * cartItem.quantity), 0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
