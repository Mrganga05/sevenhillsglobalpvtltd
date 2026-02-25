-- 1. Ensure Categories RLS policies exist
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

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

-- 2. Insert the missing product types (categories)
-- We use ON CONFLICT DO NOTHING to avoid duplicate errors if some already exist
-- Assuming categories has a unique constraint on 'slug' or 'name'
-- If there's no unique constraint, inserting might create duplicates, 
-- but we will insert them anyway to ensure they exist.

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
('Dry red chilli /dry red chilli powder', 'dry-red-chilli-dry-red-chilli-powder'),
('Spices', 'spices'),
('Herbal powders', 'herbal-powders'),
('Vegetable powders', 'vegetable-powders'),
('Vegetables', 'vegetables'),
('Fruits( mangoes)', 'fruits-mangoes'),
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
('Rice ( basmati and non basmati )', 'rice-basmati-and-non-basmati'),
('Dry Coconut', 'dry-coconut'),
('Amla', 'amla'),
('Tamirind', 'tamirind'),
('cocopeat', 'cocopeat')
ON CONFLICT (slug) DO NOTHING;
