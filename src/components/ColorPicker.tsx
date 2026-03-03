'use client'
interface Props { label: string; color: string; onChange: (c: string) => void }
import { memo, useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props { label: string; color: string; onChange: (c: string) => void }

const ColorPicker = memo(function ColorPicker({ label, color, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="flex items-center gap-2 group" ref={ref}>
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-6 h-6 rounded border border-white/20 hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
        />
        {open && (
          <div className="absolute left-0 top-8 z-50 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <HexColorPicker color={color} onChange={onChange} />
            <div className="bg-[#1a1a2e] p-2">
              <input
                type="text"
                value={color}
                onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) onChange(e.target.value) }}
                className="w-full bg-[#2a2a3e] text-white text-xs px-2 py-1 rounded border border-white/10 font-mono"
              />
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-gray-400 truncate flex-1">{label}</span>
      <span className="text-xs text-gray-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{color}</span>
    </div>
  )
})

export default ColorPicker
