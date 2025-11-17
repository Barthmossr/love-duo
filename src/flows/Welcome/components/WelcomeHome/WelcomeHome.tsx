import React from 'react'
import { View } from 'react-native'

import { styles } from './WelcomeHome.styles'
import type { WelcomeHomeProps } from './WelcomeHome.types'

import { Button } from '@/components/Button'

const WelcomeHome = ({ onCreateCouple, onEnterCode }: WelcomeHomeProps): React.ReactElement => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Criar Novo Casal"
        onPress={onCreateCouple}
        variant="primary"
        iconName="group-add"
      />
      <Button title="Entrar com Código" onPress={onEnterCode} variant="light" />
    </View>
  )
}

export { WelcomeHome }
