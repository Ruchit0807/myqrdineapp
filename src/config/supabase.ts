import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your_supabase_project_url_here'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table names
export const TABLES = {
  DISHES: 'dishes',
  ORDERS: 'orders',
  INVENTORY: 'inventory',
  CUSTOMERS: 'customers',
  REVIEWS: 'reviews'
} as const

// Order status enum
export const ORDER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
} as const

// Payment status enum
export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID_CASH: 'paid_cash',
  PAID_ONLINE: 'paid_online'
} as const

// Types for database operations
export interface Dish {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  availability: boolean
  created_at: string
}

export interface Order {
  id: string
  table_number: number
  items: Array<{ dish_id: string; qty: number }>
  status: keyof typeof ORDER_STATUS
  total_price: number
  payment_status: keyof typeof PAYMENT_STATUS
  created_at: string
}

export interface InventoryItem {
  id: string
  item_name: string
  quantity: number
  unit: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  subscribed: boolean
  created_at: string
}

export interface Review {
  id: string
  customer_id: string
  dish_id: string
  rating: number
  comment: string
  created_at: string
}
