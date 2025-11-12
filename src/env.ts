import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  EXPO_PUBLIC_API_URL: z.string().url().optional()
})

type Env = z.infer<typeof envSchema>

const env: Env = envSchema.parse(process.env)

export { env, Env }
