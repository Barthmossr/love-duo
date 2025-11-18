interface InputProps {
  value: string
  onChangeText: (_text: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
}

export type { InputProps }
