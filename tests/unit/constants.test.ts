import { COLORS } from '../../src/constants'

describe('constants', () => {
  it('should export COLORS object', () => {
    expect(COLORS).toBeDefined()
    expect(COLORS.background).toBe('#fff')
    expect(COLORS.text).toBe('#000')
  })
})
