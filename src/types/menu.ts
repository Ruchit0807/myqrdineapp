export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  available: boolean;
  preparationTime: number;
  allergens: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    [key: string]: string;
  };
  rating: number;
  reviewCount: number;
  cuisine: string[];
  features: string[];
}

export interface Order {
  id: string;
  items: Array<{
    item: MenuItem;
    quantity: number;
    notes?: string;
  }>;
  total: number;
  status: 'pending' | 'approved' | 'cooking' | 'ready' | 'served' | 'cancelled';
  createdAt: Date;
  estimatedTime: number;
  customerNotes?: string;
  tableNumber?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: 'online' | 'cash';
}

export interface Review {
  id: string;
  itemId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}
