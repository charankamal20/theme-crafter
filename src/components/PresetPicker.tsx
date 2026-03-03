'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, Sparkles, Search, X } from 'lucide-react'
import { PRESETS } from '@/lib/presets'
import type { ThemePreset } from '@/lib/presets'

interface Props {
  onSelect: (preset: ThemePreset) => void
}

const GROUPS = [
  { label: '⭐ Popular',     ids: ['catppuccin-mocha','catppuccin-latte','tokyo-night','gruvbox-dark','nord','dracula','one-dark','kanagawa','rose-pine','everforest','solarized-dark','solarized-light'] },
  { label: '🎨 Extended',    ids: ['onedark-vivid','onedark-dark','vaporwave','vague','zenwritten-dark','neobones-dark','forestbones-dark','kanagawabones','tokyobones','nordbones','seoulbones-dark','oxocarbon'] },
  { label: '🐙 GitHub',      ids: ['github-dark','github-dark-dimmed','github-light','github-dark-hc','github-light-hc'] },
  { label: '🩶 Lackluster',  ids: ['lackluster','lackluster-hack','lackluster-night'] },
  { label: '🤘 Black Metal', ids: ['bm-bathory','bm-bathory-alt','bm-burzum','bm-gorgoroth','bm-gorgoroth-alt','bm-darkthrone','bm-emperor','bm-mayhem','bm-immortal','bm-marduk','bm-venom','bm-windir','bm-taake','bm-nile','bm-khold','bm-thyrfing','bm-impaled-nazarene','bm-dark-funeral'] },
]

