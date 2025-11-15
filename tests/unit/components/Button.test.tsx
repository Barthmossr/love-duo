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

  it('should render primary variant by default', () => {
    const { getByText } = render(<Button title="Primary" onPress={() => {}} />)
    const button = getByText('Primary').parent

    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#ff9da5' })
    )
  })
})
