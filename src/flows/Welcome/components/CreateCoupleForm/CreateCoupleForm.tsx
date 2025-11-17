import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './CreateCoupleForm.styles'
import type { CreateCoupleFormProps } from './CreateCoupleForm.types'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const CreateCoupleForm = ({
  coupleName,
  userName,
  onCoupleNameChange,
  onUserNameChange,
  onBack,
  onCreateCode
}: CreateCoupleFormProps): React.ReactElement => {
  return (
    <>
      <Text style={styles.cardTitle}>Nome do Casal</Text>
      <Input value={coupleName} onChangeText={onCoupleNameChange} placeholder="Ex: João & Maria" />
      <Text style={styles.cardTitle}>Seu Nome</Text>
      <Input value={userName} onChangeText={onUserNameChange} placeholder="Ex: João" />
      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <Button title="Voltar" onPress={onBack} variant="light" />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="Criar Código" onPress={onCreateCode} variant="primary" />
        </View>
      </View>
    </>
  )
}

export { CreateCoupleForm }
