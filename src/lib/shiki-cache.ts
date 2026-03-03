import type { Highlighter, ThemeRegistrationRaw } from 'shiki'

type LangId = string

let instance: Highlighter | null = null
const loadedLangs = new Set<LangId>()

export async function getHighlighter(lang: LangId): Promise<Highlighter> {
  const { createHighlighter } = await import('shiki')

  if (!instance) {
    instance = await createHighlighter({
      themes: [],
      langs: [lang],
    })
    loadedLangs.add(lang)
    return instance
  }

  if (!loadedLangs.has(lang)) {
    await instance.loadLanguage(lang as Parameters<Highlighter['loadLanguage']>[0])
    loadedLangs.add(lang)
  }

  return instance
}

export async function highlight(
  code: string,
  lang: LangId,
  theme: ThemeRegistrationRaw,
): Promise<string> {
  const hl = await getHighlighter(lang)
    await hl.loadTheme(theme)
  return hl.codeToHtml(code, { lang, theme: theme.name! })
}
