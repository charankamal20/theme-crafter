import type { UnifiedTheme } from '@/lib/theme'

interface Window { id: number; name: string; active: boolean }

const WINDOWS: Window[] = [
  { id: 1, name: 'editor',  active: true  },
  { id: 2, name: 'server',  active: false },
  { id: 3, name: 'git',     active: false },
  { id: 4, name: 'logs',    active: false },
]

export default function TmuxPreview({ theme }: { theme: UnifiedTheme }) {
  const { editor: e, syntax: s, terminal: t } = theme

  // Derive tmux colors from the theme (mirrors exportTmux logic)
  const statusBg        = e.lineHighlight
  const statusFg        = e.foreground
  const activeWinBg     = s.function
  const activeWinFg     = e.background
  const inactiveWinFg   = e.lineNumber
  const paneActiveBorder = s.function
  const paneInactiveBorder = e.border
  const sessionBg       = s.keyword
  const sessionFg       = e.background

  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col h-full font-mono text-xs"
      style={{ borderColor: e.border }}
    >
      {/* Outer window chrome */}
      <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ backgroundColor: e.lineHighlight }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[10px] ml-1" style={{ color: e.lineNumber }}>Terminal — tmux</span>
      </div>

      {/* Tmux content area */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: e.background }}>

        {/* ── Top pane (main editor-like pane) ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left pane — file tree */}
          <div
            className="w-36 flex-shrink-0 p-2 flex flex-col gap-0.5 overflow-hidden"
            style={{ borderRight: `1px solid ${paneInactiveBorder}` }}
          >
            <div className="text-[9px] mb-1" style={{ color: e.lineNumber }}>EXPLORER</div>
            {[
              { indent: 0, icon: '▾', name: 'src',              color: t.blue },
              { indent: 1, icon: '▾', name: 'components',       color: t.blue },
              { indent: 2, icon: ' ', name: 'PreviewPane.tsx',   color: s.function },
              { indent: 2, icon: ' ', name: 'ThemeEditor.tsx',   color: s.function },
              { indent: 2, icon: ' ', name: 'CodePreview.tsx',   color: s.function },
              { indent: 1, icon: '▾', name: 'lib',               color: t.blue },
              { indent: 2, icon: ' ', name: 'theme.ts',          color: s.function },
              { indent: 2, icon: ' ', name: 'presets.ts',        color: s.function },
              { indent: 0, icon: ' ', name: 'package.json',      color: s.string },
              { indent: 0, icon: ' ', name: 'tsconfig.json',     color: s.string },
            ].map(({ indent, icon, name, color }) => (
              <div
                key={name}
                className="flex items-center gap-1 text-[9px] truncate"
                style={{ paddingLeft: indent * 10, color }}
              >
                <span style={{ color: e.lineNumber }}>{icon}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>

          {/* Right pane — code */}
          <div className="flex-1 p-3 overflow-hidden" style={{ borderLeft: `1px solid ${paneActiveBorder}` }}>
            <div className="text-[9px] mb-2" style={{ color: e.lineNumber }}>
              PreviewPane.tsx
            </div>
            <div className="leading-relaxed text-[9px] space-y-0.5">
              <div>
                <span style={{ color: s.keyword }}>import </span>
                <span style={{ color: s.punctuation }}>{'{ '}</span>
                <span style={{ color: s.variable }}>useState</span>
                <span style={{ color: s.punctuation }}>{' }'}</span>
                <span style={{ color: s.keyword }}> from </span>
                <span style={{ color: s.string }}>'react'</span>
              </div>
              <div className="mt-1">
                <span style={{ color: s.keyword }}>type </span>
                <span style={{ color: s.type }}>PreviewMode</span>
                <span style={{ color: s.operator }}> = </span>
                <span style={{ color: s.string }}>'code'</span>
                <span style={{ color: s.operator }}> | </span>
                <span style={{ color: s.string }}>'terminal'</span>
                <span style={{ color: s.operator }}> | </span>
                <span style={{ color: s.string }}>'tmux'</span>
              </div>
              <div className="mt-1">
                <span style={{ color: s.keyword }}>export default function </span>
                <span style={{ color: s.function }}>PreviewPane</span>
                <span style={{ color: s.punctuation }}>{'() {'}</span>
              </div>
              <div className="pl-3">
                <span style={{ color: s.keyword }}>const </span>
                <span style={{ color: s.punctuation }}>{'['}</span>
                <span style={{ color: s.variable }}>mode</span>
                <span style={{ color: s.punctuation }}>{', '}</span>
                <span style={{ color: s.variable }}>setMode</span>
                <span style={{ color: s.punctuation }}>{']'}</span>
                <span style={{ color: s.operator }}> = </span>
                <span style={{ color: s.function }}>useState</span>
                <span style={{ color: s.punctuation }}>{'<'}</span>
                <span style={{ color: s.type }}>PreviewMode</span>
                <span style={{ color: s.punctuation }}>{'>'}</span>
                <span style={{ color: s.punctuation }}>{'('}</span>
                <span style={{ color: s.string }}>'code'</span>
                <span style={{ color: s.punctuation }}>{')'}</span>
              </div>
              <div className="pl-3 mt-1">
                <span style={{ color: s.comment }}>{'// render selected preview'}</span>
              </div>
              <div>
                <span style={{ color: s.punctuation }}>{'}'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal pane split line ── */}
        <div className="h-px flex-shrink-0" style={{ backgroundColor: paneInactiveBorder }} />

        {/* ── Bottom pane — terminal output ── */}
        <div className="h-20 flex-shrink-0 p-2 overflow-hidden leading-relaxed text-[9px]">
          <div>
            <span style={{ color: t.green }}>❯ </span>
            <span style={{ color: e.foreground }}>npm run dev</span>
          </div>
          <div>
            <span style={{ color: t.cyan }}>▲ Next.js 16.1.6</span>
            <span style={{ color: e.lineNumber }}> — </span>
            <span style={{ color: t.green }}>✓ Ready in 454ms</span>
          </div>
          <div>
            <span style={{ color: e.lineNumber }}>   Local: </span>
            <span style={{ color: t.blue }}>http://localhost:3000</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span style={{ color: t.green }}>❯ </span>
            <span
              className="w-1.5 h-3 animate-pulse"
              style={{ backgroundColor: e.cursor }}
            />
          </div>
        </div>

        {/* ── Tmux status bar ── */}
        <div
          className="flex items-center flex-shrink-0 text-[9px]"
          style={{ backgroundColor: statusBg, height: 20 }}
        >
          {/* Session name */}
          <div
            className="px-3 h-full flex items-center font-bold flex-shrink-0"
            style={{ backgroundColor: sessionBg, color: sessionFg }}
          >
            ⎊ theme-crafter
          </div>

          {/* Window tabs */}
          <div className="flex items-center h-full">
            {WINDOWS.map((win) => (
              <div
                key={win.id}
                className="px-3 h-full flex items-center gap-1.5 flex-shrink-0"
                style={{
                  backgroundColor: win.active ? activeWinBg : 'transparent',
                  color: win.active ? activeWinFg : inactiveWinFg,
                }}
              >
                <span>{win.id}</span>
                <span>{win.name}</span>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto px-3 h-full flex items-center gap-3 flex-shrink-0"
            style={{ color: inactiveWinFg }}>
            <span style={{ color: t.cyan }}>⌨ main*</span>
            <span>19:30</span>
            <span>03 Mar</span>
          </div>
        </div>
      </div>
    </div>
  )
}
