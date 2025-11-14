import { useRouter } from 'expo-router'
import type { JSX } from 'react'

import { CreateCouple } from '@/onboarding/screens/CreateCouple'

export default function Page(): JSX.Element {
  const router = useRouter()
  return (
    <CreateCouple
      navigation={{
        navigate: route =>
          router.push(route === 'Confirm' ? '/confirm' : '/create-couple')
      }}
    />
  )
}
