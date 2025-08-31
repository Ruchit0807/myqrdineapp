# Supabase Integration Setup Guide

## 🚀 Overview
This guide will help you integrate Supabase database into your restaurant website, replacing localStorage with a real-time, scalable backend.

## 📋 Prerequisites
- Supabase account (free tier available)
- Node.js and npm installed
- Basic knowledge of SQL and React

## 🔧 Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Create New Project**
   - Choose organization
   - Enter project name (e.g., "qr-dine-restaurant")
   - Set database password (save this!)
   - Choose region closest to your users
   - Click "Create new project"

3. **Wait for setup** (usually 2-3 minutes)

## 🔑 Step 2: Get API Keys

1. **Go to Project Settings** → **API**
2. **Copy these values:**
   - Project URL (e.g., `https://yourproject.supabase.co`)
   - Anon/Public Key (starts with `eyJ...`)

## 🗄️ Step 3: Setup Database Schema

1. **Go to SQL Editor** in your Supabase dashboard
2. **Copy and paste** the entire content from `supabase-schema.sql`
3. **Click "Run"** to execute the schema

This will create:
- `dishes` table (menu items)
- `orders` table (customer orders)
- `inventory` table (stock management)
- `customers` table (customer data)
- `reviews` table (customer feedback)
- Proper indexes and RLS policies

## ⚙️ Step 4: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
```bash
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. **Replace with your actual values** from Step 2

## 🔌 Step 5: Update Frontend Code

The following files have been created/updated:

### New Files:
- `src/config/supabase.ts` - Supabase client configuration
- `src/services/database.ts` - Database service layer
- `supabase-schema.sql` - Database schema

### Updated Files:
- `src/pages/OwnerDashboard.tsx` - Now uses Supabase instead of localStorage
- `src/pages/Home.tsx` - AI chat bot integration

## 🧪 Step 6: Test the Integration

1. **Start your development server:**
```bash
npm run dev
```

2. **Check browser console** for any connection errors
3. **Navigate to Owner Dashboard** → **Menu Management**
4. **Try adding/editing dishes** - they should now be saved to Supabase

## 📊 Step 7: Verify Database

1. **Go to Supabase Dashboard** → **Table Editor**
2. **Check each table:**
   - `dishes` - Should show sample menu items
   - `inventory` - Should show sample inventory
   - `orders` - Will be empty initially
   - `customers` - Will be populated as customers order
   - `reviews` - Will be populated as customers review

## 🔐 Step 8: Authentication Setup (Optional)

For owner/admin authentication:

1. **Go to Authentication** → **Settings**
2. **Configure email templates** if needed
3. **Set up social providers** (Google, GitHub, etc.)
4. **Update RLS policies** for authenticated users

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid API key" error:**
   - Check your `.env.local` file
   - Ensure no extra spaces or quotes
   - Restart your dev server

2. **"Table doesn't exist" error:**
   - Run the SQL schema again
   - Check table names match exactly

3. **"RLS policy violation" error:**
   - Check RLS policies in Supabase
   - Ensure proper permissions are set

4. **"Connection timeout" error:**
   - Check your internet connection
   - Verify Supabase project is active
   - Check if you've hit free tier limits

### Debug Steps:

1. **Check browser console** for detailed error messages
2. **Verify Supabase project status** in dashboard
3. **Test connection** in Supabase SQL Editor
4. **Check network tab** for failed API calls

## 📈 Next Steps

### Real-time Features:
- **Order updates** via Supabase subscriptions
- **Live inventory** tracking
- **Real-time notifications** for staff

### Advanced Features:
- **File uploads** for dish images
- **Payment integration** (Stripe, Razorpay)
- **Analytics dashboard** with charts
- **Marketing automation** (email/SMS campaigns)

### Performance Optimization:
- **Database indexing** for faster queries
- **Connection pooling** for high traffic
- **Caching strategies** for frequently accessed data

## 🔒 Security Considerations

1. **Never expose** your service role key in frontend
2. **Use RLS policies** to control data access
3. **Validate all inputs** before database operations
4. **Implement rate limiting** for API endpoints
5. **Regular security audits** of your database

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [React Query](https://tanstack.com/query/latest) - For advanced data fetching
- [Supabase Auth](https://supabase.com/docs/guides/auth) - For user management

## 🆘 Support

If you encounter issues:

1. **Check Supabase status** at [status.supabase.com](https://status.supabase.com)
2. **Search Supabase GitHub** for similar issues
3. **Join Supabase Discord** community
4. **Create issue** in your project repository

## ✅ Checklist

- [ ] Supabase project created
- [ ] API keys copied
- [ ] Database schema executed
- [ ] Environment variables set
- [ ] Frontend code updated
- [ ] Integration tested
- [ ] Sample data verified
- [ ] Authentication configured (optional)

---

**🎉 Congratulations!** Your restaurant website now has a real-time, scalable backend powered by Supabase.

**Next:** Start building customer-facing features like QR menu scanning, order placement, and payment processing!
