'use client'
import { useCallback, useEffect, useRef } from 'react'

interface Props {
  direction: 'horizontal' | 'vertical'
  onResize: (delta: number) => void
  className?: string
}

export default function ResizeHandle({ direction, onResize, className = '' }: Props) {
  const dragging = useRef(false)
  const last = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    last.current = direction === 'horizontal' ? e.clientX : e.clientY
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'
  }, [direction])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const current = direction === 'horizontal' ? e.clientX : e.clientY
      const delta = current - last.current
      last.current = current
      onResize(delta)
    }
    const onMouseUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [direction, onResize])

  const isH = direction === 'horizontal'

  return (
    <div
      onMouseDown={onMouseDown}
      className={`
        group relative flex-shrink-0 flex items-center justify-center
        ${isH
          ? 'w-1.5 cursor-col-resize hover:w-1.5'
          : 'h-1.5 cursor-row-resize hover:h-1.5'
        }
        bg-transparent hover:bg-purple-500/20 transition-colors duration-150
        ${className}
      `}
    >
      {/* Visual indicator dots */}
      <div className={`
        flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity
        ${isH ? 'flex-col' : 'flex-row'}
      `}>
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1 h-1 rounded-full bg-purple-400/60" />
        ))}
      </div>

      {/* Active drag highlight */}
      <div className={`
        absolute inset-0
        ${isH ? 'w-px mx-auto' : 'h-px my-auto'}
        bg-white/10 group-hover:bg-purple-500/40 transition-colors
      `} />
    </div>
  )
}
