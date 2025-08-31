import { supabase, TABLES, ORDER_STATUS, PAYMENT_STATUS, type Dish, type Order, type InventoryItem, type Customer, type Review } from '../config/supabase'

// Dishes Service
export const dishesService = {
  // Get all available dishes
  async getAvailableDishes(): Promise<Dish[]> {
    const { data, error } = await supabase
      .from(TABLES.DISHES)
      .select('*')
      .eq('availability', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get all dishes (for admin)
  async getAllDishes(): Promise<Dish[]> {
    const { data, error } = await supabase
      .from(TABLES.DISHES)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get dish by ID
  async getDishById(id: string): Promise<Dish | null> {
    const { data, error } = await supabase
      .from(TABLES.DISHES)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new dish
  async createDish(dish: Omit<Dish, 'id' | 'created_at'>): Promise<Dish> {
    const { data, error } = await supabase
      .from(TABLES.DISHES)
      .insert([dish])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update dish
  async updateDish(id: string, updates: Partial<Dish>): Promise<Dish> {
    const { data, error } = await supabase
      .from(TABLES.DISHES)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete dish
  async deleteDish(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.DISHES)
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Toggle dish availability
  async toggleAvailability(id: string, availability: boolean): Promise<Dish> {
    return this.updateDish(id, { availability })
  }
}

// Orders Service
export const ordersService = {
  // Create new order
  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .insert([order])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get order by ID
  async getOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Get orders by table number
  async getOrdersByTable(tableNumber: number): Promise<Order[]> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .select('*')
      .eq('table_number', tableNumber)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get all orders (for admin)
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Update order status
  async updateOrderStatus(id: string, status: keyof typeof ORDER_STATUS): Promise<Order> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update payment status
  async updatePaymentStatus(id: string, paymentStatus: keyof typeof PAYMENT_STATUS): Promise<Order> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .update({ payment_status: paymentStatus })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get orders by status
  async getOrdersByStatus(status: keyof typeof ORDER_STATUS): Promise<Order[]> {
    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

// Inventory Service
export const inventoryService = {
  // Get all inventory items
  async getAllItems(): Promise<InventoryItem[]> {
    const { data, error } = await supabase
      .from(TABLES.INVENTORY)
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create inventory item
  async createItem(item: Omit<InventoryItem, 'id' | 'updated_at'>): Promise<InventoryItem> {
    const { data, error } = await supabase
      .from(TABLES.INVENTORY)
      .insert([item])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update inventory item
  async updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
    const { data, error } = await supabase
      .from(TABLES.INVENTORY)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete inventory item
  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.INVENTORY)
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Update quantity
  async updateQuantity(id: string, quantity: number): Promise<InventoryItem> {
    return this.updateItem(id, { quantity })
  }
}

// Customers Service
export const customersService = {
  // Create customer
  async createCustomer(customer: Omit<Customer, 'id' | 'created_at'>): Promise<Customer> {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .insert([customer])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get customer by phone or email
  async getCustomerByContact(phone?: string, email?: string): Promise<Customer | null> {
    let query = supabase.from(TABLES.CUSTOMERS).select('*')
    
    if (phone) {
      query = query.eq('phone', phone)
    } else if (email) {
      query = query.eq('email', email)
    }

    const { data, error } = await query.single()
    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return data
  },

  // Update customer subscription
  async updateSubscription(id: string, subscribed: boolean): Promise<Customer> {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .update({ subscribed })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all customers (for marketing)
  async getAllCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from(TABLES.CUSTOMERS)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

// Reviews Service
export const reviewsService = {
  // Create review
  async createReview(review: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .insert([review])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get reviews by dish
  async getReviewsByDish(dishId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select(`
        *,
        customers(name, phone)
      `)
      .eq('dish_id', dishId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get all reviews (for admin)
  async getAllReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select(`
        *,
        customers(name, phone),
        dishes(name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

// Analytics Service
export const analyticsService = {
  // Get sales analytics
  async getSalesAnalytics(period: 'daily' | 'weekly' | 'monthly'): Promise<any> {
    let dateFilter = ''
    const now = new Date()
    
    switch (period) {
      case 'daily':
        dateFilter = now.toISOString().split('T')[0]
        break
      case 'weekly':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        dateFilter = weekAgo.toISOString().split('T')[0]
        break
      case 'monthly':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        dateFilter = monthAgo.toISOString().split('T')[0]
        break
    }

    const { data, error } = await supabase
      .from(TABLES.ORDERS)
      .select('*')
      .gte('created_at', dateFilter)
      .order('created_at', { ascending: false })

    if (error) throw error

    const orders = data || []
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      period,
      totalOrders,
      totalRevenue,
      averageOrderValue,
      orders
    }
  },

  // Get low stock items
  async getLowStockItems(threshold: number = 5): Promise<InventoryItem[]> {
    const { data, error } = await supabase
      .from(TABLES.INVENTORY)
      .select('*')
      .lte('quantity', threshold)
      .order('quantity', { ascending: true })

    if (error) throw error
    return data || []
  }
}

// Real-time subscriptions
export const realtimeService = {
  // Subscribe to order updates
  subscribeToOrders(callback: (payload: any) => void) {
    return supabase
      .channel('orders')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: TABLES.ORDERS }, 
        callback
      )
      .subscribe()
  },

  // Subscribe to inventory updates
  subscribeToInventory(callback: (payload: any) => void) {
    return supabase
      .channel('inventory')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: TABLES.INVENTORY }, 
        callback
      )
      .subscribe()
  }
}
