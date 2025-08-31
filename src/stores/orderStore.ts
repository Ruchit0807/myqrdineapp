import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderItem = {
  name: string;
  quantity: number;
  notes?: string;
};

export type Order = {
  id: string;
  customerName?: string;
  tableNumber?: string | null;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'approved' | 'cooking' | 'ready' | 'served';
  createdAt: string; // ISO string
  paymentMethod: 'online' | 'cash';
  estimatedTime?: number; // minutes, set by chef
};

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (orderId: string, status: Order['status']) => void;
  updateEstimatedTime: (orderId: string, minutes: number) => void;
  getById: (orderId: string) => Order | undefined;
  clearAll: () => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      })),
      updateEstimatedTime: (orderId, minutes) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, estimatedTime: minutes } : o)
      })),
      getById: (orderId) => get().orders.find(o => o.id === orderId),
      clearAll: () => set({ orders: [] })
    }),
    { name: 'orders-storage' }
  )
);


