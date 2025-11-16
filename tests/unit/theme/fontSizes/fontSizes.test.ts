import { FONT_SIZES } from '@/theme/fontSizes'

describe('FONT_SIZES', () => {
  it('should export font size scale', () => {
    expect(FONT_SIZES).toBeDefined()
    expect(FONT_SIZES.xs).toBe(12)
    expect(FONT_SIZES.sm).toBe(14)
    expect(FONT_SIZES.base).toBe(16)
    expect(FONT_SIZES.lg).toBe(18)
    expect(FONT_SIZES.xl).toBe(20)
    expect(FONT_SIZES['2xl']).toBe(24)
    expect(FONT_SIZES['3xl']).toBe(30)
    expect(FONT_SIZES['4xl']).toBe(36)
  })
})
