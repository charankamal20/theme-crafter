import type { UnifiedTheme} from '../theme';
import { DEFAULT_THEME } from '../theme'

function resolveScope(tokenColors: any[], scopes: string[]): string | null {
  for (const scope of scopes) {
    for (const token of tokenColors) {
      const ts = Array.isArray(token.scope) ? token.scope : [token.scope ?? '']
      if (ts.some((s: string) => s === scope || s.startsWith(scope + '.'))) {
        return token.settings?.foreground ?? null
      }
    }
  }
  return null
}

export function importVSCodeTheme(json: string): UnifiedTheme {
  const data = JSON.parse(json)
  const c = data.colors ?? {}
  const tc = data.tokenColors ?? []
  const base = DEFAULT_THEME

  const get = (key: string, fb: string) => c[key] || fb
  const tok = (s: string[], fb: string) => resolveScope(tc, s) ?? fb

  return {
    name: data.name ?? 'Imported VSCode Theme',
    type: (data.type as 'dark' | 'light') ?? 'dark',
    editor: {
      background:      get('editor.background',              base.editor.background),
      foreground:      get('editor.foreground',              base.editor.foreground),
      cursor:          get('editorCursor.foreground',        base.editor.cursor),
      selection:       get('editor.selectionBackground',     base.editor.selection),
      lineHighlight:   get('editor.lineHighlightBackground', base.editor.lineHighlight),
      lineNumber:      get('editorLineNumber.foreground',    base.editor.lineNumber),
      lineNumberActive:get('editorLineNumber.activeForeground', base.editor.lineNumberActive),
      border:          get('editorGroup.border',             base.editor.border),
      gutter:          get('editorGutter.background',        base.editor.gutter),
    },
    syntax: {
      comment:     tok(['comment', 'comment.line'],              base.syntax.comment),
      keyword:     tok(['keyword', 'keyword.control', 'storage.type'], base.syntax.keyword),
      string:      tok(['string', 'string.quoted'],              base.syntax.string),
      number:      tok(['constant.numeric'],                     base.syntax.number),
      function:    tok(['entity.name.function', 'support.function'], base.syntax.function),
      variable:    tok(['variable', 'variable.other'],           base.syntax.variable),
      type:        tok(['entity.name.type', 'support.type'],     base.syntax.type),
      operator:    tok(['keyword.operator'],                     base.syntax.operator),
      punctuation: tok(['punctuation'],                          base.syntax.punctuation),
      tag:         tok(['entity.name.tag'],                      base.syntax.tag),
      attribute:   tok(['entity.other.attribute-name'],          base.syntax.attribute),
      constant:    tok(['constant.language', 'support.constant'],base.syntax.constant),
      builtin:     tok(['support.class', 'support.type.builtin'],base.syntax.builtin),
      parameter:   tok(['variable.parameter'],                   base.syntax.parameter),
    },
    terminal: { ...base.terminal },
  }
}
