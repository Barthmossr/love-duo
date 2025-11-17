import { StyleSheet } from 'react-native'

import { COLORS } from '@/theme/colors'
import { FONTS } from '@/theme/fonts'
import { FONT_SIZES } from '@/theme/fontSizes'
import { SPACING } from '@/theme/spacing'

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg
  },
  iconContainer: {
    width: 120,
    height: 120,
    marginBottom: SPACING.xl
  },
  lottie: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES['3xl'],
    color: COLORS.card.text,
    textAlign: 'center',
    marginBottom: SPACING.sm
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.base,
    color: COLORS.muted.text,
    textAlign: 'center',
    marginBottom: SPACING['2xl']
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.card.bg,
    borderRadius: 24,
    padding: SPACING.lg,
    shadowColor: COLORS.shadow.bg,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: SPACING.md
  },
  cardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.lg,
    color: COLORS.card.text,
    marginBottom: SPACING.sm
  },
  buttonContainer: {
    gap: SPACING.md
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    width: '100%'
  },
  buttonHalf: {
    flex: 1
  },
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
