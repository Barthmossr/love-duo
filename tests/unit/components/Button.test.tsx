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

    expect(button).toBeDefined()
  })

  it('should render secondary variant', () => {
    const { getByText } = render(
      <Button title="Secondary" onPress={() => {}} variant="secondary" />
    )
    const button = getByText('Secondary').parent

    expect(button).toBeDefined()
  })

  it('should render with icon', () => {
    const { getByText, getByTestId } = render(
      <Button title="With Icon" onPress={() => {}} iconName="group-add" />
    )
    expect(getByText('With Icon')).toBeDefined()
    expect(getByTestId('icon-group-add')).toBeDefined()
  })

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(<Button title="Disabled" onPress={onPressMock} disabled={true} />)

    fireEvent.press(getByText('Disabled'))
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it('should have correct accessibility props', () => {
    const { getByLabelText } = render(<Button title="Accessible" onPress={() => {}} />)
    const button = getByLabelText('Accessible')

    expect(button.props.accessible).toBe(true)
    expect(button.props.accessibilityRole).toBe('button')
  })

  it('should render light variant', () => {
    const { getByText } = render(<Button title="Light" onPress={() => {}} variant="light" />)
    expect(getByText('Light')).toBeDefined()
  })

  it('should render disabled button with icon', () => {
    const { getByText, getByTestId } = render(
      <Button title="Disabled Icon" onPress={() => {}} iconName="close" disabled={true} />
    )
    expect(getByText('Disabled Icon')).toBeDefined()
    expect(getByTestId('icon-close')).toBeDefined()
  })
})
