import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Anon key is intentionally public — safe to embed in frontend code.
// Supabase Row Level Security (RLS) controls what this key can access.
// Fallback values ensure Vercel builds work even if env vars aren't configured.
const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL ||
    'https://uguvemllaweahpiqltky.supabase.co';

const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndXZlbWxsYXdlYWhwaXFsdGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjI3NjEsImV4cCI6MjA4NzI5ODc2MX0.EIggaFZWvR2y-1Uk_sjte0YL433e8nsToa7R3BTdogw';

// Single singleton instance to prevent "Multiple GoTrueClient instances detected" warning
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Untyped client alias — use for INSERT / UPDATE / DELETE in admin
// Avoids TypeScript 'never' errors caused by our manually-written
// Database type not conforming to Supabase v2's strict generic format.
export const supabaseAdmin = supabase as any;
