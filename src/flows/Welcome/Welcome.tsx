import { Asset } from 'expo-asset'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native'
import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { CodeDisplay } from './components/CodeDisplay'
import { CreateCoupleForm } from './components/CreateCoupleForm'
import { EnterCodeForm } from './components/EnterCodeForm'
import { WelcomeHome } from './components/WelcomeHome'
import { styles } from './Welcome.styles'

import { COLORS } from '@/theme/colors'

type WelcomeStep = 'home' | 'createForm' | 'enterForm' | 'codeDisplay'

const Welcome = (): React.ReactElement => {
  const animationRef = useRef<LottieView>(null)
  const [animationSource, setAnimationSource] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<WelcomeStep>('home')
  const [coupleName, setCoupleName] = useState('')
  const [coupleCode, setCoupleCode] = useState('')
  const [userName, setUserName] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [coupleNameError, setCoupleNameError] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [coupleCodeError, setCoupleCodeError] = useState('')

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

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Nome não pode estar vazio'
    }
    if (name.length < 1 || name.length > 16) {
      return 'Nome deve ter entre 1 e 16 caracteres'
    }
    return ''
  }

  const validateCoupleCode = (code: string): string => {
    if (!code.trim()) {
      return 'Código não pode estar vazio'
    }
    if (code.length !== 6) {
      return 'Código deve ter 6 caracteres'
    }
    return ''
  }

  const handleCreateCouple = (): void => {
    setCurrentStep('createForm')
  }

  const handleEnterCode = (): void => {
    setCurrentStep('enterForm')
  }

  const handleBack = (): void => {
    setCurrentStep('home')
    setCoupleName('')
    setCoupleCode('')
    setUserName('')
    setGeneratedCode('')
    setCoupleNameError('')
    setUserNameError('')
    setCoupleCodeError('')
  }

  const handleCreateCode = (): void => {
    const coupleNameValidation = validateName(coupleName)
    const userNameValidation = validateName(userName)

    setCoupleNameError(coupleNameValidation)
    setUserNameError(userNameValidation)

    if (coupleNameValidation || userNameValidation) {
      return
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setGeneratedCode(code)
    setCurrentStep('codeDisplay')
  }

  const handleContinue = (): void => {
    console.warn('Continue as:', userName)
  }

  const handleEnter = (): void => {
    const codeValidation = validateCoupleCode(coupleCode)
    const userNameValidation = validateName(userName)

    setCoupleCodeError(codeValidation)
    setUserNameError(userNameValidation)

    if (codeValidation || userNameValidation) {
      return
    }

    console.warn('Entering with code:', coupleCode, 'as:', userName)
  }

  const renderStep = (): React.ReactElement => {
    switch (currentStep) {
      case 'codeDisplay':
        return <CodeDisplay code={generatedCode} userName={userName} onContinue={handleContinue} />
      case 'enterForm':
        return (
          <EnterCodeForm
            coupleCode={coupleCode}
            userName={userName}
            onCoupleCodeChange={setCoupleCode}
            onUserNameChange={setUserName}
            onBack={handleBack}
            onEnter={handleEnter}
            coupleCodeError={coupleCodeError}
            userNameError={userNameError}
          />
        )
      case 'createForm':
        return (
          <CreateCoupleForm
            coupleName={coupleName}
            userName={userName}
            onCoupleNameChange={setCoupleName}
            onUserNameChange={setUserName}
            onBack={handleBack}
            onCreateCode={handleCreateCode}
            coupleNameError={coupleNameError}
            userNameError={userNameError}
          />
        )
      case 'home':
        return <WelcomeHome onCreateCouple={handleCreateCouple} onEnterCode={handleEnterCode} />
    }
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
        {currentStep === 'home' && (
          <>
            <Text style={styles.title}>Nossa História</Text>
            <Text style={styles.subtitle}>Um espaço especial para o casal</Text>
          </>
        )}
        <View style={styles.card}>{renderStep()}</View>
      </View>
    </LinearGradient>
  )
}

export { Welcome }
