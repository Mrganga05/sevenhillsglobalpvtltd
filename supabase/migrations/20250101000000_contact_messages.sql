-- Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Note: No RLS policies are required to write records if your Edge Function 
-- uses the internal SUPABASE_SERVICE_ROLE_KEY, which skips RLS completely.
-- Having no policies makes sure regular users cannot read/modify records directly via the client APIs.
