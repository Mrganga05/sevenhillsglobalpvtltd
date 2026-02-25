import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const supabase = createClient('https://uguvemllaweahpiqltky.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndXZlbWxsYXdlYWhwaXFsdGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjI3NjEsImV4cCI6MjA4NzI5ODc2MX0.EIggaFZWvR2y-1Uk_sjte0YL433e8nsToa7R3BTdogw');

const { data, error } = await supabase.from('products').select('id, name').order('created_at', { ascending: true });
if (error) {
    fs.writeFileSync('products_out.json', JSON.stringify({ error }));
} else {
    fs.writeFileSync('products_out.json', JSON.stringify(data, null, 2));
}
