-- Supabase Database Schema for Restaurant Website
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL,
    image_url TEXT,
    availability BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    unit TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    subscribed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_number INTEGER NOT NULL,
    items JSONB NOT NULL, -- Array of {dish_id, qty} objects
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid_cash', 'paid_online')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    dish_id UUID REFERENCES dishes(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dishes_availability ON dishes(availability);
CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category);
CREATE INDEX IF NOT EXISTS idx_orders_table_number ON orders(table_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_inventory_quantity ON inventory(quantity);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_reviews_dish_id ON reviews(dish_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer_id ON reviews(customer_id);

-- Enable Row Level Security (RLS)
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for dishes table
CREATE POLICY "Dishes are viewable by everyone" ON dishes
    FOR SELECT USING (true);

CREATE POLICY "Dishes are insertable by authenticated users" ON dishes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Dishes are updatable by authenticated users" ON dishes
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Dishes are deletable by authenticated users" ON dishes
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for inventory table
CREATE POLICY "Inventory is viewable by everyone" ON inventory
    FOR SELECT USING (true);

CREATE POLICY "Inventory is insertable by authenticated users" ON inventory
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Inventory is updatable by authenticated users" ON inventory
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Inventory is deletable by authenticated users" ON inventory
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for customers table
CREATE POLICY "Customers are viewable by everyone" ON customers
    FOR SELECT USING (true);

CREATE POLICY "Customers are insertable by everyone" ON customers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers are updatable by authenticated users" ON customers
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for orders table
CREATE POLICY "Orders are viewable by everyone" ON orders
    FOR SELECT USING (true);

CREATE POLICY "Orders are insertable by everyone" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are updatable by authenticated users" ON orders
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for reviews table
CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Reviews are insertable by everyone" ON reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Reviews are updatable by authenticated users" ON reviews
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert sample data for dishes
INSERT INTO dishes (name, description, price, category, image_url, availability) VALUES
('Butter Chicken', 'Creamy tomato-based curry with tender chicken', 450.00, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true),
('Paneer Tikka', 'Grilled cottage cheese with spices', 280.00, 'Starters', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true),
('Naan Bread', 'Soft leavened flatbread', 30.00, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true),
('Gulab Jamun', 'Sweet milk dumplings in sugar syrup', 80.00, 'Desserts', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true),
('Masala Chai', 'Spiced Indian tea with milk', 40.00, 'Beverages', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', true);

-- Insert sample data for inventory
INSERT INTO inventory (item_name, quantity, unit) VALUES
('Basmati Rice', 25, 'kg'),
('Chicken Breast', 15, 'kg'),
('Paneer', 8, 'kg'),
('Tomatoes', 12, 'kg'),
('Onions', 20, 'kg'),
('Cooking Oil', 10, 'L'),
('Milk', 15, 'L'),
('Flour', 30, 'kg');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for inventory table
CREATE TRIGGER update_inventory_updated_at 
    BEFORE UPDATE ON inventory 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate order total
CREATE OR REPLACE FUNCTION calculate_order_total(order_items JSONB)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC := 0;
    item JSONB;
BEGIN
    FOR item IN SELECT * FROM jsonb_array_elements(order_items)
    LOOP
        total := total + (
            SELECT price * (item->>'qty')::NUMERIC 
            FROM dishes 
            WHERE id = (item->>'dish_id')::UUID
        );
    END LOOP;
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Create view for order details with dish information
CREATE OR REPLACE VIEW order_details AS
SELECT 
    o.id,
    o.table_number,
    o.status,
    o.total_price,
    o.payment_status,
    o.created_at,
    jsonb_agg(
        jsonb_build_object(
            'dish_name', d.name,
            'quantity', (item->>'qty')::INTEGER,
            'price', d.price,
            'subtotal', d.price * (item->>'qty')::NUMERIC
        )
    ) as order_items
FROM orders o
CROSS JOIN LATERAL jsonb_array_elements(o.items) as item
JOIN dishes d ON d.id = (item->>'dish_id')::UUID
GROUP BY o.id, o.table_number, o.status, o.total_price, o.payment_status, o.created_at;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
