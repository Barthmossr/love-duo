type NodeEnvironment = 'development' | 'staging' | 'production' | 'test'

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface Env {
  NODE_ENV: NodeEnvironment
  LOG_LEVEL: LogLevel
  EXPO_PUBLIC_API_URL?: string
  EXPO_PUBLIC_SUPABASE_URL?: string
  EXPO_PUBLIC_SUPABASE_ANON_KEY?: string
}

export { Env, NodeEnvironment, LogLevel }
