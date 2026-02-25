import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Basic validation to warn if vars are missing during dev
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase UI/Anon Key missing from environment variables. Make sure your .env file is set up.');
}

// Single singleton instance to prevent "Multiple GoTrueClient instances detected" warning
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Untyped client alias — use for INSERT / UPDATE / DELETE in admin
// Avoids TypeScript 'never' errors caused by our manually-written
// Database type not conforming to Supabase v2's strict generic format.
export const supabaseAdmin = supabase as any;
