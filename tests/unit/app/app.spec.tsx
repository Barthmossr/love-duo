import { render } from '@testing-library/react-native'

import { App } from '@/app'

describe('<App />', () => {
  it('should render intro text', () => {
    const { getByText } = render(<App />)
    getByText('Open up App.tsx to start working on your app!')
  })
})
