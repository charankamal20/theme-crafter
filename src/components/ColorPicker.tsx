'use client'
import {
  useState, useEffect, useRef, useCallback,
  type PointerEvent as PE,
} from 'react'
import { createPortal } from 'react-dom'
import { Check, Copy, Pipette, RotateCcw, Pencil } from 'lucide-react'
import {
  hexToHsv, hsvToHex, hsvToRgb, rgbToHex,
  type HSV,
} from '@/lib/color'

// ─── Default swatches ────────────────────────────────────────────────────────
const DEFAULT_SWATCHES = [
  '#ff6b6b','#ff922b','#ffd43b','#69db7c','#38d9a9','#4dabf7','#748ffc',
  '#da77f2','#f783ac','#ff8787','#ffffff','#e9ecef','#adb5bd','#6c757d',
  '#495057','#343a40','#212529','#000000','#ff79c6','#bd93f9','#50fa7b',
  '#f1fa8c','#8be9fd','#ffb86c','#ff5555','#cba6f7','#a6e3a1','#f38ba8',
  '#89b4fa','#fab387','#c0caf5','#7aa2f7','#9ece6a','#e0af68','#f7768e',
  '#2ac3de','#bb9af7','#73daca','#ff9e64','#0db9d7',
]
const SWATCHES_KEY = 'tc-custom-swatches'

function loadSwatches(): string[] {
  if (typeof window === 'undefined') return DEFAULT_SWATCHES
  try {
    const stored = localStorage.getItem(SWATCHES_KEY)
    if (stored) return JSON.parse(stored) as string[]
  } catch { /* ignore */ }
  return DEFAULT_SWATCHES
}

function saveSwatches(swatches: string[]) {
  localStorage.setItem(SWATCHES_KEY, JSON.stringify(swatches))
}

