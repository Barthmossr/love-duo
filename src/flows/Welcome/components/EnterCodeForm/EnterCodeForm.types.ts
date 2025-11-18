interface EnterCodeFormProps {
  coupleCode: string
  userName: string
  onCoupleCodeChange: (_text: string) => void
  onUserNameChange: (_text: string) => void
  onBack: () => void
  onEnter: () => void
  coupleCodeError?: string
  userNameError?: string
}

export type { EnterCodeFormProps }
