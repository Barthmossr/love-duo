import type { MaterialIcons } from '@expo/vector-icons'
import type { ComponentProps } from 'react'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'light'
  iconName?: ComponentProps<typeof MaterialIcons>['name']
  disabled?: boolean
}

export type { ButtonProps }
