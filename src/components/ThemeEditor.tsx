'use client'
import { useState, useCallback, useEffect, useReducer } from 'react'
import { Palette, Upload, Download, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import type { UnifiedTheme } from '@/lib/theme';
import { DEFAULT_THEME } from '@/lib/theme'
import ColorSection from './ColorSection'
import CodePreview from './CodePreview'
import ImportDialog from './ImportDialog'
import ExportDialog from './ExportDialog'
import type { Checkpoint } from './CheckpointBar';
import CheckpointBar from './CheckpointBar'
import ResizeHandle from './ResizeHandle'

type BottomTab = 'palette' | 'checkpoints'

const STORAGE_KEY = 'themecrafter_checkpoints'
const SIZES_KEY = 'themecrafter_sizes'

// Clamp helper
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

type ThemeAction =
  | { type: 'SET'; theme: UnifiedTheme }
  | { type: 'UPDATE'; section: 'editor' | 'syntax' | 'terminal'; key: string; value: string }
  | { type: 'RESET' }

function themeReducer(state: UnifiedTheme, action: ThemeAction): UnifiedTheme {
  switch (action.type) {
    case 'SET': return action.theme
    case 'RESET': return DEFAULT_THEME
    case 'UPDATE': return {
      ...state,
      [action.section]: { ...state[action.section], [action.key]: action.value },
    }
  }
}

interface PaneSizes {
  sidebarW: number   // px
  bottomH: number    // px
}

const DEFAULT_SIZES: PaneSizes = { sidebarW: 256, bottomH: 160 }

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback }
  catch { return fallback }
}

function saveCheckpoints(cps: Checkpoint[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cps))
}

