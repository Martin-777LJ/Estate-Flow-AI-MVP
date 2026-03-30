import { createClient } from '@supabase/supabase-js';

export const createServerClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!url || !key) {
    console.warn('Supabase URL or Service Role Key is missing. Server Client will not be functional.');
  }

  return createClient(url, key);
};
