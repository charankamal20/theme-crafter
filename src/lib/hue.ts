import { hexToHsv, hsvToHex, type HSV } from './color'
import type { UnifiedTheme } from './theme'

/** Rotate hue by `degrees` on a single hex color, preserving S and V */
export function shiftHue(hex: string, degrees: number): string {
  const hsv: HSV = hexToHsv(hex)
  return hsvToHex({ ...hsv, h: (hsv.h + degrees + 360) % 360 })
}

type SyntaxKey = keyof UnifiedTheme['syntax']
type EditorKey = keyof UnifiedTheme['editor']
type TerminalKey = keyof UnifiedTheme['terminal']

/**
 * Applies a hue rotation to every color in the theme.
 * Editor chrome colors (background, lineHighlight, gutter, border) are
 * optionally excluded so the structure stays neutral while accents rotate.
 */
export function bulkHueShift(
  theme: UnifiedTheme,
  degrees: number,
  opts: { shiftChrome?: boolean } = {},
): UnifiedTheme {
  const { shiftChrome = false } = opts

  const CHROME_KEYS: EditorKey[] = ['background', 'lineHighlight', 'gutter', 'border']

  const shiftedEditor = Object.fromEntries(
    (Object.entries(theme.editor) as [EditorKey, string][]).map(([k, v]) => [
      k,
      shiftChrome || !CHROME_KEYS.includes(k) ? shiftHue(v, degrees) : v,
    ])
  ) as UnifiedTheme['editor']

  const shiftedSyntax = Object.fromEntries(
    (Object.entries(theme.syntax) as [SyntaxKey, string][]).map(([k, v]) => [
      k, shiftHue(v, degrees),
    ])
  ) as UnifiedTheme['syntax']

  const shiftedTerminal = Object.fromEntries(
    (Object.entries(theme.terminal) as [TerminalKey, string][]).map(([k, v]) => [
      k, shiftHue(v, degrees),
    ])
  ) as UnifiedTheme['terminal']

  return {
    ...theme,
    editor:   shiftedEditor,
    syntax:   shiftedSyntax,
    terminal: shiftedTerminal,
  }
}
