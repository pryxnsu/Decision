import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
    },
    experimental__runtimeEnv: process.env,
});
