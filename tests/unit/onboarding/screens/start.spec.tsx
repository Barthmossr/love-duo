import { fireEvent, render } from '@testing-library/react-native'

import { Start } from '@/onboarding/screens/Start'

describe('Start screen', () => {
  it('should navigate to pair code', () => {
    const navigate = jest.fn()
    const { getByTestId } = render(<Start navigation={{ navigate }} />)
    fireEvent.press(getByTestId('start-join'))
    expect(navigate).toHaveBeenCalledWith('PairCode')
  })

  it('should navigate to create couple', () => {
    const navigate = jest.fn()
    const { getByTestId } = render(<Start navigation={{ navigate }} />)
    fireEvent.press(getByTestId('start-create'))
    expect(navigate).toHaveBeenCalledWith('CreateCouple')
  })
})
