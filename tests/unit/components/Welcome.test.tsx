import { render } from '@testing-library/react-native'

import { Welcome } from '@/components/Welcome/Welcome'

describe('Welcome', () => {
  it('should render title correctly', () => {
    const { getByText } = render(<Welcome />)
    expect(getByText('Nossa História')).toBeDefined()
  })
})
