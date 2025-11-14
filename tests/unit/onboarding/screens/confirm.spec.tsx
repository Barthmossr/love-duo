import { fireEvent, render } from '@testing-library/react-native'

import { Confirm } from '@/onboarding/screens/Confirm'

describe('Confirm screen', () => {
  it('should navigate to complete', () => {
    const navigate = jest.fn()
    const { getByTestId } = render(<Confirm navigation={{ navigate }} />)
    fireEvent.press(getByTestId('confirm-next'))
    expect(navigate).toHaveBeenCalledWith('Complete')
  })
})
