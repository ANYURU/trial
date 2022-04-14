import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    // replace with your URL and API key 
    'SUPABASE_URL',
    'SUPABASE_API_KEY'
);