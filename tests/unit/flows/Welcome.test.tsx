import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { Asset } from 'expo-asset'
import { ActivityIndicator } from 'react-native'

import { Welcome } from '@/flows/Welcome/Welcome'
import * as coupleService from '@/services/couple.service'

jest.mock('expo-asset')
jest.mock('@/services/couple.service')

describe('Welcome', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
    console.warn = jest.fn()
    ;(coupleService.createCouple as jest.Mock).mockResolvedValue({
      id: '123',
      coupleName: 'Test Couple',
      user1: 'João',
      user2: null,
      validated: false,
      code: 'ABC123',
      createdAt: new Date().toISOString()
    })
    ;(coupleService.validateCode as jest.Mock).mockResolvedValue({
      id: '123',
      coupleName: 'Test Couple',
      user1: 'João',
      user2: null,
      validated: false,
      code: 'ABC123',
      createdAt: new Date().toISOString()
    })
    ;(coupleService.updateCoupleUser2 as jest.Mock).mockResolvedValue({
      id: '123',
      coupleName: 'Test Couple',
      user1: 'João',
      user2: 'Maria',
      validated: true,
      code: 'ABC123',
      createdAt: new Date().toISOString()
    })
  })
  it('should render title correctly', () => {
    const { getByText } = render(<Welcome />)
    expect(getByText('Nossa História')).toBeDefined()
  })

  it('should render subtitle correctly', () => {
    const { getByText } = render(<Welcome />)
    expect(getByText('Um espaço especial para o casal')).toBeDefined()
  })

  it('should render create couple button', () => {
    const { getByText } = render(<Welcome />)
    expect(getByText('Criar Novo Casal')).toBeDefined()
  })

  it('should render enter code button', () => {
    const { getByText } = render(<Welcome />)
    expect(getByText('Entrar com Código')).toBeDefined()
  })

  it('should render create couple button with icon', () => {
    const { getByTestId } = render(<Welcome />)
    expect(getByTestId('icon-group-add')).toBeDefined()
  })

  it('should show loading indicator when animation is not loaded', () => {
    const { UNSAFE_getByType } = render(<Welcome />)
    expect(UNSAFE_getByType(ActivityIndicator)).toBeDefined()
  })

  it('should load animation successfully', async () => {
    const mockAsset = {
      downloadAsync: jest.fn().mockResolvedValue(undefined),
      localUri: 'mock://animation.lottie'
    }
    ;(Asset.fromModule as jest.Mock).mockReturnValue(mockAsset)

    render(<Welcome />)

    await waitFor(() => {
      expect(mockAsset.downloadAsync).toHaveBeenCalled()
    })
  })

  it('should handle animation load error', async () => {
    const mockError = new Error('Failed to load')
    const mockAsset = {
      downloadAsync: jest.fn().mockRejectedValue(mockError)
    }
    ;(Asset.fromModule as jest.Mock).mockReturnValue(mockAsset)

    render(<Welcome />)

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Failed to load animation:', mockError)
    })
  })

  it('should handle create couple button press and show form', () => {
    const { getByText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    expect(getByText('Nome do Casal')).toBeDefined()
    expect(getByText('Voltar')).toBeDefined()
    expect(getByText('Criar Código')).toBeDefined()
  })

  it('should handle back button press', () => {
    const { getByText, queryByText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))
    expect(getByText('Nome do Casal')).toBeDefined()

    fireEvent.press(getByText('Voltar'))
    expect(queryByText('Nome do Casal')).toBeNull()
    expect(getByText('Criar Novo Casal')).toBeDefined()
  })

  it('should handle create code button press', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(coupleNameInput, 'Test Couple')

    const userNameInput = getByPlaceholderText('Ex: João')
    fireEvent.changeText(userNameInput, 'João')

    fireEvent.press(getByText('Criar Código'))

    await waitFor(() => {
      expect(getByText('Seu código do casal é:')).toBeDefined()
      expect(getByText('Compartilhe este código com seu parceiro(a)')).toBeDefined()
      expect(queryByText(/Continuar como João/)).toBeDefined()
    })

    expect(coupleService.createCouple).toHaveBeenCalledWith(
      'Test Couple',
      'João',
      expect.any(String)
    )
  })

  it('should handle enter code button press', () => {
    const { getByText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    expect(getByText('Código do Casal')).toBeDefined()
    expect(getByText('Seu Nome')).toBeDefined()
    expect(getByText('Entrar')).toBeDefined()
  })

  it('should handle continue button press after code generation', async () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(coupleNameInput, 'Test Couple')

    const nameInput = getByPlaceholderText('Ex: João')
    fireEvent.changeText(nameInput, 'João')

    fireEvent.press(getByText('Criar Código'))

    await waitFor(() => {
      expect(getByText('Continuar como João')).toBeDefined()
    })

    const continueButton = getByText('Continuar como João')
    fireEvent.press(continueButton)

    expect(console.warn).toHaveBeenCalledWith('Continue as:', 'João')
  })

  it('should handle enter button press in enter code form', async () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC123')

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith('Entering with code:', 'ABC123', 'as:', 'Maria')
    })

    expect(coupleService.validateCode).toHaveBeenCalledWith('ABC123')
    expect(coupleService.updateCoupleUser2).toHaveBeenCalledWith('123', 'Maria')
  })

  it('should show validation errors when fields are empty', () => {
    const { getAllByText } = render(<Welcome />)

    fireEvent.press(getAllByText('Criar Novo Casal')[0])
    fireEvent.press(getAllByText('Criar Código')[0])

    const errorMessages = getAllByText('Nome não pode estar vazio')
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('should show validation error when name is too long', () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(coupleNameInput, 'This is a very long name that exceeds limit')

    const userNameInput = getByPlaceholderText('Ex: João')
    fireEvent.changeText(userNameInput, 'João')

    fireEvent.press(getByText('Criar Código'))

    expect(getByText('Nome deve ter entre 1 e 16 caracteres')).toBeDefined()
  })

  it('should show validation error when code is empty in enter form', () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    expect(getByText('Código não pode estar vazio')).toBeDefined()
  })

  it('should show validation error when code length is invalid', () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC')

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    expect(getByText('Código deve ter 6 caracteres')).toBeDefined()
  })

  it('should not enter when validation fails in enter form', () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC')

    fireEvent.press(getByText('Entrar'))

    expect(console.warn).not.toHaveBeenCalledWith(expect.stringContaining('Entering with code'))
  })

  it('should show error when code is invalid', async () => {
    ;(coupleService.validateCode as jest.Mock).mockResolvedValue(null)

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC123')

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(getByText('Código inválido')).toBeDefined()
    })
  })

  it('should show error when code is already validated', async () => {
    ;(coupleService.validateCode as jest.Mock).mockResolvedValue({
      id: '123',
      coupleName: 'Test Couple',
      user1: 'João',
      user2: 'Maria',
      validated: true,
      code: 'ABC123',
      createdAt: new Date().toISOString()
    })

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC123')

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(getByText('Este código já foi usado')).toBeDefined()
    })
  })

  it('should handle create couple service error', async () => {
    ;(coupleService.createCouple as jest.Mock).mockRejectedValue(new Error('Erro ao criar casal'))

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(coupleNameInput, 'Test Couple')

    const userNameInput = getByPlaceholderText('Ex: João')
    fireEvent.changeText(userNameInput, 'João')

    fireEvent.press(getByText('Criar Código'))

    await waitFor(() => {
      expect(getByText('Erro ao criar casal')).toBeDefined()
    })

    expect(coupleService.createCouple).toHaveBeenCalled()
  })

  it('should handle create couple service non-error exception', async () => {
    ;(coupleService.createCouple as jest.Mock).mockRejectedValue('Unknown error')

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(coupleNameInput, 'Test Couple')

    const userNameInput = getByPlaceholderText('Ex: João')
    fireEvent.changeText(userNameInput, 'João')

    fireEvent.press(getByText('Criar Código'))

    await waitFor(() => {
      expect(getByText('Erro ao criar casal')).toBeDefined()
    })
  })

  it('should handle validate code service error', async () => {
    ;(coupleService.validateCode as jest.Mock).mockRejectedValue(
      new Error('Erro ao validar código')
    )

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC123')

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(getByText('Erro ao validar código')).toBeDefined()
    })
  })

  it('should handle validate code service non-error exception', async () => {
    ;(coupleService.validateCode as jest.Mock).mockRejectedValue('Unknown error')

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    fireEvent.changeText(codeInput, 'ABC123')

    const nameInput = getByPlaceholderText('Ex: Maria')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(getByText('Erro ao validar código')).toBeDefined()
    })
  })

  it('should disable form inputs and buttons while creating couple', async () => {
    let resolveCreate: ((value: unknown) => void) | undefined
    const createPromise = new Promise(resolve => {
      resolveCreate = resolve
    })
    ;(coupleService.createCouple as jest.Mock).mockReturnValue(createPromise)

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const coupleNameInput = getByPlaceholderText('Ex: João & Maria')
    const userNameInput = getByPlaceholderText('Ex: João')

    fireEvent.changeText(coupleNameInput, 'Test Couple')
    fireEvent.changeText(userNameInput, 'João')

    fireEvent.press(getByText('Criar Código'))

    await waitFor(() => {
      expect(coupleNameInput.props.editable).toBe(false)
      expect(userNameInput.props.editable).toBe(false)
    })

    if (resolveCreate) {
      resolveCreate({
        id: '123',
        coupleName: 'Test Couple',
        user1: 'João',
        user2: null,
        validated: false,
        code: 'ABC123',
        createdAt: new Date().toISOString()
      })
    }
  })

  it('should disable form inputs and buttons while validating code', async () => {
    let resolveValidate: ((value: unknown) => void) | undefined
    const validatePromise = new Promise(resolve => {
      resolveValidate = resolve
    })
    ;(coupleService.validateCode as jest.Mock).mockReturnValue(validatePromise)

    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    const codeInput = getByPlaceholderText('Ex: RFBZ7H')
    const nameInput = getByPlaceholderText('Ex: Maria')

    fireEvent.changeText(codeInput, 'ABC123')
    fireEvent.changeText(nameInput, 'Maria')

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(codeInput.props.editable).toBe(false)
      expect(nameInput.props.editable).toBe(false)
    })

    if (resolveValidate) {
      resolveValidate({
        id: '123',
        coupleName: 'Test Couple',
        user1: 'João',
        user2: null,
        validated: false,
        code: 'ABC123',
        createdAt: new Date().toISOString()
      })
    }
  })
})
