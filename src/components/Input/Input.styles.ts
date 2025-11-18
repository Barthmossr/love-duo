import { StyleSheet } from 'react-native'

import { COLORS } from '@/theme/colors'
import { FONTS } from '@/theme/fonts'
import { FONT_SIZES } from '@/theme/fontSizes'
import { SPACING } from '@/theme/spacing'

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.input.bg,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.ring.bg,
    paddingHorizontal: SPACING.md,
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.base,
    color: COLORS.card.text
  },
  disabled: {
    opacity: 0.5
  },
  inputError: {
    borderColor: COLORS.destructive.bg
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.destructive.bg,
    marginTop: SPACING.xs
  }
})

export { styles }
