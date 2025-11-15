import { StyleSheet } from 'react-native'

import { COLORS } from '@/theme/colors'
import { FONTS } from '@/theme/fonts'
import { FONT_SIZES } from '@/theme/fontSizes'
import { SPACING } from '@/theme/spacing'

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    minHeight: 56,
    gap: SPACING.sm
  },
  primary: {
    backgroundColor: COLORS.primary.bg
  },
  secondary: {
    backgroundColor: COLORS.secondary.bg
  },
  light: {
    backgroundColor: COLORS.muted.bg
  },
  disabled: {
    backgroundColor: COLORS.muted.bg,
    opacity: 0.6
  },
  text: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.base
  },
  primaryText: {
    color: COLORS.primary.text
  },
  secondaryText: {
    color: COLORS.secondary.text
  },
  lightText: {
    color: COLORS.card.text
  },
  disabledText: {
    color: COLORS.muted.text
  }
})

export { styles }
