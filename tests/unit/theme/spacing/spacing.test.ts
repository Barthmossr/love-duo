import { SPACING } from '@/theme/spacing'

describe('SPACING', () => {
  it('should export spacing scale', () => {
    expect(SPACING).toBeDefined()
    expect(SPACING.xs).toBe(4)
    expect(SPACING.sm).toBe(8)
    expect(SPACING.md).toBe(16)
    expect(SPACING.lg).toBe(24)
    expect(SPACING.xl).toBe(32)
    expect(SPACING['2xl']).toBe(48)
  })
})