// Stable dot colors per preset — index-based key avoids duplicate-color key collisions
function PresetDots({ preset }: { preset: ThemePreset }) {
  const colors = [
    preset.theme.editor.background,
    preset.theme.syntax.keyword,
    preset.theme.syntax.string,
    preset.theme.syntax.function,
    preset.theme.syntax.type,
  ]
  return (
    <div className="flex gap-1 flex-shrink-0">
      {colors.map((c, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="w-2.5 h-2.5 rounded-full ring-1 ring-white/10 flex-shrink-0"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  )
}

function MiniPreview({ preset }: { preset: ThemePreset }) {
  const t = preset.theme
  const termColors = Object.values(t.terminal).slice(0, 8)
  return (
    <div
      className="w-48 p-3 border-l border-white/10 flex flex-col gap-2 flex-shrink-0"
      style={{ backgroundColor: t.editor.background }}
    >
      <p className="text-[10px] font-semibold truncate" style={{ color: t.editor.foreground }}>
        {t.name}
      </p>

      {/* Simulated code */}
      <div className="font-mono text-[9px] leading-loose">
        <div>
          <span style={{ color: t.syntax.keyword }}>function </span>
          <span style={{ color: t.syntax.function }}>greet</span>
          <span style={{ color: t.syntax.punctuation }}>(</span>
          <span style={{ color: t.syntax.parameter }}>name</span>
          <span style={{ color: t.syntax.punctuation }}>) {'{'}</span>
        </div>
        <div className="pl-3">
          <span style={{ color: t.syntax.keyword }}>return </span>
          <span style={{ color: t.syntax.string }}>`Hello </span>
          <span style={{ color: t.syntax.keyword }}>{'${'}</span>
          <span style={{ color: t.syntax.variable }}>name</span>
          <span style={{ color: t.syntax.keyword }}>{'}'}</span>
          <span style={{ color: t.syntax.string }}>`</span>
        </div>
        <div>
          <span style={{ color: t.syntax.punctuation }}>{'}'}</span>
        </div>
        <div className="mt-0.5">
          <span style={{ color: t.syntax.comment }}>{'// '}{t.type} theme</span>
        </div>
      </div>

      {/* Terminal swatches — index key, colors can repeat */}
      <div className="flex gap-1 mt-auto flex-wrap">
        {termColors.map((c, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="w-4 h-4 rounded-sm ring-1 ring-white/10" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* Editor bg / fg preview strip */}
      <div className="flex gap-1 items-center text-[8px]" style={{ color: t.editor.lineNumber }}>
        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: t.editor.selection }} />
        <span>sel</span>
        <div className="w-2 h-2 rounded-sm ml-1" style={{ backgroundColor: t.editor.cursor }} />
        <span>cur</span>
      </div>
    </div>
  )
}

export default function PresetPicker({ onSelect }: Props) {
  const [open, setOpen]       = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [query, setQuery]     = useState('')
  const searchRef             = useRef<HTMLInputElement>(null)
  const ref                   = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search when opening
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
  }, [open])

  const hoveredPreset = PRESETS.find((p) => p.id === hovered)

  // Filtered + grouped results
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return null  // null = show groups, string = show flat results
    return PRESETS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.type.includes(q)
    )
  }, [query])

  const handleSelect = (preset: ThemePreset) => {
    onSelect(preset)
    setOpen(false)
    setQuery('')
  }

  const PresetRow = ({ preset }: { preset: ThemePreset }) => (
    <button
      key={preset.id}
      onClick={() => handleSelect(preset)}
      onMouseEnter={() => setHovered(preset.id)}
      onMouseLeave={() => setHovered(null)}
      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left
                  transition-colors hover:bg-white/10
                  ${hovered === preset.id ? 'bg-white/10' : ''}`}
    >
      <PresetDots preset={preset} />
      <div className="flex-1 min-w-0">
        <div className="text-gray-200 truncate">{preset.name}</div>
        <div className="text-gray-600 text-[10px] truncate">by {preset.author}</div>
      </div>
      <span className={`text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${
        preset.type === 'dark'
          ? 'bg-white/5 text-gray-500'
          : 'bg-yellow-500/20 text-yellow-400'
      }`}>
        {preset.type}
      </span>
    </button>
  )

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded
                   bg-white/5 hover:bg-white/10 border border-white/10
                   text-gray-300 hover:text-white transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        Presets
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-9 z-50 flex rounded-xl border border-white/10 shadow-2xl"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          {/* Left: list */}
          <div className="flex flex-col w-64">
            {/* Search bar */}
            <div className="p-2 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5
                              border border-white/10 focus-within:border-purple-500 transition-colors">
                <Search className="w-3 h-3 text-gray-500 flex-shrink-0" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && (query ? setQuery('') : setOpen(false))}
                  placeholder="Search themes…"
                  className="flex-1 bg-transparent text-xs text-gray-300 placeholder-gray-600
                             outline-none min-w-0"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-gray-600 hover:text-gray-400">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div
              className="overflow-y-auto
                         [scrollbar-width:thin] [scrollbar-color:#313244_transparent]"
              style={{ maxHeight: '22rem' }}
            >
              {/* Flat search results */}
              {filtered !== null && (
                filtered.length > 0
                  ? filtered.map((p) => <PresetRow key={p.id} preset={p} />)
                  : (
                    <div className="px-4 py-6 text-center text-xs text-gray-600 italic">
                      No themes match "{query}"
                    </div>
                  )
              )}

              {/* Grouped list (no search query) */}
              {filtered === null && GROUPS.map((group) => {
                const groupPresets = group.ids
                  .map((id) => PRESETS.find((p) => p.id === id))
                  .filter(Boolean) as ThemePreset[]
                if (groupPresets.length === 0) return null
                return (
                  <div key={group.label}>
                    {/* Group header — NOT sticky (causes overflow-y-auto issues) */}
                    <div className="px-3 pt-3 pb-1 text-[9px] text-gray-600
                                    font-bold tracking-widest uppercase">
                      {group.label}
                    </div>
                    {groupPresets.map((p) => <PresetRow key={p.id} preset={p} />)}
                  </div>
                )
              })}
            </div>

            {/* Footer count */}
            <div className="px-3 py-1.5 border-t border-white/5 flex-shrink-0">
              <span className="text-[9px] text-gray-700">
                {filtered !== null
                  ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`
                  : `${PRESETS.length} themes`
                }
              </span>
            </div>
          </div>

          {/* Right: mini preview */}
          {hoveredPreset && <MiniPreview preset={hoveredPreset} />}
        </div>
      )}
    </div>
  )
}
