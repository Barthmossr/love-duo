import { useRouter } from 'expo-router'
import type { JSX } from 'react'

import { PairCode } from '@/onboarding/screens/PairCode'

export default function Page(): JSX.Element {
  const router = useRouter()
  return (
    <PairCode
      navigation={{
        navigate: route =>
          router.push(route === 'Confirm' ? '/confirm' : '/pair-code')
      }}
    />
  )
}
