import '@testing-library/jest-native/extend-expect'

jest.mock('expo', () => ({
  ...jest.requireActual('expo'),
  __ExpoImportMetaRegistry: {}
}))

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args))
