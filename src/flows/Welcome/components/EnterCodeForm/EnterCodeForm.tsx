import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './EnterCodeForm.styles'
import type { EnterCodeFormProps } from './EnterCodeForm.types'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const EnterCodeForm = ({
  coupleCode,
  userName,
  onCoupleCodeChange,
  onUserNameChange,
  onBack,
  onEnter,
  coupleCodeError,
  userNameError
}: EnterCodeFormProps): React.ReactElement => {
  return (
    <>
      <Text style={styles.cardTitle}>Código do Casal</Text>
      <Input
        value={coupleCode}
        onChangeText={onCoupleCodeChange}
        placeholder="Ex: RFBZ7H"
        error={coupleCodeError}
      />
      <Text style={styles.cardTitle}>Seu Nome</Text>
      <Input
        value={userName}
        onChangeText={onUserNameChange}
        placeholder="Ex: Maria"
        error={userNameError}
      />
      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <Button title="Voltar" onPress={onBack} variant="light" />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="Entrar" onPress={onEnter} variant="primary" />
        </View>
      </View>
    </>
  )
}

export { EnterCodeForm }
