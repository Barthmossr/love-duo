import { fireEvent, render } from '@testing-library/react-native'

import { EnterCodeForm } from '@/flows/Welcome/components/EnterCodeForm'

describe('EnterCodeForm', () => {
  const mockProps = {
    coupleCode: '',
    userName: '',
    onCoupleCodeChange: jest.fn(),
    onUserNameChange: jest.fn(),
    onBack: jest.fn(),
    onEnter: jest.fn(),
    coupleCodeError: '',
    userNameError: ''
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render form with all inputs and buttons', () => {
    const { getByText, getByPlaceholderText } = render(<EnterCodeForm {...mockProps} />)

    expect(getByText('Código do Casal')).toBeDefined()
    expect(getByText('Seu Nome')).toBeDefined()
    expect(getByPlaceholderText('Ex: RFBZ7H')).toBeDefined()
    expect(getByPlaceholderText('Ex: Maria')).toBeDefined()
    expect(getByText('Voltar')).toBeDefined()
    expect(getByText('Entrar')).toBeDefined()
  })

  it('should render with default isLoading as false', () => {
    const { getByPlaceholderText } = render(<EnterCodeForm {...mockProps} />)

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    const nameInput = getByPlaceholderText('Ex: Maria')

    expect(codeInput.props.editable).toBe(true)
    expect(nameInput.props.editable).toBe(true)
  })

  it('should disable inputs when isLoading is true', () => {
    const { getByPlaceholderText } = render(<EnterCodeForm {...mockProps} isLoading={true} />)

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    const nameInput = getByPlaceholderText('Ex: Maria')

    expect(codeInput.props.editable).toBe(false)
    expect(nameInput.props.editable).toBe(false)
  })

  it('should call onCoupleCodeChange when code input changes', () => {
    const { getByPlaceholderText } = render(<EnterCodeForm {...mockProps} />)

    const input = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(input, 'ABC123')

    expect(mockProps.onCoupleCodeChange).toHaveBeenCalledWith('ABC123')
  })

  it('should call onUserNameChange when user name input changes', () => {
    const { getByPlaceholderText } = render(<EnterCodeForm {...mockProps} />)

    const input = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(input, 'Maria')

    expect(mockProps.onUserNameChange).toHaveBeenCalledWith('Maria')
  })

  it('should call onBack when back button is pressed', () => {
    const { getByText } = render(<EnterCodeForm {...mockProps} />)

    fireEvent.press(getByText('Voltar'))

    expect(mockProps.onBack).toHaveBeenCalled()
  })

  it('should call onEnter when enter button is pressed', () => {
    const { getByText } = render(<EnterCodeForm {...mockProps} />)

    fireEvent.press(getByText('Entrar'))

    expect(mockProps.onEnter).toHaveBeenCalled()
  })

  it('should display couple code error', () => {
    const { getByText } = render(<EnterCodeForm {...mockProps} coupleCodeError="Código inválido" />)

    expect(getByText('Código inválido')).toBeDefined()
  })

  it('should display user name error', () => {
    const { getByText } = render(<EnterCodeForm {...mockProps} userNameError="Nome inválido" />)

    expect(getByText('Nome inválido')).toBeDefined()
  })

  it('should display values in inputs', () => {
    const { getByDisplayValue } = render(
      <EnterCodeForm {...mockProps} coupleCode="ABC123" userName="Maria" />
    )

    expect(getByDisplayValue('ABC123')).toBeDefined()
    expect(getByDisplayValue('Maria')).toBeDefined()
  })
})
