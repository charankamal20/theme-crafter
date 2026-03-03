'use client'
import { useState } from 'react'
import { GitCommitHorizontal, RotateCcw, Trash2, Plus } from 'lucide-react'
import type { UnifiedTheme } from '@/lib/theme'

export interface Checkpoint {
  id: string
  name: string
  timestamp: number
  theme: UnifiedTheme
}

interface Props {
  current: UnifiedTheme
  checkpoints: Checkpoint[]
  onSave: (name: string) => void
  onRestore: (cp: Checkpoint) => void
  onDelete: (id: string) => void
}

export default function CheckpointBar({ current, checkpoints, onSave, onRestore, onDelete }: Props) {
  const [naming, setNaming] = useState(false)
  const [name, setName] = useState('')

  const handleSave = () => {
    const label = name.trim() || `checkpoint-${checkpoints.length + 1}`
    onSave(label)
    setName('')
    setNaming(false)
  }

  return (
    <div className="flex items-center gap-3 h-full px-4 overflow-x-auto">
      {/* Save button */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {naming ? (
          <div className="flex items-center gap-1.5">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setNaming(false) }}
              placeholder="checkpoint name…"
              className="bg-white/5 border border-white/20 rounded px-2 py-1 text-xs text-white w-36 outline-none focus:border-purple-500"
            />
            <button onClick={handleSave}
              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded"
            >Save</button>
            <button onClick={() => setNaming(false)}
              className="px-2 py-1 text-gray-500 hover:text-gray-300 text-xs"
            >✕</button>
          </div>
        ) : (
          <button onClick={() => setNaming(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded text-xs flex-shrink-0 border border-white/10"
          >
            <Plus className="w-3 h-3" /> Save checkpoint
          </button>
        )}
      </div>

      {/* Divider */}
      {checkpoints.length > 0 && (
        <div className="h-6 w-px bg-white/10 flex-shrink-0" />
      )}

      {/* Checkpoint list — scrollable horizontally */}
      <div className="flex items-center gap-2">
        {checkpoints.map((cp, i) => {
          const isLatest = i === checkpoints.length - 1
          return (
            <div key={cp.id}
              className="flex items-center gap-1.5 group flex-shrink-0"
            >
              {/* Connector line */}
              {i > 0 && <div className="w-5 h-px bg-white/20" />}

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <GitCommitHorizontal
                  className={`w-3.5 h-3.5 flex-shrink-0 ${isLatest ? 'text-purple-400' : 'text-gray-500'}`}
                />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-300 leading-none">{cp.name}</span>
                  <span className="text-[9px] text-gray-600 leading-none mt-0.5">
                    {new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Color dot preview */}
                <div className="flex gap-0.5 ml-1">
                  {[
                    cp.theme.editor.background,
                    cp.theme.syntax.keyword,
                    cp.theme.syntax.string,
                    cp.theme.syntax.function,
                  ].map((c, j) => (
                    <div key={j} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-0.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onRestore(cp)} title="Restore"
                    className="p-0.5 hover:text-purple-400 text-gray-500 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button onClick={() => onDelete(cp.id)} title="Delete"
                    className="p-0.5 hover:text-red-400 text-gray-500 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {checkpoints.length === 0 && (
        <span className="text-xs text-gray-600 italic">No checkpoints yet</span>
      )}
    </div>
  )
}
