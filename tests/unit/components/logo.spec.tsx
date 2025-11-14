import { render } from '@testing-library/react-native'

import { Logo } from '@/components/Logo'

describe('Logo', () => {
  it('should render brand heart icon', () => {
    const { getByTestId } = render(<Logo />)
    getByTestId('brand-icon')
  })
})
