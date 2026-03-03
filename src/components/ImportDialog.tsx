'use client'
import { useState, useRef } from 'react'
import { X, Upload } from 'lucide-react'
import type { UnifiedTheme } from '@/lib/theme'
import { importVSCodeTheme } from '@/lib/importers/vscode'
import { importNvimTheme } from '@/lib/importers/nvim'

interface Props { onImport: (t: UnifiedTheme) => void; onClose: () => void }

export default function ImportDialog({ onImport, onClose }: Props) {
  const [type, setType] = useState<'vscode' | 'nvim'>('vscode')
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    try {
      const text = await file.text()
      onImport(type === 'vscode' ? importVSCodeTheme(text) : importNvimTheme(text))
      onClose()
    } catch (e) {
      setError(`Parse error: ${(e as Error).message}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e2e] border border-white/10 rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">Import Theme</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
        </div>

        <div className="flex gap-2 mb-4">
          {(['vscode', 'nvim'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                type === t ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {t === 'vscode' ? '⚡ VS Code .json' : '🌙 Neovim .lua'}
            </button>
          ))}
        </div>

        <div
          className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-purple-500 transition-colors"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        >
          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">
            Drop {type === 'vscode' ? '.json' : '.lua'} file here, or click to browse
          </p>
          <input ref={fileRef} type="file" accept={type === 'vscode' ? '.json' : '.lua'}
            className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
        )}
      </div>
    </div>
  )
}
