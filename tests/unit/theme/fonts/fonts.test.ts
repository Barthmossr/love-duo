import { FONTS } from '@/theme/fonts'

describe('FONTS', () => {
  it('should export Poppins font family names', () => {
    expect(FONTS).toBeDefined()
    expect(FONTS.regular).toBe('Poppins_400Regular')
    expect(FONTS.medium).toBe('Poppins_500Medium')
    expect(FONTS.semiBold).toBe('Poppins_600SemiBold')
    expect(FONTS.bold).toBe('Poppins_700Bold')
  })
})
