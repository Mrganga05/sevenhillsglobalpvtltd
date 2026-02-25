-- ============================================================
-- FIX: RLS Policies for Admin Tables
-- Run this in Supabase SQL Editor
-- Safe to re-run: uses DROP IF EXISTS before creating
-- ============================================================

-- ========================
-- PRODUCTS TABLE
-- ========================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

CREATE POLICY "Public can view products"
  ON public.products FOR SELECT USING (true);

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE TO authenticated USING (true);

-- ========================
-- CATEGORIES TABLE
-- ========================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

CREATE POLICY "Public can view categories"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE TO authenticated USING (true);

-- ========================
-- SUBPRODUCTS TABLE
-- ========================
ALTER TABLE public.subproducts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view subproducts" ON public.subproducts;
DROP POLICY IF EXISTS "Admins can insert subproducts" ON public.subproducts;
DROP POLICY IF EXISTS "Admins can update subproducts" ON public.subproducts;
DROP POLICY IF EXISTS "Admins can delete subproducts" ON public.subproducts;

CREATE POLICY "Public can view subproducts"
  ON public.subproducts FOR SELECT USING (true);

CREATE POLICY "Admins can insert subproducts"
  ON public.subproducts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can update subproducts"
  ON public.subproducts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can delete subproducts"
  ON public.subproducts FOR DELETE TO authenticated USING (true);

-- ========================
-- INQUIRIES TABLE
-- ========================
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;

CREATE POLICY "Public can insert inquiries"
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view inquiries"
  ON public.inquiries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE TO authenticated USING (true);

-- ========================
-- STATS TABLE
-- ========================
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view stats" ON public.stats;
DROP POLICY IF EXISTS "Admins can manage stats" ON public.stats;

CREATE POLICY "Public can view stats"
  ON public.stats FOR SELECT USING (true);

CREATE POLICY "Admins can manage stats"
  ON public.stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========================
-- TESTIMONIALS TABLE
-- ========================
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

CREATE POLICY "Public can view testimonials"
  ON public.testimonials FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========================
-- VERIFY: Check policies exist
-- ========================
SELECT schemaname, tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
