import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// Admin client with service role key - bypasses RLS for admin operations
// IMPORTANT: Only use this on server-side or in admin contexts
// Never expose service role key to client-side code

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for admin client');
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});