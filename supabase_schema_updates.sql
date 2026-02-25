-- 1. Add price to products
ALTER TABLE public.products ADD COLUMN price DECIMAL(10, 2);

-- 2. Create subproducts table
CREATE TABLE public.subproducts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS and setup policies for subproducts
ALTER TABLE public.subproducts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view subproducts" ON public.subproducts FOR SELECT USING (true);
CREATE POLICY "Admins can insert subproducts" ON public.subproducts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update subproducts" ON public.subproducts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete subproducts" ON public.subproducts FOR DELETE TO authenticated USING (true);