// ─── Single editable swatch ───────────────────────────────────────────────────
function Swatch({
  color, active, onApply, onEdit,
}: {
  color: string
  active: boolean
  onApply: () => void
  onEdit:  (newColor: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative group w-5 h-5">
      {/* Apply on click */}
      <button
        onClick={onApply}
        className={`w-full h-full rounded-md border transition-transform
                    hover:scale-110 hover:z-10 relative
                    ${active ? 'border-white scale-110 z-10' : 'border-white/10'}`}
        style={{ backgroundColor: color }}
        title={color}
      />

      {/* Edit pencil — appears on hover */}
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full
                   bg-[#1a1b26] border border-white/20 items-center justify-center
                   hidden group-hover:flex z-20 hover:border-purple-400
                   transition-colors"
        title="Edit swatch"
      >
        <Pencil className="w-2 h-2 text-gray-400" />
      </button>

      {/* Hidden native color input */}
      <input
        ref={inputRef}
        type="color"
        defaultValue={color}
        onChange={(e) => onEdit(e.target.value)}
        className="sr-only"
      />
    </div>
  )
}

// ─── SVCanvas ────────────────────────────────────────────────────────────────
function SVCanvas({ hsv, onChange }: { hsv: HSV; onChange: (s: number, v: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  const toSV = useCallback((e: { clientX: number; clientY: number }) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    onChange(
      Math.max(0, Math.min(1, (e.clientX - rect.left)  / rect.width)),
      Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height)),
    )
  }, [onChange])

  const onPD = (e: PE<HTMLDivElement>) => { e.currentTarget.setPointerCapture(e.pointerId); toSV(e) }
  const onPM = (e: PE<HTMLDivElement>) => { if (e.buttons !== 1) return; toSV(e) }

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg cursor-crosshair select-none"
      style={{
        height: 160,
        background: `linear-gradient(to bottom, transparent, #000),
                     linear-gradient(to right, #fff, ${hsvToHex({ h: hsv.h, s: 1, v: 1 })})`,
      }}
      onPointerDown={onPD}
      onPointerMove={onPM}
    >
      <div
        className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none
                   -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${hsv.s * 100}%`,
          top:  `${(1 - hsv.v) * 100}%`,
          backgroundColor: hsvToHex(hsv),
          boxShadow: '0 0 0 1.5px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  )
}

// ─── Slider ───────────────────────────────────────────────────────────────────
function Slider({
  value, min = 0, max = 1, gradient, thumbColor, label, displayValue, onChange,
}: {
  value: number; min?: number; max?: number
  gradient: string; thumbColor: string
  label: string; displayValue: string
  onChange: (v: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const calc = (e: { clientX: number }) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    onChange(min + Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * (max - min))
  }

  const onPD = (e: PE<HTMLDivElement>) => { e.currentTarget.setPointerCapture(e.pointerId); calc(e) }
  const onPM = (e: PE<HTMLDivElement>) => { if (e.buttons !== 1) return; calc(e) }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-gray-600 w-5 flex-shrink-0 text-right">{label}</span>
      <div
        ref={ref}
        className="relative flex-1 h-3 rounded-full cursor-pointer select-none"
        style={{ background: gradient }}
        onPointerDown={onPD}
        onPointerMove={onPM}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full
                     border-2 border-white pointer-events-none"
          style={{
            left: `${((value - min) / (max - min)) * 100}%`,
            backgroundColor: thumbColor,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.4)',
          }}
        />
      </div>
      <span className="text-[9px] text-gray-500 w-7 flex-shrink-0">{displayValue}</span>
    </div>
  )
}

// ─── Main ColorPicker ─────────────────────────────────────────────────────────
interface Props {
  value: string
  label?: string
  onChange: (hex: string) => void
}

export default function ColorPicker({ value, label, onChange }: Props) {
  const [open, setOpen]           = useState(false)
  const [hsv, setHsv]             = useState<HSV>(() => hexToHsv(value))
  const [hexInput, setHexInput]   = useState(value)
  const [copied, setCopied]       = useState(false)
  const [pos, setPos]             = useState({ top: 0, left: 0 })
  const [swatches, setSwatches]   = useState<string[]>(DEFAULT_SWATCHES)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Load custom swatches from localStorage on mount
  useEffect(() => { setSwatches(loadSwatches()) }, [])

  useEffect(() => { setHsv(hexToHsv(value)); setHexInput(value) }, [value])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const computePos = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return
    const W = 256, H = 540
    const top  = window.innerHeight - rect.bottom - 8 >= H
      ? rect.bottom + 6
      : Math.max(8, rect.top - H - 6)
    const left = window.innerWidth - rect.left - 8 >= W
      ? rect.left
      : Math.max(8, rect.right - W)
    setPos({ top, left })
  }, [])

  useEffect(() => {
    if (!open) return
    computePos()
    window.addEventListener('resize', computePos)
    window.addEventListener('scroll', computePos, true)
    return () => {
      window.removeEventListener('resize', computePos)
      window.removeEventListener('scroll', computePos, true)
    }
  }, [open, computePos])

  const commit = useCallback((newHsv: HSV) => {
    setHsv(newHsv)
    const hex = hsvToHex(newHsv)
    setHexInput(hex)
    onChange(hex)
  }, [onChange])

  const handleHexInput = (raw: string) => {
    setHexInput(raw)
    const clean = raw.startsWith('#') ? raw : `#${raw}`
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) { setHsv(hexToHsv(clean)); onChange(clean) }
  }

  // Apply a swatch as the current color
  const applySwatchColor = (hex: string) => {
    setHsv(hexToHsv(hex)); setHexInput(hex); onChange(hex)
  }

  // Edit a swatch in the palette itself
  const editSwatch = (index: number, newHex: string) => {
    const next = [...swatches]
    next[index] = newHex
    setSwatches(next)
    saveSwatches(next)
  }

  const resetSwatches = () => { setSwatches(DEFAULT_SWATCHES); saveSwatches(DEFAULT_SWATCHES) }

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const rgb     = hsvToRgb(hsv)
  const hueGrad = 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)'
  const satGrad = `linear-gradient(to right,${hsvToHex({ ...hsv, s: 0 })},${hsvToHex({ ...hsv, s: 1 })})`
  const valGrad = `linear-gradient(to right,#000,${hsvToHex({ ...hsv, v: 1 })})`

  const popover = open && typeof window !== 'undefined' && createPortal(
    <div
      ref={popoverRef}
      className="fixed z-[9999] w-64 rounded-xl border border-white/10
                 shadow-2xl flex flex-col gap-3 p-3"
      style={{ top: pos.top, left: pos.left, backgroundColor: '#1a1b26' }}
    >
      <SVCanvas hsv={hsv} onChange={(s, v) => commit({ ...hsv, s, v })} />

      <div className="flex flex-col gap-2.5 px-0.5">
        <Slider label="H" value={hsv.h} min={0} max={360}
          gradient={hueGrad} thumbColor={hsvToHex({ ...hsv, s: 1, v: 1 })}
          displayValue={`${Math.round(hsv.h)}°`} onChange={(h) => commit({ ...hsv, h })} />
        <Slider label="S" value={hsv.s}
          gradient={satGrad} thumbColor={hsvToHex(hsv)}
          displayValue={`${Math.round(hsv.s * 100)}%`} onChange={(s) => commit({ ...hsv, s })} />
        <Slider label="V" value={hsv.v}
          gradient={valGrad} thumbColor={hsvToHex(hsv)}
          displayValue={`${Math.round(hsv.v * 100)}%`} onChange={(v) => commit({ ...hsv, v })} />
      </div>

      {/* Preview + hex */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg border border-white/20 flex-shrink-0"
          style={{ backgroundColor: value }} />
        <div className="flex-1 flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1.5
                        border border-white/10 focus-within:border-purple-500 transition-colors">
          <input value={hexInput} onChange={(e) => handleHexInput(e.target.value)}
            className="flex-1 bg-transparent text-xs text-gray-300 font-mono
                       outline-none min-w-0 uppercase"
            maxLength={7} spellCheck={false} />
          <button onClick={copy}
            className="text-gray-600 hover:text-gray-300 transition-colors flex-shrink-0">
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* RGB */}
      <div className="grid grid-cols-3 gap-1.5">
        {(['R','G','B'] as const).map((ch, i) => {
          const v = [rgb.r, rgb.g, rgb.b][i]
          return (
            <div key={ch} className="flex flex-col items-center gap-0.5 bg-white/5
                                     rounded-lg py-1 border border-white/5">
              <span className="text-[8px] text-gray-600">{ch}</span>
              <input type="number" min={0} max={255} value={v}
                onChange={(e) => {
                  const num  = Math.max(0, Math.min(255, Number(e.target.value)))
                  const next = { r: rgb.r, g: rgb.g, b: rgb.b }
                  if (i === 0) next.r = num
                  if (i === 1) next.g = num
                  if (i === 2) next.b = num
                  const hex = rgbToHex(next)
                  setHexInput(hex); setHsv(hexToHsv(hex)); onChange(hex)
                }}
                className="w-full text-center bg-transparent text-xs text-gray-300 font-mono
                           outline-none [appearance:textfield]
                           [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          )
        })}
      </div>

      {/* Eyedropper */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px]
                          text-gray-500 hover:text-gray-300 bg-white/5 border border-white/10
                          cursor-pointer transition-colors flex-shrink-0">
          <Pipette className="w-3 h-3" />
          <span>Eyedropper</span>
          <input type="color" value={value}
            onChange={(e) => { applySwatchColor(e.target.value) }}
            className="sr-only" />
        </label>
        <span className="text-[9px] text-gray-700 italic truncate">
          {Math.round(hsv.h)}° {Math.round(hsv.s * 100)}% {Math.round(hsv.v * 100)}%
        </span>
      </div>

      {/* ── Editable swatches palette ── */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] text-gray-700 uppercase tracking-wider">
            Palette <span className="normal-case text-gray-600">(hover to edit)</span>
          </span>
          <button
            onClick={resetSwatches}
            className="flex items-center gap-1 text-[9px] text-gray-700
                       hover:text-gray-400 transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            reset
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {swatches.map((sw, i) => (
            <Swatch
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              color={sw}
              active={value.toLowerCase() === sw.toLowerCase()}
              onApply={() => applySwatchColor(sw)}
              onEdit={(newHex) => editSwatch(i, newHex)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )

  return (
    <div className="relative flex items-center gap-1.5">
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        className="w-7 h-7 rounded-md border border-white/20 flex-shrink-0 shadow-sm
                   hover:scale-110 transition-transform"
        style={{ backgroundColor: value }}
        title={value}
      />
      {label && <span className="text-[10px] text-gray-500 truncate">{label}</span>}
      {popover}
    </div>
  )
}
