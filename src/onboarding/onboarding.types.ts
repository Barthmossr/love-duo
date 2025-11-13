interface Credentials {
  email: string
  password: string
}

interface UserProfile {
  id: string
  displayName: string
}

interface CouplePairing {
  code: string
  partnerUserId?: string
}

interface OnboardingState {
  isRegistered: boolean
  isLoggedIn: boolean
  pairing?: CouplePairing
}

export { Credentials, UserProfile, CouplePairing, OnboardingState }
