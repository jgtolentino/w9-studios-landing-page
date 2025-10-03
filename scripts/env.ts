import { config } from 'dotenv';
import { z } from 'zod';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const Env = z.object({
  NEXT_PUBLIC_WIX_CLIENT_ID: z.string().min(10, 'NEXT_PUBLIC_WIX_CLIENT_ID missing/too short'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const env = Env.parse(process.env);

console.log('✅ Environment validation passed');
console.log('NEXT_PUBLIC_WIX_CLIENT_ID:', env.NEXT_PUBLIC_WIX_CLIENT_ID.substring(0, 10) + '...');

export { env };
