import { render } from '@testing-library/react-native'

import { Welcome } from '@/components/Welcome/Welcome'

describe('Welcome', () => {
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
})
