import type { UnifiedTheme} from '../theme';
import { DEFAULT_THEME } from '../theme'

function extractHl(lua: string, group: string): { fg?: string; bg?: string } {
  const re = new RegExp(
    `nvim_set_hl\\s*\\(\\s*0\\s*,\\s*["']${group}["']\\s*,\\s*\\{([^}]*)\\}`, 'i'
  )
  const m = lua.match(re)
  if (!m) return {}
  const body = m[1]
  return {
    fg: body.match(/\bfg\s*=\s*["']?(#[0-9a-fA-F]{6})["']?/)?.[1],
    bg: body.match(/\bbg\s*=\s*["']?(#[0-9a-fA-F]{6})["']?/)?.[1],
  }
}

function extractTermColor(lua: string, index: number): string | undefined {
  return lua.match(new RegExp(`terminal_color_${index}\\s*=\\s*["']?(#[0-9a-fA-F]{6})["']?`))?.[1]
}

export function importNvimTheme(lua: string): UnifiedTheme {
  const base = DEFAULT_THEME
  const g = (group: string) => extractHl(lua, group)
  const tc = (i: number) => extractTermColor(lua, i)

  return {
    name: 'Imported Neovim Theme',
    type: 'dark',
    editor: {
      background:      g('Normal').bg         ?? base.editor.background,
      foreground:      g('Normal').fg         ?? base.editor.foreground,
      cursor:          g('Cursor').bg         ?? base.editor.cursor,
      selection:       g('Visual').bg         ?? base.editor.selection,
      lineHighlight:   g('CursorLine').bg     ?? base.editor.lineHighlight,
      lineNumber:      g('LineNr').fg         ?? base.editor.lineNumber,
      lineNumberActive:g('CursorLineNr').fg   ?? base.editor.lineNumberActive,
      border:          g('VertSplit').fg      ?? base.editor.border,
      gutter:          g('SignColumn').bg     ?? base.editor.gutter,
    },
    syntax: {
      comment:     g('Comment').fg                              ?? base.syntax.comment,
      keyword:     g('Keyword').fg   ?? g('@keyword').fg        ?? base.syntax.keyword,
      string:      g('String').fg    ?? g('@string').fg         ?? base.syntax.string,
      number:      g('Number').fg    ?? g('@number').fg         ?? base.syntax.number,
      function:    g('Function').fg  ?? g('@function').fg       ?? base.syntax.function,
      variable:    g('Identifier').fg ?? g('@variable').fg      ?? base.syntax.variable,
      type:        g('Type').fg      ?? g('@type').fg           ?? base.syntax.type,
      operator:    g('Operator').fg  ?? g('@operator').fg       ?? base.syntax.operator,
      punctuation: g('Delimiter').fg ?? g('@punctuation').fg    ?? base.syntax.punctuation,
      tag:         g('Tag').fg       ?? g('@tag').fg            ?? base.syntax.tag,
      attribute:   g('@tag.attribute').fg                       ?? base.syntax.attribute,
      constant:    g('Constant').fg  ?? g('@constant').fg       ?? base.syntax.constant,
      builtin:     g('Special').fg   ?? g('@function.builtin').fg ?? base.syntax.builtin,
      parameter:   g('@variable.parameter').fg                  ?? base.syntax.parameter,
    },
    terminal: {
      black:        tc(0)  ?? base.terminal.black,
      red:          tc(1)  ?? base.terminal.red,
      green:        tc(2)  ?? base.terminal.green,
      yellow:       tc(3)  ?? base.terminal.yellow,
      blue:         tc(4)  ?? base.terminal.blue,
      magenta:      tc(5)  ?? base.terminal.magenta,
      cyan:         tc(6)  ?? base.terminal.cyan,
      white:        tc(7)  ?? base.terminal.white,
      brightBlack:  tc(8)  ?? base.terminal.brightBlack,
      brightRed:    tc(9)  ?? base.terminal.brightRed,
      brightGreen:  tc(10) ?? base.terminal.brightGreen,
      brightYellow: tc(11) ?? base.terminal.brightYellow,
      brightBlue:   tc(12) ?? base.terminal.brightBlue,
      brightMagenta:tc(13) ?? base.terminal.brightMagenta,
      brightCyan:   tc(14) ?? base.terminal.brightCyan,
      brightWhite:  tc(15) ?? base.terminal.brightWhite,
    },
  }
}
