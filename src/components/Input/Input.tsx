import React from 'react'
import { TextInput, View, Text } from 'react-native'

import { styles } from './Input.styles'
import type { InputProps } from './Input.types'

const Input = ({
  value,
  onChangeText,
  placeholder,
  disabled = false,
  error
}: InputProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, disabled && styles.disabled, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        placeholderTextColor="#9ca3af"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export { Input }
