import { fireEvent, render } from '@testing-library/react-native'

import { App } from '@/app/App'

describe('<App />', () => {
  it('should render start screen', () => {
    const { getByText } = render(<App />)
    getByText('Nossa História')
    getByText('Um espaço especial para o casal')
  })

  it('should show actions', () => {
    const { getByText } = render(<App />)
    getByText('Entrar com Código')
    getByText('Criar Novo Casal')
  })

  it('should trigger navigation actions', () => {
    const { getByTestId } = render(<App />)
    fireEvent.press(getByTestId('start-join'))
    fireEvent.press(getByTestId('start-create'))
  })
})
