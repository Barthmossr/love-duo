import { LinearGradient } from 'expo-linear-gradient'
import { Stack } from 'expo-router'
import type { JSX } from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '@/theme/colors'

export default function Layout(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.base, colors.accentSoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Stack initialRouteName="start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start" />
        <Stack.Screen name="pair-code" />
        <Stack.Screen name="create-couple" />
        <Stack.Screen name="confirm" />
        <Stack.Screen name="complete" />
      </Stack>
    </View>
  )
}
