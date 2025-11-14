import { fireEvent, render } from '@testing-library/react-native'

import { PairCode } from '@/onboarding/screens/PairCode'

describe('PairCode screen', () => {
  it('should not navigate when invalid', () => {
    const navigate = jest.fn()
    const { getByTestId } = render(<PairCode navigation={{ navigate }} />)
    fireEvent.changeText(getByTestId('paircode-input'), '123456')
    fireEvent.press(getByTestId('paircode-next'))
    expect(navigate).not.toHaveBeenCalled()
  })

  it('should navigate when valid', () => {
    const navigate = jest.fn()
    const { getByTestId } = render(<PairCode navigation={{ navigate }} />)
    fireEvent.changeText(getByTestId('paircode-input'), 'ABCDEF')
    fireEvent.press(getByTestId('paircode-next'))
    expect(navigate).toHaveBeenCalledWith('Confirm')
  })
})
