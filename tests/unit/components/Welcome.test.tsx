import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { Asset } from 'expo-asset'
import { ActivityIndicator } from 'react-native'

import { Welcome } from '@/components/Welcome/Welcome'

jest.mock('expo-asset')

describe('Welcome', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
    console.warn = jest.fn()
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

  it('should handle create code button press', () => {
    const { getByText, getByPlaceholderText } = render(<Welcome />)

    fireEvent.press(getByText('Criar Novo Casal'))

    const input = getByPlaceholderText('Ex: João & Maria')
    fireEvent.changeText(input, 'Test Couple')

    fireEvent.press(getByText('Criar Código'))

    expect(console.warn).toHaveBeenCalledWith('Creating code for couple:', 'Test Couple')
  })

  it('should handle enter code button press', () => {
    const { getByText } = render(<Welcome />)

    fireEvent.press(getByText('Entrar com Código'))

    expect(console.warn).toHaveBeenCalledWith('Enter code navigation pending')
  })
})
