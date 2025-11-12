import { getEnv } from '@/config'

describe('env validation', () => {
  test('allows test environment and defaults log level', () => {
    const previousNodeEnv = process.env.NODE_ENV
    const hadLogLevel = Object.prototype.hasOwnProperty.call(
      process.env,
      'LOG_LEVEL'
    )
    if (hadLogLevel) delete process.env.LOG_LEVEL
    process.env.NODE_ENV = 'test'
    const env = getEnv()
    expect(env.NODE_ENV).toBe('test')
    expect(env.LOG_LEVEL).toBe('info')
    process.env.NODE_ENV = previousNodeEnv
    if (hadLogLevel === true) {
      delete process.env.LOG_LEVEL
    }
  })

  test('validates EXPO_PUBLIC_API_URL as a URL', () => {
    const previousNodeEnv = process.env.NODE_ENV
    const previousUrl = process.env.EXPO_PUBLIC_API_URL
    process.env.NODE_ENV = 'test'
    process.env.EXPO_PUBLIC_API_URL = 'https://example.com'
    const env = getEnv()
    expect(env.EXPO_PUBLIC_API_URL).toBe('https://example.com')
    process.env.EXPO_PUBLIC_API_URL = previousUrl
    process.env.NODE_ENV = previousNodeEnv
  })
})
