'use client'
import { useState, useRef, type PointerEvent as PE } from 'react'
import { RotateCcw, Shuffle } from 'lucide-react'
import { bulkHueShift } from '@/lib/hue'
import type { UnifiedTheme } from '@/lib/theme'

interface Props {
  theme:    UnifiedTheme
  onChange: (theme: UnifiedTheme) => void
}

export default function HueShiftControl({ theme, onChange }: Props) {
  const [degrees,     setDegrees]     = useState(0)
  const [shiftChrome, setShiftChrome] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const applyShift = (deg: number) => {
    setDegrees(deg)
    onChange(bulkHueShift(theme, deg, { shiftChrome }))
  }

  const calc = (e: { clientX: number }) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    // Map 0–100% of track width → 0–359 degrees
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    applyShift(Math.round(ratio * 359))
  }

  const onPD = (e: PE<HTMLDivElement>) => { e.currentTarget.setPointerCapture(e.pointerId); calc(e) }
  const onPM = (e: PE<HTMLDivElement>) => { if (e.buttons !== 1) return; calc(e) }

  const randomShift = () => applyShift(Math.floor(Math.random() * 360))
  const reset       = () => applyShift(0)

  const pct = (degrees / 359) * 100

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">
          Bulk Hue Shift
        </span>
        <div className="flex items-center gap-1">
          <button onClick={randomShift} title="Random hue"
            className="p-1 rounded text-gray-600 hover:text-gray-300 transition-colors">
            <Shuffle className="w-3 h-3" />
          </button>
          <button onClick={reset} title="Reset hue"
            className="p-1 rounded text-gray-600 hover:text-gray-300 transition-colors">
            <RotateCcw className="w-3 h-3" />
          </button>
          <span className="text-[10px] font-mono text-gray-400 w-10 text-right">
            {degrees}°
          </span>
        </div>
      </div>

      {/* Rainbow hue track */}
      <div
        ref={trackRef}
        className="relative h-4 rounded-full cursor-pointer select-none"
        style={{
          background: 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)',
        }}
        onPointerDown={onPD}
        onPointerMove={onPM}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5
                     rounded-full border-2 border-white pointer-events-none shadow-lg"
          style={{
            left: `${pct}%`,
            backgroundColor: `hsl(${degrees},80%,55%)`,
            boxShadow: '0 0 0 1.5px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Quick preset jumps */}
      <div className="flex gap-1 flex-wrap">
        {[
          { label: '+30°',  deg: 30  },
          { label: '+60°',  deg: 60  },
          { label: '+90°',  deg: 90  },
          { label: '+180°', deg: 180 },
          { label: '+270°', deg: 270 },
        ].map(({ label, deg }) => (
          <button
            key={deg}
            onClick={() => applyShift(deg)}
            className={`px-2 py-0.5 rounded text-[9px] border transition-colors ${
              degrees === deg
                ? 'border-purple-500/50 bg-purple-500/20 text-purple-300'
                : 'border-white/10 bg-white/5 text-gray-600 hover:text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chrome toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <div
          onClick={() => setShiftChrome((v) => !v)}
          className={`w-7 h-4 rounded-full transition-colors relative ${
            shiftChrome ? 'bg-purple-600' : 'bg-white/10'
          }`}
        >
          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
            shiftChrome ? 'translate-x-3.5' : 'translate-x-0.5'
          }`} />
        </div>
        <span className="text-[10px] text-gray-600">Shift editor chrome too</span>
      </label>
    </div>
  )
}
