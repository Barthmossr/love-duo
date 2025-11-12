type NodeEnvironment = 'development' | 'staging' | 'production' | 'test'

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface Env {
  NODE_ENV: NodeEnvironment
  LOG_LEVEL: LogLevel
  EXPO_PUBLIC_API_URL?: string
}

export { Env, NodeEnvironment, LogLevel }
