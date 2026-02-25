-- ============================================================
-- FULL RESET & SECURE STORAGE POLICIES
-- Bucket: products-images
-- Frontend upload via authenticated admin
-- Safe to re-run
-- ============================================================


-- ------------------------------------------------------------
-- STEP 1: Ensure bucket is PUBLIC (viewable by anyone)
-- ------------------------------------------------------------

UPDATE storage.buckets
SET public = true
WHERE id = 'products-images';


-- ------------------------------------------------------------
-- STEP 2: Remove ALL existing policies on storage.objects
-- (Safe cleanup without touching storage system tables)
-- ------------------------------------------------------------

DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;


-- ------------------------------------------------------------
-- STEP 3: Public READ access (only this bucket)
-- ------------------------------------------------------------

CREATE POLICY "public_view_products_images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'products-images');


-- ------------------------------------------------------------
-- STEP 4: Authenticated INSERT (upload)
-- ------------------------------------------------------------

CREATE POLICY "auth_insert_products_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products-images');


-- ------------------------------------------------------------
-- STEP 5: Authenticated UPDATE (only own files)
-- ------------------------------------------------------------

CREATE POLICY "auth_update_products_images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'products-images'
  AND owner = auth.uid()
)
WITH CHECK (bucket_id = 'products-images');


-- ------------------------------------------------------------
-- STEP 6: Authenticated DELETE (only own files)
-- ------------------------------------------------------------

CREATE POLICY "auth_delete_products_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'products-images'
  AND owner = auth.uid()
);


-- ------------------------------------------------------------
-- STEP 7: Verify Policies
-- ------------------------------------------------------------

SELECT policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;
