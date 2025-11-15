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
  shadow: ColorSingle
}

export type { Colors, ColorPair, ColorSingle }
