'use client'
import { useState } from 'react'
import { ChevronDown, Code2, Terminal, LayoutDashboard } from 'lucide-react'
import type { UnifiedTheme } from '@/lib/theme'
import CodePreview from './CodePreview'
import TerminalPreview from './previews/TerminalPreview'
import TmuxPreview from './previews/TmuxPreview'

type PreviewMode = 'code' | 'terminal' | 'tmux'

const MODES: { id: PreviewMode; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'code',     label: 'Code',     icon: <Code2          className="w-3.5 h-3.5" />, description: 'Syntax highlighted code' },
  { id: 'terminal', label: 'Terminal', icon: <Terminal        className="w-3.5 h-3.5" />, description: 'ANSI colors & shell output' },
  { id: 'tmux',     label: 'Tmux',     icon: <LayoutDashboard className="w-3.5 h-3.5" />, description: 'Status bar & pane layout' },
]

export default function PreviewPane({ theme }: { theme: UnifiedTheme }) {
  const [mode, setMode]   = useState<PreviewMode>('code')
  const [ddOpen, setDdOpen] = useState(false)

  const current = MODES.find((m) => m.id === mode)!

  return (
    <div className="flex flex-col h-full gap-3">
      {/* ── Mode selector bar ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Preview</span>

        <div className="relative">
          <button
            onClick={() => setDdOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border border-white/10
                       bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            {current.icon}
            <span>{current.label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
          </button>

          {ddOpen && (
            <div className="absolute left-0 top-9 z-40 w-52 rounded-xl border border-white/10
                            shadow-2xl overflow-hidden bg-[#1a1a2e]">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id); setDdOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs text-left
                              transition-colors hover:bg-white/10
                              ${mode === m.id ? 'bg-white/10' : ''}`}
                >
                  <span className={mode === m.id ? 'text-purple-400' : 'text-gray-500'}>
                    {m.icon}
                  </span>
                  <div>
                    <div className={mode === m.id ? 'text-white' : 'text-gray-300'}>
                      {m.label}
                    </div>
                    <div className="text-[10px] text-gray-600">{m.description}</div>
                  </div>
                  {mode === m.id && (
                    <span className="ml-auto text-purple-400 text-[10px]">●</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mode pill indicators */}
        <div className="flex gap-1 ml-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              title={m.label}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors ${
                mode === m.id
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {m.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── Preview area ── */}
      <div className="flex-1 min-h-0">
        {mode === 'code'     && <CodePreview     theme={theme} />}
        {mode === 'terminal' && <TerminalPreview theme={theme} />}
        {mode === 'tmux'     && <TmuxPreview     theme={theme} />}
      </div>
    </div>
  )
}
