-- Seven Hills Global Database Schema

-- 1. Create tables

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  packaging_details TEXT,
  moq TEXT,
  origin TEXT,
  certifications TEXT[],
  category TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product TEXT,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('new', 'contacted', 'closed')) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Stats Table
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  countries_served INTEGER DEFAULT 0,
  export_volume TEXT,
  happy_clients INTEGER DEFAULT 0,
  product_categories INTEGER DEFAULT 0
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profiles Table (For Admin Roles)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Disable public access by default (though some are true below)
-- By default, if RLS is enabled and no policy exists, all access is denied.

-- Helpers
-- CREATE OR REPLACE FUNCTION public.is_admin()
-- RETURNS BOOLEAN AS $$
-- BEGIN
--   RETURN EXISTS (
--     SELECT 1 FROM public.profiles
--     WHERE id = auth.uid() AND role IN ('admin', 'editor')
--   );
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Products Policies
-- Public can read all products
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
-- Only authenticated users (admins) can insert/update/delete
CREATE POLICY "Admins can insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete products" ON products FOR DELETE TO authenticated USING (true);

-- Inquiries Policies
-- Public can insert inquiries
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
-- Only authenticated users (admins) can read/update/delete inquiries
CREATE POLICY "Admins can view inquiries" ON inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update inquiries" ON inquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete inquiries" ON inquiries FOR DELETE TO authenticated USING (true);

-- Stats Policies
-- Public can read stats
CREATE POLICY "Public can view stats" ON stats FOR SELECT USING (true);
-- Authenticated users can insert/update/delete
CREATE POLICY "Admins can manage stats" ON stats FOR ALL TO authenticated USING (true);

-- Testimonials Policies
-- Public can read testimonials
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
-- Authenticated users can insert/update/delete
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL TO authenticated USING (true);

-- Profiles Policies
-- Authenticated users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
-- Admins can update profiles
CREATE POLICY "Admins can update profiles" ON profiles FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Initial Data for Stats
INSERT INTO stats (countries_served, export_volume, happy_clients, product_categories)
VALUES (15, '50K+ Tons', 200, 8);
