import { z } from 'zod'

import type { Env } from './env.types'

const nodeEnvironmentValues = [
  'development',
  'staging',
  'production',
  'test'
] as const
const logLevelValues = ['error', 'warn', 'info', 'debug'] as const

const envSchema = z.object({
  NODE_ENV: z.enum(nodeEnvironmentValues),
  LOG_LEVEL: z.preprocess(val => {
    return typeof val === 'string' && val.length > 0 ? val : undefined
  }, z.enum(logLevelValues).default('info')),
  EXPO_PUBLIC_API_URL: z.string().url().optional(),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional()
})

const getEnv = (): Env => {
  return envSchema.parse(process.env)
}

export { getEnv }
