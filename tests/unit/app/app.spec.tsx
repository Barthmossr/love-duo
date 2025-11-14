import { fireEvent, render } from '@testing-library/react-native'

import { Start } from '@/onboarding/screens/Start'

describe('<Start />', () => {
  it('should render start screen', () => {
    const { getByText } = render(<Start navigation={{ navigate: () => {} }} />)
    getByText('Nossa História')
    getByText('Um espaço especial para o casal')
  })

  it('should show actions', () => {
    const { getByText } = render(<Start navigation={{ navigate: () => {} }} />)
    getByText('Entrar com Código')
    getByText('Criar Novo Casal')
  })

  it('should trigger navigation actions', () => {
    const { getByTestId } = render(
      <Start navigation={{ navigate: () => {} }} />
    )
    fireEvent.press(getByTestId('start-join'))
    fireEvent.press(getByTestId('start-create'))
  })
})
