interface ColorPair {
  bg: string
  text: string
}

interface ColorSingle {
  bg: string
}

interface Colors {
  accent: ColorPair
  primary: ColorPair
  secondary: ColorPair
  muted: ColorPair
  destructive: ColorPair
  card: ColorPair
  popover: ColorPair
  input: ColorSingle
  border: ColorSingle
  ring: ColorSingle
}

interface Fonts {
  regular: string
  medium: string
  semiBold: string
  bold: string
}

interface FontSizes {
  xs: number
  sm: number
  base: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '4xl': number
}

interface Spacing {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

export type { Colors, ColorPair, ColorSingle, Fonts, FontSizes, Spacing }
