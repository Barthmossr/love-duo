import { Asset } from 'expo-asset'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native'
import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { styles } from './Welcome.styles'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { COLORS } from '@/theme/colors'

const Welcome = (): React.ReactElement => {
  const animationRef = useRef<LottieView>(null)
  const [animationSource, setAnimationSource] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEnterForm, setShowEnterForm] = useState(false)
  const [coupleName, setCoupleName] = useState('')
  const [coupleCode, setCoupleCode] = useState('')
  const [userName, setUserName] = useState('')
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

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
    setShowCreateForm(true)
  }

  const handleEnterCode = (): void => {
    setShowEnterForm(true)
  }

  const handleBack = (): void => {
    setShowCreateForm(false)
    setShowEnterForm(false)
    setCoupleName('')
    setCoupleCode('')
    setUserName('')
    setGeneratedCode(null)
  }

  const handleCreateCode = (): void => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setGeneratedCode(code)
  }

  const handleContinue = (): void => {
    console.warn('Continue as:', userName)
  }

  const handleEnter = (): void => {
    console.warn('Entering with code:', coupleCode, 'as:', userName)
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
        {!showCreateForm && !showEnterForm && !generatedCode && (
          <>
            <Text style={styles.title}>Nossa História</Text>
            <Text style={styles.subtitle}>Um espaço especial para o casal</Text>
          </>
        )}
        <View style={styles.card}>
          {generatedCode ? (
            <>
              <Text style={styles.codeLabel}>Seu código do casal é:</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{generatedCode}</Text>
              </View>
              <Text style={styles.shareText}>Compartilhe este código com seu parceiro(a)</Text>
              <Button
                title={`Continuar como ${userName}`}
                onPress={handleContinue}
                variant="primary"
              />
            </>
          ) : showEnterForm ? (
            <>
              <Text style={styles.cardTitle}>Código do Casal</Text>
              <Input value={coupleCode} onChangeText={setCoupleCode} placeholder="Ex: RFBZ7H" />
              <Text style={styles.cardTitle}>Seu Nome</Text>
              <Input value={userName} onChangeText={setUserName} placeholder="Ex: Maria" />
              <View style={styles.buttonRow}>
                <View style={styles.buttonHalf}>
                  <Button title="Voltar" onPress={handleBack} variant="light" />
                </View>
                <View style={styles.buttonHalf}>
                  <Button title="Entrar" onPress={handleEnter} variant="primary" />
                </View>
              </View>
            </>
          ) : showCreateForm ? (
            <>
              <Text style={styles.cardTitle}>Nome do Casal</Text>
              <Input
                value={coupleName}
                onChangeText={setCoupleName}
                placeholder="Ex: João & Maria"
              />
              <Text style={styles.cardTitle}>Seu Nome</Text>
              <Input value={userName} onChangeText={setUserName} placeholder="Ex: João" />
              <View style={styles.buttonRow}>
                <View style={styles.buttonHalf}>
                  <Button title="Voltar" onPress={handleBack} variant="light" />
                </View>
                <View style={styles.buttonHalf}>
                  <Button title="Criar Código" onPress={handleCreateCode} variant="primary" />
                </View>
              </View>
            </>
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                title="Criar Novo Casal"
                onPress={handleCreateCouple}
                variant="primary"
                iconName="group-add"
              />
              <Button title="Entrar com Código" onPress={handleEnterCode} variant="light" />
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  )
}

export { Welcome }
