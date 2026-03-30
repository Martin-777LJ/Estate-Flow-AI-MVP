export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
} as const;

export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    // During build time on Vercel, we might not have these env vars if they are not provided in the build settings.
    // However, Next.js tries to prerender pages. We should not throw a hard error here that crashes the build
    // if we can avoid it, but Supabase client creation will fail if these are missing.
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    return false;
  }

  return true;
}

export const isBrowser = typeof window !== 'undefined';
