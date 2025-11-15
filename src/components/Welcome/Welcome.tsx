import { Asset } from 'expo-asset'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native'
import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { styles } from './Welcome.styles'

import { Button } from '@/components/Button'
import { COLORS } from '@/theme/colors'

const Welcome = (): React.ReactElement => {
  const animationRef = useRef<LottieView>(null)
  const [animationSource, setAnimationSource] = useState<string | null>(null)

  useEffect(() => {
    const loadAnimation = async (): Promise<void> => {
      try {
        const asset = Asset.fromModule(require('../../../assets/logo.lottie'))
        await asset.downloadAsync()
        if (asset.localUri) {
          setAnimationSource(asset.localUri)
        }
      } catch (error) {
        console.error('Failed to load animation:', error)
      }
    }

    loadAnimation()
  }, [])

  const handleCreateCouple = (): void => {
    console.warn('Create couple navigation pending')
  }

  const handleEnterCode = (): void => {
    console.warn('Enter code navigation pending')
  }

  return (
    <LinearGradient
      colors={['#fef4f2', '#fef7f5', '#fdf5f9', '#f9f5fd', '#f5f7fe']}
      locations={[0, 0.25, 0.5, 0.75, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {animationSource ? (
            <LottieView
              ref={animationRef}
              source={{ uri: animationSource }}
              autoPlay
              loop
              style={styles.lottie}
              resizeMode="contain"
            />
          ) : (
            <ActivityIndicator size="large" color={COLORS.primary.bg} />
          )}
        </View>
        <Text style={styles.title}>Nossa História</Text>
        <Text style={styles.subtitle}>Um espaço especial para o casal</Text>
        <View style={styles.card}>
          <View style={styles.buttonContainer}>
            <Button
              title="Criar Novo Casal"
              onPress={handleCreateCouple}
              variant="primary"
              iconName="group-add"
            />
            <Button title="Entrar com Código" onPress={handleEnterCode} variant="light" />
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export { Welcome }
