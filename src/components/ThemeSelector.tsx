"use client"

import { PREDEFINED_THEMES, PredefinedTheme } from "@/data/predefined-themes"

type Props = {
  onSelect: (theme: PredefinedTheme) => void
}

export function PredefinedThemeSelector({ onSelect }: Props) {
  return (
    <select
      defaultValue=""
      onChange={(e) => {
        const found = PREDEFINED_THEMES.find(t => t.slug === e.target.value)
        if (found) onSelect(found)
      }}
      className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-mono"
    >
      <option value="" disabled>
        Load a theme...
      </option>
      {PREDEFINED_THEMES.map((t) => (
        <option key={t.slug} value={t.slug}>
          {t.name}{t.variant ? ` — ${t.variant}` : ""}
        </option>
      ))}
    </select>
  )
}
