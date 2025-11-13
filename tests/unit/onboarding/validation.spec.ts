import { coupleCodeSchema, credentialsSchema } from '@/onboarding'

describe('onboarding validation', () => {
  it('should validate correct credentials', () => {
    const result = credentialsSchema.safeParse({
      email: 'user@example.com',
      password: 'password123'
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = credentialsSchema.safeParse({
      email: 'invalid-email',
      password: 'password123'
    })
    expect(result.success).toBe(false)
  })

  it('should reject short password', () => {
    const result = credentialsSchema.safeParse({
      email: 'user@example.com',
      password: 'short'
    })
    expect(result.success).toBe(false)
  })

  it('should accept valid couple codes', () => {
    const valid = ['ABCDEF', 'HJKLMN', '234567', 'BCDFGH']
    valid.forEach(code => {
      const result = coupleCodeSchema.safeParse(code)
      expect(result.success).toBe(true)
    })
  })
})
