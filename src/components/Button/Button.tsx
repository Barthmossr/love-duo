import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text } from 'react-native'

import { styles } from './Button.styles'
import type { ButtonProps } from './Button.types'

const Button = ({
  title,
  onPress,
  variant = 'primary',
  iconName,
  disabled = false
}: ButtonProps): React.ReactElement => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'light' && styles.light,
    disabled && styles.disabled
  ]

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'light' && styles.lightText,
    disabled && styles.disabledText
  ]

  const iconColor =
    variant === 'primary'
      ? styles.primaryText.color
      : variant === 'secondary'
        ? styles.secondaryText.color
        : variant === 'light'
          ? styles.lightText.color
          : styles.disabledText.color

  return (
    <Pressable
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {iconName && <MaterialIcons name={iconName} size={20} color={iconColor} />}
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  )
}

export { Button }
