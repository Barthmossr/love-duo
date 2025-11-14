import { useRouter } from 'expo-router'
import type { JSX } from 'react'

import { Start } from '@/onboarding/screens/Start'

export default function Page(): JSX.Element {
  const router = useRouter()
  return (
    <Start
      navigation={{
        navigate: route => {
          if (route === 'PairCode') router.push('/pair-code')
          else if (route === 'CreateCouple') router.push('/create-couple')
        }
      }}
    />
  )
}
