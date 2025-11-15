import { render } from '@testing-library/react-native'

import { Button } from '@/components/Button/Button'

describe('Button', () => {
  it('should render with title', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />)
    expect(getByText('Test Button')).toBeDefined()
  })
})
