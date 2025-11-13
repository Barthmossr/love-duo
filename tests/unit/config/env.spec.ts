import { getEnv } from '@/config'

describe('env validation', () => {
  it('should allow test environment and default log level', () => {
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

  it('should validate EXPO_PUBLIC_API_URL as a URL', () => {
    const previousNodeEnv = process.env.NODE_ENV
    const previousUrl = process.env.EXPO_PUBLIC_API_URL
    process.env.NODE_ENV = 'test'
    process.env.EXPO_PUBLIC_API_URL = 'https://example.com'
    const env = getEnv()
    expect(env.EXPO_PUBLIC_API_URL).toBe('https://example.com')
    process.env.EXPO_PUBLIC_API_URL = previousUrl
    process.env.NODE_ENV = previousNodeEnv
  })

  it('should throw when EXPO_PUBLIC_API_URL is invalid', () => {
    const previousNodeEnv = process.env.NODE_ENV
    const previousUrl = process.env.EXPO_PUBLIC_API_URL
    process.env.NODE_ENV = 'test'
    process.env.EXPO_PUBLIC_API_URL = 'not-a-url'
    expect(() => getEnv()).toThrow()
    process.env.EXPO_PUBLIC_API_URL = previousUrl
    process.env.NODE_ENV = previousNodeEnv
  })

  it('should respect provided LOG_LEVEL values', () => {
    const previousNodeEnv = process.env.NODE_ENV
    const previousLogLevel = process.env.LOG_LEVEL
    const hadApiUrl = Object.prototype.hasOwnProperty.call(
      process.env,
      'EXPO_PUBLIC_API_URL'
    )
    process.env.NODE_ENV = 'test'
    process.env.LOG_LEVEL = 'debug'
    if (hadApiUrl) delete process.env.EXPO_PUBLIC_API_URL
    const env = getEnv()
    expect(env.LOG_LEVEL).toBe('debug')
    process.env.LOG_LEVEL = previousLogLevel
    process.env.NODE_ENV = previousNodeEnv
  })
})
