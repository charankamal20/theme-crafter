'use client'
import { memo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ColorPicker from './ColorPicker'

interface Props {
  title: string
  colors: Record<string, string>
  onChange: (key: string, value: string) => void
  defaultOpen?: boolean
}

const ColorSection = memo(function ColorSection({ title, colors, onChange, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const count = Object.keys(colors).length

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5
                   bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-200">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-600">{count}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200
                        ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Scrollable content — capped height so the sidebar can scroll */}
      {open && (
        <div
          className="overflow-y-auto
                     [scrollbar-width:thin]
                     [scrollbar-color:#313244_transparent]"
          style={{ maxHeight: '260px' }}
        >
          <div className="p-3 flex flex-col gap-2.5">
            {Object.entries(colors).map(([key, value]) => (
              <ColorPicker
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                value={value}
                onChange={(v) => onChange(key, v)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

export default ColorSection
