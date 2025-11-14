import type { JSX } from 'react'

import { Start } from '@/onboarding/screens/Start'

const App = (): JSX.Element => {
  return <Start navigation={{ navigate: () => {} }} />
}

export { App }
