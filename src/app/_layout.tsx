import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from '@expo-google-fonts/poppins'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { COLORS } from '@/theme/colors'

const RootLayout = (): React.ReactElement => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.bg} />
      </View>
    )
  }

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.card.bg,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default RootLayout
