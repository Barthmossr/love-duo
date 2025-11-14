import { fireEvent, render } from '@testing-library/react-native'

import { Confirm } from '@/onboarding/screens/Confirm'
import { PairCode } from '@/onboarding/screens/PairCode'
import { Start } from '@/onboarding/screens/Start'

describe('onboarding flow', () => {
  it('should complete flow with valid inputs', () => {
    const navigate = jest.fn()
    const start = render(<Start navigation={{ navigate }} />)
    fireEvent.press(start.getByTestId('start-join'))
    expect(navigate).toHaveBeenCalledWith('PairCode')

    const pair = render(<PairCode navigation={{ navigate }} />)
    fireEvent.changeText(pair.getByTestId('paircode-input'), 'ABCDEF')
    fireEvent.press(pair.getByTestId('paircode-next'))

    const confirm = render(<Confirm navigation={{ navigate }} />)
    fireEvent.press(confirm.getByTestId('confirm-next'))
  })

  it('should block progression when code invalid', () => {
    const navigate = jest.fn()
    const pair = render(<PairCode navigation={{ navigate }} />)
    fireEvent.changeText(pair.getByTestId('paircode-input'), '123456')
    fireEvent.press(pair.getByTestId('paircode-next'))
    expect(navigate).not.toHaveBeenCalled()
  })
})
