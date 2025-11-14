import { render } from '@testing-library/react-native'

import { Complete } from '@/onboarding/screens/Complete'

describe('Complete screen', () => {
  it('should render', () => {
    const { getByText } = render(<Complete />)
    getByText('Love Duo Ready')
  })
})
