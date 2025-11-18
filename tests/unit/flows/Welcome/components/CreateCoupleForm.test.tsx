import { fireEvent, render } from '@testing-library/react-native'

import { CreateCoupleForm } from '@/flows/Welcome/components/CreateCoupleForm'

describe('CreateCoupleForm', () => {
  const mockProps = {
    coupleName: '',
    userName: '',
    onCoupleNameChange: jest.fn(),
    onUserNameChange: jest.fn(),
    onBack: jest.fn(),
    onCreateCode: jest.fn(),
    coupleNameError: '',
    userNameError: ''
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render form with all inputs and buttons', () => {
    const { getByText, getByPlaceholderText } = render(<CreateCoupleForm {...mockProps} />)

    expect(getByText('Nome do Casal')).toBeDefined()
    expect(getByText('Seu Nome')).toBeDefined()
    expect(getByPlaceholderText('Ex: João & Maria')).toBeDefined()
    expect(getByPlaceholderText('Ex: João')).toBeDefined()
    expect(getByText('Voltar')).toBeDefined()
    expect(getByText('Criar Código')).toBeDefined()
  })

  it('should render with default isLoading as false', () => {
    const { getByPlaceholderText } = render(<CreateCoupleForm {...mockProps} />)

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    const userNameInput = getByPlaceholderText('Ex: João')

    expect(coupleNameInput.props.editable).toBe(true)
    expect(userNameInput.props.editable).toBe(true)
  })

  it('should disable inputs when isLoading is true', () => {
    const { getByPlaceholderText } = render(<CreateCoupleForm {...mockProps} isLoading={true} />)

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    const userNameInput = getByPlaceholderText('Ex: João')

    expect(coupleNameInput.props.editable).toBe(false)
    expect(userNameInput.props.editable).toBe(false)
  })

  it('should call onCoupleNameChange when couple name input changes', () => {
    const { getByPlaceholderText } = render(<CreateCoupleForm {...mockProps} />)

    const input = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(input, 'Test Couple')

    expect(mockProps.onCoupleNameChange).toHaveBeenCalledWith('Test Couple')
  })

  it('should call onUserNameChange when user name input changes', () => {
    const { getByPlaceholderText } = render(<CreateCoupleForm {...mockProps} />)

    const input = getByPlaceholderText('Ex: João')
    fireEvent.changeText(input, 'João')

    expect(mockProps.onUserNameChange).toHaveBeenCalledWith('João')
  })

  it('should call onBack when back button is pressed', () => {
    const { getByText } = render(<CreateCoupleForm {...mockProps} />)

    fireEvent.press(getByText('Voltar'))

    expect(mockProps.onBack).toHaveBeenCalled()
  })

  it('should call onCreateCode when create code button is pressed', () => {
    const { getByText } = render(<CreateCoupleForm {...mockProps} />)

    fireEvent.press(getByText('Criar Código'))

    expect(mockProps.onCreateCode).toHaveBeenCalled()
  })

  it('should display couple name error', () => {
    const { getByText } = render(
      <CreateCoupleForm {...mockProps} coupleNameError="Nome inválido" />
    )

    expect(getByText('Nome inválido')).toBeDefined()
  })

  it('should display user name error', () => {
    const { getByText } = render(<CreateCoupleForm {...mockProps} userNameError="Nome inválido" />)

    expect(getByText('Nome inválido')).toBeDefined()
  })

  it('should display values in inputs', () => {
    const { getByDisplayValue } = render(
      <CreateCoupleForm {...mockProps} coupleName="Test Couple" userName="João" />
    )

    expect(getByDisplayValue('Test Couple')).toBeDefined()
    expect(getByDisplayValue('João')).toBeDefined()
  })
})
