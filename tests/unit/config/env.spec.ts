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
})
