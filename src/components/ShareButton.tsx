'use client'
import { useState } from 'react'
import { Link2, Check, Loader2, Copy } from 'lucide-react'
import { encodeTheme, buildShareUrl } from '@/lib/share'
import type { UnifiedTheme } from '@/lib/theme'

export default function ShareButton({ theme }: { theme: UnifiedTheme }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [url,   setUrl]   = useState('')
  const [open,  setOpen]  = useState(false)

  const handleShare = async () => {
    setState('loading')
    try {
      const encoded = await encodeTheme(theme)
      const link    = buildShareUrl(encoded)
      setUrl(link)
      await navigator.clipboard.writeText(link)
      setState('done')
      setOpen(true)
      setTimeout(() => setState('idle'), 3000)
    } catch {
      setState('idle')
    }
  }

  const copyAgain = async () => {
    await navigator.clipboard.writeText(url)
    setState('done')
  }

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={handleShare}
        disabled={state === 'loading'}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border
                    transition-colors ${
          state === 'done'
            ? 'bg-green-500/20 border-green-500/30 text-green-400'
            : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300 hover:text-white'
        }`}
      >
        {state === 'loading' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {state === 'done'    && <Check   className="w-3.5 h-3.5" />}
        {state === 'idle'    && <Link2   className="w-3.5 h-3.5" />}
        {state === 'done' ? 'Copied!' : 'Share'}
      </button>

      {/* Toast showing the URL */}
      {open && state === 'done' && (
        <div
          className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-white/10
                     shadow-2xl p-3 flex flex-col gap-2"
          style={{ backgroundColor: '#1a1b26' }}
        >
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            <span className="text-xs text-green-400 font-medium">Link copied to clipboard!</span>
            <button onClick={() => setOpen(false)}
              className="ml-auto text-gray-600 hover:text-gray-400 text-xs">✕</button>
          </div>

          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5
                          border border-white/10">
            <span className="flex-1 text-[10px] text-gray-400 font-mono truncate">{url}</span>
            <button onClick={copyAgain}
              className="text-gray-600 hover:text-gray-300 flex-shrink-0 transition-colors">
              <Copy className="w-3 h-3" />
            </button>
          </div>

          <p className="text-[10px] text-gray-600">
            Anyone with this link can open your exact theme in ThemeCrafter — no account needed.
          </p>
        </div>
      )}
    </div>
  )
}
