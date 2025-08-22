import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TableStoreState {
  tableNumber: string | null;
  setTableNumber: (table: string | null) => void;
}

export const useTableStore = create<TableStoreState>()(
  persist(
    (set) => ({
      tableNumber: null,
      setTableNumber: (table: string | null) => set({ tableNumber: table }),
    }),
    { name: 'table-storage' }
  )
);


