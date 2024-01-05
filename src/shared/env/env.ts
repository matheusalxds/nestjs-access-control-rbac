import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().optional().default('development'),
  PORT: z.coerce.number().optional().default(3000),
  MONGO_URI: z.string().optional(),
  SWAGGER_ROUTE: z.string().optional().default('/docs/swagger'),
  REDOC_ROUTE: z.string().optional().default('/docs/redoc'),
  I18N_DEFAULT_LOCALE: z.string().optional().default('pt'),
  npm_package_name: z.string().optional(),
  npm_package_description: z.string().optional(),
  npm_package_version: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;
