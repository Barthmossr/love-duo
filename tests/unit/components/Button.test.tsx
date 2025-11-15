import { fireEvent, render } from '@testing-library/react-native'

import { Button } from '@/components/Button/Button'

describe('Button', () => {
  it('should render with title', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />)
    expect(getByText('Test Button')).toBeDefined()
  })

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />)

    fireEvent.press(getByText('Press Me'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
