
import type { UnifiedTheme } from './theme'

export interface ThemePreset {
  id: string
  name: string
  author: string
  type: 'dark' | 'light'
  theme: UnifiedTheme
}

const preset = (
  id: string, name: string, author: string, type: 'dark' | 'light',
  editor: UnifiedTheme['editor'],
  syntax: UnifiedTheme['syntax'],
  terminal: UnifiedTheme['terminal'],
): ThemePreset => ({ id, name, author, type, theme: { name, type, editor, syntax, terminal } })

export const PRESETS: ThemePreset[] = [
  // ── Catppuccin Mocha ─────────────────────────────────────────
  preset('catppuccin-mocha', 'Catppuccin Mocha', 'catppuccin', 'dark',
    {
      background: '#1e1e2e', foreground: '#cdd6f4', cursor: '#f5e0dc',
      selection: '#313244',  lineHighlight: '#181825', lineNumber: '#45475a',
      lineNumberActive: '#cdd6f4', border: '#313244', gutter: '#1e1e2e',
    },
    {
      comment: '#6c7086', keyword: '#cba6f7', string: '#a6e3a1',
      number: '#fab387',  function: '#89b4fa', variable: '#cdd6f4',
      type: '#f38ba8',    operator: '#89dceb', punctuation: '#cdd6f4',
      tag: '#f38ba8',     attribute: '#fab387', constant: '#fab387',
      builtin: '#89b4fa', parameter: '#fab387',
    },
    {
      black: '#45475a',        red: '#f38ba8',    green: '#a6e3a1', yellow: '#f9e2af',
      blue: '#89b4fa',         magenta: '#f5c2e7', cyan: '#94e2d5',  white: '#bac2de',
      brightBlack: '#585b70',  brightRed: '#f38ba8',    brightGreen: '#a6e3a1',
      brightYellow: '#f9e2af', brightBlue: '#89b4fa',   brightMagenta: '#f5c2e7',
      brightCyan: '#94e2d5',   brightWhite: '#a6adc8',
    }
  ),

  // ── Catppuccin Latte (light) ─────────────────────────────────
  preset('catppuccin-latte', 'Catppuccin Latte', 'catppuccin', 'light',
    {
      background: '#eff1f5', foreground: '#4c4f69', cursor: '#dc8a78',
      selection: '#acb0be',  lineHighlight: '#e6e9ef', lineNumber: '#8c8fa1',
      lineNumberActive: '#4c4f69', border: '#bcc0cc', gutter: '#eff1f5',
    },
    {
      comment: '#8c8fa1', keyword: '#8839ef', string: '#40a02b',
      number: '#fe640b',  function: '#1e66f5', variable: '#4c4f69',
      type: '#d20f39',    operator: '#04a5e5', punctuation: '#4c4f69',
      tag: '#d20f39',     attribute: '#fe640b', constant: '#fe640b',
      builtin: '#1e66f5', parameter: '#fe640b',
    },
    {
      black: '#5c5f77',        red: '#d20f39',    green: '#40a02b', yellow: '#df8e1d',
      blue: '#1e66f5',         magenta: '#ea76cb', cyan: '#179299',  white: '#acb0be',
      brightBlack: '#6c6f85',  brightRed: '#d20f39',    brightGreen: '#40a02b',
      brightYellow: '#df8e1d', brightBlue: '#1e66f5',   brightMagenta: '#ea76cb',
      brightCyan: '#179299',   brightWhite: '#bcc0cc',
    }
  ),

  // ── Tokyo Night ──────────────────────────────────────────────
  preset('tokyo-night', 'Tokyo Night', 'enkia', 'dark',
    {
      background: '#1a1b26', foreground: '#a9b1d6', cursor: '#c0caf5',
      selection: '#283457',  lineHighlight: '#1f2335', lineNumber: '#3b3f52',
      lineNumberActive: '#737aa2', border: '#1f2335', gutter: '#1a1b26',
    },
    {
      comment: '#565f89', keyword: '#bb9af7', string: '#9ece6a',
      number: '#ff9e64',  function: '#7aa2f7', variable: '#c0caf5',
      type: '#f7768e',    operator: '#89ddff', punctuation: '#89ddff',
      tag: '#f7768e',     attribute: '#e0af68', constant: '#ff9e64',
      builtin: '#2ac3de', parameter: '#e0af68',
    },
    {
      black: '#15161e',        red: '#f7768e',    green: '#9ece6a', yellow: '#e0af68',
      blue: '#7aa2f7',         magenta: '#bb9af7', cyan: '#7dcfff',  white: '#a9b1d6',
      brightBlack: '#414868',  brightRed: '#f7768e',    brightGreen: '#9ece6a',
      brightYellow: '#e0af68', brightBlue: '#7aa2f7',   brightMagenta: '#bb9af7',
      brightCyan: '#7dcfff',   brightWhite: '#c0caf5',
    }
  ),

  // ── Gruvbox Dark ─────────────────────────────────────────────
  preset('gruvbox-dark', 'Gruvbox Dark', 'morhetz', 'dark',
    {
      background: '#282828', foreground: '#ebdbb2', cursor: '#ebdbb2',
      selection: '#3c3836',  lineHighlight: '#32302f', lineNumber: '#928374',
      lineNumberActive: '#ebdbb2', border: '#3c3836', gutter: '#282828',
    },
    {
      comment: '#928374', keyword: '#fb4934', string: '#b8bb26',
      number: '#d3869b',  function: '#8ec07c', variable: '#ebdbb2',
      type: '#fabd2f',    operator: '#fe8019', punctuation: '#ebdbb2',
      tag: '#fb4934',     attribute: '#fabd2f', constant: '#d3869b',
      builtin: '#8ec07c', parameter: '#fe8019',
    },
    {
      black: '#282828',        red: '#cc241d',    green: '#98971a', yellow: '#d79921',
      blue: '#458588',         magenta: '#b16286', cyan: '#689d6a',  white: '#a89984',
      brightBlack: '#928374',  brightRed: '#fb4934',    brightGreen: '#b8bb26',
      brightYellow: '#fabd2f', brightBlue: '#83a598',   brightMagenta: '#d3869b',
      brightCyan: '#8ec07c',   brightWhite: '#ebdbb2',
    }
  ),

  // ── Nord ─────────────────────────────────────────────────────
  preset('nord', 'Nord', 'arcticicestudio', 'dark',
    {
      background: '#2e3440', foreground: '#d8dee9', cursor: '#d8dee9',
      selection: '#3b4252',  lineHighlight: '#3b4252', lineNumber: '#4c566a',
      lineNumberActive: '#d8dee9', border: '#3b4252', gutter: '#2e3440',
    },
    {
      comment: '#616e88', keyword: '#81a1c1', string: '#a3be8c',
      number: '#b48ead',  function: '#88c0d0', variable: '#d8dee9',
      type: '#8fbcbb',    operator: '#81a1c1', punctuation: '#eceff4',
      tag: '#81a1c1',     attribute: '#8fbcbb', constant: '#b48ead',
      builtin: '#88c0d0', parameter: '#d08770',
    },
    {
      black: '#3b4252',        red: '#bf616a',    green: '#a3be8c', yellow: '#ebcb8b',
      blue: '#81a1c1',         magenta: '#b48ead', cyan: '#88c0d0',  white: '#e5e9f0',
      brightBlack: '#4c566a',  brightRed: '#bf616a',    brightGreen: '#a3be8c',
      brightYellow: '#ebcb8b', brightBlue: '#81a1c1',   brightMagenta: '#b48ead',
      brightCyan: '#8fbcbb',   brightWhite: '#eceff4',
    }
  ),

  // ── Dracula ──────────────────────────────────────────────────
  preset('dracula', 'Dracula', 'dracula-theme', 'dark',
    {
      background: '#282a36', foreground: '#f8f8f2', cursor: '#f8f8f2',
      selection: '#44475a',  lineHighlight: '#44475a', lineNumber: '#6272a4',
      lineNumberActive: '#f8f8f2', border: '#44475a', gutter: '#282a36',
    },
    {
      comment: '#6272a4', keyword: '#ff79c6', string: '#f1fa8c',
      number: '#bd93f9',  function: '#50fa7b', variable: '#f8f8f2',
      type: '#8be9fd',    operator: '#ff79c6', punctuation: '#f8f8f2',
      tag: '#ff79c6',     attribute: '#50fa7b', constant: '#bd93f9',
      builtin: '#8be9fd', parameter: '#ffb86c',
    },
    {
      black: '#21222c',        red: '#ff5555',    green: '#50fa7b', yellow: '#f1fa8c',
      blue: '#bd93f9',         magenta: '#ff79c6', cyan: '#8be9fd',  white: '#f8f8f2',
      brightBlack: '#6272a4',  brightRed: '#ff6e6e',    brightGreen: '#69ff94',
      brightYellow: '#ffffa5', brightBlue: '#d6acff',   brightMagenta: '#ff92df',
      brightCyan: '#a4ffff',   brightWhite: '#ffffff',
    }
  ),

  // ── One Dark Pro ─────────────────────────────────────────────
  preset('one-dark', 'One Dark Pro', 'binaryify', 'dark',
    {
      background: '#282c34', foreground: '#abb2bf', cursor: '#528bff',
      selection: '#3e4451',  lineHighlight: '#2c313c', lineNumber: '#495162',
      lineNumberActive: '#abb2bf', border: '#3e4451', gutter: '#282c34',
    },
    {
      comment: '#5c6370', keyword: '#c678dd', string: '#98c379',
      number: '#d19a66',  function: '#61afef', variable: '#e06c75',
      type: '#e5c07b',    operator: '#56b6c2', punctuation: '#abb2bf',
      tag: '#e06c75',     attribute: '#d19a66', constant: '#d19a66',
      builtin: '#56b6c2', parameter: '#d19a66',
    },
    {
      black: '#282c34',        red: '#e06c75',    green: '#98c379', yellow: '#e5c07b',
      blue: '#61afef',         magenta: '#c678dd', cyan: '#56b6c2',  white: '#abb2bf',
      brightBlack: '#5c6370',  brightRed: '#e06c75',    brightGreen: '#98c379',
      brightYellow: '#e5c07b', brightBlue: '#61afef',   brightMagenta: '#c678dd',
      brightCyan: '#56b6c2',   brightWhite: '#ffffff',
    }
  ),

  // ── Kanagawa ─────────────────────────────────────────────────
  preset('kanagawa', 'Kanagawa', 'rebelot', 'dark',
    {
      background: '#1f1f28', foreground: '#dcd7ba', cursor: '#c8c093',
      selection: '#2d4f67',  lineHighlight: '#2a2a37', lineNumber: '#727169',
      lineNumberActive: '#c8c093', border: '#2a2a37', gutter: '#1f1f28',
    },
    {
      comment: '#727169', keyword: '#957fb8', string: '#98bb6c',
      number: '#d27e99',  function: '#7e9cd8', variable: '#dcd7ba',
      type: '#c0a36e',    operator: '#7fb4ca', punctuation: '#dcd7ba',
      tag: '#e46876',     attribute: '#c0a36e', constant: '#ffa066',
      builtin: '#7fb4ca', parameter: '#ffa066',
    },
    {
      black: '#16161d',        red: '#c34043',    green: '#76946a', yellow: '#c0a36e',
      blue: '#7e9cd8',         magenta: '#957fb8', cyan: '#6a9589',  white: '#c8c093',
      brightBlack: '#727169',  brightRed: '#e82424',    brightGreen: '#98bb6c',
      brightYellow: '#e6c384', brightBlue: '#7fb4ca',   brightMagenta: '#938aa9',
      brightCyan: '#7aa89f',   brightWhite: '#dcd7ba',
    }
  ),

  // ── Rosé Pine ────────────────────────────────────────────────
  preset('rose-pine', 'Rosé Pine', 'rose-pine', 'dark',
    {
      background: '#191724', foreground: '#e0def4', cursor: '#524f67',
      selection: '#26233a',  lineHighlight: '#1f1d2e', lineNumber: '#6e6a86',
      lineNumberActive: '#e0def4', border: '#26233a', gutter: '#191724',
    },
    {
      comment: '#6e6a86', keyword: '#c4a7e7', string: '#f6c177',
      number: '#ebbcba',  function: '#9ccfd8', variable: '#e0def4',
      type: '#eb6f92',    operator: '#908caa', punctuation: '#908caa',
      tag: '#eb6f92',     attribute: '#f6c177', constant: '#ebbcba',
      builtin: '#9ccfd8', parameter: '#f6c177',
    },
    {
      black: '#26233a',        red: '#eb6f92',    green: '#31748f', yellow: '#f6c177',
      blue: '#9ccfd8',         magenta: '#c4a7e7', cyan: '#ebbcba',  white: '#e0def4',
      brightBlack: '#6e6a86',  brightRed: '#eb6f92',    brightGreen: '#31748f',
      brightYellow: '#f6c177', brightBlue: '#9ccfd8',   brightMagenta: '#c4a7e7',
      brightCyan: '#ebbcba',   brightWhite: '#e0def4',
    }
  ),

  // ── Everforest Dark ──────────────────────────────────────────
  preset('everforest', 'Everforest Dark', 'sainnhe', 'dark',
    {
      background: '#2d353b', foreground: '#d3c6aa', cursor: '#d3c6aa',
      selection: '#3d484d',  lineHighlight: '#374145', lineNumber: '#7a8478',
      lineNumberActive: '#d3c6aa', border: '#3d484d', gutter: '#2d353b',
    },
    {
      comment: '#7a8478', keyword: '#e67e80', string: '#a7c080',
      number: '#d699b6',  function: '#7fbbb3', variable: '#d3c6aa',
      type: '#dbbc7f',    operator: '#e67e80', punctuation: '#d3c6aa',
      tag: '#e67e80',     attribute: '#dbbc7f', constant: '#d699b6',
      builtin: '#7fbbb3', parameter: '#e69875',
    },
    {
      black: '#374145',        red: '#e67e80',    green: '#a7c080', yellow: '#dbbc7f',
      blue: '#7fbbb3',         magenta: '#d699b6', cyan: '#83c092',  white: '#d3c6aa',
      brightBlack: '#7a8478',  brightRed: '#e67e80',    brightGreen: '#a7c080',
      brightYellow: '#dbbc7f', brightBlue: '#7fbbb3',   brightMagenta: '#d699b6',
      brightCyan: '#83c092',   brightWhite: '#d3c6aa',
    }
  ),

  // ── Solarized Dark ───────────────────────────────────────────
  preset('solarized-dark', 'Solarized Dark', 'altercation', 'dark',
    {
      background: '#002b36', foreground: '#839496', cursor: '#839496',
      selection: '#073642',  lineHighlight: '#073642', lineNumber: '#586e75',
      lineNumberActive: '#839496', border: '#073642', gutter: '#002b36',
    },
    {
      comment: '#586e75', keyword: '#859900', string: '#2aa198',
      number: '#d33682',  function: '#268bd2', variable: '#839496',
      type: '#b58900',    operator: '#859900', punctuation: '#839496',
      tag: '#268bd2',     attribute: '#b58900', constant: '#cb4b16',
      builtin: '#2aa198', parameter: '#cb4b16',
    },
    {
      black: '#073642',        red: '#dc322f',    green: '#859900', yellow: '#b58900',
      blue: '#268bd2',         magenta: '#d33682', cyan: '#2aa198',  white: '#eee8d5',
      brightBlack: '#002b36',  brightRed: '#cb4b16',    brightGreen: '#586e75',
      brightYellow: '#657b83', brightBlue: '#839496',   brightMagenta: '#6c71c4',
      brightCyan: '#93a1a1',   brightWhite: '#fdf6e3',
    }
  ),

  // ── Solarized Light ──────────────────────────────────────────
  preset('solarized-light', 'Solarized Light', 'altercation', 'light',
    {
      background: '#fdf6e3', foreground: '#657b83', cursor: '#657b83',
      selection: '#eee8d5',  lineHighlight: '#eee8d5', lineNumber: '#93a1a1',
      lineNumberActive: '#657b83', border: '#eee8d5', gutter: '#fdf6e3',
    },
    {
      comment: '#93a1a1', keyword: '#859900', string: '#2aa198',
      number: '#d33682',  function: '#268bd2', variable: '#657b83',
      type: '#b58900',    operator: '#859900', punctuation: '#657b83',
      tag: '#268bd2',     attribute: '#b58900', constant: '#cb4b16',
      builtin: '#2aa198', parameter: '#cb4b16',
    },
    {
      black: '#073642',        red: '#dc322f',    green: '#859900', yellow: '#b58900',
      blue: '#268bd2',         magenta: '#d33682', cyan: '#2aa198',  white: '#eee8d5',
      brightBlack: '#002b36',  brightRed: '#cb4b16',    brightGreen: '#586e75',
      brightYellow: '#657b83', brightBlue: '#839496',   brightMagenta: '#6c71c4',
      brightCyan: '#93a1a1',   brightWhite: '#fdf6e3',
    }
  ),

  // ── OneDark Vivid ────────────────────────────────────────────
  preset('onedark-vivid', 'OneDark Vivid', 'navarasu', 'dark',
    {
      background: '#1e2127', foreground: '#abb2bf', cursor: '#528bff',
      selection: '#3e4451',  lineHighlight: '#21252b', lineNumber: '#4b5263',
      lineNumberActive: '#abb2bf', border: '#3e4451', gutter: '#1e2127',
    },
    {
      comment: '#5c6370', keyword: '#c678dd', string: '#98c379',
      number: '#e5c07b',  function: '#61afef', variable: '#e06c75',
      type: '#e5c07b',    operator: '#56b6c2', punctuation: '#abb2bf',
      tag: '#e06c75',     attribute: '#e5c07b', constant: '#d19a66',
      builtin: '#56b6c2', parameter: '#d19a66',
    },
    {
      black: '#1e2127',        red: '#e06c75',    green: '#98c379', yellow: '#e5c07b',
      blue: '#61afef',         magenta: '#c678dd', cyan: '#56b6c2',  white: '#abb2bf',
      brightBlack: '#5c6370',  brightRed: '#e06c75',    brightGreen: '#98c379',
      brightYellow: '#e5c07b', brightBlue: '#61afef',   brightMagenta: '#c678dd',
      brightCyan: '#56b6c2',   brightWhite: '#ffffff',
    }
  ),

  // ── OneDark Dark ─────────────────────────────────────────────
  preset('onedark-dark', 'OneDark Dark', 'navarasu', 'dark',
    {
      background: '#0d1117', foreground: '#abb2bf', cursor: '#528bff',
      selection: '#1c2128',  lineHighlight: '#161b22', lineNumber: '#30363d',
      lineNumberActive: '#abb2bf', border: '#21262d', gutter: '#0d1117',
    },
    {
      comment: '#484f58', keyword: '#ff7b72', string: '#a5d6ff',
      number: '#79c0ff',  function: '#d2a8ff', variable: '#ffa657',
      type: '#ffa657',    operator: '#ff7b72', punctuation: '#8b949e',
      tag: '#7ee787',     attribute: '#79c0ff', constant: '#79c0ff',
      builtin: '#d2a8ff', parameter: '#ffa657',
    },
    {
      black: '#0d1117',        red: '#ff7b72',    green: '#3fb950', yellow: '#d29922',
      blue: '#58a6ff',         magenta: '#bc8cff', cyan: '#39c5cf',  white: '#b1bac4',
      brightBlack: '#484f58',  brightRed: '#ffa198',    brightGreen: '#56d364',
      brightYellow: '#e3b341', brightBlue: '#79c0ff',   brightMagenta: '#d2a8ff',
      brightCyan: '#56d4dd',   brightWhite: '#f0f6fc',
    }
  ),

  // ── Vaporwave ────────────────────────────────────────────────
  preset('vaporwave', 'Vaporwave', 'navarasu', 'dark',
    {
      background: '#1a1a2e', foreground: '#e0e0ff', cursor: '#ff71ce',
      selection: '#2d2b55',  lineHighlight: '#1f1f3a', lineNumber: '#505070',
      lineNumberActive: '#e0e0ff', border: '#2d2b55', gutter: '#1a1a2e',
    },
    {
      comment: '#6272a4', keyword: '#ff71ce', string: '#05ffa1',
      number: '#b967ff',  function: '#01cdfe', variable: '#fffb96',
      type: '#ff71ce',    operator: '#01cdfe', punctuation: '#e0e0ff',
      tag: '#ff71ce',     attribute: '#fffb96', constant: '#b967ff',
      builtin: '#01cdfe', parameter: '#fffb96',
    },
    {
      black: '#1a1a2e',        red: '#ff71ce',    green: '#05ffa1', yellow: '#fffb96',
      blue: '#01cdfe',         magenta: '#b967ff', cyan: '#05ffa1',  white: '#e0e0ff',
      brightBlack: '#505070',  brightRed: '#ff9de2',    brightGreen: '#05ffa1',
      brightYellow: '#ffffc8', brightBlue: '#74e7ff',   brightMagenta: '#d0a8ff',
      brightCyan: '#74ffde',   brightWhite: '#ffffff',
    }
  ),

  // ── Vague ────────────────────────────────────────────────────
  preset('vague', 'Vague', 'vague-theme', 'dark',
    {
      background: '#1a1a1a', foreground: '#c4c4c4', cursor: '#c4c4c4',
      selection: '#2a2a2a',  lineHighlight: '#1e1e1e', lineNumber: '#4a4a4a',
      lineNumberActive: '#c4c4c4', border: '#2a2a2a', gutter: '#1a1a1a',
    },
    {
      comment: '#585858', keyword: '#a8a8d8', string: '#a8c8a8',
      number: '#d8a8a8',  function: '#c8d8a8', variable: '#c4c4c4',
      type: '#d8c8a8',    operator: '#a8a8d8', punctuation: '#888888',
      tag: '#d8a8a8',     attribute: '#d8c8a8', constant: '#d8a8a8',
      builtin: '#a8d8d8', parameter: '#d8c8a8',
    },
    {
      black: '#1a1a1a',        red: '#d8a8a8',    green: '#a8c8a8', yellow: '#d8c8a8',
      blue: '#a8a8d8',         magenta: '#c8a8d8', cyan: '#a8d8d8',  white: '#c4c4c4',
      brightBlack: '#585858',  brightRed: '#e8b8b8',    brightGreen: '#b8d8b8',
      brightYellow: '#e8d8b8', brightBlue: '#b8b8e8',   brightMagenta: '#d8b8e8',
      brightCyan: '#b8e8e8',   brightWhite: '#e0e0e0',
    }
  ),

  // ── Zenwritten Dark ──────────────────────────────────────────
  preset('zenwritten-dark', 'Zenwritten Dark', 'zenbones-theme', 'dark',
    {
      background: '#16161d', foreground: '#c9c7cd', cursor: '#c9c7cd',
      selection: '#2d2b33',  lineHighlight: '#1c1b23', lineNumber: '#585563',
      lineNumberActive: '#c9c7cd', border: '#2d2b33', gutter: '#16161d',
    },
    {
      comment: '#585563', keyword: '#c9c7cd', string: '#c9c7cd',
      number: '#c9c7cd',  function: '#c9c7cd', variable: '#c9c7cd',
      type: '#c9c7cd',    operator: '#c9c7cd', punctuation: '#7e7b86',
      tag: '#c9c7cd',     attribute: '#c9c7cd', constant: '#c9c7cd',
      builtin: '#c9c7cd', parameter: '#c9c7cd',
    },
    {
      black: '#16161d',        red: '#c94f6d',    green: '#81b29a', yellow: '#dbc074',
      blue: '#719cd6',         magenta: '#9d79d6', cyan: '#63cdcf',  white: '#c9c7cd',
      brightBlack: '#585563',  brightRed: '#d16983',    brightGreen: '#8ec3a7',
      brightYellow: '#e3c87e', brightBlue: '#86aee0',   brightMagenta: '#b18fe0',
      brightCyan: '#78d4d6',   brightWhite: '#e0dde6',
    }
  ),

  // ── Neobones Dark ────────────────────────────────────────────
  preset('neobones-dark', 'Neobones Dark', 'zenbones-theme', 'dark',
    {
      background: '#1c1917', foreground: '#d6d0c0', cursor: '#d6d0c0',
      selection: '#302b28',  lineHighlight: '#211e1b', lineNumber: '#5e574e',
      lineNumberActive: '#d6d0c0', border: '#302b28', gutter: '#1c1917',
    },
    {
      comment: '#5e574e', keyword: '#e8956d', string: '#789b6a',
      number: '#d4a96a',  function: '#7294a5', variable: '#d6d0c0',
      type: '#b0896e',    operator: '#e8956d', punctuation: '#8b8375',
      tag: '#e8956d',     attribute: '#d4a96a', constant: '#d4a96a',
      builtin: '#7294a5', parameter: '#d4a96a',
    },
    {
      black: '#302b28',        red: '#e8956d',    green: '#789b6a', yellow: '#d4a96a',
      blue: '#7294a5',         magenta: '#b0896e', cyan: '#6a9e8a',  white: '#d6d0c0',
      brightBlack: '#5e574e',  brightRed: '#f0a882',    brightGreen: '#8aaf7c',
      brightYellow: '#e0ba7e', brightBlue: '#86a8ba',   brightMagenta: '#c9a088',
      brightCyan: '#80b49e',   brightWhite: '#e8e4d9',
    }
  ),

  // ── Forestbones Dark ─────────────────────────────────────────
  preset('forestbones-dark', 'Forestbones Dark', 'zenbones-theme', 'dark',
    {
      background: '#1b2118', foreground: '#c9cbb7', cursor: '#c9cbb7',
      selection: '#2a3226',  lineHighlight: '#202719', lineNumber: '#536550',
      lineNumberActive: '#c9cbb7', border: '#2a3226', gutter: '#1b2118',
    },
    {
      comment: '#536550', keyword: '#d5a96e', string: '#87a860',
      number: '#c5956e',  function: '#7da87b', variable: '#c9cbb7',
      type: '#c5956e',    operator: '#d5a96e', punctuation: '#7d806c',
      tag: '#d5a96e',     attribute: '#c5956e', constant: '#c5956e',
      builtin: '#7da87b', parameter: '#c5956e',
    },
    {
      black: '#2a3226',        red: '#c5956e',    green: '#87a860', yellow: '#d5a96e',
      blue: '#7da87b',         magenta: '#b08060', cyan: '#6aaa8a',  white: '#c9cbb7',
      brightBlack: '#536550',  brightRed: '#d8aa80',    brightGreen: '#9bbf72',
      brightYellow: '#e0bc80', brightBlue: '#90bc8e',   brightMagenta: '#c09472',
      brightCyan: '#7cbd9e',   brightWhite: '#dddec8',
    }
  ),

  // ── Kanagawabones ────────────────────────────────────────────
  preset('kanagawabones', 'Kanagawabones', 'zenbones-theme', 'dark',
    {
      background: '#1f1f28', foreground: '#c5bfa8', cursor: '#c5bfa8',
      selection: '#2d2d3a',  lineHighlight: '#242430', lineNumber: '#62607a',
      lineNumberActive: '#c5bfa8', border: '#2d2d3a', gutter: '#1f1f28',
    },
    {
      comment: '#62607a', keyword: '#957fb8', string: '#98bb6c',
      number: '#d27e99',  function: '#7e9cd8', variable: '#c5bfa8',
      type: '#c0a36e',    operator: '#7fb4ca', punctuation: '#9590a8',
      tag: '#e46876',     attribute: '#c0a36e', constant: '#ffa066',
      builtin: '#7fb4ca', parameter: '#ffa066',
    },
    {
      black: '#1f1f28',        red: '#c34043',    green: '#76946a', yellow: '#c0a36e',
      blue: '#7e9cd8',         magenta: '#957fb8', cyan: '#6a9589',  white: '#c5bfa8',
      brightBlack: '#62607a',  brightRed: '#e82424',    brightGreen: '#98bb6c',
      brightYellow: '#e6c384', brightBlue: '#7fb4ca',   brightMagenta: '#938aa9',
      brightCyan: '#7aa89f',   brightWhite: '#dcd7ba',
    }
  ),

  // ── Tokyobones ───────────────────────────────────────────────
  preset('tokyobones', 'Tokyobones', 'zenbones-theme', 'dark',
    {
      background: '#1a1b26', foreground: '#c0bba8', cursor: '#c0bba8',
      selection: '#292e42',  lineHighlight: '#1f2035', lineNumber: '#565f89',
      lineNumberActive: '#c0bba8', border: '#292e42', gutter: '#1a1b26',
    },
    {
      comment: '#565f89', keyword: '#bb9af7', string: '#9ece6a',
      number: '#ff9e64',  function: '#7aa2f7', variable: '#c0bba8',
      type: '#e0af68',    operator: '#89ddff', punctuation: '#787c99',
      tag: '#f7768e',     attribute: '#e0af68', constant: '#ff9e64',
      builtin: '#2ac3de', parameter: '#ff9e64',
    },
    {
      black: '#15161e',        red: '#f7768e',    green: '#9ece6a', yellow: '#e0af68',
      blue: '#7aa2f7',         magenta: '#bb9af7', cyan: '#7dcfff',  white: '#a9b1d6',
      brightBlack: '#414868',  brightRed: '#f7768e',    brightGreen: '#9ece6a',
      brightYellow: '#e0af68', brightBlue: '#7aa2f7',   brightMagenta: '#bb9af7',
      brightCyan: '#7dcfff',   brightWhite: '#c0caf5',
    }
  ),

  // ── Nordbones ────────────────────────────────────────────────
  preset('nordbones', 'Nordbones', 'zenbones-theme', 'dark',
    {
      background: '#242933', foreground: '#c8cdd8', cursor: '#c8cdd8',
      selection: '#2e3440',  lineHighlight: '#282e3a', lineNumber: '#636e83',
      lineNumberActive: '#c8cdd8', border: '#2e3440', gutter: '#242933',
    },
    {
      comment: '#636e83', keyword: '#81a1c1', string: '#a3be8c',
      number: '#b48ead',  function: '#88c0d0', variable: '#c8cdd8',
      type: '#8fbcbb',    operator: '#81a1c1', punctuation: '#8896b0',
      tag: '#81a1c1',     attribute: '#8fbcbb', constant: '#b48ead',
      builtin: '#88c0d0', parameter: '#d08770',
    },
    {
      black: '#3b4252',        red: '#bf616a',    green: '#a3be8c', yellow: '#ebcb8b',
      blue: '#81a1c1',         magenta: '#b48ead', cyan: '#88c0d0',  white: '#e5e9f0',
      brightBlack: '#4c566a',  brightRed: '#bf616a',    brightGreen: '#a3be8c',
      brightYellow: '#ebcb8b', brightBlue: '#81a1c1',   brightMagenta: '#b48ead',
      brightCyan: '#8fbcbb',   brightWhite: '#eceff4',
    }
  ),

  // ── Seoulbones Dark ──────────────────────────────────────────
  preset('seoulbones-dark', 'Seoulbones Dark', 'zenbones-theme', 'dark',
    {
      background: '#0f1218', foreground: '#cbd0db', cursor: '#cbd0db',
      selection: '#1e2430',  lineHighlight: '#161c26', lineNumber: '#535d6e',
      lineNumberActive: '#cbd0db', border: '#1e2430', gutter: '#0f1218',
    },
    {
      comment: '#535d6e', keyword: '#e8788a', string: '#70b8a8',
      number: '#d0a070',  function: '#7080c8', variable: '#cbd0db',
      type: '#c878b0',    operator: '#e8788a', punctuation: '#808898',
      tag: '#e8788a',     attribute: '#d0a070', constant: '#d0a070',
      builtin: '#7080c8', parameter: '#d0a070',
    },
    {
      black: '#0f1218',        red: '#e8788a',    green: '#70b8a8', yellow: '#d0a070',
      blue: '#7080c8',         magenta: '#c878b0', cyan: '#58a8d0',  white: '#cbd0db',
      brightBlack: '#535d6e',  brightRed: '#f08898',    brightGreen: '#80c8b8',
      brightYellow: '#e0b080', brightBlue: '#8090d8',   brightMagenta: '#d888c0',
      brightCyan: '#68b8e0',   brightWhite: '#dde0e8',
    }
  ),

  // ── OxoCarbon ────────────────────────────────────────────────
  preset('oxocarbon', 'OxoCarbon', 'nyoom-engineering', 'dark',
    {
      background: '#161616', foreground: '#f2f4f8', cursor: '#78a9ff',
      selection: '#2d2d2d',  lineHighlight: '#1e1e1e', lineNumber: '#525252',
      lineNumberActive: '#f2f4f8', border: '#393939', gutter: '#161616',
    },
    {
      comment: '#525252', keyword: '#be95ff', string: '#42be65',
      number: '#ff7eb6',  function: '#82cfff', variable: '#f2f4f8',
      type: '#3ddbd9',    operator: '#33b1ff', punctuation: '#dde1e6',
      tag: '#33b1ff',     attribute: '#ff7eb6', constant: '#ff7eb6',
      builtin: '#82cfff', parameter: '#ee5396',
    },
    {
      black: '#262626',        red: '#ee5396',    green: '#42be65', yellow: '#ffe97b',
      blue: '#82cfff',         magenta: '#be95ff', cyan: '#3ddbd9',  white: '#dde1e6',
      brightBlack: '#393939',  brightRed: '#ff7eb6',    brightGreen: '#6fdc8c',
      brightYellow: '#ffd74d', brightBlue: '#a6c8ff',   brightMagenta: '#d4bbff',
      brightCyan: '#08bdba',   brightWhite: '#f2f4f8',
    }
  ),

  // ── GitHub Dark ──────────────────────────────────────────────
  preset('github-dark', 'GitHub Dark', 'github', 'dark',
    {
      background: '#0d1117', foreground: '#e6edf3', cursor: '#e6edf3',
      selection: '#1c2128',  lineHighlight: '#161b22', lineNumber: '#6e7681',
      lineNumberActive: '#e6edf3', border: '#21262d', gutter: '#0d1117',
    },
    {
      comment: '#8b949e', keyword: '#ff7b72', string: '#a5d6ff',
      number: '#79c0ff',  function: '#d2a8ff', variable: '#ffa657',
      type: '#ffa657',    operator: '#ff7b72', punctuation: '#8b949e',
      tag: '#7ee787',     attribute: '#79c0ff', constant: '#79c0ff',
      builtin: '#d2a8ff', parameter: '#ffa657',
    },
    {
      black: '#0d1117',        red: '#ff7b72',    green: '#3fb950', yellow: '#d29922',
      blue: '#58a6ff',         magenta: '#bc8cff', cyan: '#39c5cf',  white: '#b1bac4',
      brightBlack: '#6e7681',  brightRed: '#ffa198',    brightGreen: '#56d364',
      brightYellow: '#e3b341', brightBlue: '#79c0ff',   brightMagenta: '#d2a8ff',
      brightCyan: '#56d4dd',   brightWhite: '#f0f6fc',
    }
  ),

  // ── GitHub Dark Dimmed ───────────────────────────────────────
  preset('github-dark-dimmed', 'GitHub Dark Dimmed', 'github', 'dark',
    {
      background: '#22272e', foreground: '#adbac7', cursor: '#adbac7',
      selection: '#2d333b',  lineHighlight: '#272e38', lineNumber: '#545d68',
      lineNumberActive: '#adbac7', border: '#2d333b', gutter: '#22272e',
    },
    {
      comment: '#768390', keyword: '#f47067', string: '#96d0ff',
      number: '#6cb6ff',  function: '#dcbdfb', variable: '#f69d50',
      type: '#f69d50',    operator: '#f47067', punctuation: '#768390',
      tag: '#57ab5a',     attribute: '#6cb6ff', constant: '#6cb6ff',
      builtin: '#dcbdfb', parameter: '#f69d50',
    },
    {
      black: '#22272e',        red: '#f47067',    green: '#57ab5a', yellow: '#c69026',
      blue: '#539bf5',         magenta: '#b083f0', cyan: '#39c5cf',  white: '#909dab',
      brightBlack: '#545d68',  brightRed: '#ff938a',    brightGreen: '#6bc46d',
      brightYellow: '#daaa3f', brightBlue: '#6cb6ff',   brightMagenta: '#dcbdfb',
      brightCyan: '#56d4dd',   brightWhite: '#cdd9e5',
    }
  ),

  // ── GitHub Light ─────────────────────────────────────────────
  preset('github-light', 'GitHub Light', 'github', 'light',
    {
      background: '#ffffff', foreground: '#24292f', cursor: '#24292f',
      selection: '#b6e3ff',  lineHighlight: '#f6f8fa', lineNumber: '#6e7781',
      lineNumberActive: '#24292f', border: '#d0d7de', gutter: '#ffffff',
    },
    {
      comment: '#6e7781', keyword: '#cf222e', string: '#0a3069',
      number: '#0550ae',  function: '#8250df', variable: '#953800',
      type: '#953800',    operator: '#cf222e', punctuation: '#24292f',
      tag: '#116329',     attribute: '#0550ae', constant: '#0550ae',
      builtin: '#8250df', parameter: '#953800',
    },
    {
      black: '#24292f',        red: '#cf222e',    green: '#116329', yellow: '#4d2d00',
      blue: '#0969da',         magenta: '#8250df', cyan: '#1b7c83',  white: '#6e7781',
      brightBlack: '#57606a',  brightRed: '#a40e26',    brightGreen: '#1a7f37',
      brightYellow: '#633c01', brightBlue: '#218bff',   brightMagenta: '#a475f9',
      brightCyan: '#3192aa',   brightWhite: '#8c959f',
    }
  ),

  // ── GitHub Dark High Contrast ────────────────────────────────
  preset('github-dark-hc', 'GitHub Dark High Contrast', 'github', 'dark',
    {
      background: '#0a0c10', foreground: '#f0f3f6', cursor: '#f0f3f6',
      selection: '#1c2128',  lineHighlight: '#131921', lineNumber: '#7a828e',
      lineNumberActive: '#f0f3f6', border: '#21262d', gutter: '#0a0c10',
    },
    {
      comment: '#9ea7b3', keyword: '#ff9492', string: '#addcff',
      number: '#91cbff',  function: '#e8c9ff', variable: '#ffb757',
      type: '#ffb757',    operator: '#ff9492', punctuation: '#9ea7b3',
      tag: '#7ce38b',     attribute: '#91cbff', constant: '#91cbff',
      builtin: '#e8c9ff', parameter: '#ffb757',
    },
    {
      black: '#0a0c10',        red: '#ff6a69',    green: '#26cd4d', yellow: '#f0b72f',
      blue: '#71b7ff',         magenta: '#cb9eff', cyan: '#39c5cf',  white: '#b0bbc6',
      brightBlack: '#7a828e',  brightRed: '#ffb1af',    brightGreen: '#4ae168',
      brightYellow: '#f7c843', brightBlue: '#91cbff',   brightMagenta: '#e8c9ff',
      brightCyan: '#56d4dd',   brightWhite: '#f0f3f6',
    }
  ),

  // ── GitHub Light High Contrast ───────────────────────────────
  preset('github-light-hc', 'GitHub Light High Contrast', 'github', 'light',
    {
      background: '#ffffff', foreground: '#0e1116', cursor: '#0e1116',
      selection: '#b6e3ff',  lineHighlight: '#f6f8fa', lineNumber: '#42474e',
      lineNumberActive: '#0e1116', border: '#20252c', gutter: '#ffffff',
    },
    {
      comment: '#42474e', keyword: '#b01021', string: '#032563',
      number: '#032563',  function: '#622cbc', variable: '#702c00',
      type: '#702c00',    operator: '#b01021', punctuation: '#0e1116',
      tag: '#024c1a',     attribute: '#032563', constant: '#032563',
      builtin: '#622cbc', parameter: '#702c00',
    },
    {
      black: '#0e1116',        red: '#b01021',    green: '#024c1a', yellow: '#3f2200',
      blue: '#0349b4',         magenta: '#622cbc', cyan: '#1b7c83',  white: '#42474e',
      brightBlack: '#20252c',  brightRed: '#86061d',    brightGreen: '#055d20',
      brightYellow: '#4e2b00', brightBlue: '#1168e3',   brightMagenta: '#7f3fbe',
      brightCyan: '#3192aa',   brightWhite: '#8c959f',
    }
  ),

  // ── Lackluster ───────────────────────────────────────────────
  preset('lackluster', 'Lackluster', 'slugbyte', 'dark',
    {
      background: '#171717', foreground: '#d8d8d8', cursor: '#d8d8d8',
      selection: '#2a2a2a',  lineHighlight: '#1e1e1e', lineNumber: '#4e4e4e',
      lineNumberActive: '#d8d8d8', border: '#2a2a2a', gutter: '#171717',
    },
    {
      comment: '#4e4e4e', keyword: '#d8d8d8', string: '#aeaeae',
      number: '#d8d8d8',  function: '#d8d8d8', variable: '#d8d8d8',
      type: '#d8d8d8',    operator: '#d8d8d8', punctuation: '#808080',
      tag: '#d8d8d8',     attribute: '#d8d8d8', constant: '#d8d8d8',
      builtin: '#d8d8d8', parameter: '#d8d8d8',
    },
    {
      black: '#171717',        red: '#d8d8d8',    green: '#aeaeae', yellow: '#d8d8d8',
      blue: '#d8d8d8',         magenta: '#d8d8d8', cyan: '#aeaeae',  white: '#d8d8d8',
      brightBlack: '#4e4e4e',  brightRed: '#e8e8e8',    brightGreen: '#c8c8c8',
      brightYellow: '#e8e8e8', brightBlue: '#e8e8e8',   brightMagenta: '#e8e8e8',
      brightCyan: '#c8c8c8',   brightWhite: '#f0f0f0',
    }
  ),

  // ── Lackluster Hack ──────────────────────────────────────────
  preset('lackluster-hack', 'Lackluster Hack', 'slugbyte', 'dark',
    {
      background: '#0a1a0a', foreground: '#aaffaa', cursor: '#aaffaa',
      selection: '#0f2a0f',  lineHighlight: '#0d1f0d', lineNumber: '#2a4a2a',
      lineNumberActive: '#aaffaa', border: '#0f2a0f', gutter: '#0a1a0a',
    },
    {
      comment: '#2a4a2a', keyword: '#88ee88', string: '#aaffaa',
      number: '#66dd66',  function: '#aaffaa', variable: '#aaffaa',
      type: '#88ee88',    operator: '#66dd66', punctuation: '#4a6a4a',
      tag: '#88ee88',     attribute: '#66dd66', constant: '#66dd66',
      builtin: '#aaffaa', parameter: '#66dd66',
    },
    {
      black: '#0a1a0a',        red: '#88ee88',    green: '#aaffaa', yellow: '#88ee88',
      blue: '#66dd66',         magenta: '#88ee88', cyan: '#aaffaa',  white: '#aaffaa',
      brightBlack: '#2a4a2a',  brightRed: '#99ff99',    brightGreen: '#bbffbb',
      brightYellow: '#99ff99', brightBlue: '#77ee77',   brightMagenta: '#99ff99',
      brightCyan: '#bbffbb',   brightWhite: '#ccffcc',
    }
  ),

  // ── Lackluster Night ─────────────────────────────────────────
  preset('lackluster-night', 'Lackluster Night', 'slugbyte', 'dark',
    {
      background: '#0d0d1a', foreground: '#b8b8d8', cursor: '#b8b8d8',
      selection: '#1a1a2e',  lineHighlight: '#121220', lineNumber: '#3a3a5a',
      lineNumberActive: '#b8b8d8', border: '#1a1a2e', gutter: '#0d0d1a',
    },
    {
      comment: '#3a3a5a', keyword: '#9898c8', string: '#b8b8d8',
      number: '#7878b8',  function: '#b8b8d8', variable: '#b8b8d8',
      type: '#9898c8',    operator: '#7878b8', punctuation: '#5a5a7a',
      tag: '#9898c8',     attribute: '#7878b8', constant: '#7878b8',
      builtin: '#b8b8d8', parameter: '#7878b8',
    },
    {
      black: '#0d0d1a',        red: '#9898c8',    green: '#b8b8d8', yellow: '#9898c8',
      blue: '#7878b8',         magenta: '#9898c8', cyan: '#b8b8d8',  white: '#b8b8d8',
      brightBlack: '#3a3a5a',  brightRed: '#a8a8d8',    brightGreen: '#c8c8e8',
      brightYellow: '#a8a8d8', brightBlue: '#8888c8',   brightMagenta: '#a8a8d8',
      brightCyan: '#c8c8e8',   brightWhite: '#d0d0f0',
    }
  ),

  // ── Black Metal: Bathory ─────────────────────────────────────
  preset('bm-bathory', 'BM: Bathory', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c0b8a8', cursor: '#c0b8a8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c0b8a8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#c2b790', string: '#a0785a',
      number: '#c2b790',  function: '#c2b790', variable: '#c0b8a8',
      type: '#a0785a',    operator: '#c2b790', punctuation: '#666666',
      tag: '#a0785a',     attribute: '#c2b790', constant: '#c2b790',
      builtin: '#c2b790', parameter: '#a0785a',
    },
    {
      black: '#000000',        red: '#a0785a',    green: '#c2b790', yellow: '#c2b790',
      blue: '#7a8a6a',         magenta: '#a0785a', cyan: '#8a9a7a',  white: '#c0b8a8',
      brightBlack: '#3a3a3a',  brightRed: '#b88870',    brightGreen: '#d2c8a0',
      brightYellow: '#d2c8a0', brightBlue: '#8a9a7a',   brightMagenta: '#b88870',
      brightCyan: '#9aaa8a',   brightWhite: '#d8d0c0',
    }
  ),

  // ── Black Metal: Bathory Alt ─────────────────────────────────
  preset('bm-bathory-alt', 'BM: Bathory (Alt)', 'metalelf0', 'dark',
    {
      background: '#1c1810', foreground: '#c0b8a8', cursor: '#c0b8a8',
      selection: '#2a2418',  lineHighlight: '#211d13', lineNumber: '#4a4438',
      lineNumberActive: '#c0b8a8', border: '#2a2418', gutter: '#1c1810',
    },
    {
      comment: '#4a4438', keyword: '#c2b790', string: '#a0785a',
      number: '#c2b790',  function: '#c2b790', variable: '#c0b8a8',
      type: '#a0785a',    operator: '#c2b790', punctuation: '#706858',
      tag: '#a0785a',     attribute: '#c2b790', constant: '#c2b790',
      builtin: '#c2b790', parameter: '#a0785a',
    },
    {
      black: '#1c1810',        red: '#a0785a',    green: '#c2b790', yellow: '#c2b790',
      blue: '#7a8a6a',         magenta: '#a0785a', cyan: '#8a9a7a',  white: '#c0b8a8',
      brightBlack: '#4a4438',  brightRed: '#b88870',    brightGreen: '#d2c8a0',
      brightYellow: '#d2c8a0', brightBlue: '#8a9a7a',   brightMagenta: '#b88870',
      brightCyan: '#9aaa8a',   brightWhite: '#d8d0c0',
    }
  ),

  // ── Black Metal: Burzum ──────────────────────────────────────
  preset('bm-burzum', 'BM: Burzum', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b8b4a0', cursor: '#b8b4a0',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b8b4a0', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#888870', string: '#706858',
      number: '#888870',  function: '#888870', variable: '#b8b4a0',
      type: '#706858',    operator: '#888870', punctuation: '#555555',
      tag: '#706858',     attribute: '#888870', constant: '#888870',
      builtin: '#888870', parameter: '#706858',
    },
    {
      black: '#000000',        red: '#706858',    green: '#888870', yellow: '#888870',
      blue: '#606858',         magenta: '#706858', cyan: '#708070',  white: '#b8b4a0',
      brightBlack: '#3a3a3a',  brightRed: '#807868',    brightGreen: '#989880',
      brightYellow: '#989880', brightBlue: '#707868',   brightMagenta: '#807868',
      brightCyan: '#809080',   brightWhite: '#ccc8b0',
    }
  ),

  // ── Black Metal: Gorgoroth ───────────────────────────────────
  preset('bm-gorgoroth', 'BM: Gorgoroth', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c0bdb0', cursor: '#c0bdb0',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c0bdb0', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#8b7b6b', string: '#6b8b5b',
      number: '#8b7b6b',  function: '#8b7b6b', variable: '#c0bdb0',
      type: '#6b8b5b',    operator: '#8b7b6b', punctuation: '#555555',
      tag: '#6b8b5b',     attribute: '#8b7b6b', constant: '#8b7b6b',
      builtin: '#8b7b6b', parameter: '#6b8b5b',
    },
    {
      black: '#000000',        red: '#6b8b5b',    green: '#8b7b6b', yellow: '#8b7b6b',
      blue: '#5b7b8b',         magenta: '#6b8b5b', cyan: '#5b8b7b',  white: '#c0bdb0',
      brightBlack: '#3a3a3a',  brightRed: '#7b9b6b',    brightGreen: '#9b8b7b',
      brightYellow: '#9b8b7b', brightBlue: '#6b8b9b',   brightMagenta: '#7b9b6b',
      brightCyan: '#6b9b8b',   brightWhite: '#d4d1c4',
    }
  ),

  // ── Black Metal: Gorgoroth Alt ───────────────────────────────
  preset('bm-gorgoroth-alt', 'BM: Gorgoroth (Alt)', 'metalelf0', 'dark',
    {
      background: '#14181c', foreground: '#c0bdb0', cursor: '#c0bdb0',
      selection: '#232830',  lineHighlight: '#1a1e24', lineNumber: '#404850',
      lineNumberActive: '#c0bdb0', border: '#232830', gutter: '#14181c',
    },
    {
      comment: '#404850', keyword: '#8b7b6b', string: '#6b8b5b',
      number: '#8b7b6b',  function: '#8b7b6b', variable: '#c0bdb0',
      type: '#6b8b5b',    operator: '#8b7b6b', punctuation: '#606870',
      tag: '#6b8b5b',     attribute: '#8b7b6b', constant: '#8b7b6b',
      builtin: '#8b7b6b', parameter: '#6b8b5b',
    },
    {
      black: '#14181c',        red: '#6b8b5b',    green: '#8b7b6b', yellow: '#8b7b6b',
      blue: '#5b7b8b',         magenta: '#6b8b5b', cyan: '#5b8b7b',  white: '#c0bdb0',
      brightBlack: '#404850',  brightRed: '#7b9b6b',    brightGreen: '#9b8b7b',
      brightYellow: '#9b8b7b', brightBlue: '#6b8b9b',   brightMagenta: '#7b9b6b',
      brightCyan: '#6b9b8b',   brightWhite: '#d4d1c4',
    }
  ),

  // ── Black Metal: Darkthrone ──────────────────────────────────
  preset('bm-darkthrone', 'BM: Darkthrone', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c8c8c8', cursor: '#c8c8c8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c8c8c8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#888888', string: '#aaaaaa',
      number: '#888888',  function: '#aaaaaa', variable: '#c8c8c8',
      type: '#888888',    operator: '#aaaaaa', punctuation: '#555555',
      tag: '#888888',     attribute: '#aaaaaa', constant: '#888888',
      builtin: '#aaaaaa', parameter: '#888888',
    },
    {
      black: '#000000',        red: '#888888',    green: '#aaaaaa', yellow: '#888888',
      blue: '#aaaaaa',         magenta: '#888888', cyan: '#aaaaaa',  white: '#c8c8c8',
      brightBlack: '#3a3a3a',  brightRed: '#999999',    brightGreen: '#bbbbbb',
      brightYellow: '#999999', brightBlue: '#bbbbbb',   brightMagenta: '#999999',
      brightCyan: '#bbbbbb',   brightWhite: '#e0e0e0',
    }
  ),

  // ── Black Metal: Emperor ─────────────────────────────────────
  preset('bm-emperor', 'BM: Emperor', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b0b8c8', cursor: '#b0b8c8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b0b8c8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#7080a0', string: '#506080',
      number: '#7080a0',  function: '#7080a0', variable: '#b0b8c8',
      type: '#506080',    operator: '#7080a0', punctuation: '#505868',
      tag: '#506080',     attribute: '#7080a0', constant: '#7080a0',
      builtin: '#7080a0', parameter: '#506080',
    },
    {
      black: '#000000',        red: '#506080',    green: '#7080a0', yellow: '#7080a0',
      blue: '#5070a0',         magenta: '#506080', cyan: '#508090',  white: '#b0b8c8',
      brightBlack: '#3a3a3a',  brightRed: '#6070a0',    brightGreen: '#8090b0',
      brightYellow: '#8090b0', brightBlue: '#6080b0',   brightMagenta: '#6070a0',
      brightCyan: '#6090a0',   brightWhite: '#c4ccd8',
    }
  ),

  // ── Black Metal: Mayhem ──────────────────────────────────────
  preset('bm-mayhem', 'BM: Mayhem', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c0c0b0', cursor: '#c0c0b0',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c0c0b0', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#909080', string: '#707870',
      number: '#909080',  function: '#909080', variable: '#c0c0b0',
      type: '#707870',    operator: '#909080', punctuation: '#555555',
      tag: '#707870',     attribute: '#909080', constant: '#909080',
      builtin: '#909080', parameter: '#707870',
    },
    {
      black: '#000000',        red: '#707870',    green: '#909080', yellow: '#909080',
      blue: '#708090',         magenta: '#707870', cyan: '#709080',  white: '#c0c0b0',
      brightBlack: '#3a3a3a',  brightRed: '#808870',    brightGreen: '#a0a090',
      brightYellow: '#a0a090', brightBlue: '#8090a0',   brightMagenta: '#808870',
      brightCyan: '#809090',   brightWhite: '#d4d4c4',
    }
  ),

  // ── Black Metal: Immortal ────────────────────────────────────
  preset('bm-immortal', 'BM: Immortal', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b8c8d8', cursor: '#b8c8d8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b8c8d8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#6888a8', string: '#487898',
      number: '#6888a8',  function: '#6888a8', variable: '#b8c8d8',
      type: '#487898',    operator: '#6888a8', punctuation: '#505a68',
      tag: '#487898',     attribute: '#6888a8', constant: '#6888a8',
      builtin: '#6888a8', parameter: '#487898',
    },
    {
      black: '#000000',        red: '#487898',    green: '#6888a8', yellow: '#6888a8',
      blue: '#4878a8',         magenta: '#487898', cyan: '#488898',  white: '#b8c8d8',
      brightBlack: '#3a3a3a',  brightRed: '#5888a8',    brightGreen: '#7898b8',
      brightYellow: '#7898b8', brightBlue: '#5888b8',   brightMagenta: '#5888a8',
      brightCyan: '#5898a8',   brightWhite: '#ccd8e4',
    }
  ),

  // ── Black Metal: Marduk ──────────────────────────────────────
  preset('bm-marduk', 'BM: Marduk', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b8b0a0', cursor: '#b8b0a0',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b8b0a0', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#907060', string: '#706050',
      number: '#907060',  function: '#907060', variable: '#b8b0a0',
      type: '#706050',    operator: '#907060', punctuation: '#555555',
      tag: '#706050',     attribute: '#907060', constant: '#907060',
      builtin: '#907060', parameter: '#706050',
    },
    {
      black: '#000000',        red: '#706050',    green: '#907060', yellow: '#907060',
      blue: '#607080',         magenta: '#706050', cyan: '#607870',  white: '#b8b0a0',
      brightBlack: '#3a3a3a',  brightRed: '#807060',    brightGreen: '#a08070',
      brightYellow: '#a08070', brightBlue: '#708090',   brightMagenta: '#807060',
      brightCyan: '#708880',   brightWhite: '#ccc4b4',
    }
  ),

  // ── Black Metal: Venom ───────────────────────────────────────
  preset('bm-venom', 'BM: Venom', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c0c0a8', cursor: '#c0c0a8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c0c0a8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#a09060', string: '#806840',
      number: '#a09060',  function: '#a09060', variable: '#c0c0a8',
      type: '#806840',    operator: '#a09060', punctuation: '#555555',
      tag: '#806840',     attribute: '#a09060', constant: '#a09060',
      builtin: '#a09060', parameter: '#806840',
    },
    {
      black: '#000000',        red: '#806840',    green: '#a09060', yellow: '#a09060',
      blue: '#607080',         magenta: '#806840', cyan: '#608070',  white: '#c0c0a8',
      brightBlack: '#3a3a3a',  brightRed: '#907850',    brightGreen: '#b0a070',
      brightYellow: '#b0a070', brightBlue: '#708090',   brightMagenta: '#907850',
      brightCyan: '#709080',   brightWhite: '#d4d4bc',
    }
  ),

  // ── Black Metal: Windir ──────────────────────────────────────
  preset('bm-windir', 'BM: Windir', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b0c0c8', cursor: '#b0c0c8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b0c0c8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#608898', string: '#487888',
      number: '#608898',  function: '#608898', variable: '#b0c0c8',
      type: '#487888',    operator: '#608898', punctuation: '#4a5860',
      tag: '#487888',     attribute: '#608898', constant: '#608898',
      builtin: '#608898', parameter: '#487888',
    },
    {
      black: '#000000',        red: '#487888',    green: '#608898', yellow: '#608898',
      blue: '#486888',         magenta: '#487888', cyan: '#488890',  white: '#b0c0c8',
      brightBlack: '#3a3a3a',  brightRed: '#5888a0',    brightGreen: '#7098a8',
      brightYellow: '#7098a8', brightBlue: '#5878a0',   brightMagenta: '#5888a0',
      brightCyan: '#5898a0',   brightWhite: '#c4d0d8',
    }
  ),

  // ── Black Metal: Taake ───────────────────────────────────────
  preset('bm-taake', 'BM: Taake', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#bab0a0', cursor: '#bab0a0',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#bab0a0', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#8a7a6a', string: '#6a7a5a',
      number: '#8a7a6a',  function: '#8a7a6a', variable: '#bab0a0',
      type: '#6a7a5a',    operator: '#8a7a6a', punctuation: '#555555',
      tag: '#6a7a5a',     attribute: '#8a7a6a', constant: '#8a7a6a',
      builtin: '#8a7a6a', parameter: '#6a7a5a',
    },
    {
      black: '#000000',        red: '#6a7a5a',    green: '#8a7a6a', yellow: '#8a7a6a',
      blue: '#6a7a8a',         magenta: '#6a7a5a', cyan: '#6a8a7a',  white: '#bab0a0',
      brightBlack: '#3a3a3a',  brightRed: '#7a8a6a',    brightGreen: '#9a8a7a',
      brightYellow: '#9a8a7a', brightBlue: '#7a8a9a',   brightMagenta: '#7a8a6a',
      brightCyan: '#7a9a8a',   brightWhite: '#cec4b4',
    }
  ),

  // ── Black Metal: Nile ────────────────────────────────────────
  preset('bm-nile', 'BM: Nile', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c8b898', cursor: '#c8b898',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c8b898', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#a08858', string: '#806838',
      number: '#a08858',  function: '#a08858', variable: '#c8b898',
      type: '#806838',    operator: '#a08858', punctuation: '#585040',
      tag: '#806838',     attribute: '#a08858', constant: '#a08858',
      builtin: '#a08858', parameter: '#806838',
    },
    {
      black: '#000000',        red: '#806838',    green: '#a08858', yellow: '#a08858',
      blue: '#607880',         magenta: '#806838', cyan: '#608878',  white: '#c8b898',
      brightBlack: '#3a3a3a',  brightRed: '#907848',    brightGreen: '#b09868',
      brightYellow: '#b09868', brightBlue: '#708890',   brightMagenta: '#907848',
      brightCyan: '#709888',   brightWhite: '#dcc8a8',
    }
  ),

  // ── Black Metal: Khold ───────────────────────────────────────
  preset('bm-khold', 'BM: Khold', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b8b8b0', cursor: '#b8b8b0',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b8b8b0', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#888880', string: '#686860',
      number: '#888880',  function: '#888880', variable: '#b8b8b0',
      type: '#686860',    operator: '#888880', punctuation: '#555555',
      tag: '#686860',     attribute: '#888880', constant: '#888880',
      builtin: '#888880', parameter: '#686860',
    },
    {
      black: '#000000',        red: '#686860',    green: '#888880', yellow: '#888880',
      blue: '#687880',         magenta: '#686860', cyan: '#688880',  white: '#b8b8b0',
      brightBlack: '#3a3a3a',  brightRed: '#787870',    brightGreen: '#989890',
      brightYellow: '#989890', brightBlue: '#788890',   brightMagenta: '#787870',
      brightCyan: '#789890',   brightWhite: '#cccccc',
    }
  ),

  // ── Black Metal: Thyrfing ────────────────────────────────────
  preset('bm-thyrfing', 'BM: Thyrfing', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b8b4a8', cursor: '#b8b4a8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b8b4a8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#907868', string: '#706050',
      number: '#907868',  function: '#907868', variable: '#b8b4a8',
      type: '#706050',    operator: '#907868', punctuation: '#555555',
      tag: '#706050',     attribute: '#907868', constant: '#907868',
      builtin: '#907868', parameter: '#706050',
    },
    {
      black: '#000000',        red: '#706050',    green: '#907868', yellow: '#907868',
      blue: '#607880',         magenta: '#706050', cyan: '#608070',  white: '#b8b4a8',
      brightBlack: '#3a3a3a',  brightRed: '#807060',    brightGreen: '#a08878',
      brightYellow: '#a08878', brightBlue: '#708890',   brightMagenta: '#807060',
      brightCyan: '#709080',   brightWhite: '#ccc8bc',
    }
  ),

  // ── Black Metal: Impaled Nazarene ────────────────────────────
  preset('bm-impaled-nazarene', 'BM: Impaled Nazarene', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#c8b8a8', cursor: '#c8b8a8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#c8b8a8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#a07858', string: '#805838',
      number: '#a07858',  function: '#a07858', variable: '#c8b8a8',
      type: '#805838',    operator: '#a07858', punctuation: '#585040',
      tag: '#805838',     attribute: '#a07858', constant: '#a07858',
      builtin: '#a07858', parameter: '#805838',
    },
    {
      black: '#000000',        red: '#805838',    green: '#a07858', yellow: '#a07858',
      blue: '#607080',         magenta: '#805838', cyan: '#607870',  white: '#c8b8a8',
      brightBlack: '#3a3a3a',  brightRed: '#906848',    brightGreen: '#b08868',
      brightYellow: '#b08868', brightBlue: '#708090',   brightMagenta: '#906848',
      brightCyan: '#708880',   brightWhite: '#dcc8b8',
    }
  ),

  // ── Black Metal: Dark Funeral ────────────────────────────────
  preset('bm-dark-funeral', 'BM: Dark Funeral', 'metalelf0', 'dark',
    {
      background: '#000000', foreground: '#b8b8c8', cursor: '#b8b8c8',
      selection: '#1a1a1a',  lineHighlight: '#0d0d0d', lineNumber: '#3a3a3a',
      lineNumberActive: '#b8b8c8', border: '#1a1a1a', gutter: '#000000',
    },
    {
      comment: '#3a3a3a', keyword: '#7878a8', string: '#5858a0',
      number: '#7878a8',  function: '#7878a8', variable: '#b8b8c8',
      type: '#5858a0',    operator: '#7878a8', punctuation: '#505068',
      tag: '#5858a0',     attribute: '#7878a8', constant: '#7878a8',
      builtin: '#7878a8', parameter: '#5858a0',
    },
    {
      black: '#000000',        red: '#5858a0',    green: '#7878a8', yellow: '#7878a8',
      blue: '#5868a8',         magenta: '#5858a0', cyan: '#5878a8',  white: '#b8b8c8',
      brightBlack: '#3a3a3a',  brightRed: '#6868b0',    brightGreen: '#8888b8',
      brightYellow: '#8888b8', brightBlue: '#6878b8',   brightMagenta: '#6868b0',
      brightCyan: '#6888b8',   brightWhite: '#ccccd8',
    }
  ),
]
