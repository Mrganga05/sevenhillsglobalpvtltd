-- ============================================================
-- STEP 1: Enable RLS and add policies for public SELECT
-- (Run even if policies already exist - use IF NOT EXISTS variant)
-- ============================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist, then recreate (idempotent)
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

CREATE POLICY "Public can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- STEP 2: Insert all product types / categories
-- ON CONFLICT (slug) DO NOTHING prevents duplicate errors
-- ============================================================
INSERT INTO public.categories (name, slug) VALUES
  ('Turmeric', 'turmeric'),
  ('Cashew nuts', 'cashew-nuts'),
  ('Onions / onion powder', 'onions-onion-powder'),
  ('Millets', 'millets'),
  ('Jaggery/jaggery powder', 'jaggery-jaggery-powder'),
  ('Honey', 'honey'),
  ('Moringa powder', 'moringa-powder'),
  ('Banana powder', 'banana-powder'),
  ('Groundnut', 'groundnut'),
  ('Black pepper', 'black-pepper'),
  ('Dry red chilli / dry red chilli powder', 'dry-red-chilli-powder'),
  ('Spices', 'spices'),
  ('Herbal powders', 'herbal-powders'),
  ('Vegetable powders', 'vegetable-powders'),
  ('Vegetables', 'vegetables'),
  ('Fruits (mangoes)', 'fruits-mangoes'),
  ('Tea', 'tea'),
  ('Coffee', 'coffee'),
  ('Marine products', 'marine-products'),
  ('Gems and jewellery', 'gems-and-jewellery'),
  ('Ceramic products and glassware', 'ceramic-products-and-glassware'),
  ('Cereals', 'cereals'),
  ('Textiles and garments', 'textiles-and-garments'),
  ('Foot wear', 'foot-wear'),
  ('Artificial jewellery', 'artificial-jewellery'),
  ('Dry fruits', 'dry-fruits'),
  ('Rice (basmati and non basmati)', 'rice-basmati-and-non-basmati'),
  ('Dry Coconut', 'dry-coconut'),
  ('Amla', 'amla'),
  ('Tamarind', 'tamarind'),
  ('Cocopeat', 'cocopeat')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- STEP 3: Verify the count — should show 31 rows
-- ============================================================
SELECT COUNT(*) AS total_categories FROM public.categories;
SELECT name, slug FROM public.categories ORDER BY name;
