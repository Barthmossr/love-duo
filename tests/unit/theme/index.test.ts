import { COLORS } from '../../../src/theme/colors'
import { FONTS } from '../../../src/theme/fonts'
import { FONT_SIZES } from '../../../src/theme/fontSizes'
import { SPACING } from '../../../src/theme/spacing'

describe('theme', () => {
  describe('COLORS', () => {
    it('should export color palette with proper structure', () => {
      expect(COLORS).toBeDefined()
      expect(COLORS.accent.bg).toBe('#feaf83')
      expect(COLORS.accent.text).toBe('#20212b')
      expect(COLORS.primary.bg).toBe('#ff9da5')
      expect(COLORS.primary.text).toBe('#ffffff')
      expect(COLORS.secondary.bg).toBe('#c1a9ee')
      expect(COLORS.secondary.text).toBe('#20212b')
      expect(COLORS.muted.bg).toBe('#eee7fd')
      expect(COLORS.muted.text).toBe('#61626f')
      expect(COLORS.destructive.bg).toBe('#e7000b')
      expect(COLORS.destructive.text).toBe('#ffffff')
      expect(COLORS.card.bg).toBe('#ffffff')
      expect(COLORS.card.text).toBe('#20212b')
      expect(COLORS.popover.bg).toBe('#ffffff')
      expect(COLORS.popover.text).toBe('#20212b')
      expect(COLORS.input.bg).toBe('#e0dbea')
      expect(COLORS.border.bg).toBe('#e0dbea')
      expect(COLORS.ring.bg).toBe('#ff9da5')
    })
  })

  describe('FONTS', () => {
    it('should export Poppins font family names', () => {
      expect(FONTS).toBeDefined()
      expect(FONTS.regular).toBe('Poppins_400Regular')
      expect(FONTS.medium).toBe('Poppins_500Medium')
      expect(FONTS.semiBold).toBe('Poppins_600SemiBold')
      expect(FONTS.bold).toBe('Poppins_700Bold')
    })
  })

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
})
