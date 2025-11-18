import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './CodeDisplay.styles'
import type { CodeDisplayProps } from './CodeDisplay.types'

import { Button } from '@/components/Button'

const CodeDisplay = ({ code, userName, onContinue }: CodeDisplayProps): React.ReactElement => {
  return (
    <>
      <Text style={styles.codeLabel}>Seu código do casal é:</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>{code}</Text>
      </View>
      <Text style={styles.shareText}>Compartilhe este código com seu parceiro(a)</Text>
      <Button title={`Continuar como ${userName}`} onPress={onContinue} variant="primary" />
    </>
  )
}

export { CodeDisplay }
