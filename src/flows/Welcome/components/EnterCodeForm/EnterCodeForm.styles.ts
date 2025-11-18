import { StyleSheet } from 'react-native'

import { COLORS } from '@/theme/colors'
import { FONTS } from '@/theme/fonts'
import { FONT_SIZES } from '@/theme/fontSizes'
import { SPACING } from '@/theme/spacing'

const styles = StyleSheet.create({
  cardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.lg,
    color: COLORS.card.text,
    marginBottom: SPACING.sm
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    width: '100%'
  },
  buttonHalf: {
    flex: 1
  }
})

export { styles }
