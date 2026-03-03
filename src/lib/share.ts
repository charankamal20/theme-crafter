import type { UnifiedTheme } from './theme'

/**
 * Encodes a theme into a URL-safe base64 string using
 * CompressionStream (available in all modern browsers + Node 18+).
 * Falls back to plain base64 if compression is unavailable.
 */
export async function encodeTheme(theme: UnifiedTheme): Promise<string> {
  const json  = JSON.stringify(theme)
  const bytes = new TextEncoder().encode(json)

  try {
    const cs     = new CompressionStream('deflate-raw')
    const writer = cs.writable.getWriter()
    void writer.write(bytes)
    void writer.close()
    const compressed = await new Response(cs.readable).arrayBuffer()
    return btoa(String.fromCharCode(...new Uint8Array(compressed)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch {
    // Node env or older browser — plain base64 fallback
    return btoa(encodeURIComponent(json))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }
}

export async function decodeTheme(raw: string): Promise<UnifiedTheme> {
  const b64 = raw.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))

  try {
    const ds     = new DecompressionStream('deflate-raw')
    const writer = ds.writable.getWriter()
    void writer.write(bytes)
    void writer.close()
    const text = await new Response(ds.readable).text()
    return JSON.parse(text) as UnifiedTheme
  } catch {
    // Plain base64 fallback
    return JSON.parse(decodeURIComponent(atob(b64))) as UnifiedTheme
  }
}

export function buildShareUrl(encoded: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://themecrafter.classikh.me'
  return `${base}/?t=${encoded}`
}
