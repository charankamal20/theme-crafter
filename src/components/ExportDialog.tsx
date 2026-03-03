
'use client'
import { useState } from 'react'
import { Star, Github, Twitter } from 'lucide-react'
import { X, Download, Copy, Check } from 'lucide-react'
import type { UnifiedTheme } from '@/lib/theme'
import { exportVSCode } from '@/lib/exporters/vscode'
import { exportNvim } from '@/lib/exporters/nvim'
import { exportTmux } from '@/lib/exporters/tmux'
import { exportAlacritty, exportKitty, exportWezTerm, exportGhostty } from '@/lib/exporters/terminal'

type Target = 'nvim' | 'vscode' | 'tmux' | 'alacritty' | 'kitty' | 'wezterm' | 'ghostty'

const TARGETS: { id: Target; label: string; icon: string; ext: string }[] = [
  { id: 'nvim', label: 'Neovim', icon: '🌙', ext: 'lua' },
  { id: 'vscode', label: 'VS Code', icon: '⚡', ext: 'json' },
  { id: 'tmux', label: 'tmux', icon: '🖥️', ext: 'conf' },
  { id: 'alacritty', label: 'Alacritty', icon: '🚀', ext: 'toml' },
  { id: 'kitty', label: 'Kitty', icon: '🐱', ext: 'conf' },
  { id: 'wezterm', label: 'WezTerm', icon: '🌊', ext: 'toml' },
  { id: 'ghostty', label: 'Ghostty', icon: '👻', ext: 'conf' },
]

function generate(target: Target, theme: UnifiedTheme): string {
  switch (target) {
    case 'nvim': return exportNvim(theme)
    case 'vscode': return exportVSCode(theme)
    case 'tmux': return exportTmux(theme)
    case 'alacritty': return exportAlacritty(theme)
    case 'kitty': return exportKitty(theme)
    case 'wezterm': return exportWezTerm(theme)
    case 'ghostty': return exportGhostty(theme)
  }
}

export default function ExportDialog({ theme, onClose }: { theme: UnifiedTheme; onClose: () => void }) {
  const [active, setActive] = useState<Target>('nvim')
  const [copied, setCopied] = useState(false)

  const slug = theme.name.toLowerCase().replace(/\s+/g, '_')
  const target = TARGETS.find((t) => t.id === active)!
  const content = generate(active, theme)
  const filename = active === 'tmux' ? `tmux-${slug}.conf` : `${slug}.${target.ext}`

  const download = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
    a.download = filename
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" >
      <div className="bg-[#1e1e2e] border border-white/10 rounded-xl w-full max-w-2xl p-6" >
        <div className="flex items-center justify-between mb-5" >
          <h2 className="text-base font-semibold text-white" > Export Theme </h2>
          < button onClick={onClose} > <X className="w-5 h-5 text-gray-400 hover:text-white" /> </button>
        </div>

        < div className="grid grid-cols-3 gap-2 mb-4" >
          {
            TARGETS.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={`py-2 px-3 rounded-lg text-sm flex items-center gap-2 transition-colors ${active === t.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`
                }
              >
                <span>{t.icon} </span><span>{t.label}</span >
              </button>
            ))}
        </div>

        < pre className="bg-[#12121e] border border-white/10 rounded-lg p-4 text-xs text-gray-300 max-h-64 overflow-auto font-mono" >
          {content}
        </pre>

        < div className="flex gap-2 mt-4" >
          <button onClick={copy}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          < button onClick={download}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm ml-auto"
          >
            <Download className="w-4 h-4" />
            {filename}
          </button>
        </div>
        {/* ── Social CTA ─────────────────────────────────────── */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500 mb-3 text-center">
            Enjoying ThemeCrafter? Give a star ⭐ 
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <a
              href="https://github.com/charankamal20/theme-crafter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                 bg-white/5 hover:bg-white/10 border border-white/10
                 text-gray-300 hover:text-white transition-colors group"
            >
              <Star className="w-3.5 h-3.5 text-yellow-400 group-hover:fill-yellow-400 transition-all" />
              Star on GitHub
            </a>
            <a
              href="https://github.com/charankamal20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                 bg-white/5 hover:bg-white/10 border border-white/10
                 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Follow @charankamal20
            </a>
            <a
              href="https://x.com/charandoesitall"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                 bg-white/5 hover:bg-white/10 border border-white/10
                 text-gray-300 hover:text-white transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              Follow on X
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
