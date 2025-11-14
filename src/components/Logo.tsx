import { DotLottie } from '@lottiefiles/dotlottie-react-native'
import type { JSX } from 'react'
import { StyleSheet, View } from 'react-native'

interface LogoProps {
  size?: number
}

const Logo = ({ size = 96 }: LogoProps): JSX.Element => {
  const s = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 24
    },
    box: { width: size, height: size }
  })

  return (
    <View
      style={s.container}
      testID="brand-icon"
      accessibilityLabel="Brand Logo"
    >
      <DotLottie
        source={require('../assets/logo.lottie')}
        style={s.box}
        autoplay
        loop
      />
    </View>
  )
}

export { Logo }
