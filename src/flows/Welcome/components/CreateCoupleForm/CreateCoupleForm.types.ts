interface CreateCoupleFormProps {
  coupleName: string
  userName: string
  onCoupleNameChange: (_text: string) => void
  onUserNameChange: (_text: string) => void
  onBack: () => void
  onCreateCode: () => void
  coupleNameError?: string
  userNameError?: string
  isLoading?: boolean
}

export type { CreateCoupleFormProps }
