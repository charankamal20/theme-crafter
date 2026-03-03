
import type { UnifiedTheme } from '@/lib/theme'

const ANSI_LABELS = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
] as const

export default function TerminalPreview({ theme }: { theme: UnifiedTheme }) {
  const { editor: e, terminal: t, syntax: s } = theme

  const ansi = (name: typeof ANSI_LABELS[number], bright = false) =>
    t[bright ? (`bright${name.charAt(0).toUpperCase()}${name.slice(1)}` as keyof typeof t)
             : (name as keyof typeof t)] as string

  return (
    <div
      className="rounded-xl overflow-hidden border font-mono text-xs flex flex-col h-full"
      style={{ borderColor: e.border }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ backgroundColor: e.lineHighlight }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs ml-1" style={{ color: e.lineNumber }}>
          bash — 120×36
        </span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 overflow-auto p-4 flex flex-col gap-3
                      [scrollbar-width:thin] [scrollbar-color:#313244_transparent]"
        style={{ backgroundColor: e.background }}>

        {/* ANSI color palette display */}
        <div>
          <div className="mb-2 text-[10px]" style={{ color: e.lineNumber }}>
            # ANSI color palette
          </div>
          <div className="flex gap-2 flex-wrap">
            {ANSI_LABELS.map((name) => (
              <div key={name} className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: ansi(name) }}
                    title={name} />
                  <div className="w-6 h-6 rounded ring-1 ring-white/10"
                    style={{ backgroundColor: ansi(name, true) }}
                    title={`bright${name}`} />
                </div>
                <span className="text-[8px] text-center" style={{ color: e.lineNumber }}>
                  {name.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${e.border}` }} />

        {/* Simulated git status */}
        <div className="leading-relaxed space-y-0.5">
          <div>
            <span style={{ color: ansi('green') }}>❯ </span>
            <span style={{ color: e.foreground }}>git status</span>
          </div>
          <div style={{ color: e.foreground }}>On branch <span style={{ color: ansi('cyan') }}>main</span></div>
          <div style={{ color: e.foreground }}>Your branch is ahead of <span style={{ color: ansi('red') }}>origin/main</span> by <span style={{ color: ansi('yellow') }}>3</span> commits.</div>
          <div className="mt-1" style={{ color: e.foreground }}>Changes to be committed:</div>
          <div className="pl-4" style={{ color: ansi('green') }}>new file:   src/components/PreviewPane.tsx</div>
          <div className="pl-4" style={{ color: ansi('green') }}>modified:   src/lib/theme.ts</div>
          <div className="mt-1" style={{ color: e.foreground }}>Changes not staged for commit:</div>
          <div className="pl-4" style={{ color: ansi('red') }}>modified:   src/components/ThemeEditor.tsx</div>
          <div className="pl-4" style={{ color: ansi('red') }}>deleted:    src/components/OldPreview.tsx</div>
          <div className="mt-1" style={{ color: e.lineNumber }}>Untracked files:</div>
          <div className="pl-4" style={{ color: e.lineNumber }}>src/components/previews/</div>
        </div>

        <div style={{ borderTop: `1px solid ${e.border}` }} />

        {/* Simulated ls --color */}
        <div className="leading-relaxed space-y-0.5">
          <div>
            <span style={{ color: ansi('green') }}>❯ </span>
            <span style={{ color: e.foreground }}>ls -la src/</span>
          </div>
          <div style={{ color: e.lineNumber }}>total 48</div>
          {[
            { perm: 'drwxr-xr-x', name: 'app/',        color: ansi('blue', true) },
            { perm: 'drwxr-xr-x', name: 'components/', color: ansi('blue', true) },
            { perm: 'drwxr-xr-x', name: 'lib/',        color: ansi('blue', true) },
            { perm: '-rw-r--r--', name: 'middleware.ts',color: e.foreground },
            { perm: '-rwxr-xr-x', name: 'setup.sh',    color: ansi('green', true) },
          ].map(({ perm, name, color }) => (
            <div key={name} className="flex gap-3">
              <span style={{ color: ansi('cyan') }}>{perm}</span>
              <span style={{ color: e.lineNumber }}>classikh staff</span>
              <span style={{ color }}>{name}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${e.border}` }} />

        {/* Simulated build output */}
        <div className="leading-relaxed space-y-0.5">
          <div>
            <span style={{ color: ansi('green') }}>❯ </span>
            <span style={{ color: e.foreground }}>npm run build</span>
          </div>
          <div style={{ color: ansi('cyan') }}>▲ Next.js 16.1.6 (Turbopack)</div>
          <div>
            <span style={{ color: ansi('green') }}>✓ </span>
            <span style={{ color: e.foreground }}>Compiled successfully in </span>
            <span style={{ color: ansi('yellow') }}>1.4s</span>
          </div>
          <div>
            <span style={{ color: ansi('green') }}>✓ </span>
            <span style={{ color: e.foreground }}>Linting and type checking passed</span>
          </div>
          <div>
            <span style={{ color: ansi('yellow') }}>⚠ </span>
            <span style={{ color: e.foreground }}>Bundle size: </span>
            <span style={{ color: ansi('yellow') }}>248 kB</span>
            <span style={{ color: e.foreground }}> (gzipped: </span>
            <span style={{ color: ansi('green') }}>84 kB</span>
            <span style={{ color: e.foreground }}>)</span>
          </div>
        </div>

        {/* Prompt */}
        <div className="flex items-center gap-1 mt-1">
          <span style={{ color: ansi('magenta') }}>~/code/theme-crafter</span>
          <span style={{ color: ansi('cyan') }}> main</span>
          <span style={{ color: ansi('yellow') }}>* </span>
          <span style={{ color: ansi('green') }}>❯</span>
          <span
            className="w-2 h-4 ml-1 animate-pulse"
            style={{ backgroundColor: e.cursor }}
          />
        </div>
      </div>
    </div>
  )
}
