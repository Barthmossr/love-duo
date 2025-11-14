import { fireEvent, render } from '@testing-library/react-native'

import { CreateCouple } from '@/onboarding/screens/CreateCouple'

describe('CreateCouple screen', () => {
  it('should render', () => {
    const { getByText } = render(
      <CreateCouple navigation={{ navigate: () => {} }} />
    )
    getByText('Create Couple')
  })
})
