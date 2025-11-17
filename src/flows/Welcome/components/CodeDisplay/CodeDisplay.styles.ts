import { StyleSheet } from 'react-native'

import { COLORS } from '@/theme/colors'
import { FONTS } from '@/theme/fonts'
import { FONT_SIZES } from '@/theme/fontSizes'
import { SPACING } from '@/theme/spacing'

const styles = StyleSheet.create({
  codeLabel: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.base,
    color: COLORS.card.text,
    textAlign: 'center',
    marginBottom: SPACING.md
  },
  codeContainer: {
    backgroundColor: COLORS.code.bg,
    borderRadius: 24,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    alignItems: 'center'
  },
  codeText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES['3xl'],
    color: COLORS.primary.bg,
    letterSpacing: 4
  },
  shareText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.muted.text,
    textAlign: 'center',
    marginBottom: SPACING.lg
  }
})

export { styles }
