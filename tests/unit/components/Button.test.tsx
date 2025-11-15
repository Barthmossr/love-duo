import { MaterialIcons } from '@expo/vector-icons'
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

  it('should render secondary variant', () => {
    const { getByText } = render(
      <Button title="Secondary" onPress={() => {}} variant="secondary" />
    )
    const button = getByText('Secondary').parent

    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#c1a9ee' })
    )
  })

  it('should render with icon', () => {
    const { getByText, UNSAFE_getByType } = render(
      <Button title="With Icon" onPress={() => {}} iconName="group-add" />
    )

    expect(UNSAFE_getByType(MaterialIcons)).toBeDefined()
    expect(getByText('With Icon')).toBeDefined()
  })

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(<Button title="Disabled" onPress={onPressMock} disabled={true} />)

    fireEvent.press(getByText('Disabled'))
    expect(onPressMock).not.toHaveBeenCalled()
  })
})
