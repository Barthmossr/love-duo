import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../theme/colors'
import { FONTS } from '../theme/fonts'
import { FONT_SIZES } from '../theme/fontSizes'

const Index = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Love Duo</Text>
      <Text style={styles.subtitle}>A special space for couples</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card.bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES['3xl'],
    color: COLORS.primary.bg,
    marginBottom: 8
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.base,
    color: COLORS.muted.text
  }
})

export default Index
