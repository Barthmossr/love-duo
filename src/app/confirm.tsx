import { useRouter } from 'expo-router'
import type { JSX } from 'react'

import { Confirm } from '@/onboarding/screens/Confirm'

export default function Page(): JSX.Element {
  const router = useRouter()
  return (
    <Confirm
      navigation={{
        navigate: route =>
          router.push(route === 'Complete' ? '/complete' : '/confirm')
      }}
    />
  )
}
