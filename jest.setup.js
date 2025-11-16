import '@testing-library/jest-native/extend-expect'

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  loadAsync: jest.fn().mockResolvedValue(undefined)
}))

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  return {
    MaterialIcons: ({ name, size, color }) =>
      React.createElement('Text', { testID: `icon-${name}` }, name)
  }
})

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn(() => ({
      downloadAsync: jest.fn().mockResolvedValue({ localUri: 'mock://lottie-file' })
    }))
  }
}))

jest.mock('lottie-react-native', () => 'LottieView')

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient'
}))

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args))

global.TextDecoder = global.TextDecoder || class TextDecoder {}
global.TextEncoder = global.TextEncoder || class TextEncoder {}
global.TextDecoderStream = class TextDecoderStream {}
global.TextEncoderStream = class TextEncoderStream {}
global.__ExpoImportMetaRegistry = {}
global.structuredClone = global.structuredClone || (obj => JSON.parse(JSON.stringify(obj)))
