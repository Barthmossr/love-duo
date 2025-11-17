import React from 'react'
import { TextInput, View } from 'react-native'

import { styles } from './Input.styles'
import type { InputProps } from './Input.types'

const Input = ({
  value,
  onChangeText,
  placeholder,
  disabled = false
}: InputProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, disabled && styles.disabled]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        placeholderTextColor="#9ca3af"
      />
    </View>
  )
}

export { Input }