export default function ThemeEditor() {
  const [theme, dispatch] = useReducer(themeReducer, DEFAULT_THEME)
  const [showImport, setShowImport] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [bottomTab, setBottomTab] = useState<BottomTab>('palette')
  const [bottomOpen, setBottomOpen] = useState(true)
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])
  const [sizes, setSizes] = useState<PaneSizes>(DEFAULT_SIZES)

  useEffect(() => {
    setCheckpoints(loadJSON(STORAGE_KEY, []))
    setSizes(loadJSON(SIZES_KEY, DEFAULT_SIZES))
  }, [])

  // Persist sizes on change
  useEffect(() => {
    localStorage.setItem(SIZES_KEY, JSON.stringify(sizes))
  }, [sizes])

  const update = useCallback(
    (section: 'editor' | 'syntax' | 'terminal', key: string, value: string) =>
      dispatch({ type: 'UPDATE', section, key, value }),
    []
  )

  const handleSaveCheckpoint = (name: string) => {
    const cp: Checkpoint = {
      id: crypto.randomUUID(),
      name,
      timestamp: Date.now(),
      theme: structuredClone(theme),
    }
    const updated = [...checkpoints, cp]
    setCheckpoints(updated)
    saveCheckpoints(updated)
    setBottomTab('checkpoints')
    setBottomOpen(true)
  }

  const handleRestoreCheckpoint = (cp: Checkpoint) => dispatch({ type: 'SET', theme: structuredClone(cp.theme) })

  const handleDeleteCheckpoint = (id: string) => {
    const updated = checkpoints.filter((c) => c.id !== id)
    setCheckpoints(updated)
    saveCheckpoints(updated)
  }

  // Resize handlers
  const resizeSidebar = useCallback((delta: number) => {
    setSizes((s) => ({ ...s, sidebarW: clamp(s.sidebarW + delta, 180, 520) }))
  }, [])

  const resizeBottom = useCallback((delta: number) => {
    setSizes((s) => ({ ...s, bottomH: clamp(s.bottomH - delta, 80, 420) }))
  }, [])

  const BOTTOM_TAB_BAR_H = 36 // px — height of the tab bar row

  return (
    <div className="h-screen flex flex-col bg-[#12121e] text-white overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="flex-shrink-0 border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
        <Palette className="w-4 h-4 text-purple-400 flex-shrink-0" />
        <span className="font-bold text-sm flex-shrink-0">ThemeCrafter</span>

        <input
          value={theme.name}
          onChange={(e) => dispatch({ type: 'SET', theme: { ...theme, name: e.target.value } })}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-gray-300 w-44 outline-none focus:border-purple-500"
          placeholder="Theme name"
        />

        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
          {(['dark', 'light'] as const).map((t) => (
            <button key={t} onClick={() => dispatch({ type: 'SET', theme: { ...theme, type: t } })}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${theme.type === t ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
            >{t}</button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => handleSaveCheckpoint(`v${checkpoints.length + 1}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white rounded hover:bg-white/5 border border-white/10"
          >
            💾 Checkpoint
          </button>
          <button onClick={() => dispatch({ type: 'RESET' })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded hover:bg-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded text-sm border border-white/10"
          >
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
          <button onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </header>

      {/* ── Middle row (sidebar + resize + preview) ─────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left sidebar */}
        <aside
          className="flex-shrink-0 border-r border-white/10
             flex flex-col min-h-0 overflow-hidden"
          style={{ width: sizes.sidebarW }}
        >
          <div
            className="flex-1 min-h-0 overflow-y-auto
               p-3 flex flex-col gap-3
               [scrollbar-width:thin]
               [scrollbar-color:#313244_transparent]"
          >
            <ColorSection
              title="Editor UI"
              colors={theme.editor}
              onChange={(k, v) => update('editor', k, v)}
            />
            <ColorSection
              title="Syntax Tokens"
              colors={theme.syntax}
              onChange={(k, v) => update('syntax', k, v)}
            />
            <ColorSection
              title="Terminal (ANSI)"
              colors={theme.terminal}
              onChange={(k, v) => update('terminal', k, v)}
              defaultOpen={false}
            />
            <div className="h-4 flex-shrink-0" />
          </div>
        </aside>

        {/* Horizontal resize handle */}
        <ResizeHandle direction="horizontal" onResize={resizeSidebar} />

        {/* Code preview */}
        <main className="flex-1 min-w-0 overflow-auto p-5">
          <CodePreview theme={theme} />
        </main>
      </div>

      {/* ── Vertical resize handle (above bottom pane) ──────────── */}
      {bottomOpen && (
        <ResizeHandle direction="vertical" onResize={resizeBottom} />
      )}

      {/* ── Bottom pane ─────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 border-t border-white/10 bg-[#0f0f1a] flex flex-col transition-none"
        style={{ height: bottomOpen ? sizes.bottomH : BOTTOM_TAB_BAR_H }}
      >
        {/* Tab bar */}
        <div
          className="flex items-center gap-1 px-3 border-b border-white/10 flex-shrink-0"
          style={{ height: BOTTOM_TAB_BAR_H }}
        >
          {(['palette', 'checkpoints'] as BottomTab[]).map((t) => (
            <button key={t}
              onClick={() => { setBottomTab(t); setBottomOpen(true) }}
              className={`px-3 py-1 text-xs rounded transition-colors ${bottomTab === t && bottomOpen
                ? 'bg-white/10 text-white'
                : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              {t === 'palette'
                ? '🎨 Palette'
                : `⚡ Checkpoints${checkpoints.length > 0 ? ` (${checkpoints.length})` : ''}`
              }
            </button>
          ))}
          <button
            onClick={() => setBottomOpen((o) => !o)}
            className="ml-auto text-gray-500 hover:text-gray-300 p-1 rounded"
            title={bottomOpen ? 'Collapse' : 'Expand'}
          >
            {bottomOpen
              ? <ChevronDown className="w-3.5 h-3.5" />
              : <ChevronUp className="w-3.5 h-3.5" />
            }
          </button>
        </div>

        {/* Pane content */}
        {bottomOpen && (
          <div className="flex-1 min-h-0 overflow-hidden">
            {bottomTab === 'palette' && (
              <div className="h-full flex items-center px-4 gap-2 overflow-x-auto
                              [scrollbar-width:thin] [scrollbar-color:#313244_transparent]">
                {Object.entries(theme.terminal).map(([key, color]) => (
                  <div key={key} className="flex flex-col items-center gap-1.5 flex-shrink-0 group" title={key}>
                    <div
                      className="w-9 h-9 rounded-lg border border-white/10 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[9px] text-gray-600 text-center leading-none w-10 truncate">
                      {key.replace('bright', 'hi-')}
                    </span>
                    <span className="text-[8px] font-mono text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {bottomTab === 'checkpoints' && (
              <div className="h-full overflow-hidden">
                <CheckpointBar
                  current={theme}
                  checkpoints={checkpoints}
                  onSave={handleSaveCheckpoint}
                  onRestore={handleRestoreCheckpoint}
                  onDelete={handleDeleteCheckpoint}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Dialogs ─────────────────────────────────────────────── */}
      {showImport && (
        <ImportDialog
          onImport={(t) => { dispatch({ type: 'SET', theme: t }); setShowImport(false) }}
          onClose={() => setShowImport(false)}
        />
      )}
      {showExport && (
        <ExportDialog theme={theme} onClose={() => setShowExport(false)} />
      )}
    </div>
  )
}
