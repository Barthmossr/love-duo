import type { JSX } from 'react'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { colors } from '@/theme/colors'

interface LogoProps {
  size?: number
}

const Logo = ({ size = 64 }: LogoProps): JSX.Element => {
  const starScale = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starScale, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(starScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [starScale])

  const s = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 24
    },
    heart: { width: size, height: size, position: 'relative' },
    diamond: {
      position: 'absolute',
      width: size * 0.6,
      height: size * 0.6,
      backgroundColor: colors.primary,
      transform: [{ rotate: '45deg' }],
      top: size * 0.25,
      left: size * 0.2,
      borderRadius: 12
    },
    lobeLeft: {
      position: 'absolute',
      width: size * 0.4,
      height: size * 0.4,
      borderRadius: size * 0.2,
      backgroundColor: colors.primary,
      top: size * 0.05,
      left: size * 0.05
    },
    lobeRight: {
      position: 'absolute',
      width: size * 0.4,
      height: size * 0.4,
      borderRadius: size * 0.2,
      backgroundColor: colors.primary,
      top: size * 0.05,
      right: size * 0.05
    },
    star: {
      position: 'absolute',
      width: size * 0.18,
      height: size * 0.18,
      backgroundColor: colors.accent,
      transform: [{ rotate: '45deg' }],
      top: -size * 0.08,
      right: -size * 0.08,
      borderRadius: 4
    }
  })

  return (
    <View style={s.container}>
      <View style={s.heart} testID="brand-icon">
        <View style={s.lobeLeft} />
        <View style={s.lobeRight} />
        <View style={s.diamond} />
        <Animated.View
          style={[
            s.star,
            { transform: [{ rotate: '45deg' }, { scale: starScale }] }
          ]}
        />
      </View>
    </View>
  )
}

export { Logo }
