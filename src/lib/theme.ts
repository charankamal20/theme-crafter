export interface UnifiedTheme {
  name: string
  type: 'dark' | 'light'
  editor: {
    background: string
    foreground: string
    cursor: string
    selection: string
    lineHighlight: string
    lineNumber: string
    lineNumberActive: string
    border: string
    gutter: string
  }
  syntax: {
    comment: string
    keyword: string
    string: string
    number: string
    function: string
    variable: string
    type: string
    operator: string
    punctuation: string
    tag: string
    attribute: string
    constant: string
    builtin: string
    parameter: string
  }
  terminal: {
    black: string; red: string; green: string; yellow: string
    blue: string; magenta: string; cyan: string; white: string
    brightBlack: string; brightRed: string; brightGreen: string; brightYellow: string
    brightBlue: string; brightMagenta: string; brightCyan: string; brightWhite: string
  }
}

export const DEFAULT_THEME: UnifiedTheme = {
  name: 'My Theme',
  type: 'dark',
  editor: {
    background: '#1e1e2e', foreground: '#cdd6f4', cursor: '#f5e0dc',
    selection: '#313244', lineHighlight: '#181825', lineNumber: '#45475a',
    lineNumberActive: '#cdd6f4', border: '#313244', gutter: '#1e1e2e',
  },
  syntax: {
    comment: '#6c7086', keyword: '#cba6f7', string: '#a6e3a1',
    number: '#fab387', function: '#89b4fa', variable: '#cdd6f4',
    type: '#f38ba8', operator: '#89dceb', punctuation: '#cdd6f4',
    tag: '#f38ba8', attribute: '#fab387', constant: '#fab387',
    builtin: '#89b4fa', parameter: '#fab387',
  },
  terminal: {
    black: '#45475a', red: '#f38ba8', green: '#a6e3a1', yellow: '#f9e2af',
    blue: '#89b4fa', magenta: '#f5c2e7', cyan: '#94e2d5', white: '#bac2de',
    brightBlack: '#585b70', brightRed: '#f38ba8', brightGreen: '#a6e3a1',
    brightYellow: '#f9e2af', brightBlue: '#89b4fa', brightMagenta: '#f5c2e7',
    brightCyan: '#94e2d5', brightWhite: '#a6adc8',
  },
}
